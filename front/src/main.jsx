import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Panel from "./layouts/components/admin/Panel.jsx";
import CrearEmpledos from "./layouts/components/Pages/CrearEmpledos.jsx"
import TrabajoCompleto from "./layouts/components/Pages/TrabajoCompleto.jsx"
import TrabajoxDias from "./layouts/components/Pages/TrabajoxDias.jsx";
import Salir from "./layouts/components/Pages/Salir.jsx";



let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/panel",
    element: <Panel />,
  },
  {
    path: "/crearempledos",
    element: <CrearEmpledos />,
  },
  {
    path: "/completo",
    element: <TrabajoCompleto/>,
  },
  {
    path: "/xdias",
    element: <TrabajoxDias/>,
  },
  {
    path: "/salir",
    element: <Salir/>,
  },
 
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);