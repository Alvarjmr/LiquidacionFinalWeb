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

function TrabajoCompleto() {
  const [fechaInicio, setFechaInicio] = React.useState(null);
  const [fechaFinal, setFechaFinal] = React.useState(null);
  const [salario, setSalario] = React.useState(''); // Inicialmente vacío
  const [subsidioTransporte, setSubsidioTransporte] = React.useState(false);
  const [datosLiquidacion, setDatosLiquidacion] = React.useState([]);

  const calcularDiasLaborados = () => {
    if (fechaInicio && fechaFinal && salario) {
      const inicio = new Date(fechaInicio);
      const final = new Date(fechaFinal);
      const diffTime = Math.abs(final - inicio);
      const diasLaborados = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const mesesLaborados = diasLaborados / 30;

      const transporte = subsidioTransporte ? 106454 : 0; // Valor del auxilio de transporte en Colombia para 2022 si aplica
      const cesantias = Math.round((salario / 12) * (mesesLaborados));
      const interesesCesantias = Math.round((cesantias * 0.12) / 12 * mesesLaborados);
      const primaSemestral = Math.round((salario / 12) * (mesesLaborados / 2));
      const vacaciones = Math.round((salario / 24) * (mesesLaborados));
      const total = cesantias + interesesCesantias + primaSemestral + vacaciones;

      const datos = [
        createData('Periodo (DD-MM-AAAA)', `${fechaInicio} - ${fechaFinal}`),
        createData('Días laborados', diasLaborados),
        createData('Salario', salario),
        createData('Transporte', transporte),
        createData('Cesantías', cesantias),
        createData('Intereses sobre cesantías', interesesCesantias),
        createData('Prima semestral', primaSemestral),
        createData('Vacaciones', vacaciones),
        createData('TOTAL', total),
      ];

      setDatosLiquidacion(datos);
    }
  };

  const resetearCalculo = () => {
    setFechaInicio(null);
    setFechaFinal(null);
    setSalario('');
    setSubsidioTransporte(false);
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
                    <h3 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">TRABAJO POR TIEMPO COMPLETO</h3>

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

                    <MDBInput label="Salario Mensual" type="number" value={salario} onChange={(e) => setSalario(Number(e.target.value))} className="mb-4" />
                    
                    <MDBRadio name="subsidioTransporte" id="subsidioSi" label="Con subsidio de transporte" checked={subsidioTransporte} onChange={() => setSubsidioTransporte(true)} className="mb-4" />
                    <MDBRadio name="subsidioTransporte" id="subsidioNo" label="Sin subsidio de transporte" checked={!subsidioTransporte} onChange={() => setSubsidioTransporte(false)} className="mb-4" />

                    <MDBBtn className='mb-4 w-100 gradient-custom-4 bg-info' size='lg' type='submit' onClick={calcularDiasLaborados}>Calcular</MDBBtn>
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

export default TrabajoCompleto;
