/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import ItunesGridContainer from '../index';

describe('<ItunesGridContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesGridContainer dispatchGithubRepos={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchSongName on change', async () => {
    const { getByTestId } = renderProvider(<ItunesGridContainer dispatchSongName={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'hey' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
