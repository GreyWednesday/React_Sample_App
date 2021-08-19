import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl, renderProvider, timeout } from '@utils/testUtils';
import { ItunesDetailContainerTest as ItunesDetailContainer, mapStateToProps } from '../index';

describe('<ItunesDetailContainer />', () => {
  let submitSpy;
  let match;
  let trackDetails;

  beforeEach(() => {
    submitSpy = jest.fn();
    match = {
      params: {
        trackId: 1469577741
      }
    };

    trackDetails = {
      wrapperType: 'track',
      kind: 'song',
      artistId: 909253,
      collectionId: 1469577723
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <ItunesDetailContainer match={match} dispatchRequestSongDetail={() => {}} dispatchClearTrackDetails={() => {}} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should dispatch requestSongDetail action when it is rendered', async () => {
    const { baseElement } = renderWithIntl(
      <ItunesDetailContainer match={match} dispatchRequestSongDetail={submitSpy} dispatchClearTrackDetails={() => {}} />
    );
    expect(baseElement).toBeTruthy();
    await timeout(200);
    expect(submitSpy).toBeCalled();
  });

  it('should render if it receives track details', () => {
    const { getByTestId } = renderProvider(
      <ItunesDetailContainer
        match={match}
        trackDetails={trackDetails}
        dispatchRequestSongDetail={() => {}}
        dispatchClearTrackDetails={() => {}}
      />
    );
    expect(getByTestId('detail-panel')).toBeTruthy();
  });

  it('should not crash if it receives no track details', () => {
    const { getByTestId } = renderProvider(
      <ItunesDetailContainer
        match={match}
        dispatchRequestSongDetail={() => {}}
        dispatchClearTrackDetails={() => {}}
        isLoading={false}
      />
    );
    expect(getByTestId('detail')).toBeTruthy();

    expect(getByTestId('song_not_found')).toHaveTextContent('Song Not Found');
  });

  it('should receive the selectSongs() selector', () => {
    expect(mapStateToProps({}).songs).toBeTruthy();
  });

  it('should receive the trackDetails() selector', () => {
    expect(mapStateToProps({}).trackDetails).toBeNull();
  });
});
