import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

const selectItunesProviderDomain = (state) => state.ItunesProvider || initialState;

export const selectItunesProvider = () => createSelector(selectItunesProviderDomain, (substate) => substate);

export const selectSongs = () => createSelector(selectItunesProviderDomain, (substate) => get(substate, 'songs', null));

export const selectError = () => createSelector(selectItunesProviderDomain, (substate) => get(substate, 'error', null));

export const selectSongName = () =>
  createSelector(selectItunesProviderDomain, (substate) => get(substate, 'songName', null));

export default selectItunesProvider;
