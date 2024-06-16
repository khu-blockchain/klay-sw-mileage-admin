import React from 'react';
import {Flex} from "@chakra-ui/react";
import {HashLoader} from "react-spinners";

const LoadingBox = ({height}: {height: string}) => {
  return (
    <Flex justify={'center'} align={'center'} w={'100%'} h={height}><HashLoader color="#3366FF"/></Flex>
  );
};

export default LoadingBox;
