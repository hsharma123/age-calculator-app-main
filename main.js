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
    const errorState = (numberOfError,typeOfDate, typeOfError, color) => {
        error[numberOfError].innerHTML = typeOfError;
        labels[numberOfError].style.color = color;
        typeOfDate.style.color = color;
    }
    const isLeapYear = (day, month, year) => {
        month = month - 1;
        fullDate = new Date(year, month, day);
        if (day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear()) {
            return true;
        }
        else {
            return false;
        }
    }
    const subtractAge = () => {
        let newYear = Math.abs(currentYear - year.value);
    newMonth = 0;
    if (currentMonth >= month.value) {
        newMonth = currentMonth - month.value;
    } else {
        newMonth = month.value - currentMonth;
        newYear--; 
    }
        let newDay = 0;
        if (currentDay >= day.value) {
            newDay = currentDay - day.value;
        }
        else { 
            if (isLeapYear(day.value, month.value, year.value)) { 
                newDay= 30 + currentDay - day.value;
            }
            else {
                newDay = currentDay - day.value;
            }

            if (newMonth < 0) {
                newMonth = 11;
                newYear--;
            }
            if (newMonth < currentMonth) {
                newDay++;
            }
        }
        spans[0].innerHTML = newYear;
        spans[1].innerHTML = newMonth;
        spans[2].innerHTML = newDay;

    }
    const isDayCorrect = () => {
        if (day.value == "") {
            errorState(0, day, typeOfError[1], "#ff5757");
            return false;
        }
        else if (day.value <= 0 || day.value > 31) {
            errorState(0, day, typeOfError[2], "#ff5757")
        }
        else if (isLeapYear(day.value, month.value, year.value) == false) { 
            errorState(0, day, typeOfError[5], "#ff5757")
        }
        else {
            errorState(0, day, typeOfError[0], "");
            return true;
        }
    }
    const isMonthCorrect = () => {
        if (month.value == "") {
            errorState(1, month, typeOfError[1], "#ff5757");
            return false;
        }
        else if (month.value <= 0 || month.value > 12) {
            errorState(1, month, typeOfError[3], "#ff5757");
            return false;
        }
        else if (isLeapYear(month.value, day.value, year.value)) { 
            errorState(1, month, typeOfError[0], "#ff5757");
        }
        else {
            errorState(1, month, typeOfError[0], "")
                return true;
            }

            
    }
    const isYearCorrect = () => {
        if (year.value == "") {
            errorState(2, year, typeOfError[1], "#ff5757");
            return false;
        }
        else if (year.value > currentYear) {
            errorState(2, year, typeOfError[4], "#ff5757");
            return false;
        }
        else if (isLeapYear(month.value, day.value, year.value)) {
            errorState(2, year, typeOfError[0], "#ff5757");
        }
        else if (year.value == currentYear && month.value > currentMonth) { 
            errorState(1, month, typeOfError[3], "#ff5757");
            return false;
        }
        else if (year.value == currentYear && month.value == currentMonth && day.value > currentDay) { 
            errorState(0, day, typeOfError[0], "#ff5757");
            return false;
        }
        else {
            errorState(2, year, typeOfError[0], "");
            return true;
        }
    }
    submitButton.addEventListener("click", () => {
        isDayCorrect();
        isMonthCorrect();
        isYearCorrect();
        if (isDayCorrect() && isMonthCorrect() && isYearCorrect()) {
            subtractAge();
        }
    })
   
})