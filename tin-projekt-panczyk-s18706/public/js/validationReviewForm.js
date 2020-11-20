function validateForm() {
    const visitorInput = document.getElementById('visitor');
    const mealInput = document.getElementById('meal');
    const rateInput = document.getElementById('rate');
    const dateInput = document.getElementById('date');
    const messageInput = document.getElementById('message');

    const errorVisitor = document.getElementById('errorVisitor');
    const errorMeal = document.getElementById('errorMeal');
    const errorRate = document.getElementById('errorRate');
    const errorDate = document.getElementById('errorDate');
    const errorMessage = document.getElementById('errorMessage');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([visitorInput, mealInput, rateInput, dateInput, messageInput], [errorVisitor, errorMeal, errorRate, errorDate, errorMessage], errorsSummary);

    let valid = true;

    if (!checkRequired(visitorInput.value)) {
        valid = false;
        visitorInput.classList.add("error-input");
        errorVisitor.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(mealInput.value)) {
        valid = false;
        mealInput.classList.add("error-input");
        errorMeal.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(rateInput.value)) {
        valid = false;
        rateInput.classList.add("error-input");
        errorRate.innerText = "Pole jest wymagane";
    } else if (!checkNumberRange(rateInput.value, 1, 5)) {
        valid = false;
        rateInput.classList.add("error-input");
        errorRate.innerText = "Pole powinno być liczbą w zakresie od 1 do 5";
    }

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (!checkDateIfAfter(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Data nie może być z przyszłości";
    }


    if (!checkTextLengthOptional(messageInput.value, 2, 100)) {
        valid = false;
        messageInput.classList.add("error-input");
        errorMessage.innerText = "Pole powinno zawierać od 2 do 100 znaków";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }


    return valid;
}