import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const { Search } = Input;

const Songs = styled.div`
  max-width: 2 * ${(props) => props.maxwidth}px;
  padding: ${(props) => props.padding}px;
  margin: auto;
`;

const SearchList = styled.div``;

const CustomCard = styled(Card)`
  && {
    margin: 20px auto;
    max-width: ${(props) => props.maxwidth}px;
    padding: ${(props) => props.padding}px;
  }
`;

const ItunesGridContainer = ({ maxwidth, padding, dispatchSongName, songs }) => {
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
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  return (
    <Songs maxwidth={maxwidth} padding={padding}>
      <SearchList>
        <CustomCard title="Search for Songs" maxwidth={maxwidth} padding={padding}>
          <Search
            data-testid="search-bar"
            defaultValue=""
            type="text"
            onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </SearchList>
    </Songs>
  );
};

ItunesGridContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  dispatchSongName: PropTypes.func,
  songs: PropTypes.object
};

export default ItunesGridContainer;
