<form onSubmit={handleSubmit(onSubmit)}>
{/* <input
  {...register("sueldo", { required: "Necesitamos tu dueldo" })}
  aria-invalid={errors.mail ? "true" : "false"}
/>
{errors.mail && <p role="alert">{errors.mail?.message}</p>} */}
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
{/* {errors?.sueldo?.type === "required" && <Error>danos tu sueldo</Error>} */}

{/* <input 
{...register("sueldo", { required: true })} 
aria-invalid={errors.firstName ? "true" : "false"} 
/>
{errors.firstName?.type === 'required' && <p role="alert">First name is required</p>} */}

{/* <label htmlFor={`cp_sueldo`}>tu sueldo mensual</label>
<input
  name="sueldo"
  id={`cp_sueldo`}
  type="email"
  placeholder={"tu sueldo"}
  {...register("email", {
    required: "Ingresa tu email",
    pattern: {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
      message: "email inválido",
    },
  })}
/> */}
<CTA type="submit" value="Calcular" />
</form>