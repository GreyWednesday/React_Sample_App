import React, { useEffect, memo } from 'react';
import { selectSongs, selectTrackDetails } from '../selectors';
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
import { ItunesProviderCreators } from '../reducer';

const { Panel } = Collapse;

const Wrapper = styled.div`
  margin: auto;
  padding: 1.25em 0em 1.25em;
  max-width: 35em;
`;

const ItunesDetailContainer = ({ match, trackDetails, dispatchRequestSongDetail, dispatchClearTrackDetails }) => {
  useEffect(() => {
    dispatchRequestSongDetail(match?.params?.trackId);
    return () => {
      dispatchClearTrackDetails();
    };
  }, []);

  const parseSongDetails = () => {
    if (trackDetails) {
      const details = Object.entries(trackDetails).map((entry, idx) => {
        return (
          <Panel header={entry[0]} key={idx}>
            <p data-testid="detail-panel">{entry[1]}</p>
          </Panel>
        );
      });
      return <Collapse defaultActiveKey={['0']}>{details}</Collapse>;
    }
    return (
      <p>
        <T type="standard" id="song_not_found" />
      </p>
    );
  };

  return <Wrapper data-testid="detail">{parseSongDetails()}</Wrapper>;
};

ItunesDetailContainer.propTypes = {
  match: PropTypes.object,
  songs: PropTypes.shape({
    resultsCount: PropTypes.number,
    results: PropTypes.array
  }),
  trackDetails: PropTypes.object,
  dispatchRequestSongDetail: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func
};

export const mapStateToProps = createStructuredSelector({
  songs: selectSongs(),
  trackDetails: selectTrackDetails()
});

export const mapDispatchToProps = (dispatch) => {
  const { requestSongDetail, clearTrackDetails } = ItunesProviderCreators;
  return {
    dispatchRequestSongDetail: (trackId) => dispatch(requestSongDetail(trackId)),
    dispatchClearTrackDetails: () => dispatch(clearTrackDetails())
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'ItunesProvider', saga: ItunesProviderSaga })
)(ItunesDetailContainer);

export const ItunesDetailContainerTest = compose(injectIntl)(ItunesDetailContainer);
