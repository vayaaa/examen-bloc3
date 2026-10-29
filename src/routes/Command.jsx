import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

//Lire le storage
const readStorage = (key) => {
    const saved = localStorage.getItem(key);

    if (saved === null) {
        return null;
    }
    try {
        return JSON.parse(saved);
    } catch (error) {
        return null;
    }
}

const Command = () => {

    const navigate = useNavigate();
    //Lecture des infos dans le localStorage
    const selectedCity = readStorage("selectedCity");
    const selectedResto = readStorage("selectedResto");

    if (!selectedCity || !selectedResto) {
        return <Navigate to="/" replace />;
    }

    const changePage = () => {
        localStorage.removeItem("selectedResto");
        navigate(`/`);
    }


    return (
        <div className="command">
            <header>
                <h1>Restaurant séléctionné</h1>
                <button className="map-button" type="button" onClick={changePage}><img className="map-icon" src="/img/map.svg" alt="Retour carte" /></button>
            </header>
            <p>Ville: {selectedCity.display_name}</p>
            <p>{selectedResto.display_name}</p>
        </div>
    )
}


export default Command