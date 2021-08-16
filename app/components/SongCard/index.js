import React, { memo } from 'react';
import { Col, Popover, Button } from 'antd';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import T from '@components/T';
import { colors, styles } from '@app/themes';
import If from '@components/If';

const Card = styled.div`
  && {
    display: grid;
    margin: 1.25em auto;
    padding: 1em;
    background: ${colors.primary};
    ${styles.borderRadius('10px')};
    grid-template-columns: repeat(2, 1fr);
    transition: ease-in-out 0.3s;
    grid-gap: 10px;
    word-wrap: break-word
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-items: center;
  }

  :hover {
    ${styles.borderRadius('20px')};
    transform: scale(1.1);
    ${styles.boxShadow(5, 5, 30, 0)};
  }
`;

const Artwork = styled.img`
  border-radius: 10px;
  margin: 10px auto;
`;

const Title = styled.h3`
  margin: auto auto auto 0.5em;
`;

const Collection = styled.h5`
  margin: auto;
`;

const Audio = styled.audio`
  grid-column: span 2;
`;

const DescriptionWrapper = styled.div`
  grid-column: span 2;
`;

const ErrorCard = styled.div`
  && {
    margin: 1em auto;
    padding: 1em;
    height: 150px;
    background: ${colors.primary};
    ${styles.borderRadius('10px')};
    justify-items: center;
  }
`;

const ErrorMessage = styled.h1`
  transform: rotate(45deg);
  margin: 1.25em auto;
`;

function SongCard({ song }) {
  const checkAvailability = (variable) => (
    <If condition={variable} otherwise={<T type="standard" id="not_available" />}>
      {variable}
    </If>
  );

  const descContent = () => {
    return (
      <div>
        <p data-testid="card-collection-price">
          <T type="subtext" id="collection_price" /> : {checkAvailability(song?.collectionPrice)}
        </p>
        <p data-testid="card-track-price">
          <T type="subtext" id="track_price" /> : {checkAvailability(song?.trackPrice)}
        </p>
        <p data-testid="card-release-date">
          <T type="subtext" id="release_date" /> : {checkAvailability(song?.releaseDate)}
        </p>
      </div>
    );
  };

  return song?.trackId ? (
    <Col span={8} data-testid="song-card">
      <a href={`/tracks/${song.trackId}/`} data-testid="card-link">
        <Card>
          <Artwork src={song?.artworkUrl100 || 'react-template.png'} data-testid="card-img" />
          <Title>{checkAvailability(song?.trackName)}</Title>
          <Title>
            <T type="standard" id="collection_name" />
          </Title>
          <Collection data-testid="card-name">{checkAvailability(song?.collectionName)}</Collection>
          <If condition={song?.previewUrl} otherwise={<T type="standard" id="not_available" />}>
            <Audio controls>
              <source src={song.previewUrl} type="audio/mpeg" />
            </Audio>
          </If>
          <DescriptionWrapper>
            <Popover content={descContent} title="Description">
              <Button
                type="primary"
                style={{ background: `${colors.secondary}`, border: '0em' }}
                data-testid="card-button"
              >
                <T type="standard" id="more_details" />
              </Button>
            </Popover>
          </DescriptionWrapper>
        </Card>
      </a>
    </Col>
  ) : (
    <ErrorCard data-testid="error-card">
      <ErrorMessage>
        <T type="standard" id="not_available" />
      </ErrorMessage>
    </ErrorCard>
  );
}

SongCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string,
    collectionName: PropTypes.string,
    previewUrl: PropTypes.string,
    collectionPrice: PropTypes.string,
    trackPrice: PropTypes.string,
    releaseDate: PropTypes.string
  })
};

export default memo(SongCard);
