import {createAction, props} from '@ngrx/store';

export const dashboardTypes = {
  addVideo: '[DASHBOARD] ADD_VIDEO'
};

export const addVideoAction = createAction(
  dashboardTypes.addVideo,
  props<{ video: object }>(),
);
