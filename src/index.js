import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Importe o componente App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Remova o BrowserRouter daqui
  <App /> // O App já contém o BrowserRouter e o PlayerProvider
  // Remova a tag de fechamento do BrowserRouter
);