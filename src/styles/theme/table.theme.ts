import {createMultiStyleConfigHelpers} from "@chakra-ui/react";
import {tableAnatomy} from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  table: {
    borderCollapse: 'collapse'
  },
  thead: {
    th: {
      textAlign: 'center',
      bgColor: 'var(--chakra-colors-gray-200)',
      border: '1px solid var(--chakra-colors-gray-400)',
      color: 'var(--chakra-colors-gray-700)'
    },
  },
  tbody: {
    td: {
      textAlign: 'center',
      verticalAlign: 'middle',
      border: '1px solid var(--chakra-colors-gray-400)',
    },
  }

})
const tableTheme = defineMultiStyleConfig({ baseStyle })

export {
  tableTheme
}
