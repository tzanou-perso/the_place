import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Component, inject, OnInit, signal, Signal } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { SnackbarService } from 'core'
import { FeatherPagination, Feathers } from 'fetch'
import { Map, Maps } from '../../models'
import { FeatherResponseData, FeatherResponseDataList } from 'fetch'
import { MatIconModule } from '@angular/material/icon'
import { map } from 'rxjs/operators'
import { Service } from '@feathersjs/feathers'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'map-form-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [MatTableDataSource],
  templateUrl: './map-form-create.component.html',
  styleUrl: './map-form-create.component.css'
})
export class MapFormCreateComponent implements OnInit {
  constructor(private _translate: TranslateService) {}
  featherService: Feathers = inject(Feathers)
  snackbarService = inject(SnackbarService)
  maps = signal([] as Maps)
  mapQueryPagination: FeatherPagination = {
    currentPage: 1,
    limit: 10,
    skip: 0,
    total: 0,
    order: -1
  }
  // 1 ascending, -1 descending
  mapQueryInitialLimit = this.mapQueryPagination.limit
  displayedColumns: string[] = ['name', 'numCellRow', 'numCellColumn', 'actions']

  createMapForm = inject(FormBuilder).group({
    name: ['', [Validators.required]],
    numCellRow: ['', Validators.required],
    numCellColumn: ['', Validators.required]
  })

  ngOnInit() {
    this.listMap()
    this.setEvents()
  }

  setEvents() {
    const query = this.featherService.service('map')
    ;(query as any).on('created', (data: Service) => {
      console.log('listMapsd', data)
      this.listMap()
    })
    ;(query as any).on('removed', (data: Service) => {
      console.log('listMapsd', data)
      this.listMap()
    })
    ;(query as any).on('updated', (data: Service) => {
      console.log('listMapsd', data)
      this.listMap()
    })
  }

  async createMap() {
    const { name, numCellRow, numCellColumn } = this.createMapForm.value
    if (this.createMapForm.invalid) {
      return
    }
    try {
      console.log('createMap', name, numCellRow, numCellColumn)
      const params = {
        name,
        numCellRow: Number(numCellRow),
        numCellColumn: Number(numCellColumn)
      }
      const query = await this.featherService
        .service('map')
        .create(params)
        .catch((e: any) => {
          const error = new HttpErrorResponse({
            error: JSON.parse(JSON.stringify(e)),
            status: JSON.parse(JSON.stringify(e)).code
          })
          console.error('error', error)
          this.snackbarService.openSnackBar({
            message: this._translate.instant(error.error.message),
            // action: () => {
            //   console.log('snackbar action clicked');
            // },
            // actionLabel: 'Retry',
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
            duration: 5000
          })
          return e
        })
      console.log('createMap', query)
    } catch (e) {
      console.error('error', e)
    }
  }

  async listMap() {
    try {
      if (this.mapQueryPagination.currentPage > 1) {
        this.mapQueryPagination.skip =
          this.mapQueryPagination.limit * (this.mapQueryPagination.currentPage - 1)
      } else {
        this.mapQueryPagination.currentPage = 1
        this.mapQueryPagination.skip = 0
      }
      const query = await this.featherService.service('map').find({
        query: {
          $limit: this.mapQueryPagination.limit,
          $skip: this.mapQueryPagination.skip,
          $sort: { createdAt: this.mapQueryPagination.order },
          name:
            this.mapQueryPagination.like && this.mapQueryPagination.like.length > 0
              ? { $like: `%${this.mapQueryPagination.like}%` }
              : undefined
        }
      })
      this.mapQueryPagination.total = query.total
      this.mapQueryPagination.skip = query.skip
      this.mapQueryPagination.limit = query.limit
      console.log('listMaps', query)
      this.maps.set(query.data)
    } catch (e) {
      console.error('error', e)
    }
  }

  async deleteMap(id: number) {
    try {
      const query = await this.featherService.service('map').remove(id)
      console.log('deleteMap', query)
    } catch (e) {
      console.error('error', e)
    }
  }

  async editMap(map: Map) {
    try {
      // remove created_at and updated_at
      delete map.createdAt
      delete map.updatedAt

      console.log('editMaps', map)
      const query = await this.featherService.service('map').patch(map.id, map)
      console.log('updateMap', query)
    } catch (e) {
      console.error('error', e)
    }
  }

  async searchMap(name: string) {
    console.log('searchMap', name)
    try {
      this.mapQueryPagination.like = name
      this.listMap()
      // const query = await this.featherService.service('map').find({
      //   query: {
      //     $limit: this.mapQueryPagination.limit,
      //     $sort: { createdAt: this.mapQueryPagination.order },
      //     name: {
      //       $like: `%${name}%`
      //     }
      //   }
      // })
      // this.maps.set(query.data)
      console.log('searchMap', name)
    } catch (e) {
      console.error('error', e)
    }
  }

  handlePageEvent(e: PageEvent) {
    if (
      this.mapQueryPagination.currentPage != e.pageIndex + 1 ||
      this.mapQueryPagination.limit != e.pageSize
    ) {
      this.mapQueryPagination.currentPage = e.pageIndex + 1
      this.mapQueryPagination.skip = this.mapQueryPagination.limit * e.pageIndex
      this.mapQueryPagination.limit = e.pageSize
      this.mapQueryPagination.total = e.length
      this.listMap()
    }
  }
}
