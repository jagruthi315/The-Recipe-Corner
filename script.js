// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     try {
//         const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const response = await data.json();
//         // Clear the container after fetching
//         recipeContainer.innerHTML = "";

//         // Check if meals are found
//         if (!response.meals) {
//             recipeContainer.innerHTML = `<h3>No recipe found for "${query}". Please try another dish!</h3>`;
//             return; // Exit the function if no recipes are found
//         }

//         // console.log(response.meals[0]);  we could have also done this if we want to access the  first meal only because that would be located on 0th index. 
//         // we can also apply for each loop  on it if we want ,since its an array... 
//         response.meals.forEach(meal => {
//             const recipeDiv = document.createElement('div');
//             recipeDiv.classList.add('recipe');
//             recipeDiv.innerHTML = `
//          <img src="${meal.strMealThumb}"
//          <br>
//          <h3>${meal.strMeal}</h3>
//           <p><span>${meal.strArea}</span> Dish</p>
//            <p><i>Category: ${meal.strCategory}</i></p>
          
//      `
//             const button = document.createElement('button');
//             button.textContent = "view Recipe";
//             recipeDiv.appendChild(button);

//             //  adding event listener to recipe button
//             button.addEventListener('click', () => {
//                 openRecipePopup(meal);
//             });

//             recipeContainer.appendChild(recipeDiv);
//         });

//         // function to fetch ingredients and measurements
//         const fetchIngredients = (meal) => {

//             let ingredientsList = " ";
//             for (i = 1; i <= 29; i++) {
//                 const ingredient = meal[`strIngredient${i}`];
//                 if (ingredient) {
//                     const measure = meal[`strMeasure${i}`];
//                     ingredientsList += `<li>${measure} ${ingredient}</li>`
//                 }
//                 else {
//                     break;
//                 }
//             }
//             return ingredientsList;
//         }
//         const openRecipePopup = (meal) => {

//             recipeDetailsContent.innerHTML = `
//            <h2 class="recipeName">${meal.strMeal}</h2>
//            <br>
//            <h3 class="ingredientList">ingredients:</h3>
//            <ul>${fetchIngredients(meal)}</ul>
//            <div class="recipeInstructions">
//            <h3>Instructions</h3>
           
//          <p>${meal.strInstructions}</p>
//          </div>
//            `

//             recipeDetailsContent.parentElement.style.display = "block";
//         }

//         recipeCloseBtn.addEventListener('click',()=>{
//            recipeDetailsContent.parentElement.style.display='none'; 
//         })
//     } catch (error) {
//         // Handle errors like network issues
//         recipeContainer.innerHTML = `<h3>Error fetching recipes. Please try again later!</h3>`;
//         console.error("Error:", error);
//     }
// };

// // Add event listener to the search button
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault(); // Prevent form submission
//     const searchInput = searchBox.value.trim(); // Get the search input
//     if (searchInput) {
//         fetchRecipes(searchInput); // Fetch recipes if input is valid
//     } else {
//         recipeContainer.innerHTML = "<h3>Please enter a dish name to search!</h3>";
//     }


// });
// //  e.preventDefault();  this prevents the data from getting auto-submitted and also prevents from the page being refreshed all the time even after a single click and that e is the parameter.








// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// // ✨ NEW FUNCTION: To fetch detailed recipe by ID (used for area filter)
// const getMealDetailsById = async (idMeal) => {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const data = await res.json();
//     return data.meals[0];
// };

// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";

//     try {
//         // ✨ MODIFIED: Try meal name search first
//         const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const mealResponse = await mealData.json();

//         // ✨ NEW: If no meals found, try area filter
//         if (!mealResponse.meals) {
//             const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
//             const areaResponse = await areaData.json();

//             recipeContainer.innerHTML = "";

//             if (!areaResponse.meals) {
//                 recipeContainer.innerHTML = `<h3>No recipe found for "${query}". Please try another dish!</h3>`;
//                 return;
//             }

//             // ✨ FOR AREA FILTER: Get each meal by ID to display full info
//             for (const item of areaResponse.meals) {
//                 const meal = await getMealDetailsById(item.idMeal);
//                 displayRecipeCard(meal);
//             }
//         } else {
//             recipeContainer.innerHTML = "";
//             mealResponse.meals.forEach(displayRecipeCard);
//         }

