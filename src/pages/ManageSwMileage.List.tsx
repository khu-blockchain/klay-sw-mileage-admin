import React, {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {useGetSWMileageList} from "@/feature/queries/swMileage.queries";
import {SwMileage} from "@/store/types";
import {parseToFormattedDate} from "@/utils/dayjs.utils";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import StatusLabel from "@/components/StatusLabel";
import {Text} from "@chakra-ui/react";
import {PaginationTable} from "@/components/Pagenation";

const ManageSwMileageList = () => {

  const {data} = useGetSWMileageList({query: {}});

  const [swMileageFormList, setSwMileageFormList] = useState<Array<SwMileage>>([])

  const header = [
    {
      key  : 'created_at',
      label: '신청 날짜'
    },
    {
      key  : 'name',
      label: '이름'
    },
    {
      key  : 'department',
      label: '학과'
    },
    {
      key  : 'student_id',
      label: '학번'
    },
    {
      key  : 'academic_field',
      label: '활동 분야'
    },
    {
      key  : 'extracurricular_activity',
      label: '비교과 활동'
    },
    {
      key  : 'status',
      label: '상태'
    }
  ]

  const tableData = (data: Array<SwMileage>) => {
    return data.map(swMileage => {
      return {
        id                      : swMileage.sw_mileage_id,
        name                    : <Text>{swMileage.name}</Text>,
        student_id              : <Text>{swMileage.student_id}</Text>,
        department              : <Text>{swMileage.department}</Text>,
        created_at              : <Text>{parseToFormattedDate(swMileage.created_at)}</Text>,
        academic_field           : <Text>{ACTIVITY_CATEGORIES[swMileage.academic_field]}</Text>,
        extracurricular_activity: <Text>{swMileage.extracurricular_activity}</Text>,
        status                  : <StatusLabel status={swMileage.status}/>
      }
    })
  }

  useEffect(() => {
    if(data) {
      setSwMileageFormList(data)
    }
  }, [data])

  return (
    <Wrapper direction={'column'}>
      <FormWrapper title={'SW 마일리지 신청 목록'}>
        <PaginationTable onClickRow={(data) => {
          console.log(data)
        }} headers={header} data={tableData(swMileageFormList)}/>
      </FormWrapper>
    </Wrapper>

  );
};

export default ManageSwMileageList;
