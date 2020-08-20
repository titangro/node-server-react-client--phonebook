import React, { useState } from 'react';

import { StyledCounterWrap, StyledCounter } from './styledComponents';

import constants from './constants';

export type ClickerProps = {
  count?: number;
  increaseCounter: () => void;
  decreaseCounter: () => void;
};

export const Clicker = (props: ClickerProps) => {
  const [currentCount, setCount] = useState(0);
  const { count, increaseCounter, decreaseCounter } = props;
  const { initialCount, endCount } = constants;

  const handleIncrease = () => {
    increaseCounter();
    setCount((prev) => {
      if (prev + 1 > endCount) {
        return prev;
      }
      return prev + 1;
    });
  };

  const handleDecrease = () => {
    decreaseCounter();
    setCount((prev) => {
      if (prev - 1 < initialCount) {
        return prev;
      }
      return prev - 1;
    });
  };

  return (
    <React.Fragment>
      <StyledCounterWrap>
        <button onClick={handleDecrease}>-</button>
        <StyledCounter>{count}</StyledCounter>
        <button onClick={handleIncrease}>+</button>
      </StyledCounterWrap>
      <StyledCounterWrap topPadding={20}>
        {initialCount}
        <StyledCounter>{currentCount}</StyledCounter>
        {endCount}
      </StyledCounterWrap>
    </React.Fragment>
  );
};
