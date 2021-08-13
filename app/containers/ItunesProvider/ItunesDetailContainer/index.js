import React, { memo } from 'react';
import { selectSongs } from '../selectors';
import { Collapse } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import styled from 'styled-components';
import ItunesProviderSaga from '../saga';
import PropTypes from 'prop-types';
import { T } from '@app/components/T/index';

const { Panel } = Collapse;

const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 500px;
`;

const ItunesDetailContainer = ({ match, songs }) => {
  const getSong = (id) => {
    const foundSong = songs.results.find((song) => song.trackId === parseInt(id));

    if (foundSong) {
      const details = Object.entries(foundSong).map((entry, idx) => {
        return (
          <Panel header={entry[0]} key={idx}>
            <p>{entry[1]}</p>
          </Panel>
        );
      });
      return <Collapse defaultActiveKey={['0']}>{details}</Collapse>;
    }
    return (
      <p>
        <T type="SongNotFound" id="song_not_found" />
      </p>
    );
  };

  return <Wrapper data-testid="detail">{getSong(match?.params?.trackId || 12345)}</Wrapper>;
};

ItunesDetailContainer.propTypes = {
  match: PropTypes.object,
  songs: PropTypes.shape({
    resultsCount: PropTypes.number,
    results: PropTypes.array
  })
};

export const mapStateToProps = createStructuredSelector({
  songs: selectSongs()
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'ItunesProvider', saga: ItunesProviderSaga })
)(ItunesDetailContainer);

export const ItunesDetailContainerTest = compose(injectIntl)(ItunesDetailContainer);