//         recipeCloseBtn.addEventListener('click', () => {
//             recipeDetailsContent.parentElement.style.display = 'none';
//         });

//     } catch (error) {
//         recipeContainer.innerHTML = `<h3>Error fetching recipes. Please try again later!</h3>`;
//         console.error("Error:", error);
//     }
// };

// // ✅ MOVED RECIPE CARD DISPLAY TO A SEPARATE FUNCTION
// const displayRecipeCard = (meal) => {
//     const recipeDiv = document.createElement('div');
//     recipeDiv.classList.add('recipe');
//     recipeDiv.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//         <br>
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea}</span> Dish</p>
//         <p><i>Category: ${meal.strCategory}</i></p>
//     `;

//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

//     button.addEventListener('click', () => {
//         openRecipePopup(meal);
//     });

//     recipeContainer.appendChild(recipeDiv);
// };

// // ✅ SEPARATE FUNCTION TO OPEN POPUP
// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <br>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstructions">
//             <h3>Instructions</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//     `;

//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // ✅ SAME INGREDIENT EXTRACTOR
// const fetchIngredients = (meal) => {
//     let ingredientsList = "";
//     for (let i = 1; i <= 29; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         if (ingredient) {
//             const measure = meal[`strMeasure${i}`];
//             ingredientsList += `<li>${measure} ${ingredient}</li>`;
//         } else {
//             break;
//         }
//     }
//     return ingredientsList;
// };

// // ✅ SEARCH BUTTON EVENT LISTENER (NO CHANGES HERE)
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim();
//     if (searchInput) {
//         fetchRecipes(searchInput);
//     } else {
//         recipeContainer.innerHTML = "<h3>Please enter a dish name to search!</h3>";
//     }
// });




// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// // ✅ Get meal details by ID (used for area search)
// const getMealDetailsById = async (idMeal) => {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const data = await res.json();
//     return data.meals[0];
// };

// // ✅ Function to display recipe cards
// const displayRecipeCard = (meal) => {
//     const recipeDiv = document.createElement('div');
//     recipeDiv.classList.add('recipe');
//     recipeDiv.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
//         <br>
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea}</span> Dish</p>
//         <p><i>Category: ${meal.strCategory}</i></p>
//     `;
//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

//     button.addEventListener('click', () => {
//         openRecipePopup(meal);
//     });

//     recipeContainer.appendChild(recipeDiv);
// };

// // ✅ Function to extract ingredients
// const fetchIngredients = (meal) => {
//     let ingredientsList = "";
//     for (let i = 1; i <= 29; i++) {
//         const ingredient = meal[`strIngredient${i}`];
//         if (ingredient) {
//             const measure = meal[`strMeasure${i}`];
//             ingredientsList += `<li>${measure} ${ingredient}</li>`;
//         } else {
//             break;
//         }
//     }
//     return ingredientsList;
// };

// // ✅ Function to open popup with recipe
// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <br>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstructions">
//             <h3>Instructions</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // ✅ Close popup
// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.style.display = 'none';
// });

// // ✅ Search by name or area
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";

//     try {
//         const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const mealResponse = await mealData.json();

//         if (!mealResponse.meals) {
//             // Try area search if name search failed
//             const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
//             const areaResponse = await areaData.json();

//             recipeContainer.innerHTML = "";

//             if (!areaResponse.meals) {
//                 recipeContainer.innerHTML = `<h3>No recipe found for "${query}". Please try another search!</h3>`;
//                 return;
//             }

//             // Get full meal details using ID
//             for (const item of areaResponse.meals) {
//                 const meal = await getMealDetailsById(item.idMeal);
//                 displayRecipeCard(meal);
//             }
//         } else {
//             recipeContainer.innerHTML = "";
//             mealResponse.meals.forEach(displayRecipeCard);
//         }
//     } catch (error) {
//         recipeContainer.innerHTML = `<h3>Error fetching recipes. Please try again later!</h3>`;
//         console.error("Error:", error);
//     }
// };

// // ✅ Search by first letter
// const fetchRecipesByLetter = async (letter) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     try {
//         const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         const data = await res.json();
//         recipeContainer.innerHTML = "";

//         if (!data.meals) {
//             recipeContainer.innerHTML = `<h3>No recipes found starting with "${letter.toUpperCase()}".</h3>`;
//             return;
//         }

