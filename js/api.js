const container = document.getElementById('meals');
const containerDetail = document.getElementById('meal-detail');
const spinner = document.getElementById('spinner');
document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const seachText = searchField.value;
    if (seachText === '') {
        container.innerHTML = `
        <div class="alert alert-danger mx-auto" role="alert">
            <strong>Seach field can't be empty.</strong>
        </div>`;
        return;
    } else {
        //   Clear
        container.innerHTML = "";
        // Load Meals
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${seachText}`;
        spinner.classList.remove('d-none');
        fetch(url)
            .then(res => res.json())
            .then(data => setTimeout(() => {
                spinner.classList.add('d-none');
                displayMeals(data.meals);
            }, 1500))
        // Clear Seach Text
        searchField.value = '';
    }
});

const displayMeals = meals => {
    if (meals == null) {
        container.innerHTML = `
        <div class="alert alert-danger mx-auto" role="alert">
            <strong>No Data Found</strong>
        </div>`;
        return;
    }
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img height="200" src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                </div>
                <div class="card-footer">
                    <button type="button" onclick="loadDetails('${meal.idMeal}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Details
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

const loadDetails = mealID => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.meals[0]))
}
const displayDetail = meal => {
    const div = document.createElement('div');
    containerDetail.innerHTML = '';
    div.innerHTML = `
    <div class="card mb-5 mt-5">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>
    </div>
    `;
    containerDetail.appendChild(div);
}