import {Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/react";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import {useEffect, useState} from "react";
import {getLocalStorageData, removeLocalStorageData, setLocalStorageData} from "@/utils/webStorage.utils";
import {useRefresh} from "@/api/auth/quries";
import {getToday} from "@/utils/dayjs.utils";
import {TokenType} from "@/store/types";
import useStudentStore from "@/store/global/useStudentStore";
import LoadingBox from "@/components/LoadingBox";
import MainLayout from "@/components/layout/MainLayout";
import RegisterMileage from "@/pages/RegisterMileage";

const adminPK = '0x614c600e5499ebc302a6c93a421ca03d5ddf7365c7a3017bb69feabaa3abd5e5'
const adminaddress = '0x791F375676F47A8D599832646b4E7A67eC844348'
const ca = '0x8913f9091A5f3e782a4349735110699e4Fb213d9'

const RootRouter = () => {
  const navigate = useNavigate()
  const {setStudent} = useStudentStore((state) => state)
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true)

  const {mutate, isPending} = useRefresh({
    onSuccessFn: (data) => {
      const {tokens} = data;
      const refreshToken = tokens[TokenType.REFRESH]
      setLocalStorageData('refresh-token', refreshToken.token);
      setLocalStorageData('refresh-expires', refreshToken.expires);
      setStudent(data);
      setIsLoading(false)
      navigate('/')
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
    removeLocalStorageData('refresh-token');
    removeLocalStorageData('refresh-expires');
    setIsLoading(false)
    navigate('/sign-in');
  }

  const hasAccess = async () => {
    const refreshToken = getLocalStorageData('refresh-token')
    if(!refreshToken) {
      handleInvalidRefreshToken()
      return;
    }
    const refreshExpires = getLocalStorageData('refresh-expires')
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

  if(isPending) {
    return <LoadingBox height={'100%'}/>
  }

  return (
    <Routes>
      <Route element={<Init/>}>
        <Route path="sign-in" element={<SignIn/>}/>
        <Route path="sign-up" element={<SignUp/>}/>
      </Route>
      <Route element={<Auth/>}>
        <Route element={<MainLayout/>}>
          <Route index element={<RegisterMileage/>}/>

        </Route>
      </Route>

    </Routes>
  );
};

export default RootRouter;

const Init = () => {
  //로그인이 완료된 사용자는 진입 할 수 없음.
  const {student} = useStudentStore((state) => state)
  if(student.student.student_id !== '') {
    return <Navigate to={'/'}/>
  }
  return <Outlet/>
}

const Auth = () => {
  const {student} = useStudentStore((state) => state)
  if(!student) {
    return <Navigate to={'/sign-in'}/>
  }
  return <Outlet/>
}

// const Test = () => {
//
//   console.log(provider)
//   console.log(caver)
//   // caver.klay.accounts.wallet.add(
//   //   adminPK,
//   //   adminaddress
//   // );
//
//   caver.wallet.isExisted(adminaddress)
//
//
//   const onConnectKaikas = async() => {
//     const result = await provider.enable();
//     caver.klay.accounts.wallet.add(
//       adminPK,
//       adminaddress
//     );
//     console.log(result)
//   }
//
//   const onApproval = async () => {
//     const sender = provider.selectedAddress;
//     console.log(sender)
//     caver.wallet.getKeyring(adminaddress)
//     const kip7 = caver.kct.kip7.create(ca)
//     // const burnFrom = kip7.methods.burnFrom('0x2ef9EdEDDD79Ab2df19Bd9BFC99Da75af3890e9f', caver.utils.toPeb('3', 'KLAY')).encodeABI()
//     // const result = await provider.request({
//     //   method: 'klay_sendTransaction',
//     //   params: [
//     //     {
//     //       from: sender,
//     //       to: ca,
//     //       data: burnFrom,
//     //       gas: '1000000',
//     //       value: '0',
//     //     }
//     //   ]
//     // })
//     // const {rawTransaction: senderRawTransaction} = (await caver.klay.sendTransaction(
//     //   {
//     //     from: sender,
//     //     to: ca,
//     //     data: burnFrom,
//     //     gas: 1000000,
//     //     value: '0',
//     //   }
//     // )) as any
//     // const result = await kip7.allowance(sender, adminaddress)
//     // console.log(caver.utils.convertFromPeb(result, 'KLAY'))
//     const approveData = kip7.methods.approve(adminaddress, caver.utils.toPeb('1000', 'KLAY')).encodeABI()
//     console.log(approveData)
//     const {rawTransaction: senderRawTransaction} = (await caver.klay.signTransaction(
//       {
//         type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
//         from: sender,
//         to: ca,
//         data: approveData,
//         gas: 1000000,
//         value: '0',
//       }
//     )) as any
//
//
//     console.log(caver)
//
//     const { transactionHash: txHash } = await caver.klay.sendTransaction({
//       senderRawTransaction: senderRawTransaction,
//       feePayer: adminaddress,
//     });
//     console.log(txHash)
//     console.log(senderRawTransaction)
//     console.log(approveData)
//
//   }
//
//   return (
//    <>
//      <Button onClick={() => onConnectKaikas()}>
//        연결
//      </Button>
//      <Button onClick={() => onApproval()}>
//        서명
//      </Button>
//    </>
//   )
// }
