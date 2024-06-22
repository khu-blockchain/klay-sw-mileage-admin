import React from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {Grid} from '@chakra-ui/react';
import BasicInput from "@/components/atom/BasicInput";
import BasicTextarea from "@/components/atom/BasicTextarea";
import WithLabel from "@/components/WithLabel";

const CreateSwMileageToken = () => {
  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'SW 마일리지 토큰 생성'}
        description={'하단 정보를 입력하여 SW 마일리지 토큰으로 사용할 KIP-7 토큰을 생성하세요.'}>
        <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          <WithLabel label={'이름'} description={'토큰의 이름입니다.'}>
            <BasicInput placeholder={'최대 30자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'심볼'} description={'토큰의 심볼입니다.'}>
            <BasicInput placeholder={'최대 10자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'설명'} description={'토큰에 대한 설명입니다.'}>
            <BasicTextarea placeholder={'최대 50자까지 입력 가능합니다.'} resize={'none'}/>
          </WithLabel>
        </Grid>
      </FormWrapper>
    </Wrapper>
  );
};

export default CreateSwMileageToken;




