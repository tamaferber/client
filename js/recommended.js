// 1. Получаем продукты из MongoDB
async function getFridgeItems() {
  try {
    const res = await fetch("https://smartfridge-server.onrender.com/api/fridge");
    const data = await res.json();
    console.log("products from DB:", data);

    // нам нужны только названия продуктов
    return data.map(item => item.name.toLowerCase());
  } catch (err) {
    console.error("error getting products:", err);
    return [];
  }
}

// 2. Получаем рецепты из Spoonacular
async function getRecipesFromAPI(ingredients) {
  const apiKey = "bf26187e69f14d079d662a8e04c545ea"; // замени на свой API key от Spoonacular
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(",")}&number=6&apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const recipes = await res.json();
    console.log("recipes from API:", recipes);
    return recipes;
  } catch (err) {
    console.error("error getting recipe:", err);
    return [];
  }
}

// 3. Рендеринг рецептов на страницу
function showRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = ""; // очищаем перед обновлением

  if (!recipes.length) {
    container.innerHTML = "<p>recipes not found</p>";
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    // Блок с текстом
    const textDiv = document.createElement("div");
    textDiv.classList.add("recipe-text");

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    const description = document.createElement("p");
    description.textContent = `products in usage: ${recipe.usedIngredientCount}, additional: ${recipe.missedIngredientCount}`;

    const link = document.createElement("a");
    link.href = `https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}`;
    link.textContent = "view recipe";
    link.target = "_blank";

    textDiv.appendChild(title);
    textDiv.appendChild(description);
    textDiv.appendChild(link);

    // Картинка
    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.title;

    // Собираем карточку
    card.appendChild(textDiv);
    card.appendChild(img);

    container.appendChild(card);
  });
}


// 4. Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  const fridgeItems = await getFridgeItems();
  if (!fridgeItems.length) {
    alert("the fridge is empty!");
    return;
  }
  const recipes = await getRecipesFromAPI(fridgeItems);
  showRecipes(recipes);
});
