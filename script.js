const imageElement = document.getElementById("picture");
const ingredientsElement = document.getElementById("ingredients");
const stepsElement = document.getElementById("steps");
const theMealElement = document.getElementById("the-meal");
const randomBtnElement = document.getElementById("random-btn");
const searchElement = document.getElementById("search-box");
const searchIconElement = document.getElementById("search-icon");

async function getMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const theMeal = respData.meals[0];

    var mealInfoUL = document.createElement('ul');
    var item = document.createElement('li');
    item.appendChild(document.createTextNode(`${theMeal.strMeal}`));
    mealInfoUL.appendChild(item);
    
    var item1 = document.createElement('li');
    item1.appendChild(document.createTextNode(`Origin: ${theMeal.strArea}`));
    mealInfoUL.appendChild(item1);
    
    var item2 = document.createElement('li');
    item2.appendChild(document.createTextNode(`Category: ${theMeal.strCategory}`));
    mealInfoUL.appendChild(item2);

    // get ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (theMeal["strIngredient" + i]) {
            ingredients.push(
                `${theMeal["strMeasure" + i]} - ${
                    theMeal["strIngredient" + i]
                }`
            );
        } else {
            break;
        }
    }

    var ingredientsUl = document.createElement('ul');

    for (var i = 0; i < ingredients.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(ingredients[i]));
        ingredientsUl.appendChild(item);
    }

    var elem = document.createElement("img");
    elem.setAttribute("src", theMeal.strMealThumb);
    elem.setAttribute("height", "190");
    elem.setAttribute("alt", "Yumm!");

    imageElement.innerHTML = "";
    imageElement.appendChild(elem);

    stepsElement.innerText = theMeal.strInstructions;

    theMealElement.innerHTML = "The Meal:";
    theMealElement.appendChild(mealInfoUL);

    ingredientsElement.innerHTML = "Ingredients:";
    ingredientsElement.appendChild(ingredientsUl);

}

async function getMealCategories() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
    const respData = await resp.json();
    const theCategories = respData.meals;

    var iter;
    for (iter = 0; iter < theCategories.length; iter++) {
      console.log(theCategories[iter]["strCategory"]);
    }

    // console.log(theCategories[Math.floor(Math.random() * theCategories.length)]["strCategory"]);
}

function searchForTerm() { 
    if(searchElement.value && searchElement.value != ''){
        console.log("Searched: " + searchElement.value);
    }
}

getMeal();
// getMealCategories();

// Listen for button clicks
randomBtnElement.addEventListener("click", getMeal);
// searchElement.addEventListener("click", searchForTerm);
searchIconElement.addEventListener("click", searchForTerm);