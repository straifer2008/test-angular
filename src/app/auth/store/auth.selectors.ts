import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStoreInterface} from '../interfaces/auth.store.interface';
import {AUTH_NODE} from './auth.reducer';

export const authSelectorFeature = createFeatureSelector<AuthStoreInterface>(AUTH_NODE);

export const getUserSelector = createSelector(authSelectorFeature, ({ user }) => user);

export const getAuthErrorSelector = createSelector(authSelectorFeature, ({ error }) => error);
