/**
 *
 * Tests for SongCard
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, renderProvider, timeout } from '@utils/testUtils';
import SongCard from '../index';

describe('<SongCard />', () => {
  let song;

  beforeEach(() => {
    song = {
      trackId: 1000,
      artworkUrl100: 'react-template.png',
      trackName: 'abc',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a'
    };
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SongCard song={song} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SongCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SongCard song={song} />);
    expect(getAllByTestId('song-card').length).toBe(1);
  });

  it('should render even with no trackId', () => {
    song = {};
    const { baseElement } = renderWithIntl(<SongCard song={song} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the card with no trackName, artworkUrl or previewUrl but with trackId', async () => {
    const emptySong = {
      trackId: 1000
    };
    const { getByTestId } = renderProvider(<SongCard song={emptySong} />);
    expect(getByTestId('card-img')).toHaveAttribute('src', 'react-template.png');

    expect(getByTestId('card-name')).toHaveTextContent('Not available');

    fireEvent.mouseOver(getByTestId('card-button'));
    await timeout(200);
    expect(getByTestId('card-collection-price')).toHaveTextContent('Not available');
    expect(getByTestId('card-track-price')).toHaveTextContent('Not available');
    expect(getByTestId('card-release-date')).toHaveTextContent('Not available');
  });

  it('redirects to the correct link', () => {
    const { getByTestId } = renderProvider(<SongCard song={song} />);
    expect(getByTestId('card-link')).toHaveAttribute('href', '/tracks/1000/');
  });
});
