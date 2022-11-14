import { useEffect, useState } from "react";
import styled from "styled-components";
import MainForm from "./components/mainForm";
import PopupForm from "./components/PopupForm";

export function App() {
  const [form, setForm] = useState(false);
  const [areWeDone, setAreWeDone] = useState(false);

  const [salario, setSalario] = useState();

  const switchForm = (id) => {
    setForm(id);
  };

  useEffect(() => {
  }, [form]);

  return (
    <Container>
      <MainForm
        switchForm={switchForm}
        show={!form}
        areWeDone={areWeDone}
        setAreWeDone={setAreWeDone}
        setSalario={setSalario}
      />
      <PopupForm switchForm={switchForm} show={form} salario={salario}/>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 345px;
`;
