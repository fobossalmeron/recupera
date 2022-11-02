import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Field, OuterField } from "./shared/Field";
import CTA from "./shared/CTA";
import delayForLoading from "../utils/delayForLoading";
import MaskedInput from "react-input-mask";

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
    limiteInferior: 134119.42,
    limiteSuperior: 160577.65,
    cuotaFija: 12264.16,
    porcentaje: 17.92,
  },
  {
    limiteInferior: 160577.66,
    limiteSuperior: 323862.0,
    cuotaFija: 17005.47,
    porcentaje: 21.36,
  },
  {
    limiteInferior: 323862.01,
    limiteSuperior: 510451.0,
    cuotaFija: 51883.01,
    porcentaje: 23.52,
  },
  {
    limiteInferior: 510451.01,
    limiteSuperior: 974535.03,
    cuotaFija: 95768.74,
    porcentaje: 30.0,
  },
  {
    limiteInferior: 974535.04,
    limiteSuperior: 1299380.04,
    cuotaFija: 234993.95,
    porcentaje: 32.0,
  },
  {
    limiteInferior: 1299380.05,
    limiteSuperior: 3898140.12,
    cuotaFija: 338944.34,
    porcentaje: 34.0,
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
    formState: {  isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    switchForm(true);
    delayForLoading(300).then(() => setSueldo(+data.sueldo));
    delayForLoading(500).then(() => setAreWeDone(true));
  };


  const getChosenRow = (baseGrav) => {
    let row = 0;
    if (baseGrav > Tabla.at(-1).limiteSuperior - 0.001) {
      // Si la base gravable es más grande que la última fila, usamos la última fila
      row = Tabla.at(-1);
    } else {
      // Si no, asignamos la fila correspondiente
      row = Tabla.find((row) => baseGrav < row.limiteSuperior);
    }
    return row;
  };

  useEffect(() => {
    if (sueldo === 0) {
      return;
    }

    // ISR sin deducciones
    let r_ingresosGravables = sueldo * 12;
    let r_deduccionesPersonales = 0;
    let r_baseGravable = r_ingresosGravables - r_deduccionesPersonales;

    let r_rango = getChosenRow(r_baseGravable);

    let r_limiteInferior = r_rango.limiteInferior;
    let r_excedente = r_baseGravable - r_limiteInferior;
    let r_porcentaje = r_rango.porcentaje;
    let r_impuestoMarginal = (r_excedente / 100) * r_porcentaje;
    let r_cuotaFija = r_rango.cuotaFija;
    let r_ISRaCargo = r_impuestoMarginal + r_cuotaFija;
    let r_ISRretenido = r_ISRaCargo * 1.03;
    let r_ISRdelEjercicio = r_ISRaCargo - r_ISRretenido;

    // ISR con deducciones
    let ingresosGravables = r_ingresosGravables;
    let deduccionesPersonales = ingresosGravables * 0.15;
    let baseGravable = ingresosGravables - deduccionesPersonales;

    let chosenRow = getChosenRow(baseGravable);

    let limiteInferior = chosenRow.limiteInferior;
    let excedente = baseGravable - limiteInferior;
    let porcentaje = chosenRow.porcentaje;
    let impuestoMarginal = (excedente / 100) * porcentaje;
    let cuotaFija = chosenRow.cuotaFija;
    let ISRaCargo = impuestoMarginal + cuotaFija;
    let ISRretenido = r_ISRaCargo * 1.03;
    let ISRdelEjercicio = ISRaCargo - ISRretenido;

    console.log(
      "\n" +
        "\n\n" +
        "Salario mensual bruto $" +
        sueldo.toLocaleString() +
        "\n\n" +
        "Rubro                  Sin deducciones     Con deducciones" +
        "\n\n" +
        "Ingresos gravables     $" +
        ingresosGravables.toLocaleString() +
        "            $" +
        ingresosGravables.toLocaleString() +
        "\n" +
        "Deducciones personales $" +
        r_deduccionesPersonales.toLocaleString() +
        "                  $" +
        deduccionesPersonales.toLocaleString() +
        "\n" +
        "Base gravable          $" +
        r_baseGravable.toLocaleString() +
        "            $" +
        baseGravable.toLocaleString() +
        "\n" +
        "Límite inferior        $" +
        r_limiteInferior.toLocaleString() +
        "         $" +
        limiteInferior.toLocaleString() +
        "\n" +
        "Excedente              $" +
        r_excedente.toLocaleString() +
        "           $" +
        excedente.toLocaleString() +
        "\n" +
        "Porcentaje             " +
        r_porcentaje.toLocaleString() +
        "%                 " +
        porcentaje.toLocaleString() +
        "%" +
        "\n" +
        "Impuesto marginal      $" +
        r_impuestoMarginal.toLocaleString() +
        "            $" +
        impuestoMarginal.toLocaleString() +
        "\n" +
        "cuotaFija              $" +
        r_cuotaFija.toLocaleString() +
        "            $" +
        cuotaFija.toLocaleString() +
        "\n" +
        "ISR a cargo            $" +
        r_ISRaCargo.toLocaleString() +
        "         $" +
        ISRaCargo.toLocaleString() +
        "\n" +
        "ISR retenido           $" +
        r_ISRretenido.toLocaleString() +
        "         $" +
        ISRretenido.toLocaleString() +
        "\n" +
        "ISR del ejercicio      $" +
        r_ISRdelEjercicio.toLocaleString() +
        "           $" +
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
              : "Ingresa tu sueldo mensual"}
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
              placeholder={"Sueldo mensual"}
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
