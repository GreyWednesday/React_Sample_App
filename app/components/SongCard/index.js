import React, { memo } from 'react';
import { Col } from 'antd';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '@app/themes/colors';
import { styles } from '@app/themes/index';

const Card = styled.div`
  && {
    display: grid;
    margin: 1.25em auto;
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

  audio {
    grid-column: span 2;
  }
`;

const Artwork = styled.img`
  border-radius: 10px;
  margin: 10px auto;
`;

const Title = styled.h3`
  margin: auto;
`;

const Collection = styled.h5`
  margin: auto;
`;

function SongCard({ song }) {
  return (
    <Col span={8} data-testid="song-card">
      <a href={`/tracks/${song ? song.trackId : ''}/`} data-testid="card-link">
        <Card>
          <Artwork src={song ? song.artworkUrl100 : ''} />
          <Title>{song ? song.trackName : ''}</Title>
          <Title>Collection Name : </Title>
          <Collection>
            {song ? `${song.collectionName ? song.collectionName : 'No Information available'}` : ''}
          </Collection>
          <audio controls>
            <source src={song ? song.previewUrl : ''} type="audio/mpeg" />
          </audio>
        </Card>
      </a>
    </Col>
  );
}

SongCard.propTypes = {
  song: PropTypes.object
};

export default memo(SongCard);
