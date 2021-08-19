import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { fetchSongForDetail, fetchSongs } from '../itunesApi';

describe('ItunesAPI tests', () => {
  const songName = 'hey';
  const trackId = '1469577741';
  it('should make the api call to "/search?term="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ songName }]
      }
    ];
    mock.onGet(`/search?term=${songName}`).reply(200, data);
    const res = await fetchSongs(songName);
    expect(res.data).toEqual(data);
  });

  it('should make the api call to "/lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ songName }]
      }
    ];
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const res = await fetchSongForDetail(trackId);
    expect(res.data).toEqual(data);
  });
});
