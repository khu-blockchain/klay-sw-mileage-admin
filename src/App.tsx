import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Global} from "@emotion/react";
import Caver from "caver-js";
import {BrowserRouter} from "react-router-dom";
import {GlobalStyle} from "@/styles/_reset";
import RootRouter from "@/RootRouter";
import {useEffect} from "react";
import useProviderStore from "@/store/global/useProviderStore";
const queryClient = new QueryClient();

function App() {
  const {setProvider, setCaver} = useProviderStore((state) => state)

  useEffect(() => {
    const provider = window?.klaytn;
    if(provider){
      setProvider(provider)
      const caver = new Caver(provider);
      setCaver(caver)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={GlobalStyle}/>
        <RootRouter/>
      </BrowserRouter>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
