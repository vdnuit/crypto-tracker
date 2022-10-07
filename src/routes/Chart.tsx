import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
// Chart 컴포넌트가 있으니까 ApexCHart로
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  //비트코인 시장의 하루
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  //왜 <IHistorical[]>인가?: 하루에 해당하는 것의 배열이기 때문/10초마다 refetch
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          //series: 데이터를 보내는 props. data는 배열이어야한다. , 찍고 여러가지 차트를 한 번에 표현할 수도 있다.
          height={350}
          series={[
            {
              // name: "Price",
              //array를 만들기 위해 map() 함수 사용.
              // data: data?.map((price => price.close)) ?? [],
              data: data?.map((price) => {
                return{
                  x: new Date(price.time_close),
                  y: [price.open, price.high, price.low, price.close]
                }
              }) ?? [],
              // data: [{
              //   x: new Date(1538778600000),
              //   y: [6629.81, 6650.5, 6623.04, 6633.33]
              // },
              // {
              //   x: new Date(1538780400000),
              //   y: [6632.01, 6643.59, 6620, 6630.11]
              // },]??[]
            }
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left'
            },
            xaxis: {
              type: 'datetime'
            },
            yaxis: {
              tooltip: {
                enabled: true
              }
            }
          }}
          // options={{
          //   theme: {
          //     mode: isDark ? "dark" : "light",
          //   },
          //   chart: {
          //     height: 300,
          //     width: 500,
          //     toolbar: {
          //       show: false,
          //     },
          //     background: "transparent",
          //   },
          //   grid: { show: false },
          //   stroke: {
          //     curve: "smooth",
          //     width: 4,
          //   },
          //   yaxis: {
          //     show: false,
          //   },
          //   xaxis: {
          //     axisBorder: { show: false },
          //     axisTicks: { show: false },
          //     labels: { show: false },
          //     type: "datetime",
          //     categories: data?.map((price) => price.time_close),
          //   },
          //   fill: {
          //     type: "gradient",
          //     gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          //   },
          //   //차트를 예쁘게 만들기 위한 노력들
          //   //stops 같은 경우는 그라데이션을 천천히 진행되게 한다.
          //   colors: ["#0fbcf9"],
          //   //tooltip은 커서가 가는 곳에 뜨는 것. 반올림 해주었다.
          //   tooltip: {
          //     y: {
          //       formatter: (value) => `$${value.toFixed(2)}`,
          //     },
          //   },
          //   //나머지 props들은 apexCharts 문서에서 확인하면 된다.
          // }}
        />
      )}
    </div>
  );
}

export default Chart;