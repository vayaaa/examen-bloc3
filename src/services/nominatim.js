// API Nominatim pour la recherche de ville 

const BASE_URL = import.meta.env.VITE_NOMINATIM_URL;

//Chercher une ville
export async function searchCities(name) {
    const params = new URLSearchParams({
        q: name,
        format: "json",
        limit: 1,
        countrycodes: "fr",
        featureType: "city",
    });

    const response = await fetch(`${BASE_URL}/search?${params}`);

    if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
    }

    return response.json();
}


//Chercher un mcdo
export async function searchRestaurants(city) {

const [south, north, west, east] = city.boundingbox;

    const params = new URLSearchParams({
        q: "McDonald's",
        format: "json",
        limit: 40,
        viewbox: `${west},${north},${east},${south}`,
        bounded: 1,
    });

      const response = await fetch(`${BASE_URL}/search?${params}`);

       if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
    }

    return response.json();

}

