import React, { useState } from 'react';
import {addDoc, collection} from 'firebase/firestore'
import { initFirestore } from '../config/firebaseConfig';
import Navbar from '../admin/Navbar';
import Sidebar from '../admin/Sidebar';
import Swal from 'sweetalert2'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,}
from 'mdb-react-ui-kit';

function CrearEmpledos() {   
 
  const [Nombre,setNombre] = useState ("")
  const [TipoDoc,setTipoDoc] = useState ("")
  const [NumeroDoc,setNumeroDoc] = useState ("")
  const [User,setUser] = useState ("")
  const [Password,setPassword] = useState ("")  

  const UsuariosCollection = collection(initFirestore,"Usuarios")

  const store = async (e)=>{
    e.preventDefault();
    await addDoc(UsuariosCollection, {Nombre:Nombre,TipoDoc:TipoDoc,NumeroDoc:NumeroDoc,User:User,Password:Password});

    Swal.fire({
      title: "USUARIO",
      text: "CREADO CON EXITO",
      icon: "success"
    });
   
    limpiarFormulario();   
    
  } 
  const limpiarFormulario = () => {
    setNombre('')
    setTipoDoc('')
    setNumeroDoc('')
    setUser('')
    setPassword('')
  }

 
  return (
    
    <>
    <Navbar/>
    <div className="flex">
    <Sidebar/> 

    <div className='content'>
     <form onSubmit = {store} id="limpiar">
   <MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <h3 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Crear Usuario</h3>

        <MDBInput wrapperClass='mb-4' label='Nombre del Empleado' size='lg' id='form1' value={Nombre} onChange={(e)=>setNombre(e.target.value)} type='text'/>


        <MDBInput wrapperClass='mb-4' label='Tipo Documento' size='lg' id='form1' value={TipoDoc} onChange={(e)=>setTipoDoc(e.target.value)} type='text'/>

        <MDBInput wrapperClass='mb-4' label='Numero Documento' size='lg' id='form1' value={NumeroDoc} onChange={(e)=>setNumeroDoc(e.target.value)} type='text'/>


        <MDBInput wrapperClass='mb-4' label='Usuario' size='lg' id='form2'  value={User} onChange={(e)=>setUser(e.target.value)} type='text'/>
        <MDBInput wrapperClass='mb-4' label='Contraseña' size='lg' id='form3' value={Password} onChange={(e)=>setPassword(e.target.value)} type='password'/>


        

        <MDBBtn className='mb-4 w-100 gradient-custom-4 bg-info' size='lg' type='submit'>Crear usuario</MDBBtn>

      </MDBCol>

      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
      </MDBCol>

    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
</form>
</div>
</div>
   
   
   
  
    </>
  );
}

export default CrearEmpledos;



