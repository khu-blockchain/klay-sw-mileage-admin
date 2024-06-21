import React from 'react';
import {Button, ButtonProps} from "@chakra-ui/react";

const BasicButton = (props: ButtonProps) => {
  return (
    <Button colorScheme={'red'}
            backgroundColor={'var(--main-color)'}
            height={'56px'}
            borderRadius={'12px'}
            {...props}>
      {props.children}
    </Button>
  );
};

export default BasicButton;
