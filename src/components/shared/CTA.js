import styled from "styled-components";

const CTA = styled.input`
  font-family: inherit;
  display: ${(p) => (p.show ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  font-size: 1rem;
  font-weight: 400;
  transition: 0.25s ease all;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  height: 56px;
  gap: 12px;
  background: #5f37d2;
  border-radius: 50px;
  color: white;
  border: 0;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  &:hover {
    background: #4524a3;
  }
`;

export default CTA;
