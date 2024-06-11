import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../admin/Panel.css";

import Navbar from '../admin/Navbar';
import Sidebar from '../admin/Sidebar';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCardImage, MDBRadio } from 'mdb-react-ui-kit';

function createData(name, value) {
  return { name, value };
}

function TrabajoPorDias() {
  const [fechaInicio, setFechaInicio] = React.useState(null);
  const [fechaFinal, setFechaFinal] = React.useState(null);
  const [salarioPorHora, setSalarioPorHora] = React.useState('');
  const [horasSemanales, setHorasSemanales] = React.useState('');
  const [tieneAuxilioTransporte, setTieneAuxilioTransporte] = React.useState(false);
  const [datosLiquidacion, setDatosLiquidacion] = React.useState([]);

  const calcularTiempoServicio = (fechaInicio, fechaFinal) => {
    const diffTime = Math.abs(fechaFinal - fechaInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays / 365;
  };

  const calcularSalarioPendiente = (horasTrabajadas, salarioPorHora) => {
    return horasTrabajadas * salarioPorHora;
  };

  const calcularPrimaServicios = (tiempoServicio, salarioPorHora) => {
    return (salarioPorHora * 30 * tiempoServicio) / 12;
  };

  const calcularVacacionesPendientes = (tiempoServicio, salarioPorHora) => {
    return (tiempoServicio * 15 * salarioPorHora) / 30;
  };

  const calcularCesantias = (tiempoServicio, salarioPorHora) => {
    return (salarioPorHora * 30 * tiempoServicio) / 12;
  };

  const calcularInteresesCesantias = (cesantias) => {
    return (cesantias * 0.12);
  };

  const calcularAuxilioTransporte = (salarioPorHora) => {
    const salarioMinimo = 908526; // Salario mínimo en Colombia para 2022
    if (salarioPorHora * horasSemanales * 4 * 12 < salarioMinimo) {
      return 106454; // Valor del auxilio de transporte en Colombia para 2022
    }
    return 0;
  };

  const calcularLiquidacion = () => {
    if (fechaInicio && fechaFinal && salarioPorHora && horasSemanales) {
      const tiempoServicio = calcularTiempoServicio(fechaInicio, fechaFinal);
      const horasTrabajadas = tiempoServicio * horasSemanales * 4 * 12; // Horas trabajadas en un año
      const salarioPendiente = calcularSalarioPendiente(horasTrabajadas, salarioPorHora);
      const primaServicios = calcularPrimaServicios(tiempoServicio, salarioPorHora);
      const vacacionesPendientes = calcularVacacionesPendientes(tiempoServicio, salarioPorHora);
      const cesantias = calcularCesantias(tiempoServicio, salarioPorHora);
      const interesesCesantias = calcularInteresesCesantias(cesantias);
      const transporte = calcularAuxilioTransporte(salarioPorHora);
      const totalPagar = salarioPendiente + primaServicios + vacacionesPendientes + cesantias + interesesCesantias + transporte;

      const datos = [
        createData('Salario Pendiente', Math.round(salarioPendiente)),
        createData('Prima de Servicios', Math.round(primaServicios)),
        createData('Vacaciones Pendientes', Math.round(vacacionesPendientes)),
        createData('Cesantías', Math.round(cesantias)),
        createData('Intereses sobre Cesantías', Math.round(interesesCesantias)),
        createData('Transporte', Math.round(transporte)),
        createData('Total a Pagar', Math.round(totalPagar)),
      ];

      setDatosLiquidacion(datos);
    }
  };

  const resetearCalculo = () => {
    setFechaInicio(null);
    setFechaFinal(null);
    setSalarioPorHora('');
    setHorasSemanales('');
    setTieneAuxilioTransporte(false);
    setDatosLiquidacion([]);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className='content'>
          <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md='5' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                    <h3 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">LIQUIDACIÓN FINAL DEL EMPLEADO</h3>

                    <MDBInput label="Horas Semanales" type="number" value={horasSemanales} onChange={(e) => setHorasSemanales(Number(e.target.value))} className="mb-4" />

                    <MDBRow className='text-black m-4'>
                      <MDBCol md='6'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Fecha Inicio" value={fechaInicio} onChange={(date) => setFechaInicio(date)} />
                          </DemoContainer>
                        </LocalizationProvider>
                      </MDBCol>
                      <MDBCol md='6'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Fecha Final" value={fechaFinal} onChange={(date) => setFechaFinal(date)} />
                          </DemoContainer>
                        </LocalizationProvider>
                      </MDBCol>
                    </MDBRow>

                    <MDBInput label="Salario por Hora" type="number" value={salarioPorHora} onChange={(e) => setSalarioPorHora(Number(e.target.value))} className="mb-4" />
                    
                    <MDBRadio name="auxilioTransporte" id="auxilioSi" label="Con Auxilio de Transporte" checked={tieneAuxilioTransporte} onChange={() => setTieneAuxilioTransporte(true)} className="mb-4" />
                    <MDBRadio name="auxilioTransporte" id="auxilioNo" label="Sin Auxilio de Transporte" checked={!tieneAuxilioTransporte} onChange={() => setTieneAuxilioTransporte(false)} className="mb-4" />

                    <MDBBtn className='mb-4 w-100 gradient-custom-4 bg-info' size='lg' type='submit' onClick={calcularLiquidacion}>Calcular</MDBBtn>
                    <MDBBtn className='mb-4 w-100 gradient-custom-4 bg-warning' size='lg' type='button' onClick={resetearCalculo}>Nuevo Cálculo</MDBBtn>
                  </MDBCol>
                  <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex'>
                    <MDBCardImage src='https://img.freepik.com/vector-premium/marque-calendario-recordatorios-trabajo_18660-3248.jpg?w=520' fluid />
                  </MDBCol>
                </MDBRow>
                <Divider className='my-4' />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Concepto</TableCell>
                        <TableCell align="right">Valor</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datosLiquidacion.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </div>
      </div>
    </>
  );
}

export default TrabajoPorDias;
