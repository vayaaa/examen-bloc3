import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';
import App from './App.jsx'



//On recharge la page? si oui clear localStorage
const navigation = performance.getEntriesByType("navigation")[0]

if(navigation && navigation.type === "reload"){
  localStorage.removeItem("selectedCity");
  localStorage.removeItem("selectedResto");
  localStorage.removeItem("restaurants");

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
