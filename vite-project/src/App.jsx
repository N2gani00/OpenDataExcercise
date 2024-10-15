import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have some CSS styles here

function App() {
  const [loading, setLoading] = useState(true); // track loading status
  const [cocktail, setCocktail] = useState(null); // State for random cocktail
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Fetch a random cocktail when the component loads
  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  const fetchRandomCocktail = () => {
    setLoading(true);
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data for debugging
        setCocktail(data.drinks[0]); // Set cocktail state to the first drink result
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (searchTerm.trim()) {
      fetchCocktailByName(searchTerm);
    }
  };

  const fetchCocktailByName = (name) => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data for debugging
        setSearchResults(data.drinks || []); // Set search results or empty array
        setCocktail(data.drinks ? data.drinks[0] : null); // Set cocktail to the first result or null
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cocktail of the Day</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a cocktail"
          style={{ padding: '10px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '5px', borderRadius: '4px' }}>
          Search
        </button>
      </form>

      {/* Display loading status or cocktail information */}
      {loading ? (
        <p>Loading...</p>
      ) : cocktail ? (
        <div>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} style={{ width: '200px', height: 'auto' }} />
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            <li>{cocktail.strMeasure1} {cocktail.strIngredient1}</li>
            <li>{cocktail.strMeasure2} {cocktail.strIngredient2}</li>
            <li>{cocktail.strMeasure3} {cocktail.strIngredient3}</li>
          </ul>
        </div>
      ) : (
        <p>No cocktail found.</p>
      )}
    </div>
  );
}

export default App;

/* We have now finished the setup stage! */
