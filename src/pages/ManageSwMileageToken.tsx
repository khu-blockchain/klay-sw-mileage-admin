import React, {ReactNode} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {getToday, parseToFormattedDate} from "@/utils/dayjs.utils";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import LVStack from "@/components/atom/LVStack";
import {Flex, Grid, HStack, Text} from "@chakra-ui/react";
import LoadingBox from "@/components/LoadingBox";
import TokenImage from "@/components/atom/TokenImage";
import DataField from '@/components/DataField';

const ManageSwMileageToken = () => {
  const {swMileageToken} = useSwMileageTokenStore(state => state);

  console.log(swMileageToken)
  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'활성화 토큰 정보'}
        description={`${parseToFormattedDate(getToday().toString())} 기준 활성화 상태인 토큰 정보입니다.`}
      >
        {!swMileageToken ?
          <Flex>
            활성화 상태인 토큰이 존재하지 않습니다.
          </Flex>:
          <LVStack w={'100%'} spacing={'30px'}>
            <HStack align={'center'} spacing={'10px'}>
              <TokenImage
                src={swMileageToken.sw_mileage_token_image_url}
                p={'6px'}
                w={'60px'}
                h={'60px'}
              />
              <Text color={'var(--chakra-colors-gray-500)'} fontSize={'20px'} fontWeight={600}>{swMileageToken.sw_mileage_token_symbol}</Text>
            </HStack>
            <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} rowGap={'30px'} columnGap={'40px'}>
              <DataField label={'이름'}>
                <Text>{swMileageToken.sw_mileage_token_name}</Text>
              </DataField>
              <DataField label={'컨트랙트 주소'}>
                <Text>{swMileageToken.contract_address}</Text>
              </DataField>
              <DataField label={'설명'}>
                <Text w={'360px'} whiteSpace={'pre-wrap'}>{swMileageToken.description}</Text>
              </DataField>
              <DataField label={'Decimals'}>
                <Text>{swMileageToken.sw_mileage_token_decimals}</Text>
              </DataField>
              <DataField label={'생성 일시'}>
                <Text>{swMileageToken.created_at}</Text>
              </DataField>
              <DataField label={'심볼'}>
                <Text>{swMileageToken.sw_mileage_token_symbol}</Text>
              </DataField>
            </Grid>
          </LVStack>
        }
      </FormWrapper>
      <FormWrapper title={'배포된 토큰 목록'}>
        <div>ㅁㄴㅇ</div>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManageSwMileageToken;

