import * as React from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Login.css";
import { json, useNavigate } from "react-router-dom";
import { initFirestore } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { InformacionCuenta } from "../Context/Contex";
import { useState, useEffect, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

import Swal from "sweetalert2";

function Login() {
  const [usuarios, setUsuarios] = useState();
  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");
  const contex = useContext(InformacionCuenta);
  let redirecion = useNavigate();

  async function getUsuarios() {
    let resultado = collection(initFirestore, "Usuarios");
    let data = await getDocs(resultado);

    setUsuarios(data.docs.map((doc) => ({ ...doc.data() })));
    //console.log(data.docs.map((doc)=>({...doc.data()})));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  const buscarUsuario = () => {
    let estado = usuarios.some(
      (usuario) => usuario.User === User && usuario.Password == Password
    );
    return estado;
  };

  const IniciarSesion = () => {
    if (buscarUsuario()) {
      handleOpen();
      setTimeout(() => {
        try {
          var userString = localStorage.getItem("userFirebase");
          var userJson = JSON.parse(userString);

          if (userJson?.is_admin) {
            redirecion("/crearempledos");
          } else {
            redirecion("/completo");
          }
        } catch (error) {}
      }, 2000);
    } else {
      handleClose();

      Swal.fire({
        position: "center",
        icon: "error",
        title: "Credenciales erroneas",
        showConfirmButton: true,
        //timer: 2000
      });
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const inicioopen = () => {
    IniciarSesion();
  };

  console.log(initFirestore);
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Iniciar Sesion</p>
            </div>

            <div className="divider d-flex align-items-center my-4"></div>

            <MDBInput
              wrapperClass="mb-4"
              label="Usuario"
              type="email"
              size="lg"
              onChange={(e) => {
                setUser(e.target.value);

                var user = {
                  user: e.target.value,
                  is_admin: e.target.value == "admin",
                };

                const jsonString = JSON.stringify(user);

                localStorage.setItem("userFirebase", jsonString);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contraseña"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Olvido Contraseña?</a>
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                className="mb-0 px-5 bg-info"
                size="lg"
                onClick={inicioopen}
              >
                Ingresar
              </MDBBtn>

              <p className="small fw-bold mt-2 pt-1 mb-2"></p>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-info">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2024. All rights reserved.
          </div>
        </div>
      </MDBContainer>
    </>
  );
}
export default Login;
