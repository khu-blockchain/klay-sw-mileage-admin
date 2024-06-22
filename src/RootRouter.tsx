import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import SignIn from "@/pages/SignIn";
import {useEffect, useState} from "react";
import {getLocalStorageData, removeLocalStorageData, setLocalStorageData} from "@/utils/webStorage.utils";
import {getToday} from "@/utils/dayjs.utils";
import {TokenType} from "@/store/types";
import useAdminStore from "@/store/global/useAdminStore";
import LoadingBox from "@/components/LoadingBox";
import MainLayout from "@/components/layout/MainLayout";
import SwMileageInfo from "@/pages/SwMileageInfo";
import {useRefresh} from "@/feature/queries/auth.queries";
import {useGetActivityField} from "@/feature/queries/activityField.queries";
import {useGetActivateSwMileageToken} from "@/feature/queries/swMileageTokens.queries";
import ManageSwMileageToken from "@/pages/ManageSwMileageToken";
import CreateSwMileageToken from "@/pages/CreateSwMileageToken";

const RootRouter = () => {
  const navigate = useNavigate()
  const {setAdmin} = useAdminStore((state) => state)
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true)

  const {mutate} = useRefresh({
    onSuccessFn: (data) => {
      const {tokens} = data;
      const refreshToken = tokens[TokenType.REFRESH]
      setLocalStorageData('admin-refresh-token', refreshToken.token);
      setLocalStorageData('admin-refresh-expires', refreshToken.expires);
      setAdmin(data);
      setIsLoading(false)
    },
    onErrorFn  : (error: any) => {
      toast({
        title     : `${error.response.data.code}:: 사용자 정보를 불러오지 못하였습니다.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      setIsLoading(false)
      handleInvalidRefreshToken();
    }
  });

  const handleInvalidRefreshToken = () => {
    removeLocalStorageData('admin-refresh-token');
    removeLocalStorageData('admin-refresh-expires');
    setIsLoading(false)
    navigate('/sign-in');
  }

  const hasAccess = async () => {
    const refreshToken = getLocalStorageData('admin-refresh-token')
    if(!refreshToken) {
      handleInvalidRefreshToken()
      return;
    }
    const refreshExpires = getLocalStorageData('admin-refresh-expires')
    if(getToday().isAfter(refreshExpires) || !refreshExpires) {
      // 만료됨
      handleInvalidRefreshToken()
      return;
    }
    await mutate({
      body: {refreshToken}
    })
  }

  useEffect(() => {
    hasAccess()
  }, [])

  if(isLoading) {
    return <LoadingBox height={'100%'}/>
  }

  return (
    <Routes>
      <Route element={<Init/>}>
        <Route path="sign-in" element={<SignIn/>}/>
      </Route>
      <Route element={<Auth/>}>
        <Route element={<MainLayout/>}>
          <Route index path={'/'} element={<SwMileageInfo/>}/>
          <Route path={'token/*'}>
            <Route path={'manage'} element={<ManageSwMileageToken/>}/>
            <Route path={'create'} element={<CreateSwMileageToken/>}/>
          </Route>
          <Route path={'list'} element={<SwMileageInfo/>}/>
          <Route path={'mint/*'}>
            <Route path={'execute'} element={<SwMileageInfo/>}/>
            <Route path={'history'} element={<SwMileageInfo/>}/>
          </Route>
          <Route path={'burn/*'}>
            <Route path={'execute'} element={<SwMileageInfo/>}/>
            <Route path={'history'} element={<SwMileageInfo/>}/>
          </Route>
        </Route>
      </Route>

    </Routes>
  );
};

export default RootRouter;

const Init = () => {
  //로그인이 완료된 사용자는 진입 할 수 없음.
  const {getAdmin} = useAdminStore((state) => state)
  if(getAdmin().admin_id !== -1) {
    return <Navigate to={'/'}/>
  }
  return <Outlet/>
}

const Auth = () => {
  const {getAdmin} = useAdminStore((state) => state)
  useGetActivityField({});
  useGetActivateSwMileageToken({})
  if(getAdmin().admin_id === -1) {
    return <Navigate to={'/sign-in'}/>
  }
  return <Outlet/>
}
