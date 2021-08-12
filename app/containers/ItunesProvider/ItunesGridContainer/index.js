import React, { useEffect, useState, memo } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';
import { selectItunesProvider, selectSongName, selectSongs, selectError } from '../selectors';
import { Row, Card, Input } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import ItunesProviderSaga from '../saga';
import { ItunesProviderCreators } from '../reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import SongCard from '@app/components/SongCard/index';

const { Search } = Input;

const Songs = styled.div`
  max-width: ${(props) => props.maxwidth}px;
  padding: ${(props) => props.padding}px;
  margin: auto;
`;

const CustomCard = styled(Card)`
  && {
    margin: 20px auto;
    max-width: 500px;
    padding: ${(props) => props.padding}px;
  }
`;

const ItunesGridContainer = ({ dispatchSongName, dispatchClearSongs, songs, error, songName, maxwidth, padding }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(songs, 'results', null);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songs]);

  const handleOnChange = (sName) => {
    if (sName) {
      dispatchSongName(sName);
      setLoading(true);
    } else {
      dispatchClearSongs();
      setLoading(false);
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSongs = () => {
    if (!songs) {
      return <div></div>;
    }
    if (songs.results) {
      const songsGrid = songs.results.map((song, songIdx) => {
        return <SongCard song={song} key={songIdx} />;
      });
      return (
        <Row gutter={[16, 16]} data-testid="grid">
          {songsGrid}
        </Row>
      );
    }
    return <div></div>;
  };

  return (
    <Songs maxwidth={maxwidth} padding={padding}>
      <div>
        <CustomCard
          title={<FormattedMessage id="search-bar" defaultMessage="Search for Songs" />}
          maxwidth={maxwidth}
          padding={padding}
        >
          <Search
            data-testid="search-bar"
            type="text"
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </div>
      {renderSongs()}
    </Songs>
  );
};

ItunesGridContainer.propTypes = {
  dispatchSongName: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  songs: PropTypes.object,
  error: PropTypes.string,
  songName: PropTypes.string,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

export const mapStateToProps = createStructuredSelector({
  ItunesProvider: selectItunesProvider(),
  songs: selectSongs(),
  error: selectError(),
  songName: selectSongName()
});

export const mapDispatchToProps = (dispatch) => {
  const { requestSongs, clearSongs } = ItunesProviderCreators;
  return {
    dispatchSongName: (songName) => dispatch(requestSongs(songName)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'ItunesProvider', saga: ItunesProviderSaga })
)(ItunesGridContainer);

export const ItunesGridContainerTest = compose(injectIntl)(ItunesGridContainer);
