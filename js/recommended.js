// 1. Получаем продукты из MongoDB
async function getFridgeItems() {
  try {
    const res = await fetch("http://localhost:3000/api/fridge");
    const data = await res.json();
    console.log("Продукты из базы:", data);

    // нам нужны только названия продуктов
    return data.map(item => item.name.toLowerCase());
  } catch (err) {
    console.error("Ошибка при получении продуктов:", err);
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
    console.log("Рецепты из API:", recipes);
    return recipes;
  } catch (err) {
    console.error("Ошибка при получении рецептов:", err);
    return [];
  }
}

// 3. Рендеринг рецептов на страницу
function showRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = ""; // очищаем перед обновлением

  if (!recipes.length) {
    container.innerHTML = "<p>Нет рецептов для отображения</p>";
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
    description.textContent = `Использованные ингредиенты: ${recipe.usedIngredientCount}, дополнительные: ${recipe.missedIngredientCount}`;

    const link = document.createElement("a");
    link.href = `https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}`;
    link.textContent = "Смотреть рецепт";
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
    alert("В холодильнике пока нет сохранённых продуктов!");
    return;
  }
  const recipes = await getRecipesFromAPI(fridgeItems);
  showRecipes(recipes);
});
