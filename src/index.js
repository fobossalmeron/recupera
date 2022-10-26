// import ReactDOM from "react-dom";
import { App } from "./App";

// const app = document.getElementById("app");
// ReactDOM.render(<App />, app);


import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App/>);