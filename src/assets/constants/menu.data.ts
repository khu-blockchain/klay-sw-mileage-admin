import {Info, List, LucideIcon, PencilLine, UserCog} from "lucide-react";

type MenuItem = {
  label: string
  route: string
  icon: LucideIcon
}

const MENUS: Array<MenuItem> = [
  {
    label: 'SW 마일리지',
    route: '',
    icon : Info
  },
  {
    label: 'SW 마일리지 신청',
    route: 'register',
    icon : PencilLine

  },
  {
    label: '신청 내역',
    route: 'list',
    icon : List


  },
  {
    label: '내 정보',
    route: 'profile',
    icon : UserCog
  }
]

export {
  MENUS
}

export type {
  MenuItem
}
