/**
 * This is the signal rxjs store for the authentication-background library.
 */

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from './models';

export interface AuthState {
  user: User | null;
  isConnected: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isConnected: false,
};

export const authStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withMethods((store) => ({
    login({ user, callback }: { user: User; callback?: () => {} }) {
      patchState(store, { user, isConnected: true });
      if (callback) {
        callback();
      }
    },
    logout({ callback }: { callback?: () => {} }) {
      patchState(store, { user: null, isConnected: false });
      if (callback) {
        callback();
      }
    },
  }))
);
