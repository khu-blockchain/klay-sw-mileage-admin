import {createMultiStyleConfigHelpers} from "@chakra-ui/react";
import {tableAnatomy} from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys)

const info = definePartsStyle({
  // define the part you're going to style
  table: {
    borderCollapse: 'collapse'
  },
  thead: {
    th: {
      textAlign: 'center',
      bgColor: 'var(--chakra-colors-gray-200)',
      border: '1px solid var(--chakra-colors-gray-300)',
      color: 'var(--chakra-colors-gray-700)'
    },
  },
  tbody: {
    td: {
      whiteSpace: 'pre-wrap',
      textAlign: 'center',
      verticalAlign: 'middle',
      border: '1px solid var(--chakra-colors-gray-300)',
    },
  }
})

const baseStyle = definePartsStyle({
  // define the part you're going to style
  table: {
    borderCollapse: 'collapse'
  },
  thead: {
    th: {
      borderColor: 'var(--chakra-colors-gray-200)',
    }
  },
  tbody: {
    td: {
      whiteSpace: 'nowrap',
      borderColor: 'var(--chakra-colors-gray-200)',
    },
  }
})


const tableTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {info}
})

export {
  tableTheme
}
