import {FormControl, FormControlProps, FormLabel, Text} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";
import React from "react";

const WithLabel = (props: FormControlProps & {label: string, description?: string}) => {
  const {label,description, ...formControlProps} = props;
  return (
    <FormControl {...formControlProps} >
      <LVStack spacing={'4px'} mb={'10px'}>
        <Text fontWeight={500} fontSize={'16px'} color={'var(--chakra-colors-gray-800)'}>{label}</Text>
        {description && <Text fontSize={'14px'} color={'var(--chakra-colors-gray-500)'}>{description}</Text>}
      </LVStack>
      {formControlProps.children}
    </FormControl>
  )
}

export default WithLabel;
