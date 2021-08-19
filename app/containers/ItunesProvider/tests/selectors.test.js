import { selectItunesProvider, selectSongName, selectSongs, selectError, selectTrackDetails } from '../selectors';

describe('ItunesProvider selector tests', () => {
  let mockedState;
  let songName;
  let songs;
  let songError;
  let trackDetails;

  beforeEach(() => {
    songName = 'hey';
    songs = { totalCount: 1, items: [{ songName }] };
    songError = 'Unable to fetch songs';
    trackDetails = { song: 'hey' };

    mockedState = {
      ItunesProvider: {
        songName,
        songs,
        trackDetails,
        error: songError
      }
    };
  });
  it('should select the ItunesProvider state', () => {
    const ItunesProviderSelector = selectItunesProvider();
    expect(ItunesProviderSelector(mockedState)).toEqual(mockedState.ItunesProvider);
  });
  it('should select the song name', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songs', () => {
    const songsSelector = selectSongs();
    expect(songsSelector(mockedState)).toEqual(songs);
  });

  it('should select the track details', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select the error', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(songError);
  });
});
