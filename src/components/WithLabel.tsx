import {FormControl, FormControlProps, FormLabel} from "@chakra-ui/react";

const WithLabel = (props: FormControlProps & {label: string}) => {
  const {label, ...formControlProps} = props;
  return (
    <FormControl {...formControlProps}>
      <FormLabel fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>{label}</FormLabel>
      {formControlProps.children}
    </FormControl>
  )
}

export default WithLabel;
