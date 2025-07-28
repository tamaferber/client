// 1.  MongoDBמקבלים את המוצק מ MongoDB
async function getFridgeItems() {
  try {
    const res = await fetch("https://smartfridge-server.onrender.com/api/fridge");
    const data = await res.json();
    console.log("products from DB:", data);

    return data.map(item => item.name.toLowerCase());
  } catch (err) {
    console.error("error getting products:", err);
    return [];
  }
}

// 2. מקבליפ מתכונים מ Spoonacular
async function getRecipesFromAPI(ingredients) {
  const apiKey = "bf26187e69f14d079d662a8e04c545ea";
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

// 3. העלת מתכונים לעמוד 
async function showRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = "";

  if (!recipes.length) {
    container.innerHTML = "<p>recipes not found</p>";
    return;
  }

  for (const recipe of recipes) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const textDiv = document.createElement("div");
    textDiv.classList.add("recipe-text");

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    const summaryHTML = await getRecipeSummary(recipe.id);
    const summaryText = summaryHTML ? stripHTML(summaryHTML).slice(0, 100) + "..." : "";

    const summaryP = document.createElement("p");
    summaryP.classList.add("description");
    summaryP.textContent = summaryText;

    const description = document.createElement("p");
    description.textContent = `products in usage: ${recipe.usedIngredientCount}, additional: ${recipe.missedIngredientCount}`;

    const link = document.createElement("a");
    link.href = `https://spoonacular.com/recipes/${recipe.title.replaceAll(" ", "-")}-${recipe.id}`;
    link.textContent = "view recipe";
    link.target = "_blank";

    textDiv.appendChild(title);
    textDiv.appendChild(summaryP);  // תיאור
    textDiv.appendChild(description);
    textDiv.appendChild(link);

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.title;

    card.appendChild(textDiv);
    card.appendChild(img);

    container.appendChild(card);
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const fridgeItems = await getFridgeItems();
  if (!fridgeItems.length) {
    showCustomPopup("The fridge is empty!");
    return;
  }

  const recipes = await getRecipesFromAPI(fridgeItems);
  showRecipes(recipes);
});


async function getRecipeSummary(id) {
  const apiKey = "bf26187e69f14d079d662a8e04c545ea";
  const url = `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.summary;
  } catch (err) {
    console.error("error getting summary:", err);
    return null;
  }
}

function stripHTML(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}


function showCustomPopup(message) {
  const popup = document.getElementById("customPopup");
  const messageElem = document.getElementById("popupMessage");
  const closeBtn = document.getElementById("popupCloseBtn");

  messageElem.innerText = message;
  popup.classList.remove("hidden");

  closeBtn.onclick = () => {
    popup.classList.add("hidden");
  };
}
