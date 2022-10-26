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
  box-sizing: border-box;
  font-size: 1.1rem;
  font-weight: 300;
  &::placeholder {
    font-weight: 300;
  }

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 20px;
  gap: 8px;

  width: 100%px;

  background: #ffffff;
  /* neutral grises / 300 */

  border: 2px solid;
  border-color: ${(p) => (p.error ? "#E7414C" : "#838994")};
  border-radius: 50px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;