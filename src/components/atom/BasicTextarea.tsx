import React from 'react';
import {Textarea, TextareaProps} from "@chakra-ui/react";

const BasicTextarea = (props: TextareaProps) => {
  return (
    <Textarea border={'1px solid var(--chakra-colors-gray-400)'} {...props} />

  );
};

export default BasicTextarea;
