import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, renderProvider } from '@utils/testUtils';
import { ItunesDetailContainerTest as ItunesDetailContainer, mapStateToProps } from '../index';

describe('<ItunesDetailContainer />', () => {
  let match, songs;

  beforeEach(() => {
    songs = {
      resultCount: 1,
      results: [
        {
          trackId: 1469577741,
          trackName: 'Upside Down',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a',
          artworkUrl100:
            'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg'
        },
        {
          trackId: 1469577741,
          trackName: 'Upside Down',
          previewUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a',
          artworkUrl100:
            'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg'
        }
      ]
    };

    match = {
      params: {
        trackId: 1
      }
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<ItunesDetailContainer match={match} songs={songs} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render if it finds the song', () => {
    match = {
      params: {
        trackId: 1469577741
      }
    };
    const { getByTestId } = renderProvider(<ItunesDetailContainer match={match} songs={songs} />);
    expect(getByTestId('detail-panel')).toBeTruthy();
  });

  it('should not crash if it is not able to find the song', () => {
    const { getByTestId } = renderProvider(<ItunesDetailContainer match={match} songs={songs} />);
    expect(getByTestId('detail')).toBeTruthy();

    expect(getByTestId('t')).toHaveTextContent('Song Not Found');
  });

  it('should receive the getSongs() selector', () => {
    expect(mapStateToProps({}).songs).toBeTruthy();
  });
});
