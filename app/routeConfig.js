import NotFound from '@containers/NotFoundPage/Loadable';
import songConstants from '@utils/routeConstants';
import ItunesProvider from './containers/ItunesProvider/Loadable';
export const routeConfig = {
  songs: {
    component: ItunesProvider,
    ...songConstants.songs
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
