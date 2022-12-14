import styled from "styled-components";

export const OuterField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const Field = styled.input`
font-family: inherit;
  box-sizing: border-box;
  font-size: 1.1rem;
  font-weight: 300;
  font-style: normal;
  -webkit-tap-highlight-color: transparent;
  &::placeholder {
    font-style: normal;
    transition:0.2s all;
  }
  text-align:center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  gap: 8px;
  border-radius: 50px;
  width: 100%px;
  background: #ffffff;
  border: 2px solid;
  transition: 0.2s ease;
  border-color: ${(p) => (p.hasOwnError ? "#E7414C" : "#838994")};
  outline:none;
  &:focus,
  &:active {
    border-color: ${(p) => (p.hasOwnError  ? "#E7414C" : "#7368f8")};
    outline-color: ${(p) => (p.hasOwnError  ? "#E7414C" : "#7368f8")};
    &::placeholder{
      opacity:0;
    }
  }
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
