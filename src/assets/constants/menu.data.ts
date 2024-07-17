import {Info,Coins,List, HandCoins,Flame, UserSearch, LucideIcon} from 'lucide-react';

export type Menu = {
  // id는 1부터 시작하여 증가
  id: number;
  name: string;
  root: string;
  icon: LucideIcon;
  subMenu: Array<SubMenu>;
};

export type SubMenu = {
  // id는 Menu의 id + 0 + 1부터 시작하여 증가하는 숫자
  id: number;
  name: string;
  root: string;
};

export const MENU: Array<Menu> = [
  {
    id: 1,
    name: "SW 마일리지",
    root: "",
    icon: Info,
    subMenu:[],
  },
  {
    id: 2,
    name: "SW 마일리지 토큰",
    root: "token",
    icon: Coins,
    subMenu: [
      {
        id: 201,
        name: "토큰 관리",
        root: "manage",
      },
      {
        id: 202,
        name: "토큰 생성 및 배포",
        root: "create",
      },
    ],
  },
  {
    id: 3,
    name: "학생 정보 관리",
    root: "student",
    icon: UserSearch,
    subMenu: [],
  },
  {
    id: 4,
    name: "신청 내역 관리",
    root: "list",
    icon: List,
    subMenu: [],
  },
  {
    id: 5,
    name: "토큰 지급",
    root: "mint",
    icon: HandCoins,
    subMenu: [
      {
        id: 401,
        name: "지급하기",
        root: "execute",
      },
      {
        id: 402,
        name: "지급 내역",
        root: "history",
      },
    ],
  },
  {
    id: 6,
    name: "토큰 회수",
    root: "burn",
    icon: Flame,
    subMenu: [
      {
        id: 401,
        name: "회수하기",
        root: "execute",
      },
      {
        id: 402,
        name: "회수 내역",
        root: "history",
      },
    ],
  },

]
