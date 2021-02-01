import { ImageData } from 'src/types';
import {
  DATA_CLEAR,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './actionTypes';

export interface State {
  loading: boolean;
  data: ImageData[];
  error: Error | null;
}

export interface DataRequested {
  type: typeof FETCH_DATA_REQUEST;
}

export interface DataLoaded {
  type: typeof FETCH_DATA_SUCCESS;
  payload: ImageData;
}

export interface DataError {
  type: typeof FETCH_DATA_FAILURE;
  payload: Error;
}

export interface DataClear {
  type: typeof DATA_CLEAR;
}

export type DataActionTypes =
  | DataRequested
  | DataLoaded
  | DataError
  | DataClear;
