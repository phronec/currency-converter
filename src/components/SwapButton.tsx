import React from 'react';
import { SwapButton as StyledSwapButton, SwapIcon } from '../styles/common';

interface SwapButtonProps {
  onPress: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onPress }) => {
  return (
    <StyledSwapButton onPress={onPress}>
      <SwapIcon>⇅</SwapIcon>
    </StyledSwapButton>
  );
};

export default SwapButton;
