import styled from "styled-components";

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px;
  gap: 30px;
  width: auto;
  min-width: 350px;
  background: #ffffff;
  box-shadow: 0px 112.693px 169.039px rgba(40, 3, 109, 0.12);
  border-radius: 40px;

  form {
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    label {
      color: #838994;
      opacity: 0.7;
      font-size: 16px;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
    input::placeholder {
      font-weight: inherit;
    }
  }
  * {
    box-sizing: border-box;
  }
`;

export default Wrapper;