//         data.meals.forEach(displayRecipeCard);

//     } catch (error) {
//         recipeContainer.innerHTML = "<h3>Error fetching recipes by letter.</h3>";
//         console.error("Error:", error);
//     }
// };

// // ✅ Single smart input box handler
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim().toLowerCase();

//     if (!searchInput) {
//         recipeContainer.innerHTML = "<h3>Please enter something to search!</h3>";
//         return;
//     }

//     if (searchInput.length === 1 && /^[a-z]$/.test(searchInput)) {
//         // 👈 If input is 1 letter, do letter search
//         fetchRecipesByLetter(searchInput);
//     } else {
//         // 👈 Otherwise, try name or area
//         fetchRecipes(searchInput);
//     }
// });


// // latest code

// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// // ✅ Load local recipes from customRecipes.js
// // You must include <script src="customRecipes.js"></script> above this file in your HTML

// // ✅ Get meal details by ID (used for area search)
// const getMealDetailsById = async (idMeal) => {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const data = await res.json();
//     return data.meals[0];
// };

// // ✅ Function to display any recipe card (API or custom)
// const displayRecipeCard = (meal) => {
//     const recipeDiv = document.createElement('div');
//     recipeDiv.classList.add('recipe');
//     recipeDiv.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//         <br>
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea || 'Unknown'}</span> Dish</p>
//         <p><i>Category: ${meal.strCategory || 'Misc'}</i></p>
//     `;
//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

//     button.addEventListener('click', () => {
//         openRecipePopup(meal);
//     });

//     recipeContainer.appendChild(recipeDiv);
// };

// // ✅ Function to extract ingredients
// const fetchIngredients = (meal) => {
//     if (meal.ingredients && Array.isArray(meal.ingredients)) {
//         return meal.ingredients.map(item => `<li>${item}</li>`).join('');
//     } else {
//         let ingredientsList = "";
//         for (let i = 1; i <= 29; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             if (ingredient) {
//                 const measure = meal[`strMeasure${i}`];
//                 ingredientsList += `<li>${measure} ${ingredient}</li>`;
//             } else {
//                 break;
//             }
//         }
//         return ingredientsList;
//     }
// };

// // ✅ Function to open popup with recipe details
// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <br>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstructions">
//             <h3>Instructions</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // ✅ Close popup
// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.style.display = 'none';
// });
// // ✅ Improved filter for local recipes — matches by name, area, or category
// const filterLocalRecipes = (query) => {
//     return customRecipes.filter(recipe => {
//         const q = query.toLowerCase();
//         return (
//             recipe.strMeal.toLowerCase().includes(q) ||
//             (recipe.strArea && recipe.strArea.toLowerCase().includes(q)) ||
//             (recipe.strCategory && recipe.strCategory.toLowerCase().includes(q))
//         );
//     });
// };

// // // ✅ Filter from local recipes
// // const filterLocalRecipes = (query) => {
// //     return customRecipes.filter(recipe =>
// //         recipe.strMeal.toLowerCase().includes(query.toLowerCase())
// //     );
// // };

// // ✅ Main fetch function (from API + local)
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     let foundAny = false;

//     try {
//         // 🌐 Try fetching from API (by name)
//         const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const mealResponse = await mealData.json();

//         recipeContainer.innerHTML = "";

//         if (mealResponse.meals) {
//             foundAny = true;
//             mealResponse.meals.forEach(displayRecipeCard);
//         } else {
//             // 🌍 Try fetching by Area if not found by name
//             const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
//             const areaResponse = await areaData.json();

//             if (areaResponse.meals) {
//                 foundAny = true;
//                 for (const item of areaResponse.meals) {
//                     const meal = await getMealDetailsById(item.idMeal);
//                     displayRecipeCard(meal);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("API error:", error);
//     }

//     // 🏠 Always check local custom recipes too
//     const localResults = filterLocalRecipes(query);
//     if (localResults.length > 0) {
//         foundAny = true;
//         localResults.forEach(displayRecipeCard);
//     }

//     // 😢 If neither found anything
//     if (!foundAny) {
//         recipeContainer.innerHTML = `<h3>No recipes found for "${query}".</h3>`;
//     }
// };

// // ✅ Search by first letter (API only)
// const fetchRecipesByLetter = async (letter) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     try {
//         const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         const data = await res.json();
//         recipeContainer.innerHTML = "";

