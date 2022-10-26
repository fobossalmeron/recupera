import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Field, OuterField } from "./shared/Field";
import CTA from "./shared/CTA";
import delayForLoading from "../utils/delayForLoading";

function MainForm({ switchForm, show, areWeDone, setAreWeDone }) {
  const [salario, setSalario] = useState(0);
  const [saldoAFavor, setSaldoAFavor] = useState(0);
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    switchForm(true);
    console.log(data);

    delayForLoading(300).then(() => setSalario(data.sueldo));
    delayForLoading(500).then(() => setAreWeDone(true));
  };

  useEffect(() => {
    console.log("salario is " + salario);

    let calculation;
    calculation = (salario * 12) / 15;
    console.log(calculation);
    setSaldoAFavor(calculation.toLocaleString());
  }, [salario]);

  return (
    <Wrapper show>
      <div>
        <Tag>Saldo a favor</Tag>
        <SaldoNumber>{areWeDone ? "$" + saldoAFavor : "$00,000"}</SaldoNumber>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OuterField>
          <label htmlFor={`cp_sueldo`}>
            {areWeDone
              ? "Recuperable del SAT con un sueldo mensual de "
              : "Sueldo mensual"}
          </label>
          {areWeDone && <NonEditable>${salario.toLocaleString()}</NonEditable>}
          {!areWeDone && (
            <>
              <Field
                name="sueldo"
                error={isDirty && !isValid}
                id={`cp_sueldo`}
                type="number"
                placeholder={"Ingresa tu sueldo mensual"}
                {...register("sueldo", {
                  required: true,
                })}
              />
              {/* <Dollar active={isValid} /> */}
            </>
          )}
        </OuterField>
        <CTA type="submit" value="Calcular" show={!areWeDone} />
        <CTA
          as="a"
          href="https://recupera.io/prueba-la-versión-beta"
          show={areWeDone}
        >
          Únete el beta <Arrow />
        </CTA>
      </form>
    </Wrapper>
  );
}

export default MainForm;

const NonEditable = styled.p`
  font-size: 1.6rem;
  opacity: 0.8;
  width: 100%;
  text-align: center;
  margin: 0;
`;

const Arrow = styled.span`
  background-color: white;
  height: 2px;
  width: 20px;
  display: inline-block;
  position: relative;
  border-radius: 3px;
  &:before,
  &:after {
    content: " ";
    background-color: white;
    height: 2px;
    width: 10px;
    display: inline-block;
    position: absolute;
    right: -1px;
    border-radius: 3px;
  }
  &:before {
    top: -3px;
    transform: rotate(40deg);
  }
  &:after {
    top: 3px;
    transform: rotate(-40deg);
  }
`;

const Dollar = styled.span`
  content: "$";
  color: black;
  position: absolute;
  display: block;
`;

const Tag = styled.div`
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  color: #7368f8;
  margin-bottom:10px;
`;

const SaldoNumber = styled.div`
  width: 205px;
  height: 49px;
  font-weight: 500;
  text-align: center;
  font-size: 49.7031px;
  line-height: 99%;
  text-align: center;
  color: #060809;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
