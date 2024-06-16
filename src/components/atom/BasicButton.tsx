import React from 'react';
import {Button, ButtonProps} from "@chakra-ui/react";

const BasicButton = (props: ButtonProps) => {
  return (
    <Button colorScheme={'red'} backgroundColor={'var(--main-color)'} {...props}>
      {props.children}
    </Button>
  );
};

export default BasicButton;
