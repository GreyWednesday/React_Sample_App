/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesGridContainerTest as ItunesGridContainer, mapDispatchToProps } from '../index';
import { ItunesProviderCreators } from '../../reducer';

describe('<ItunesGridContainer /> tests', () => {
  let submitSpy;
  let mocks;
  let songs;

  beforeEach(() => {
    submitSpy = jest.fn();
    mocks = {};

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
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesGridContainer dispatchSongName={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('receives correct dispatch functions from store as props', () => {
    mocks.dispatch = () => {};

    jest.spyOn(mocks, 'dispatch');
    const dispatchedFunctions = mapDispatchToProps(mocks.dispatch);
    dispatchedFunctions.dispatchSongName('hey');
    expect(mocks.dispatch.mock.calls[0][0]).toStrictEqual(ItunesProviderCreators.requestSongs('hey'));
    dispatchedFunctions.dispatchClearSongs();
    expect(mocks.dispatch.mock.calls[1][0]).toStrictEqual(ItunesProviderCreators.clearSongs());
  });

  it('should call dispatchSongName on change', async () => {
    const { getByTestId } = renderProvider(<ItunesGridContainer dispatchSongName={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'hey' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchClearSongs on change', async () => {
    const { getByTestId } = renderProvider(
      <ItunesGridContainer dispatchSongName={() => {}} dispatchClearSongs={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'hey' }
    });
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should render the grid with 0 elements with we pass in zero number of songs', () => {
    songs = {
      results: []
    };
    const { getByTestId } = renderProvider(<ItunesGridContainer dispatchSongName={submitSpy} songs={songs} />);
    expect(getByTestId('grid').children.length).toBe(0);
  });

  it('should render the grid with the correct number of elements', () => {
    const { getByTestId } = renderProvider(<ItunesGridContainer dispatchSongName={submitSpy} songs={songs} />);
    expect(getByTestId('grid').children.length).toBe(2);
  });
});
