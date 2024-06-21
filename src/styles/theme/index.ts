import {extendTheme} from "@chakra-ui/react";
import {tableTheme} from "@/styles/theme/table.theme";
import {badgeTheme} from "@/styles/theme/badge.theme";
import {checkboxTheme} from "@/styles/theme/checkbox.theme";
import {inputTheme} from "@/styles/theme/input.theme";
import {buttonTheme} from "@/styles/theme/button.theme";

const theme = extendTheme({
  components: {
    Table: tableTheme,
    Badge: badgeTheme,
    Checkbox: checkboxTheme,
    Input: inputTheme,
    Button: buttonTheme
  },
})

export {
  theme
}
