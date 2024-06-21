import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
        createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderColor: 'var(--chakra-colors-gray-300)',
    padding: 2,
    borderRadius: 4, // change the border radius of the control
  },
})

const checkboxTheme = defineMultiStyleConfig({ baseStyle })

export {
  checkboxTheme
}
