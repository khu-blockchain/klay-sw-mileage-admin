import {VStack, Image, Flex, HStack, Text} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";
import {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Menu, MENU, SubMenu} from "@/assets/constants/menu.data";
import SliderContainer from "@/components/SliderContainer";
import { ChevronRight } from 'lucide-react';

const TAB_HEIGHT = 34 + 12;


const parseLocationRoot = (url: string) => {
  const MENU_ROOT_INDEX = 1;
  const SUB_MENU_ROOT_INDEX = 2;
  const locationArray = url.split("/");
  return {
    menuRoot: locationArray[MENU_ROOT_INDEX] ?? "",
    subMenuRoot: locationArray[SUB_MENU_ROOT_INDEX] ?? "",
  };
};

const SideBar = () => {
  return (
    <VStack bgColor={'var(--side-bar-color)'} w={'100%'} h={'100%'} overflow={'hidden'} spacing={0}>
      <Flex w={'100%'} h={'100px'} justify={'center'} align={'center'}>
        <Image w={'190px'} objectFit={'cover'} src={'https://swedu.khu.ac.kr/images/logo_swedu_white.png'}/>
      </Flex>
      <LVStack w={'100%'} overflow={'visible'} spacing={0}>
        {MENU.map((menu, index) => (
          <SideBar.Menu key={index} menu={menu}/>
        ))}
      </LVStack>
    </VStack>
  );
};

export default SideBar;

const SNBMenu = ({menu}: { menu: Menu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const parsedLocationRoot = useMemo(() => parseLocationRoot(location.pathname), [location])
  const isCurrentMenu = useMemo(() => parsedLocationRoot.menuRoot === menu.root, [menu, parsedLocationRoot])

  const MenuIcon = menu.icon;

  const [isOpen, setIsOpen] = useState(false);

  const currentHeight = useMemo(() => {
    if (!isOpen) return 0;
    return menu.subMenu.length * TAB_HEIGHT;
  }, [menu, isOpen]);

  const onClickMenu = () => {
    if (menu.subMenu.length === 0) {
      navigate(`/${menu.root}`);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isCurrentMenu);
  }, [location, isCurrentMenu]);

  return (
    <>
      <VStack borderTop={'1px solid var(--chakra-colors-gray-600)'} w={'100%'} bgColor={'transparent'} onClick={() => onClickMenu()} spacing={0}>
        <HStack w={'100%'} justify={'space-between'} align={'center'} p={'14px'} cursor={'pointer'} transition={'all 0.15s ease-in-out, margin-bottom 0s ease-in-out'}>
          <HStack align={'center'} spacing={'8px'}>
            <MenuIcon width={'20px'} color={'#ffffff'}/>
            <Text fontSize={'14px'} color={"#ffffff"}>{menu.name}</Text>
          </HStack>
          {menu.subMenu.length !== 0 && <ChevronRight size={'18px'} color={'#ffffff'} transform={isOpen ? 'rotate(90)' : 'rotate(0)'} style={{transition: 'all ease-in-out 0.15s'}}/>}
        </HStack>
        <SliderContainer currentHeight={currentHeight} isOpen={isOpen}>
          {menu.subMenu.map((subMenu, index) => (
            <SideBar.SubMenu key={index} menuRoot={menu.root} subMenu={subMenu}/>
          ))}
        </SliderContainer>
      </VStack>
    </>
  );
};

const SNBSubMenu = ({subMenu, menuRoot}: { subMenu: SubMenu; menuRoot: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSelected, setIsSelected] = useState(false);

  const subMenuStyle = useMemo(() => {
    return {
      color: isSelected ? "#DDE2FF" : "#a4a5a9",
    };
  }, [isSelected]);

  const onClickSubMenu = (e: any) => {
    // 이전 이벤트 막기 (setIsOpen)
    e.stopPropagation();
    // subMenu에 해당하는 라우터로 navigate
    navigate(`/${menuRoot}/${subMenu.root}`);
  };

  useEffect(() => {
    const parsedLocationRoot = parseLocationRoot(location.pathname);
    if (parsedLocationRoot.menuRoot === menuRoot && parsedLocationRoot.subMenuRoot === subMenu.root) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  }, [location]);

  return (
    <Flex onClick={(e) => onClickSubMenu(e)} w={'100%'} h={'44px'} align={'center'} p={'0 38px'} cursor={'pointer'} transition={'all 0.15s ease-in-out'}>
      <Text fontSize={'14px'} {...subMenuStyle}>- {subMenu.name}</Text>
    </Flex>
  );
};

SideBar.Menu = SNBMenu;
SideBar.SubMenu = SNBSubMenu;
