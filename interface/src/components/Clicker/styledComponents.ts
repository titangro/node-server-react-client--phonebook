import styled from 'styled-components';

export const StyledCounterWrap = styled.div`
  display: flex;
  width: 100px;
  margin: 0 auto;
  justify-content: space-between;
  padding-top ${({ topPadding }: { topPadding?: number }) => topPadding || 0}px;
`;

export const StyledCounter = styled.h2`
  margin: 0;
`;
