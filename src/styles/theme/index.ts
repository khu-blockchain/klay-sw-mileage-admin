import {extendTheme} from "@chakra-ui/react";
import {tableTheme} from "@/styles/theme/table.theme";
import {badgeTheme} from "@/styles/theme/badge.theme";
import {checkboxTheme} from "@/styles/theme/checkbox.theme";

const theme = extendTheme({
  components: {
    Table: tableTheme,
    Badge: badgeTheme,
    Checkbox: checkboxTheme
  },
})

export {
  theme
}
