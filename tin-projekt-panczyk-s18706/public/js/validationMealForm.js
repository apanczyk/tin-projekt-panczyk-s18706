function validateForm() {
    const mealInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');

    const errorMeal = document.getElementById('errorMeal');
    const errorDescription = document.getElementById('errorDescription');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([mealInput, descriptionInput], [errorMeal, errorDescription], errorsSummary);

    let valid = true;

    if (!checkRequired(mealInput.value)) {
        valid = false;
        mealInput.classList.add("error-input");
        errorMeal.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(mealInput.value, 2, 50)) {
        valid = false;
        mealInput.classList.add("error-input");
        errorMeal.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if (!checkRequired(descriptionInput.value)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(descriptionInput.value, 2, 100)) {
        valid = false;
        descriptionInput.classList.add("error-input");
        errorDescription.innerText = "Pole powinno zawierać od 2 do 100 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }


    return valid;
}