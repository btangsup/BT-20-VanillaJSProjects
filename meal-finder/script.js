const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;
  console.log(term);

  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

      if(data.meals === null) {
          resultHeading.innerHTML = `<h3>There are no search results. Try again.</h3>`
      } else {

        mealsEl.innerHTML = data.meals.map(meal => 
          `<div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>`
        )}

    });

    //clear search text
    search.value='';
  } else {
    alert('please enter something');

  }

}

// fetch meal by id

function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealID}`)
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0];

    addMealToDOM(meal);
  })
}

// function add meal to dom

function addMealToDOM(meal) {
  const ingredients = [];

  for( let i = 1; i<-20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
    </div>
  `
}
// EVENT LISTENERS 

submit.addEventListener('submit', searchMeal);

mealsEl.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
      if(item.classList) {
        return item.classList.contains('meal-info');
      } else {
        return false;
      }
  })

  if(mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealByID(mealID)
  }


})


