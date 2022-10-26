import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";

export function App() {
  const [salario, setSalario] = useState(0);

  const [saldoAFavor, setSaldoAFavor] = useState("00,000");
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSalario(data.sueldo);
    return;
  };

  useEffect(() => {
    console.log("salario is " + salario);

    if (salario === 0) {
      return;
    } else {
      let calculation;
      calculation = (salario * 12) / 15;
      if (calculation > 10000000) {
        calculation = 100;
      }
      console.log(calculation);
      setSaldoAFavor(calculation.toLocaleString());
    }
  }, [salario]);

  return (
    <Wrapper>
      <Tag>Saldo a favor</Tag>
      <SaldoNumber>${saldoAFavor}</SaldoNumber>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OuterField>
          <label htmlFor={`cp_sueldo`}>Sueldo mensual</label>
          <Field
            name="sueldo"
            error={isDirty && !isValid}
            //   onError={}
            id={`cp_sueldo`}
            type="number"
            placeholder={"Ingresa tu sueldo mensual"}
            {...register("sueldo", {
              required: true,
            })}
            aria-invalid={errors.sueldo ? "true" : "false"}
          />
          <Dollar active={isValid} />
        </OuterField>
        <CTA type="submit" value="Calcular" />
      </form>
    </Wrapper>
  );
}

const Dollar = styled.span`
  content: "$";
  color: black;
  position: absolute;
  display: block;
`;

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
  gap: 40px;

  max-width: 370px;

  background: #ffffff;
  box-shadow: 0px 112.693px 169.039px rgba(40, 3, 109, 0.12);
  border-radius: 40px;

  form {
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
`;

const Tag = styled.div`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  color: #7368f8;
`;

const OuterField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SaldoNumber = styled.div`
  width: 205px;
  height: 49px;
  font-weight: 500;
  text-align: center;
  font-size: 49.7031px;
  line-height: 99%;
  /* or 49px */

  text-align: center;

  /* Negro */

  color: #060809;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Error = styled.div`
  background-color: #ffeceb;
  border: 1px solid #c60e02;
  color: #c60e02;
`;

const Field = styled.input`
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

  width: 275px;
  height: 56px;

  /* Shades / white */

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
  width: 275px;
  height: 56px;

  /* secondary */

  background: #5f37d2;
  border-radius: 50px;
  color: white;
  border: 0;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  &:hover {
    background: #4524a3;
  }
`;
