import {extendTheme} from "@chakra-ui/react";
import {tableTheme} from "@/styles/theme/table.theme";

const theme = extendTheme({
  components: {
    Table: tableTheme,
  },
})

export {
  theme
}
