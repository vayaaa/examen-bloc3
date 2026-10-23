import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//Marker
var marker = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: markerShadow,
    shadowSize: [41, 41]
});



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
        map.flyTo([lat, lon], 13)

    }, [selectedCity, map]);

    return null;
}


//Affiche la carte et les éléments d'infos 
const Map = ({ selectedCity, restaurants = [], onSelectResto }) => {
    const position = [48.85341, 2.3488]; //Position de base: Paris

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapCity selectedCity={selectedCity} />


            {/* Popup des restaurants */}
            {restaurants.map((restaurant) => (
                <Marker key={restaurant.place_id} position={[Number(restaurant.lat), Number(restaurant.lon)]} icon={marker}>
                    <Popup className="popup">
                        <p>{restaurant.display_name}</p>
                        <button className="chose-button" type="button" onClick={() => onSelectResto(restaurant)}>Choisir</button>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    )
}

export default Map