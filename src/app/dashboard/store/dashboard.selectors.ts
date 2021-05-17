import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DashboardStateInterface} from '../interfaces/dashboardState.interface';
import {DASHBOARD_NODE} from './index';

export const dashboardFeatureSelector = createFeatureSelector<DashboardStateInterface>(DASHBOARD_NODE);

export const getVideosSelector = createSelector(dashboardFeatureSelector, ({ videos }) => videos);
