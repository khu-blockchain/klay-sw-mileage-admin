import React, {useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {Flex, Grid, useToast} from '@chakra-ui/react';
import BasicInput from "@/components/atom/BasicInput";
import BasicTextarea from "@/components/atom/BasicTextarea";
import WithLabel from "@/components/WithLabel";
import {useCreateMileageToken, useGetContractCode, useGetActivateSwMileageToken, useAddContractAdmin} from "@/feature/queries/swMileageTokens.queries";
import BasicButton from "@/components/atom/BasicButton";
import useAble from "@/hooks/useAble";
import {useNavigate} from "react-router-dom";
import { caver, provider } from '@/App';
import useAdminStore from '@/store/global/useAdminStore';

const SwMileageTokenCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [abi, setAbi] = useState<any>('')
  const [rlpEncodingString, setRlpEcodingString] = useState<string>('')
  const {getAdmin} = useAdminStore((state) => state)
  let swMileageTokenId;

  const isAble = useAble([
    name !== '',
    symbol !== '',
    description !== ''
  ])

  const {mutate: addAdminMutate} = useAddContractAdmin({
    onSuccessFn: async (res) => {
      toast({
        title: "관리자 권한이 성공적으로 추가되었습니다.",
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate('/token/manage');
    },
    onErrorFn: (error) => {
      console.error("Error with add admin transaction:", error);
      toast({
        title: `$관리자 권한 추가 중 오류가 발생했습니다.`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  });
  
  const {mutate, isPending} = useCreateMileageToken({
    onSuccessFn: async (res) => {
      const { contract_address, sw_mileage_token_id } = res;
      console.log("successful deploy contract")
      // 첫 번째 트랜잭션(배포) 성공
      toast({
        title: `SW 마일리지 토큰이 생성되었습니다.`,
        status: 'success',
        isClosable: true,
        position: "top",
      });

      try {
        // addAdmin 트랜잭션 처리 로직
        console.log("add admin")
        const contract = new caver.contract(abi, contract_address);
        console.log(`process.env.FEE_PAYER_ADDRESS : ${"0xbca1e62d24749e385f267AB0628A61E203595014"}`)
        const addAdminData = contract.methods.addAdmin("0xbca1e62d24749e385f267AB0628A61E203595014").encodeABI();

        const addAdminTx = {
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: provider.selectedAddress,
          to: contract_address,
          data: addAdminData,
          gas: '0x4C4B40',
          value: '0x0'
        }

        console.log(3)
        const { rawTransaction } = await provider.request({
          method: "klay_signTransaction",
          params: [addAdminTx]
        })

        // api 수행
        console.log(`rawTransaction : ${rawTransaction}`)
        console.log(`rawTransaction : ${typeof(rawTransaction)}`)

        console.log("do add admin mutate")
        await addAdminMutate({
          params: {
            swMileageTokenId: Number(sw_mileage_token_id)
          },
          body: {
            rawTransaction: rawTransaction,
          }
        })

        // 두 번째 트랜잭션(addAdmin) 성공
        toast({
          title: `관리자 권한이 설정되었습니다.`,
          status: 'success',
          isClosable: true,
          position: "top",
        });

        navigate('/token/manage');
      } catch (error) {
        toast({
          title: "관리자 권한 설정 중 오류가 발생했습니다.",
          status: 'error',
          isClosable: true,
          position: "top",
        });
      }
    },
    onErrorFn: (error: any) => {
      toast({
        title: `${error.response?.data?.code || 'ERROR'}: 토큰 생성 중 문제가 발생했습니다.`,
        status: 'error',
        isClosable: true,
        position: "top",
      });
    }
});

  const {data} = useGetContractCode('');

  const createToken = async() => {
    try {
      const { abi, bytecode } = data;

      setAbi(abi);

      const createdContract = caver.contract.create(abi);
      console.log("create contract")
      const deployData = createdContract.deploy({
        data: bytecode,
        arguments: [name, symbol]
      }).encodeABI();

      const deployTx = {
        type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
        from: window.klaytn.selectedAddress,
        data: deployData,
        gas: '0x4C4B40',
        value: '0x0'
      };

      // 트랜잭션 서명 (Kaikas 지갑에서 처리)
      console.log("deploy raw transaction")
      const { rawTransaction: deployRawTransaction } = await provider.request({
        method: "klay_signTransaction",
        params: [deployTx]
      });

      setRlpEcodingString(deployRawTransaction);

      console.log(`rlpEncodingString : ${deployRawTransaction}`)

      await mutate({
        body: {
          swMileageTokenName: name,
          symbol,
          description,
          imageUrl: "test",
          rlpEncodingString: deployRawTransaction
        }
      })

    } catch (error) {
      console.error("Error signing deploy transaction:", error);
      toast({
        title: "트랜잭션 서명 중 오류가 발생했습니다.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  }


  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'SW 마일리지 토큰 생성'}
        description={'하단 정보를 입력하여 SW 마일리지 토큰으로 사용할 KIP-7 토큰을 생성하세요.'}>
        <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          <WithLabel label={'이름'} description={'토큰의 이름입니다.'}>
            <BasicInput
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              placeholder={'최대 20자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'심볼'} description={'토큰의 심볼입니다.'}>
            <BasicInput
              value={symbol}
              maxLength={10}
              onChange={e => setSymbol(e.target.value)}
              placeholder={'최대 10자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'설명'} description={'토큰에 대한 설명입니다.'}>
            <BasicTextarea
              value={description}
              maxLength={80}
              onChange={e => setDescription(e.target.value)}
              placeholder={'최대 80자까지 입력 가능합니다.'} resize={'none'}/>
          </WithLabel>
        </Grid>
        <Flex w={'100%'} justify={'flex-end'} gap={'10px'}>
          <BasicButton isLoading={isPending} onClick={createToken} isDisabled={!isAble}>
            생성하기
          </BasicButton>
        </Flex>
      </FormWrapper>
    </Wrapper>
  );
};

export default SwMileageTokenCreate;




