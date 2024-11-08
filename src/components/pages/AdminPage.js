import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import to access Redux state

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');

  // Access token from Redux store
  const token = useSelector((state) => state.auth.token);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    // Define the new recipe data
    const newRecipe = {
      name,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()), // Convert ingredients to array
      instructions,
      category,
      preparationTime, // Keep as string
      cookingTime,     // Keep as string
      servings         // Keep as string
    };

    try {
      // Make the request with the Authorization header
      const response = await axios.post('http://localhost:4000/api/recipe', newRecipe, {
        headers: {
          Authorization: `Bearer ${token}` // Use token from Redux store
        }
      });

      if (response.status === 201) {
        alert('Recipe added successfully!');
        
        // Optionally clear the form fields after successful submission
        setName('');
        setIngredients('');
        setInstructions('');
        setCategory('');
        setPreparationTime('');
        setCookingTime('');
        setServings('');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <form onSubmit={handleAddRecipe} className="container mt-5">
      <h2>Add New Recipe</h2>

      <div className="form-group">
        <label>Recipe Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Ingredients (separated by commas)</label>
        <input type="text" className="form-control" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Instructions</label>
        <textarea className="form-control" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Preparation Time (minutes)</label>
        <input type="text" className="form-control" value={preparationTime} onChange={(e) => setPreparationTime(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Cooking Time (minutes)</label>
        <input type="text" className="form-control" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Servings</label>
        <input type="text" className="form-control" value={servings} onChange={(e) => setServings(e.target.value)} required />
      </div>

      <button type="submit" className="btn btn-primary">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
