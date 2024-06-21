import {defineStyle, defineStyleConfig} from "@chakra-ui/react";


const created = defineStyle({
  backgroundColor: 'var(--chakra-colors-blue-100)',
  color: 'var(--chakra-colors-blue-700)',
  borderRadius: 4
})

const approved = defineStyle({
  backgroundColor: 'var(--chakra-colors-green-100)',
  color: 'var(--chakra-colors-green-700)',
  borderRadius: 4
})

const denied = defineStyle({
  backgroundColor: 'var(--chakra-colors-red-100)',
  color: 'var(--chakra-colors-red-700)',
  borderRadius: 4
})

const badgeTheme = defineStyleConfig({
  variants: {
    created,
    approved,
    denied
  }
})

export {badgeTheme}
