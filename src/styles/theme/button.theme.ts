import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const basic = defineStyle({
  height: '56px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: 'var(--main-color)',
  color: 'white'
})
const buttonTheme = defineStyleConfig({
  variants: {basic}
})

export {
  buttonTheme
}
