import React, { memo } from 'react';
import { Col, Popover, Button } from 'antd';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import T from '@components/T';
import { colors, styles } from '@app/themes';
import If from '../If/index';

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

function SongCard({ song }) {
  const checkAvailability = (variable) => (
    <If condition={variable} otherwise={<T type="standard" id="not_available" />}>
      {variable}
    </If>
  );

  const descContent = () => {
    return (
      <div>
        <p>Collection Price : {checkAvailability(song?.collectionPrice)}</p>
        <p>Track Price : {checkAvailability(song?.trackPrice)}</p>
        <p>Release Date : {checkAvailability(song?.releaseDate)}</p>
      </div>
    );
  };

  return (
    <Col span={8} data-testid="song-card">
      <a href={`/tracks/${song ? song.trackId : '/NotFound'}/`} data-testid="card-link">
        <Card>
          <Artwork src={song ? song.artworkUrl100 : 'react-template.png'} />
          <Title>{checkAvailability(song?.trackName)}</Title>
          <Title>
            <T type="collectionName" id="collection_name" />
          </Title>
          <Collection>{checkAvailability(song?.collectionName)}</Collection>
          <Audio controls>
            <source src={song ? song.previewUrl : '/demo'} type="audio/mpeg" />
          </Audio>
          <DescriptionWrapper>
            <Popover content={descContent} title="Description">
              <Button type="primary" style={{ background: `${colors.secondary}`, border: '0em' }}>
                <T type="standard" id="more_details" />
              </Button>
            </Popover>
          </DescriptionWrapper>
        </Card>
      </a>
    </Col>
  );
}

SongCard.propTypes = {
  song: PropTypes.object
};

export default memo(SongCard);
