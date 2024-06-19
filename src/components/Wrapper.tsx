import {Flex, FlexProps} from "@chakra-ui/react";

const Wrapper = (props: FlexProps) => {
  return (
    <Flex {...props} bgColor={'#ffffff'} borderRadius={'8px'} width={'100%'} border={'1px solid var(--border-color)'}>
      {props.children}
    </Flex>
  );
};

export default Wrapper;
