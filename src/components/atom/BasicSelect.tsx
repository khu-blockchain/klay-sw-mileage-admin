import React from 'react';
import {Select, SelectProps} from "@chakra-ui/react";

const BasicSelect = (props: SelectProps) => {
  return (
    <Select border={'1px solid var(--chakra-colors-gray-300)'} {...props}/>

  );
};

export default BasicSelect;
