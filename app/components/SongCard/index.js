import React, { memo } from 'react';
import { Col } from 'antd';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  && {
    display: grid;
    margin: 20px auto;
    background: #f1f3f4;
    border-radius: 10px;
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
    border-radius: 20px;
    transform: scale(1.1);
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
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

function SongCard({ song }) {
  return (
    <Col span={8} data-testid="song-card">
      <a href={`/tracks/${song ? song.trackId : ''}/`} data-testid="card-link">
        <Card>
          <Artwork src={song ? song.artworkUrl100 : ''} />
          <Title>{song ? song.trackName : ''}</Title>
          <audio controls>
            <source src={song ? song.previewUrl : ''} type="audio/mpeg" />
          </audio>
        </Card>
      </a>
    </Col>
  );
}

SongCard.propTypes = {
  song: PropTypes.Object
};

export default memo(SongCard);
