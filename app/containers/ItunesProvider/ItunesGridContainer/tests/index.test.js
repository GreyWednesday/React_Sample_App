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

  beforeEach(() => {
    submitSpy = jest.fn();
    mocks = {};
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesGridContainer dispatchGithubRepos={submitSpy} />);
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
});
