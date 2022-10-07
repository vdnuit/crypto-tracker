import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import App from "./App";

const queryClient = new QueryClient();
// queryClient(캐시를 관리하기 위한 인스턴스) 만들기. 간단히 해당 이름으로 리액트 쿼리를 사용할 것.

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <ThemeProvider theme={theme}> */}
          <App />
          {/* ThemeProvider 안에 존재하는 App은 Theme에 접근할 수 있다. 지금은 편집을 위해 App 안으로 옮겨놓은 상태*/}
        {/* </ThemeProvider> */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
