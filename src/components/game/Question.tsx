import React from 'react';
import styled from 'styled-components';

interface QuestionProps {
  question: string;
}

export const Question: React.FC<QuestionProps> = ({ question }): JSX.Element => {
  return (
    <Wrapper>
      <h3>
        <strong>{question}</strong>
      </h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-weight: 400;
  margin: 0px 20px;
  text-align: left;
`;