//         if (!data.meals) {
//             recipeContainer.innerHTML = `<h3>No recipes found starting with "${letter.toUpperCase()}".</h3>`;
//             return;
//         }

//         data.meals.forEach(displayRecipeCard);

//     } catch (error) {
//         recipeContainer.innerHTML = "<h3>Error fetching recipes by letter.</h3>";
//         console.error("Error:", error);
//     }
// };

// // ✅ Search handler
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim().toLowerCase();

//     if (!searchInput) {
//         recipeContainer.innerHTML = "<h3>Please enter something to search!</h3>";
//         return;
//     }

//     if (searchInput.length === 1 && /^[a-z]$/.test(searchInput)) {
//         fetchRecipesByLetter(searchInput);
//     } else {
//         fetchRecipes(searchInput);
//     }
// });


// latest code again

// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// // ✅ Get meal details by ID (used for API area search)
// const getMealDetailsById = async (idMeal) => {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const data = await res.json();
//     return data.meals[0];
// };

// // ✅ Show a recipe card (works for API or custom)
// const displayRecipeCard = (meal) => {
//     const recipeDiv = document.createElement('div');
//     recipeDiv.classList.add('recipe');
//     recipeDiv.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//         <br>
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea || 'Unknown'}</span> Dish</p>
//         <p><i>Category: ${meal.strCategory || 'Misc'}</i></p>
//     `;
//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

//     button.addEventListener('click', () => {
//         openRecipePopup(meal);
//     });

//     recipeContainer.appendChild(recipeDiv);
// };

// // ✅ Show ingredients (API or custom format)
// const fetchIngredients = (meal) => {
//     if (meal.ingredients && Array.isArray(meal.ingredients)) {
//         return meal.ingredients.map(item => `<li>${item}</li>`).join('');
//     } else {
//         let ingredientsList = "";
//         for (let i = 1; i <= 29; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             if (ingredient) {
//                 const measure = meal[`strMeasure${i}`];
//                 ingredientsList += `<li>${measure} ${ingredient}</li>`;
//             } else {
//                 break;
//             }
//         }
//         return ingredientsList;
//     }
// };

// // ✅ Show popup with instructions
// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <br>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstructions">
//             <h3>Instructions</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // ✅ Close popup
// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.style.display = 'none';
// });

// // ✅ Filter custom recipes (by name, area, or category)
// const filterLocalRecipes = (query) => {
//     const q = query.toLowerCase();
//     return customRecipes.filter(recipe =>
//         recipe.strMeal.toLowerCase().includes(q) ||
//         (recipe.strArea && recipe.strArea.toLowerCase().includes(q)) ||
//         (recipe.strCategory && recipe.strCategory.toLowerCase().includes(q))
//     );
// };

// // ✅ Main recipe fetcher (API + local fallback)
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     let foundAny = false;

//     try {
//         // 🌐 Try API by name
//         const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const mealResponse = await mealData.json();
//         recipeContainer.innerHTML = "";

//         if (mealResponse.meals) {
//             foundAny = true;
//             mealResponse.meals.forEach(displayRecipeCard);
//         } else {
//             // 🌐 Try API by area if name fails
//             const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
//             const areaResponse = await areaData.json();

//             if (areaResponse.meals) {
//                 foundAny = true;
//                 for (const item of areaResponse.meals) {
//                     const meal = await getMealDetailsById(item.idMeal);
//                     displayRecipeCard(meal);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("API error:", error);
//     }

//     // 🏠 Always check custom recipes
//     const localResults = filterLocalRecipes(query);
//     if (localResults.length > 0) {
//         foundAny = true;
//         localResults.forEach(displayRecipeCard);
//     }

//     if (!foundAny) {
//         recipeContainer.innerHTML = `<h3>No recipes found for "${query}".</h3>`;
//     }
// };

// // ✅ Search by first letter (API only)
// const fetchRecipesByLetter = async (letter) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     try {
//         const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         const data = await res.json();
//         recipeContainer.innerHTML = "";

//         if (!data.meals) {
//             recipeContainer.innerHTML = `<h3>No recipes found starting with "${letter.toUpperCase()}".</h3>`;
//             return;
//         }

//         data.meals.forEach(displayRecipeCard);
//     } catch (error) {
//         recipeContainer.innerHTML = "<h3>Error fetching recipes by letter.</h3>";
//         console.error("Error:", error);
//     }
// };

