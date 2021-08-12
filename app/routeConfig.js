import NotFound from '@containers/NotFoundPage/Loadable';
import songConstants from '@utils/routeConstants';
import ItunesGridContainer from './containers/ItunesProvider/ItunesGridContainer/Loadable';
export const routeConfig = {
  songs: {
    component: ItunesGridContainer,
    ...songConstants.songs
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
