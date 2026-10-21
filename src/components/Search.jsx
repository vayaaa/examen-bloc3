import React, { useState } from "react";


//Composant de recherche
const Search = ({ onSearch, cities, onSelectCity}) => {

    const [text, setText] = useState("")

    //Gérer le formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // pas de rechargement de la page

        const cleanText = text.trim();

        if (cleanText === "") {
            return;
        }

        onSearch(cleanText);
    };


    return (
        <div className="search-container">
            <p>Rechercher un restaurant</p>

            {/* Barre de recherche */}
            <form className="search-form" onSubmit={handleSubmit}>
                <input className="search-text" type="text" placeholder="Entrez une ville" value={text} onChange={(e) => setText(e.target.value)} />
                <button className="search-button" type="submit"><img className="search-icon" src="/img/search-icon.svg" alt="Rechercher" /></button>
            </form>

            {/* Affichage des villes recherchées */}
            {cities.length > 0 && (
                <ul className="city-options">
                    {cities.map((city) => (
                        <li key={city.place_id}>
                            <button type="button" onClick={() => { setText(city.display_name); onSelectCity(city) }}>
                                {city.display_name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Search