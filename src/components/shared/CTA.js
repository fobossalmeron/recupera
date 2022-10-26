import styled from "styled-components";


const CTA = styled.input`
  /* Mockup/ atom/ button / web / big */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 40px;
  font-size: 1rem;
  font-family: inherit;
  font-weight: inherit;
  transition: 0.25s ease all;
  cursor: pointer;
  width: 100%;
  height: 56px;

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