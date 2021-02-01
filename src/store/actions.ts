import { ImageData } from 'src/types';
import {
  DATA_CLEAR,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './actionTypes';
import { DataClear, DataError, DataLoaded, DataRequested } from './types';

export const dataRequested = (): DataRequested => ({
  type: FETCH_DATA_REQUEST,
});

export const dataLoaded = (data: ImageData): DataLoaded => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const dataError = (error: Error): DataError => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const dataClear = (): DataClear => ({
  type: DATA_CLEAR,
});
