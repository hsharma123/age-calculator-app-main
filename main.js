document.addEventListener("DOMContentLoaded", () => {
    let labels = document.getElementsByTagName("label");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let day = document.getElementById("day");
    let error = document.getElementsByClassName("error");
    let submitButton = document.getElementById("submit");
    let spans = document.getElementsByTagName("span");
    const date = new Date();
    console.log(date);
    let currentYear = date.getFullYear();
    let currentDay = date.getDate();
    let currentMonth = date.getMonth();
    const typeOfError = [
        "",
        "This field is required",
        "Must be valid date",
        "Must be a valid Year",
        "Must be a valid Month",
        "Must be a valid Day",
    ];

    const errorState = (numberOfError, typeOfDate, typeOfErrorMessage, color) => {
        error[numberOfError].innerHTML = typeOfErrorMessage;
        labels[numberOfError].style.color = color;
        typeOfDate.style.color = color;
    };

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const isDayCorrect = () => {
        const dayValue = parseInt(day.value);

        if (isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
            errorState(0, day, typeOfError[5], "#ff5757");  // Updated error type for day range
            return false;
        } else if (month.value == 2 && dayValue > 29) {
            errorState(0, day, typeOfError[5], "#ff5757");  // Leap year error for February
            return false;
        } else if (month.value != 2 && !isLeapYear(year.value) && dayValue > 28) {
            errorState(0, day, typeOfError[5], "#ff5757");  // Non-leap year error for other months
            return false;
        } else {
            errorState(0, day, typeOfError[0], "");  // No error
            return true;
        }
    };

    const isMonthCorrect = () => {
        if (month.value == "") {
            errorState(1, month, typeOfError[1], "#ff5757");
            return false;
        } else if (month.value < 1 || month.value > 12) {
            errorState(1, month, typeOfError[4], "#ff5757");
            return false;
        } else if (month.value != 2 && !isLeapYear(year.value) && day.value > 28) {
            errorState(0, day, typeOfError[5], "#ff5757");  // Non-leap year error for other months
            return false;
        } else {
            errorState(1, month, typeOfError[0], "");
            return true;
        }
    };

    const isYearCorrect = () => {
        if (year.value == "") {
            errorState(2, year, typeOfError[1], "#ff5757");
            return false;
        } else if (year.value > currentYear) {
            errorState(2, year, typeOfError[4], "#ff5757");
            return false;
        } else if (year.value == currentYear && month.value > currentMonth) {
            errorState(1, month, typeOfError[4], "#ff5757");
            return false;
        } else if (year.value == currentYear && month.value == currentMonth && day.value > currentDay) {
            errorState(0, day, typeOfError[5], "#ff5757");  // Updated error type for day range
            return false;
        } else {
            errorState(2, year, typeOfError[0], "");
            return true;
        }
    };

    const subtractAge = () => {
        let newYear = currentYear - year.value;
        let newMonth = currentMonth - month.value;
        let newDay = currentDay - day.value;
    
        if (newDay < 0) {
            newMonth--;
            const daysInPreviousMonth = new Date(year.value, currentMonth, 0).getDate();
            newDay += daysInPreviousMonth;
        }
    
        if (newMonth < 0) {
            newYear--;
            newMonth += 12;
        }
    
        spans[0].innerHTML = newYear;
        spans[1].innerHTML = newMonth + 1; // Adjust for one-indexed month
        spans[2].innerHTML = newDay;
    };
    
    submitButton.addEventListener("click", () => {
        if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            subtractAge();
        }
    });
});
