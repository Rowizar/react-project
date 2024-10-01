import styled from "styled-components";
import { FC } from 'react';

interface IUniversity {
  country: string;
  name: string;
}

const CardStyled = styled.div`
  height: 50px;
  background-color: #e9e7e7;
  color: black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardUniversity: FC<{ data: IUniversity }> = ({ data }) => (
  <CardStyled>
    <h3>{data.name}</h3>
    <span>{data.country}</span>
  </CardStyled>
);

export default CardUniversity;