// // ✅ Handle search input
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim().toLowerCase();

//     if (!searchInput) {
//         recipeContainer.innerHTML = "<h3>Please enter something to search!</h3>";
//         return;
//     }

//     if (searchInput.length === 1 && /^[a-z]$/.test(searchInput)) {
//         fetchRecipesByLetter(searchInput);
//     } else {
//         fetchRecipes(searchInput);
//     }
// });


// ✅ script.js — Now fully integrated with ingredient search for customRecipes

// const searchButton = document.querySelector('.button');
// const searchBox = document.querySelector('.searchbox');
// const recipeContainer = document.querySelector('.recipe-container');
// const recipeDetailsContent = document.querySelector('.recipe-details-content');
// const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// // ✅ Get meal details by ID (used for API area search)
// const getMealDetailsById = async (idMeal) => {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
//     const data = await res.json();
//     return data.meals[0];
// };

// // ✅ Show a recipe card (works for API or custom)
// const displayRecipeCard = (meal) => {
//     const recipeDiv = document.createElement('div');
//     recipeDiv.classList.add('recipe');
//     recipeDiv.innerHTML = `
//         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
//         <br>
//         <h3>${meal.strMeal}</h3>
//         <p><span>${meal.strArea || 'Unknown'}</span> Dish</p>
//         <p><i>Category: ${meal.strCategory || 'Misc'}</i></p>
//     `;
//     const button = document.createElement('button');
//     button.textContent = "View Recipe";
//     recipeDiv.appendChild(button);

//     button.addEventListener('click', () => {
//         openRecipePopup(meal);
//     });

//     recipeContainer.appendChild(recipeDiv);
// };

// // ✅ Show ingredients (API or custom format)
// const fetchIngredients = (meal) => {
//     if (meal.ingredients && Array.isArray(meal.ingredients)) {
//         return meal.ingredients.map(item => `<li>${item}</li>`).join('');
//     } else {
//         let ingredientsList = "";
//         for (let i = 1; i <= 29; i++) {
//             const ingredient = meal[`strIngredient${i}`];
//             if (ingredient) {
//                 const measure = meal[`strMeasure${i}`];
//                 ingredientsList += `<li>${measure} ${ingredient}</li>`;
//             } else {
//                 break;
//             }
//         }
//         return ingredientsList;
//     }
// };

// // ✅ Show popup with instructions
// const openRecipePopup = (meal) => {
//     recipeDetailsContent.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <br>
//         <h3 class="ingredientList">Ingredients:</h3>
//         <ul>${fetchIngredients(meal)}</ul>
//         <div class="recipeInstructions">
//             <h3>Instructions</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//     `;
//     recipeDetailsContent.parentElement.style.display = "block";
// };

// // ✅ Close popup
// recipeCloseBtn.addEventListener('click', () => {
//     recipeDetailsContent.parentElement.style.display = 'none';
// });

// // ✅ Filter custom recipes (by name, area, category, or ingredients)
// const filterLocalRecipes = (query) => {
//     const q = query.toLowerCase();
//     return customRecipes.filter(recipe => {
//         const ingredientsMatch = recipe.ingredients?.some(ing => ing.toLowerCase().includes(q));
//         const basicMatch =
//             recipe.strMeal.toLowerCase().includes(q) ||
//             (recipe.strArea && recipe.strArea.toLowerCase().includes(q)) ||
//             (recipe.strCategory && recipe.strCategory.toLowerCase().includes(q));
//         return basicMatch || ingredientsMatch;
//     });
// };

// // ✅ Main recipe fetcher (API + local fallback)
// const fetchRecipes = async (query) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     let foundAny = false;

//     try {
//         // 🌐 Try API by name
//         const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//         const mealResponse = await mealData.json();
//         recipeContainer.innerHTML = "";

//         if (mealResponse.meals) {
//             foundAny = true;
//             mealResponse.meals.forEach(displayRecipeCard);
//         } else {
//             // 🌐 Try API by area if name fails
//             const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
//             const areaResponse = await areaData.json();

//             if (areaResponse.meals) {
//                 foundAny = true;
//                 for (const item of areaResponse.meals) {
//                     const meal = await getMealDetailsById(item.idMeal);
//                     displayRecipeCard(meal);
//                 }
//             }
//         }
//     } catch (error) {
//         console.error("API error:", error);
//     }

