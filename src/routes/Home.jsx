import React, { useState } from "react";
import Search from "../components/Search";
import Map from "../components/Map";
import { searchCities, searchRestaurants } from "../services/nominatim";


const Home = () => {

  //state qui stock les villes
  const [cities, setCities] = useState([])

  //state qui stock la ville recherché/selectionné
  const [selectedCity, setSelectedCity] = useState(null);

  //state qui stock les macdo
  const [restaurants, setRestaurants] = useState([]);

  //state qui stock le macdo recherché/selectionné
  const [selectedResto, setSelectedResto] = useState();

  //state qui stock les erreurs
  const [error, setError] = useState();



  //Gérer la recherche de ville
  const handleSearch = async (name) => {
    try {
      const result = await searchCities(name);
      setCities(result);
    } catch (err) {
      setError("Impossible de charger les villes")
    }
  }

  //Gérer la ville selectionné et la recherche de restaurants dans celle-ci
  const handleSelectCity = async (city) => {
    setSelectedCity(city);
    setRestaurants([]);
    setCities([]);
    setError("");

    try {
      const result = await searchRestaurants(city);
      setRestaurants(result);
    } catch (err) {
       setError("Impossible de charger les restaurants")
    }
  }

  //Gérer le macdo selectionné
  const handleSelectMacdo = (restaurants) => {
    setSelectedResto(restaurants);
    setRestaurants([]);
  }




  return (
    <div className="home">
      {/* Barre de recherche */}
      <Search onSearch={handleSearch} cities={cities} onSelectCity={handleSelectCity} />

      
      {/* Carte */}
      <Map className="map" selectedCity={selectedCity} restaurants={restaurants} onSelectResto={handleSelectMacdo} />
    </div>
  )
}


export default Home