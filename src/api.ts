const BASE_URL = `https://api.coinpaprika.com/v1`;
const COIN_URL = `https://ohlcv-api.nomadcoders.workers.dev`;
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  //floor: 버림, ceil: 올림
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  // 시작/끝 날짜데이터를 보내고 받아올 때
  return fetch(
    `${COIN_URL}?coinId=${coinId}`
  ).then((response) => response.json());
}
//   fetcher function은 fetch promise를 리턴해야 한다.
// 함수가 URL을 부르고 URL이 json 리턴