//     // 🏠 Always check custom recipes
//     const localResults = filterLocalRecipes(query);
//     if (localResults.length > 0) {
//         foundAny = true;
//         localResults.forEach(displayRecipeCard);
//     }

//     if (!foundAny) {
//         recipeContainer.innerHTML = `<h3>No recipes found for "${query}".</h3>`;
//     }
// };

// // ✅ Search by first letter (API only)
// const fetchRecipesByLetter = async (letter) => {
//     recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
//     try {
//         const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//         const data = await res.json();
//         recipeContainer.innerHTML = "";

//         if (!data.meals) {
//             recipeContainer.innerHTML = `<h3>No recipes found starting with "${letter.toUpperCase()}".</h3>`;
//             return;
//         }

//         data.meals.forEach(displayRecipeCard);
//     } catch (error) {
//         recipeContainer.innerHTML = "<h3>Error fetching recipes by letter.</h3>";
//         console.error("Error:", error);
//     }
// };

// // ✅ Handle search input
// searchButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     const searchInput = searchBox.value.trim().toLowerCase();

//     if (!searchInput) {
//         recipeContainer.innerHTML = "<h3>Please enter something to search!</h3>";
//         return;
//     }

//     if (searchInput.length === 1 && /^[a-z]$/.test(searchInput)) {
//         fetchRecipesByLetter(searchInput);
//     } else {
//         fetchRecipes(searchInput);
//     }
// });
// // ✅ Ingredient-based search for 3latestai.html
// function findMeals() {
//     const input = document.querySelector("#ingredientsInput").value.trim().toLowerCase();
//     const status = document.getElementById("statusMessage");
//     const resultDiv = document.getElementById("results");

//     status.innerHTML = "Searching recipes...";
//     resultDiv.innerHTML = "";

//     if (!input) {
//         status.innerHTML = "<p>Please enter ingredients.</p>";
//         return;
//     }

//     const ingredients = input.split(",").map(item => item.trim());

//     const matchedRecipes = customRecipes.filter(recipe =>
//         ingredients.every(ing =>
//             recipe.ingredients?.some(item => item.toLowerCase().includes(ing))
//         )
//     );

//     if (matchedRecipes.length === 0) {
//         status.innerHTML = `<p>No recipes found using "${input}".</p>`;
//         return;
//     }

//     status.innerHTML = `<p>Found ${matchedRecipes.length} recipes:</p>`;

//     matchedRecipes.forEach(recipe => {
//         const recipeHTML = `
//             <div class="recipe">
//                 <h3>${recipe.strMeal}</h3>
//                 <img src="${recipe.strMealThumb !== 'No image found' ? recipe.strMealThumb : 'images/default.jpg'}" alt="${recipe.strMeal}">
//                 <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
//                 <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>
//             </div>
//         `;
//         resultDiv.innerHTML += recipeHTML;
//     });
// }
const searchButton = document.querySelector('.button');
const searchBox = document.querySelector('.searchbox');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// ✅ Get meal details by ID (for area-based fetch)
const getMealDetailsById = async (idMeal) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await res.json();
    return data.meals[0];
};

