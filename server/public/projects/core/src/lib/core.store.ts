/* This file is used to create the core signal store for the library. */

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { libraries } from './libraries';

export interface LibraryCore {
  path: string;
  name: string;
  isSelected: boolean;
  icon: string;
}

export interface CoreState {
  selectedLibrary: LibraryCore;
  libraries: LibraryCore[];
}

export const initialCoreState: CoreState = {
  // Selected library is the mail library
  selectedLibrary:
    libraries.find((library) => library.isSelected) || libraries[0],
  libraries: libraries,
};

export const coreStore = signalStore(
  { providedIn: 'root' },
  withState(initialCoreState),
  withMethods((store) => ({
    updateSelectedLibrary(libraryToAdd: LibraryCore) {
      // find the library to update in libraries
      patchState(store, {
        selectedLibrary: libraryToAdd,
        libraries: libraries.map((library) => {
          // if the library is the one we want to update, set it to selected
          if (library.name === libraryToAdd.name) {
            return { ...library, isSelected: true };
          }

          // otherwise, set it to not selected
          return { ...library, isSelected: false };
        }),
      });
    },
  }))
);
