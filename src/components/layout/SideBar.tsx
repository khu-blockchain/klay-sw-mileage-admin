import {VStack, Image, Flex, HStack, Box, Text} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";
import {useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {MenuItem, MENUS} from "@/assets/constants/menu.data";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";


const SideBar = () => {
  return (
    <VStack bgColor={'var(--side-bar-color)'} w={'100%'} spacing={'20px'}>
      <Flex w={'100%'} h={'100px'} justify={'center'} align={'center'}>
        <Image w={'190px'} objectFit={'cover'} src={'https://swedu.khu.ac.kr/images/logo_swedu_white.png'}/>
      </Flex>
      <LVStack w={'100%'}>
        {MENUS.map((menu, index) => <Menu key={index} menu={menu}/>)}
      </LVStack>
    </VStack>
  );
};

export default SideBar;

const Menu = ({menu}: {menu: MenuItem}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {swMileageToken} = useSwMileageTokenStore(state => state)

  const isSelected = useMemo(() => {
    return location.pathname.split('/')[1] === menu.path
  }, [location, menu])

  const Icon = menu.icon;

  const onClickMenu = () => {
    if(menu.type === 'route'){
      navigate(menu.path)
      return;
    }
    if(!swMileageToken){
      return;
    }
    window.open(`${menu.path}token/${swMileageToken.contract_address}?tabId=tokenHolder`)
  }

  return (
    <HStack cursor={'pointer'} w={'100%'} h={'56px'} spacing={'24px'} onClick={() => onClickMenu()}>
      <Box transition={'var(--default-transition)'} w={'3px'} h={'100%'} bgColor={isSelected ? '#DDE2FF' : 'transparent'}/>
      <HStack spacing={'10px'}>
        <Icon style={{transition: 'var(--default-transition)'}} color={isSelected ? '#DDE2FF' : '#9FA2B4'}/>
        <Text transition={'var(--default-transition)'} fontWeight={500} color={isSelected ? '#DDE2FF' : '#9FA2B4'}>{menu.label}</Text>
      </HStack>
    </HStack>
  )
}
