/**
 *
 * Tests for SongCard
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import ProtectedRoute from '../index';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import ItunesGridContainer from '@app/containers/ItunesProvider/ItunesGridContainer/index';

jest.mock('@utils/routeConstants', () => {
  return {
    dashboard: {
      route: '/',
      isProtected: true
    },
    login: {
      route: '/login',
      isProtected: false
    }
  };
});

describe('<ProtectedRoute />', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={true} render={ItunesGridContainer} exact={true} path="/" />
      </BrowserRouter>
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should not redirect the user if the user tries to access a protected route while being logged in', () => {
    const { queryByTestId } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute isLoggedIn={true} render={ItunesGridContainer} exact={true} path="/" />
      </BrowserRouter>
    );

    expect(queryByTestId(/search-bar/i)).toBeInTheDocument();
  });

  it('should redirect the user if the user tries to access a protected route without being logged in', () => {
    const { queryByTestId } = renderProvider(
      <BrowserRouter>
        <ProtectedRoute
          isLoggedIn={false}
          render={ItunesGridContainer}
          exact={true}
          path="/"
          handleLogout={submitSpy}
        />
      </BrowserRouter>
    );
    expect(queryByTestId(/search-bar/i)).toBeNull();
  });

  it('should not redirect the user if the user tries to access a unprotected route while not being logged in', () => {
    const { queryByTestId } = renderProvider(
      <MemoryRouter initialEntries={['/login']}>
        <ProtectedRoute isLoggedIn={false} render={ItunesGridContainer} exact={true} path="/login" />
      </MemoryRouter>
    );

    expect(queryByTestId(/search-bar/i)).toBeInTheDocument();
  });
});
