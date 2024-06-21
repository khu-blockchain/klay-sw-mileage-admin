import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
        createMultiStyleConfigHelpers(inputAnatomy.keys)

const basic = definePartsStyle({
  // define the part you're going to style
  field: {
    height: '56px',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'var(--chakra-colors-gray-300)',
    borderRadius: '12px',
    backgroundColor: 'var(--chakra-colors-gray-50)',
  },
})

const inputTheme = defineMultiStyleConfig({
  variants: {basic}
})

export {
  inputTheme
}
