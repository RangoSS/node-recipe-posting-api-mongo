import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [recipes, setRecipes] = useState([]);

  // Fetch recipe data from the API
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/recipe')
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Recipe Gallery</h1>
      <div className="row justify-content-center">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '20rem' }}>
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p className="card-text">
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {recipe.category}
                </p>
                <p className="card-text">
                  <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
                </p>
                <p className="card-text">
                  <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </p>
                <p className="card-text">
                  <strong>Servings:</strong> {recipe.servings}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
