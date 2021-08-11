import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { fetchSongs } from '../itunesApi';

describe('ItunesAPI tests', () => {
  const songName = 'hey';
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
});
