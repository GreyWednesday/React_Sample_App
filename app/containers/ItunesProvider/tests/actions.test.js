import { ItunesProviderTypes, ItunesProviderCreators } from '../reducer';

describe('ItunesProvider action tests', () => {
  it('has a type of REQUEST_SONGS', () => {
    const expected = {
      type: ItunesProviderTypes.REQUEST_SONGS,
      songName: 'hey'
    };
    expect(ItunesProviderCreators.requestSongs('hey')).toEqual(expected);
  });
});
