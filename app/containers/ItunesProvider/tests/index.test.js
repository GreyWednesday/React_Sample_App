/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { ItunesProviderTest as ItunesProvider } from '../index';

describe('<ItunesProvider /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesProvider dispatchSongName={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
});
