import {useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import FormWrapper from "@/components/FormWrapper";
import { useGetSwMileageTokenRanking } from '@/feature/queries/swMileageTokens.queries';
import useSwMileageTokenStore from '@/store/global/useSwMileageTokenStore';

const Rank = () => {
  const { swMileageToken } = useSwMileageTokenStore((state) => state);
  const swMileageTokenId = swMileageToken?.sw_mileage_token_id || 0;

  const itemsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = currentPage * itemsPerPage;

  // API 호출
  const { data: rankingData = [] } = useGetSwMileageTokenRanking({
    params: {
      from,
      to,
    },
    body: {
      swMileageTokenId,
    },
  });

  // 총 페이지 수
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);

  // 현재 페이지의 항목 계산
  const currentItems = rankingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <LVStack w={'100%'} spacing={'20px'}>
      <Wrapper>
        <LVStack w={'100%'}>
          <FormWrapper
            title={'마일리지 랭킹'}
            description='누적 마일리지 순위'
          >
             <Table >
            <Thead>
              <Tr>
                <Th>순위</Th>
                <Th>이름</Th>
                <Th>포인트</Th>
                <Th>학번</Th>
                <Th>학부</Th>
              </Tr>
            </Thead>
            <Tbody>
            {currentItems.map((item: any) => (
                <Tr key={item.rank}>
                  <Td>{item.rank}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.balance}</Td>
                  <Td>{item.id}</Td>
                  <Td>{item.department}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </FormWrapper>
          <Box w={'100%'}>
          <Center mt={4} mb={4}>
            <ButtonGroup spacing={2}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                이전
              </Button>

              {getPageNumbers().map((num) => (
                <Button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  colorScheme={currentPage === num ? 'teal' : 'gray'}
                >
                  {num}
                </Button>
              ))}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              >
                다음
              </Button>
            </ButtonGroup>
          </Center>
          </Box>
        </LVStack>
      </Wrapper>
    </LVStack>

  );
};

export default Rank;
