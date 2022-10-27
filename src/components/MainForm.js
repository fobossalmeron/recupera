import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Field, OuterField } from "./shared/Field";
import CTA from "./shared/CTA";
import delayForLoading from "../utils/delayForLoading";

const Tabla = [
  {
    limiteInferior: 0.01,
    limiteSuperior: 7735.0,
    cuotaFija: 0,
    porcentaje: 1.92,
  },
  {
    limiteInferior: 7735.01,
    limiteSuperior: 65651.07,
    cuotaFija: 148.51,
    porcentaje: 6.4,
  },
  {
    limiteInferior: 65651.08,
    limiteSuperior: 115375.9,
    cuotaFija: 3855.14,
    porcentaje: 10.88,
  },
  {
    limiteInferior: 115375.91,
    limiteSuperior: 134119.41,
    cuotaFija: 9265.2,
    porcentaje: 16.0,
  },
  {
    limiteInferior: 3898140.13,
    limiteSuperior: 10000000,
    cuotaFija: 1222522.76,
    porcentaje: 35.0,
  },
];

function MainForm({ switchForm, areWeDone, setAreWeDone }) {
  const [sueldo, setSueldo] = useState(0);
  const [saldoAFavor, setSaldoAFavor] = useState(0);
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    switchForm(true);
    delayForLoading(300).then(() => setSueldo(+data.sueldo));
    delayForLoading(500).then(() => setAreWeDone(true));
  };

  const getChosenRow = (baseGrav) => {
    let row = Tabla.find((row) => baseGrav < row.limiteSuperior);
    return row;
  };

  useEffect(() => {
    if (sueldo === 0) {
      return;
    }

    let ingresosGravables = sueldo * 12;
    let deduccionesPersonales = ingresosGravables * 0.15;
    let baseGravable = ingresosGravables - deduccionesPersonales;

    let chosenRow = getChosenRow(baseGravable);

    let limiteInferior = chosenRow.limiteInferior;
    let excedente = baseGravable - limiteInferior;
    let porcentaje = chosenRow.porcentaje;
    let impuestoMarginal = (excedente / 100) * porcentaje;
    let cuotaFija = chosenRow.cuotaFija;
    let ISRaCargo = impuestoMarginal + cuotaFija;
    let ISRretenido = 10005.05 * 1.03; //Cómo se puede sacar el ISR Retenido? Hay que duplicar el mecanismo?
    let ISRdelEjercicio = ISRaCargo - ISRretenido;

    console.log(
      "\n" +
        "\n\n" +
        "Salario mensual bruto $" +
        sueldo.toLocaleString() +
        "\n\n" +
        "Ingresos gravables $" +
        ingresosGravables.toLocaleString() +
        "\n" +
        "Deducciones personales $" +
        deduccionesPersonales.toLocaleString() +
        "\n" +
        "Base gravable $" +
        baseGravable.toLocaleString() +
        "\n" +
        "Límite inferior $" +
        limiteInferior.toLocaleString() +
        "\n" +
        "Excedente $" +
        excedente.toLocaleString() +
        "\n" +
        "Porcentaje " +
        porcentaje.toLocaleString() +
        "%" +
        "\n" +
        "Impuesto marginal $" +
        impuestoMarginal.toLocaleString() +
        "\n" +
        "cuotaFija $" +
        cuotaFija.toLocaleString() +
        "\n" +
        "ISR a cargo $" +
        ISRaCargo.toLocaleString() +
        "\n" +
        "ISR retenido $" +
        ISRretenido.toLocaleString() +
        "\n" +
        "ISR del ejercicio $" +
        ISRdelEjercicio.toLocaleString()
    );
    setSaldoAFavor(
      (ISRdelEjercicio * -1).toLocaleString("es-MX", {
        maximumFractionDigits: 0,
      })
    );
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
          {areWeDone && (
            <NonEditable>
              ${sueldo.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
            </NonEditable>
          )}
          {!areWeDone && (
            <Field
              name="sueldo"
              hasOwnError={isDirty && !isValid}
              id={`cp_sueldo`}
              type="number"
              pattern="[0-9]*"
              min="5000"
              max="4000000"
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
