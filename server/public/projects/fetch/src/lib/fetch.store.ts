import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface FetchState {
  reqSeq: number;
}

export const initialFetchState: FetchState = {
  reqSeq: 0,
};

export const fetchStore = signalStore(
  { providedIn: 'root' },
  withState(initialFetchState),
  withMethods((store) => ({
    incrementReqSeq() {
      patchState(store, { reqSeq: store.reqSeq() + 1 });
    },
  }))
);
