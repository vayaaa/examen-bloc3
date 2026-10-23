import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Map from "../components/Map";
import { searchCities, searchRestaurants } from "../services/nominatim";
import Drawer from "../components/Drawer";


const Home = () => {

  //state qui stock les villes
  const [cities, setCities] = useState([])


  //state qui stock la ville recherché/selectionné
  const [selectedCity, setSelectedCity] = useState(() => {
    const savedSelectedCity = localStorage.getItem("selectedCity")

    return savedSelectedCity ? JSON.parse(savedSelectedCity) : null
  });
  //sauvegarde à chaque modif
  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", JSON.stringify(selectedCity))
    }
  }, [selectedCity]);


  //state qui stock les macdo
  const [restaurants, setRestaurants] = useState(() => {
    const savedRestaurants = localStorage.getItem("restaurants")

    return savedRestaurants ? JSON.parse(savedRestaurants) : []
  });
  useEffect(() => {
    if (restaurants) {
      localStorage.setItem("restaurants", JSON.stringify(restaurants))
    }
  }, [restaurants]);


  //state qui stock le macdo recherché/selectionné + stock dans le localstorage
  const [selectedResto, setSelectedResto] = useState(() => {
    const savedSelectedResto = localStorage.getItem("selectedResto")

    return savedSelectedResto ? JSON.parse(savedSelectedResto) : null
  });
  useEffect(() => {
    if (selectedResto) {
      localStorage.setItem("selectedResto", JSON.stringify(selectedResto))
    }
  }, [selectedResto]);


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
      //console.log(result);
      setRestaurants(result);
    } catch (err) {
      setError("Impossible de charger les restaurants")
    }
  }

  //Gérer le macdo selectionné
  const handleSelectMacdo = (restaurants) => {
    setSelectedResto(restaurants);
  }


  return (
    <div className="home">
      {/* Barre de recherche */}
      <Search onSearch={handleSearch} cities={cities} onSelectCity={handleSelectCity} />

      {/* Carte */}
      <Map className="map" selectedCity={selectedCity} restaurants={restaurants} onSelectResto={handleSelectMacdo} />

      {/* Volet déroulant */}
      <Drawer selectedCity={selectedCity} restaurants={restaurants} selectedResto={selectedResto} />
    </div>
  )
}


export default Home