// ✅ Display any recipe (API or custom)
const displayRecipeCard = (meal) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb !== 'No image found' ? meal.strMealThumb : 'images/default.jpg'}" alt="${meal.strMeal}" />
        <br>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea || 'Unknown'}</span> Dish</p>
        <p><i>Category: ${meal.strCategory || 'Misc'}</i></p>
    `;

    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

    button.addEventListener('click', () => {
        openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
};

// ✅ Show ingredients (API or custom format)
const fetchIngredients = (meal) => {
    if (meal.ingredients && Array.isArray(meal.ingredients)) {
        return meal.ingredients.map(item => `<li>${item}</li>`).join('');
    } else {
        let ingredientsList = "";
        for (let i = 1; i <= 29; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                const measure = meal[`strMeasure${i}`];
                ingredientsList += `<li>${measure} ${ingredient}</li>`;
            } else {
                break;
            }
        }
        return ingredientsList;
    }
};

// ✅ Open popup with recipe details
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <br>
        <h3 class="ingredientList">Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    recipeDetailsContent.parentElement.style.display = "block";
};

// ✅ Close popup
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = 'none';
});

// ✅ Filter local recipes (meal name, area, category, ingredients)
const filterLocalRecipes = (query) => {
    const q = query.toLowerCase();
    return customRecipes.filter(recipe => {
        const ingredientsMatch = recipe.ingredients?.some(ing => ing.toLowerCase().includes(q));
        const basicMatch =
            recipe.strMeal.toLowerCase().includes(q) ||
            (recipe.strArea && recipe.strArea.toLowerCase().includes(q)) ||
            (recipe.strCategory && recipe.strCategory.toLowerCase().includes(q));
        return basicMatch || ingredientsMatch;
    });
};

// ✅ Search from both API and local
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
    let foundAny = false;

    try {
        const mealData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const mealResponse = await mealData.json();
        recipeContainer.innerHTML = "";

        if (mealResponse.meals) {
            foundAny = true;
            mealResponse.meals.forEach(displayRecipeCard);
        } else {
            const areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
            const areaResponse = await areaData.json();

            if (areaResponse.meals) {
                foundAny = true;
                for (const item of areaResponse.meals) {
                    const meal = await getMealDetailsById(item.idMeal);
                    displayRecipeCard(meal);
                }
            }
        }
    } catch (error) {
        console.error("API error:", error);
    }

    // ✅ Check local recipes
    const localResults = filterLocalRecipes(query);
    if (localResults.length > 0) {
        foundAny = true;
        localResults.forEach(displayRecipeCard);
    }

    if (!foundAny) {
        recipeContainer.innerHTML = `<h3>No recipes found for "${query}".</h3>`;
    }
};

// ✅ Search by first letter (API only)
const fetchRecipesByLetter = async (letter) => {
    recipeContainer.innerHTML = "<h3><i>Fetching Recipes...</i></h3>";
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await res.json();
        recipeContainer.innerHTML = "";

        if (!data.meals) {
            recipeContainer.innerHTML = `<h3>No recipes found starting with "${letter.toUpperCase()}".</h3>`;
            return;
        }

        data.meals.forEach(displayRecipeCard);
    } catch (error) {
        recipeContainer.innerHTML = "<h3>Error fetching recipes by letter.</h3>";
        console.error("Error:", error);
    }
};

// ✅ Search button logic
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim().toLowerCase();

    if (!searchInput) {
        recipeContainer.innerHTML = "<h3>Please enter something to search!</h3>";
        return;
    }

    if (searchInput.length === 1 && /^[a-z]$/.test(searchInput)) {
        fetchRecipesByLetter(searchInput);
    } else {
        fetchRecipes(searchInput);
    }
});

// ✅ INGREDIENT-BASED SEARCH for 3latestai.html
function findMeals() {
    const input = document.querySelector("#ingredientsInput").value.trim().toLowerCase();
    const status = document.getElementById("statusMessage");
    const resultDiv = document.getElementById("results");

    status.innerHTML = "Searching recipes...";
    resultDiv.innerHTML = "";

    if (!input) {
        status.innerHTML = "<p>Please enter ingredients.</p>";
        return;
    }

    const ingredients = input.split(",").map(item => item.trim());

    const matchedRecipes = customRecipes.filter(recipe =>
        ingredients.every(ing =>
            recipe.ingredients?.some(item => item.toLowerCase().includes(ing))
        )
    );

    if (matchedRecipes.length === 0) {
        status.innerHTML = `<p>No recipes found using "${input}".</p>`;
        return;
    }

    status.innerHTML = `<p>Found ${matchedRecipes.length} recipes:</p>`;

matchedRecipes.forEach(recipe => {
  const recipeDiv = document.createElement("div");
  recipeDiv.classList.add("recipe");
  recipeDiv.innerHTML = `
    <img src="${recipe.strMealThumb !== 'No image found' ? recipe.strMealThumb : 'images/default.jpg'}" alt="${recipe.strMeal}" />
    <br>
    <h3>${recipe.strMeal}</h3>
    <p><span>${recipe.strArea || 'Unknown'}</span> Dish</p>
    <p><i>Category: ${recipe.strCategory || 'Misc'}</i></p>
  `;
  const button = document.createElement('button');
  button.textContent = "View Recipe";
  button.addEventListener('click', () => {
    openRecipePopup(recipe);
  });
  recipeDiv.appendChild(button);

  resultDiv.appendChild(recipeDiv);
});

}
