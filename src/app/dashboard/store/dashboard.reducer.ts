import {createReducer, on} from '@ngrx/store';
import {addVideoAction} from './dashboard.actions';
import {DashboardStateInterface} from '../interfaces/dashboardState.interface';

const initialState: DashboardStateInterface = {
  videos: []
};

export const dashboardReducer = createReducer(
  initialState,
  on(addVideoAction, (state, { video }) => ({ ...state, videos: [...state.videos, video]}))
);
