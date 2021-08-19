import React, { useState, useEffect, memo } from 'react';
import { selectSongs, selectTrackDetails } from '../selectors';
import { Collapse, Carousel, Skeleton, Rate, Breadcrumb, Row, Col } from 'antd';
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

import If from '@app/components/If/index';

const { Panel } = Collapse;

const Wrapper = styled.div`
  margin: auto;
  padding: 1.25em 0em 1.25em;
  max-width: 35em;
`;

const CarouselDetail = styled(Carousel)`
  height: 20em;
  margin: 2em 0em 0em 3.5em;
  text-align: center;
  background: #364d79;
  align-items: center;
  padding-top: 3em;
  border-radius: 20px;
`;

const Artwork = styled.img`
  margin: auto;
  height: 10em;
  margin-bottom: 1.25em;
  border-radius: 20px;
`;

const CarouselTitle = styled.h3`
  color: #fff;
  font-family: 'Times New Roman', Times, serif;
`;

const Description = styled.h3`
  font-family: 'Optima';
  color: #000000;
  font-size: 20px;
  margin: 2em 0em 0em 3.5em;
`;

const BreadcrumbStyled = styled(Breadcrumb)`
  text-align: center;
  padding-top: 0.5em;
`;

const BreadcrumbT = styled(T)`
  display: inline-block;
`;

const ItunesDetailContainer = ({
  match,
  trackDetails,
  dispatchRequestSongDetail,
  dispatchClearTrackDetails,
  isLoading
}) => {
  const [loading, setLoading] = useState(isLoading || false);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  useEffect(() => {
    if (isLoading === null) {
      setLoading(true);
    }
    dispatchRequestSongDetail(match?.params?.trackId);
    return () => {
      dispatchClearTrackDetails();
    };
  }, []);

  const parseSongDetails = () => {
    if (trackDetails) {
      if (loading) {
        setLoading(false);
      }
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
        <T type="standard" id="song_not_found" data-testid="song_not_found" />
      </p>
    );
  };

  return (
    <Row>
      <Col span={14} push={10}>
        <div>
          <BreadcrumbStyled>
            <Breadcrumb.Item href="/">
              <BreadcrumbT type="small" id="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <BreadcrumbT type="small" id="track_details" />
            </Breadcrumb.Item>
          </BreadcrumbStyled>

          <Skeleton active loading={loading}>
            <Wrapper data-testid="detail">{parseSongDetails()}</Wrapper>
          </Skeleton>
        </div>
      </Col>
      <Col span={10} pull={14}>
        <CarouselDetail effect="fade">
          <div>
            <If condition={trackDetails?.artworkUrl100} otherwise={<T type="standard" id="not_available" />}>
              <Artwork src={trackDetails?.artworkUrl100} />
            </If>
            <Rate tooltips={desc} />
          </div>
          <div>
            <If condition={trackDetails?.trackPrice} otherwise={<T type="standard" id="not_available" />}>
              <CarouselTitle>
                <i>Price</i>
                <br />
                <b>${trackDetails?.trackPrice}</b>
              </CarouselTitle>
            </If>
          </div>
          <div>
            <If condition={trackDetails?.previewUrl} otherwise={<T type="standard" id="not_available" />}>
              <audio controls>
                <source src={trackDetails?.previewUrl} type="audio/mpeg" />
              </audio>
            </If>
          </div>
          <div>
            <If condition={trackDetails?.artistName} otherwise={<T type="standard" id="not_available" />}>
              <CarouselTitle>
                <i>
                  <T type="standard" id="artist_name" />
                </i>{' '}
                <br />
                <b>{trackDetails?.artistName}</b>
              </CarouselTitle>
            </If>
          </div>
        </CarouselDetail>
        <If condition={trackDetails?.longDescription} otherwise={<T type="standard" id="not_available" />}>
          <Description>{trackDetails?.longDescription}</Description>
        </If>
      </Col>
    </Row>
  );
};

ItunesDetailContainer.propTypes = {
  match: PropTypes.object,
  songs: PropTypes.shape({
    resultsCount: PropTypes.number,
    results: PropTypes.array
  }),
  trackDetails: PropTypes.object,
  dispatchRequestSongDetail: PropTypes.func,
  dispatchClearTrackDetails: PropTypes.func,
  isLoading: PropTypes.bool
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
