import {
  DATA_CLEAR,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './actionTypes';
import { DataActionTypes, State } from './types';

export const initalState = {
  loading: false,
  data: [],
  error: null,
};

export const reducer = (state: State, action: DataActionTypes): State => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        data: [...state.data, action.payload],
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DATA_CLEAR:
      return {
        loading: false,
        data: [],
        error: null,
      };
    default:
      return state;
  }
};
