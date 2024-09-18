import { Component, OnInit, inject } from '@angular/core'
import { authStore, PermissionService, LoginApiService } from 'authentication-background'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterOutlet } from '@angular/router'
import { HomeMailComponent } from 'mail'
import { coreStore, LibraryCore } from 'core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog'
import { HomeSearchComponentDialog } from 'search'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    HomeMailComponent,
    CommonModule,
    RouterLink,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

/**
 * This class is used to define the home component.
 * It is used to display the home page with tabs, each tab corresponding to a standalone library referenced inside the core library.
 * @param {Router} router - The router.
 * @param {MatDialog} dialog - The dialog.
 */
export class HomeComponent implements OnInit {
  coreStore = inject(coreStore)
  authStore = inject(authStore)
  permissionService = inject(PermissionService)
  loginApiService = inject(LoginApiService)
  usernameFirstLetter = this.authStore.user()?.email?.charAt(0).toUpperCase()
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.router.navigate(['mail'])
  }
  logout() {
    this.loginApiService.logout()
    this.permissionService.logout()
  }

  switchTab(tab: LibraryCore) {
    this.coreStore.updateSelectedLibrary(tab)
    console.log('switchTab', tab)
  }
  openSearchDialog() {
    const dialogRef = this.dialog.open(HomeSearchComponentDialog, {
      data: { name: 'this.name', animal: 'this.animal' },
      panelClass: 'search-dialog-container'
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed')
      // this.animal = result;
    })
  }
}
