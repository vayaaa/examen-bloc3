import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Command = () => {

    const [selectedResto, setSelectedResto] = useState(() => {
        const savedSelectedResto = localStorage.getItem("selectedResto")

        return savedSelectedResto ? JSON.parse(savedSelectedResto) : null
    })


    const [selectedCity, setSelectedCity] = useState(() => {
        const savedSelectedCity = localStorage.getItem("selectedCity")

        return savedSelectedCity ? JSON.parse(savedSelectedCity) : null
    })


     const [restaurants, setRestaurants] = useState(() => {
        const savedRestaurants = localStorage.getItem("restaurants")

        return savedRestaurants ? JSON.parse(savedRestaurants) : null
    })

    const navigate = useNavigate();
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