import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectItunesProvider, selectSongName, selectSongs, selectError } from './selectors';
import ItunesProviderSaga from './saga';
import { ItunesProviderCreators } from './reducer';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import ItunesGridContainer from './ItunesGridContainer/index';

const ItunesProvider = ({ dispatchSongName, songs, error, songName, maxwidth, padding }) => {
  return (
    <ItunesGridContainer maxwidth={maxwidth} padding={padding} dispatchSongName={dispatchSongName} songs={songs} />
  );
};

ItunesProvider.propTypes = {
  dispatchSongName: PropTypes.func,
  intl: PropTypes.object,
  songs: PropTypes.object,
  error: PropTypes.object,
  songName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  ItunesProvider: selectItunesProvider(),
  songs: selectSongs(),
  error: selectError(),
  songName: selectSongName()
});

const mapDispatchToProps = (dispatch) => {
  const { requestSongs } = ItunesProviderCreators;
  return {
    dispatchSongName: (songName) => dispatch(requestSongs(songName))
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'ItunesProvider', saga: ItunesProviderSaga })
)(ItunesProvider);

export const ItunesProviderTest = compose(injectIntl)(ItunesProvider);
