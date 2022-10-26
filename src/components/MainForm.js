import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Field, OuterField } from "./shared/Field";
import CTA from "./shared/CTA";
import delayForLoading from "../utils/delayForLoading";
import { NumericFormat } from "react-number-format";

function MainForm({ switchForm, show, areWeDone, setAreWeDone }) {
  const [sueldo, setSueldo] = useState(0);
  const [saldoAFavor, setSaldoAFavor] = useState(0);
  const {
    register,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    switchForm(true);
    delayForLoading(300).then(() => setSueldo(+data.sueldo));
    delayForLoading(500).then(() => setAreWeDone(true));
  };

  useEffect(() => {
    if (sueldo === 0) {
      return;
    }
    let ingresosGravables = sueldo * 12;
    let deduccionesPersonales = ingresosGravables * 0.15;
    let baseGravable = ingresosGravables - deduccionesPersonales;

    console.log("sueldo mensual bruto $" + sueldo.toLocaleString());

    console.log("Ingresos gravables $" + ingresosGravables.toLocaleString());

    console.log(
      "Deducciones personales $" + deduccionesPersonales.toLocaleString()
    );

    console.log("Base gravable $" + baseGravable.toLocaleString());

    setSaldoAFavor(baseGravable.toLocaleString());
  }, [sueldo]);

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
          {areWeDone && <NonEditable>${sueldo.toLocaleString()}</NonEditable>}
          {!areWeDone && (
            <Field
              name="sueldo"
              error={isDirty && !isValid}
              id={`cp_sueldo`}
              type="number"
              pattern="[0-9]*"
              placeholder={"Ingresa tu sueldo mensual"}
              {...register("sueldo", {
                required: true,
              })}
            />
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
  margin-bottom: 10px;
`;

const SaldoNumber = styled.div`
  width: 100%;
  font-weight: 500;
  text-align: center;
  font-size: 3rem;
  line-height: 99%;
  text-align: center;
  color: #060809;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
