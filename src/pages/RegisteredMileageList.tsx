import React from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {useGetSwMileageList} from "@/feature/queries/swMileage.queries";
import LoadingBox from "@/components/LoadingBox";

const RegisteredMileageList = () => {

  const {data, isFetching} = useGetSwMileageList({})
  console.log(data)
  console.log(isFetching)

  return (
    <Wrapper direction={'column'}>
      <FormWrapper title={'내 마일리지 신청 내역'}>
        {isFetching ?
          <LoadingBox height={'100px'}/> :
          <div>asd</div>
        }
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisteredMileageList;
