import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const fetchSongs = (songName) => itunesApi.get(`search?term=${songName.replace(/ /g, '+')}`);
export const fetchSongForDetail = (trackId) => itunesApi.get(`lookup?id=${trackId}`);
