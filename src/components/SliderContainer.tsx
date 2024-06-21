import React, { useMemo } from "react";
import LVStack from "@/components/atom/LVStack";

type SliderContainerProps = {
  children: React.ReactNode;
  currentHeight: number;
  isOpen: boolean;
};

function SliderContainer(props: SliderContainerProps) {
  const { children, currentHeight, isOpen } = props;

  const sliderContainerStyle = useMemo(() => {
    const defaultStyle = {
      height: `${currentHeight}px`,
    };
    if (isOpen) {
      return {
        ...defaultStyle,
        overflow: "visible",
        opacity: 1,
      };
    }
    return defaultStyle;
  }, [currentHeight, isOpen]);

  return (
    <LVStack w={'100%'}
             transition={'height 0.3s ease, opacity 0.55s ease-in-out'}
             overflow={'hidden'}
             opacity={0}
             spacing={0}
             {...sliderContainerStyle}
    >
      {children}
    </LVStack>
  );
}

export default SliderContainer;
