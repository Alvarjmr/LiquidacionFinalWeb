import React from 'react';
import "./Navbar.css";
import "./Panel.css"
import { useContext  } from "react";
import { initFirestore } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { InformacionCuenta } from '../Context/Contex';


function Navbar() {
  const contex = useContext(InformacionCuenta);
 
  
 
return (
    
    <div className='navbar bg-info'>   

        
       
          <section>
            <h1>Bienvenidos a Simulador de Liquidacion Valentino</h1>

          </section>
 
      
            
            
       
<div>
<img src="../../../../public/assets/Logo.jpg" alt="" />
</div>
</div>
    
    
  )
}

export default Navbar