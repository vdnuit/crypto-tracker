import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";
import { appendFile } from "fs";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    // 카드 끝 부분까지 선택 + 호버 슬로우 효과 
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
// 코인파프리카에서 가져오는 데이터의 자료형 명명

interface ICoinsProps {}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
// fetchCoins가 로딩 중이면 리액트 쿼리가 알려줌. fetcher이 끝나면 json을 data에 넣는다.
  // 아래의 fetcher function, API와 관련된 모든 코드를 api.ts로 이동시킴.
  /* useQuery를 사용하지 않았을 때
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  //State가 CoinInterface로 구성된 배열임을 알려준다.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      //파프리카에서 데이터를 불러온다 처음 한번만 실행된다.
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
    //괄호가 하나 더 붙은 이유는 즉시 실행하기 위함.
  }, []);
  */
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {/* coins 배열의 각각의 코인에 대해 id를 key로 name 가져오기 + 링크 걸어주기*/}
          {/* {coins.map((coin) => ( */}
          {data?.slice(0, 100).map((coin) => (
            // useQuery 사용 시엔 json이 담긴 data를 전과 같이 100개만 슬라이스 해주어야 한다.
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
                //URL을 통하지 않고 Object를 사용하여 데이터 전달.
              >
                <Img
                  src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name .toLowerCase().split(" ").join("-")}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;