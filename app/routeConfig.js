import NotFound from '@containers/NotFoundPage/Loadable';
import songConstants from '@utils/routeConstants';
import ItunesDetailContainer from './containers/ItunesProvider/ItunesDetailContainer/index';
import ItunesGridContainer from './containers/ItunesProvider/ItunesGridContainer/Loadable';
export const routeConfig = {
  songs: {
    component: ItunesGridContainer,
    ...songConstants.songs
  },
  detail: {
    component: ItunesDetailContainer,
    route: '/tracks/:trackId'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
