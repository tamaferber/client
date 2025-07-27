const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

const recipes = {
  "onion soup": {
    title: "Onion Soup",
    text: `A bowl of rich, golden-brown onion soup, bursting with deep caramelized flavors and a hint of thyme, 
        warms your senses with every spoonful. The velvety broth, infused with slow-cooked onions and a touch of garlic, creates a comforting experience. Topped with a crisp slice of toasted baguette and bubbling melted cheese, 
        this French classic is both rustic and refined.

            Ingredients (serves 4):
            4 large yellow or white onions, thinly sliced
            2 tablespoons unsalted butter
            1 tablespoon olive oil
            2 garlic cloves, minced
            1/2 teaspoon sugar
            1/4 cup dry white wine (optional, or 1 tablespoon balsamic vinegar)
            6 cups beef stock (or vegetable stock for a vegetarian version)
            1 teaspoon dried thyme or 2 sprigs fresh thyme
            Salt and freshly ground black pepper, to taste

            For the toast topping:
            4 slices of baguette or rustic bread
            1 whole garlic clove (for rubbing)
            1 cup grated Gruyère cheese (or mozzarella or Emmental)

            Instructions:
            Caramelize the Onions
            In a large pot, melt the butter with the olive oil over low heat.
            Add the sliced onions and sugar. Cook slowly, stirring occasionally, for 30–40 minutes,
            until the onions are deeply golden and caramelized.

            Add Garlic and Deglaze
            Stir in the minced garlic and cook for 1 more minute.
            Pour in the white wine to deglaze the pot, scraping up the brown bits from the bottom. Let it simmer for 2–3 minutes.

            Build the Soup
            Add the stock and thyme. Bring to a gentle boil, then reduce to a simmer.
            Let the soup simmer uncovered for 20–25 minutes. Season with salt and pepper to taste.

            Prepare the Toasts
            While the soup simmers, toast the bread slices. Rub each with the whole garlic clove.
            Top with grated cheese and broil until golden and bubbly.

            Serve
            Ladle the soup into oven-safe bowls, place a cheese toast on top, and broil for 2–3 minutes,
            or simply place the toast on the soup just before serving.

            🍷 Tip:
            This soup tastes even better the next day. Serve with a glass of chilled white wine and a small green salad for a cozy, elegant meal.`
    },

  "Lasagna": {
    title: "Lasagna",
    text: `Indulge in a rich and flavorful lasagna, featuring layers of perfectly seasoned meat sauce,
            velvety béchamel, and tender pasta sheets.
            Each bite is a harmonious blend of savory flavors, complemented by melted cheese that forms a golden,
            bubbling crust. Whether served at a family dinner or a festive gathering, this lasagna brings warmth,
            comfort, and a touch of Italian charm to the table.
            
            Ingredients (serves 6–8)
            For the meat sauce (ragù):
            2 tablespoons olive oil
            1 onion, finely chopped
            2 garlic cloves, minced
            500g (1 lb) ground beef (or a mix of beef and pork)
            400g (14 oz) canned crushed tomatoes
            2 tablespoons tomato paste
            1 teaspoon dried oregano
            1/2 teaspoon sugar (optional, to balance acidity)
            Salt and freshly ground pepper
            Fresh basil or parsley (optional)

            For the béchamel sauce:
            3 tablespoons butter
            3 tablespoons all-purpose flour
            2 ½ cups (600 ml) milk
            Salt and white pepper
            A pinch of nutmeg

            Other:
            9–12 lasagna noodles (pre-cooked or oven-ready)
            2 cups (200g) grated mozzarella
            1/2 cup (50g) grated Parmesan
            Fresh basil for garnish

            Instructions:
            Prepare the Meat Sauce:
            Heat olive oil in a large pan over medium heat.
            Sauté onion until translucent, then add garlic and cook for 1 minute more.
            Add the ground meat and cook until browned.
            Stir in the tomato paste, crushed tomatoes, oregano, sugar, salt, and pepper.
            Let simmer uncovered for 20–30 minutes, stirring occasionally.

            Make the Béchamel Sauce:
            In a saucepan, melt butter over medium heat.
            Whisk in the flour and cook for 1–2 minutes.
            Gradually add the milk, whisking constantly until smooth.
            Bring to a gentle boil, reduce heat, and stir until thickened (about 5 minutes).
            Season with salt, pepper, and a pinch of nutmeg.

            Assemble the Lasagna:
            Preheat oven to 180°C (350°F).
            In a baking dish, spread a thin layer of meat sauce.
            Layer noodles, meat sauce, béchamel, and mozzarella.
            Repeat layers, finishing with béchamel and a generous sprinkle of Parmesan.

            Bake:
            Cover with foil and bake for 25 minutes.
            Remove foil and bake another 15–20 minutes until golden and bubbling.

            Rest and Serve:
            Let lasagna rest for 10 minutes before slicing.
            Garnish with fresh basil and serve with a crisp green salad or garlic bread.

            🍷 Pro Tip:
            Use freshly grated cheese and allow the lasagna to rest before serving — this helps it set beautifully.
            This dish can be made a day ahead and tastes even better after the flavors settle overnight.
            `
    },

  "French toast": {
    title: "French Toast",
    text: `Golden-brown French toast, crisp outside, soft and fluffy inside, topped with powdered sugar and syrup.
        Each bite is a delightful balance of sweetness and richness, enhanced by fresh berries and a drizzle of maple syrup. 
        Whether served for breakfast or brunch, it’s comfort food at its finest.
        
        Ingredients:
        4 slices thick bread (brioche or challah preferred)
        2 large eggs
        ½ cup whole milk
        1 tsp vanilla extract
        ½ tsp cinnamon
        Pinch of salt
        1 tbsp butter (for frying)
        Maple syrup (to serve)
        Powdered sugar (to garnish)
        Fresh berries (strawberries, blueberries, raspberries)

        Instructions:
        Make the custard:
        In a shallow bowl, whisk together eggs, milk, vanilla extract, cinnamon, and a pinch of salt.

        Soak the bread:
        Dip each bread slice into the custard mixture for 20–30 seconds on each side. Ensure it's soaked but not falling apart.

        Cook:
        Heat butter in a nonstick pan over medium heat. Add the soaked slices and cook for 2–3 minutes per side, until golden brown and slightly crisp.

        Serve:
        Stack the French toast on a plate. Dust with powdered sugar, drizzle with maple syrup, and top with fresh berries.

        Optional:
        Add a dollop of whipped cream or Greek yogurt for extra indulgence.`
    },


    "Tomato pasta": {
    title: "Tomato pasta",
    text: `Savor a delightful plate of tomato pasta, featuring al dente noodles coated in a rich,
            slow-simmered tomato sauce bursting with flavor.
            Made with ripe, sun-kissed tomatoes, aromatic garlic, and a hint of fresh basil,
            this dish strikes the perfect balance of freshness and depth — a timeless Italian classic that never fails to comfort.

            Ingredients:
            250g pasta (fusilli, penne, or spaghetti)
            2 tbsp olive oil
            4 cloves garlic, minced
            5–6 ripe tomatoes (or 1 can crushed tomatoes)
            1 tbsp tomato paste
            1 tsp sugar (optional, to balance acidity)
            Salt and pepper to taste
            Handful of fresh basil leaves
            Grated Parmesan cheese (to serve)

            Instructions:
            Cook the pasta:
            Bring a large pot of salted water to a boil. Cook pasta until al dente according to package instructions. Reserve ½ cup of pasta water before draining.

            Make the sauce:
            In a large pan, heat olive oil over medium heat. Add garlic and sauté for 1–2 minutes until fragrant.
            Add chopped tomatoes and tomato paste. Stir well.

            Simmer:
            Let the sauce simmer for 15–20 minutes, stirring occasionally. Add reserved pasta water if the sauce becomes too thick.
            Season with salt, pepper, and a pinch of sugar if needed.

            Combine:
            Add the cooked pasta directly into the sauce. Toss to coat evenly. Tear and stir in fresh basil just before serving.

            Serve:
            Plate the pasta, top with grated Parmesan and a basil leaf for garnish.`
    },

    
    "Salmon": {
    title: "Salmon",
    text: `Indulge in the rich and delicate flavors of this exquisite salmon dish,
            featuring tender, pan-seared fillets infused with a zesty lemon and garlic marinade.
            The salmon is perfectly cooked, with a crispy, golden crust and a moist, flaky interior.
            Served with vibrant asparagus and roasted cherry tomatoes, it’s a simple yet elegant plate full of freshness.
    
            Ingredients:
            2 salmon fillets (skin-on or off)
            1 tbsp olive oil
            1 tbsp butter
            2 garlic cloves, minced
            Juice of ½ lemon
            Zest of ½ lemon
            Salt and freshly ground pepper
            1 tsp fresh parsley, chopped
            200g asparagus, trimmed
            A handful of cherry tomatoes
            Lemon wedges (for serving)

            Instructions:
            Marinate the salmon:
            Pat the salmon dry and season both sides with salt, pepper, lemon zest, and a little lemon juice. Set aside for 10 minutes.

            Prepare the veggies:
            On a lined baking tray, toss asparagus and cherry tomatoes with olive oil, salt, and pepper. Roast at 200°C (400°F) for 12–15 minutes, until tender.

            Sear the salmon:
            In a skillet, heat olive oil over medium-high heat. Add salmon skin-side down (if applicable) and sear for 3–4 minutes. Flip and cook another 2–3 minutes.

            Add flavor:
            Reduce heat to low, add butter and garlic to the pan. Spoon the melted garlic butter over the salmon for 1–2 minutes until aromatic and glistening.

            Plate and serve:
            Arrange the salmon with the roasted vegetables. Drizzle with remaining lemon juice and sprinkle parsley on top.

            Chef’s Tip:
            For ultra-crispy skin, press the salmon down gently with a spatula for the first minute of cooking.
            Pair this dish with a chilled glass of white wine for a restaurant-worthy experience.`
    },


    "Arancini": {
    title: "Arancini",
    text: `Savor the irresistible flavors of this classic arancini recipe,
            featuring golden, crispy rice balls filled with a rich blend of melted mozzarella and savory marinara sauce.
            The rice is perfectly cooked, seasoned with herbs and spices, then formed into delicate spheres and fried to a perfect crunch—
            each bite unveiling a gooey, molten center that’s both comforting and indulgent.
    
            Ingredients:
            2 cups cooked arborio rice (cooled)
            ½ cup grated Parmesan
            1 egg
            1 tbsp fresh parsley, finely chopped
            ½ tsp dried oregano
            Salt and pepper to taste
            100g mozzarella, cut into small cubes
            ¾ cup flour
            2 eggs, beaten
            1 cup breadcrumbs
            Vegetable oil for frying
            Marinara sauce, for dipping

            Instructions:
            Prepare the rice mixture:
            In a large bowl, mix the cooled rice with grated Parmesan, 1 egg, parsley, oregano, salt, and pepper. Mix until fully combined.

            Shape the arancini:
            Wet your hands slightly and scoop about 2 tbsp of the rice mixture. Flatten into a disk, place a cube of mozzarella in the center, and shape into a ball, sealing well. Repeat with remaining mixture.

            Coat the arancini:
            Roll each rice ball in flour, dip in beaten egg, then coat in breadcrumbs. Place on a tray and chill in the fridge for at least 20 minutes to firm up.

            Fry to perfection:
            Heat oil in a deep pan to 180°C (350°F). Fry the arancini in batches for about 2–3 minutes, turning occasionally, until golden brown. Drain on paper towels.

            Serve hot:
            Plate with warm marinara sauce for dipping, and garnish with fresh basil if desired.

            🍷 Chef’s Tip:
            Serve your arancini with a chilled glass of crisp white wine (like Pinot Grigio or Vermentino) —
            the acidity will cut through the richness and elevate the cheesy core to pure Italian bliss.`
    },


    "Steak": {
    title: "Steak",
   text: `Savor the bold and rich flavors of this perfectly cooked steak,
        seasoned with a simple yet aromatic blend of sea salt, cracked black pepper,
        and fresh rosemary. The steak is seared to perfection, creating a beautifully caramelized crust
        while maintaining a juicy, tender center bursting with umami and character.

        Ingredients:
        1 thick-cut ribeye or sirloin steak (about 300–350g)
        Sea salt (generously)
        Freshly cracked black pepper
        2–3 sprigs of fresh rosemary
        2 cloves garlic, smashed
        2 tbsp olive oil or neutral oil (e.g., grapeseed)
        1 tbsp butter

        Instructions:
        Season the steak:
        Remove the steak from the fridge 30 minutes before cooking. Pat dry with paper towels.
        Season both sides generously with sea salt and black pepper.

        Heat the pan:
        Heat a cast iron or heavy-bottomed skillet over high heat. Add oil and heat until shimmering.

        Sear the steak:
        Carefully place the steak in the pan. Sear without moving for 2–3 minutes until a deep brown crust forms. Flip and sear the other side.

        Flavor infusion:
        Add butter, rosemary, and garlic to the pan. Tilt the pan slightly and use a spoon to baste the steak with the melted butter and herbs for another 1–2 minutes.

        Check for doneness:
        Cook to your desired doneness (medium-rare: ~54°C / 130°F internal temp).
        Remove from pan and let rest for 5 minutes on a cutting board.

        Serve:
        Slice against the grain and serve with roasted potatoes or green beans.

        🍷 Chef's Tip:
        For extra decadence, place a pat of herb butter on top of the steak while it rests —
        it melts into the meat and adds richness that pairs beautifully with a bold glass of red wine (like Cabernet Sauvignon or Syrah).`
    },
};


document.querySelectorAll(".recipes-list li").forEach(item => {
  item.addEventListener("click", () => {
    const key = item.getAttribute("data-recipe").trim();
    const recipe = recipes[key];

    if (!recipe) {
      popupTitle.innerText = "Recipe Not Found";
      popupText.innerText = "Sorry, we couldn't find this recipe.";
    } else {
      popupTitle.innerText = recipe.title;
      popupText.innerText = recipe.text;
    }

    popup.classList.remove("hidden");
  });
});

// סגירת הפופאפ בלחיצה על כפתור X
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("hidden");
  }
});


function submitNewRecipe() {
  const title = document.getElementById("recipeTitle").value;
  const description = document.getElementById("recipeDescription").value;
  const imageInput = document.getElementById("recipeImage");
  const imageFile = imageInput.files[0];

  console.log("Submitted recipe:", { title, description, imageFile });

  // כאן אפשר להמשיך עם שמירה ל-JSON או הוספה ל-DOM
  closeAddRecipePopup();
}



