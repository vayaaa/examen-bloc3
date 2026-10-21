import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


//Déplacer la carte sur la ville selectionnée
const ChangeMapCity = ({ selectedCity }) => {
    const map = useMap();

    //Effectuer à chaque fois que selectedCity et map changent
    useEffect(() => {

        if (!selectedCity) {
            return;
        }

        //Convertir les coordonnées en nombre
        const lat = Number(selectedCity.lat);
        const lon = Number(selectedCity.lon);

        //Déplace la carte vers le point
        map.flyTo([lat, lon], 15)

    }, [selectedCity, map]);

    return null;
}

//Affiche la carte et les éléments d'infos 
const Map = ({ selectedCity, restaurants = [], onSelectResto }) => {
    const position = [48.85341, 2.3488]; //Position de base: Paris

    return (
        <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapCity selectedCity={selectedCity} />


            {/* Popup des restaurants */}
            {restaurants.map((restaurants) => (
                <Marker key={restaurants.name_Id} position={[Number(restaurants.lat), Number(restaurants.lon)]}>
                    <Popup className="popup">
                        <p>{restaurants.display_name}</p>
                        <button className="chose-button" type="button" >Choisir</button>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    )
}

export default Map