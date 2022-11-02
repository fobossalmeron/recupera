import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "./shared/Wrapper";
import { Field, OuterField } from "./shared/Field";
import ErrorMessage from "./shared/ErrorMessage";
import CTA from "./shared/CTA";
import delayForLoading from "../utils/delayForLoading";

function PopupForm({ switchForm, show }) {
  const [salario, setSalario] = useState(0);

  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data);
    switchForm(false);
  };

  useEffect(() => {}, [salario]);

  useEffect(() => {
    show &&
      delayForLoading(500).then(() =>
        document.getElementsByName("email")[0].focus()
      );
  }, [show]);

  return (
    <WrapperPopup show={show}>
      <Copy>
        Último paso para conocer <b>tu resultado</b>
      </Copy>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OuterField>
          <label htmlFor={`cp_email`}>Ingresa tu email</label>
          <Field
            name="email"
            hasOwnError={isDirty && !isValid}
            id={`cp_email`}
            type="email"
            placeholder={"Tu email"}
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                message: "Email inválido",
              },
            })}
          />
        </OuterField>
        {errors?.email?.type === "pattern" && (
          <ErrorMessage>Necesitamos un correo real 😔</ErrorMessage>
        )}

        <CTA type="submit" value="Ver resultado" show />
      </form>
    </WrapperPopup>
  );
}

export default PopupForm;

const WrapperPopup = styled(Wrapper)`
  opacity: ${(p) => (p.show ? 1 : 0)};
  pointer-events: ${(p) => (p.show ? "auto" : "none")};
  position: absolute;
  box-shadow: none;
  top: 0;
  left: 0;
  transition: 0.3s ease opacity;
`;

const Copy = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 0;
  b {
    color: #7368f8;
    font-weight: inherit;
  }
`;
