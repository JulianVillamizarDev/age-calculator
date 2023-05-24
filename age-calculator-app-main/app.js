//inputs adn form

const form = document.querySelector('#form');
const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const submitBtn = document.querySelector('#submit');

//results

const resultDays = document.querySelector('#days-result');
const resultMonths = document.querySelector('#months-result');
const resultYears = document.querySelector('#years-result');


document.addEventListener('DOMContentLoaded', ()=>{
    init();
});

function init(){
    submitBtn.addEventListener('click', validarFormulario);
}


//validar el formulario
function validarFormulario(e){
    e.preventDefault();
    let dayValue = inputDay.value;
    let monthValue = inputMonth.value;
    let yearValue = inputYear.value;

    //si es negativo

    if(dayValue <= 0 || monthValue <= 0 || yearValue <= 999) {
        alert('invalid values');
        inputDay.value = '';
        inputMonth.value = '';
        inputYear.value = '';
        return;
    }

    //si hay valores vacios
    if(dayValue === '' || monthValue === '' || yearValue === '') {
        alert('empty values');
        return;
    }

    //si el mes es mayor a 12
    if(monthValue > 12){
        alert('invalid month');
        inputMonth.value = '';
        return;
    }


    //dias 28-30-31
    switch (Number(monthValue)) {
        case 4:
        case 6:
        case 9:
        case 11:
            if(dayValue > 30){
                alert('This month have 30 days')
                inputDay.value = '';
                return;
            }   
            break;
        case 2:
            if(dayValue > 28){
                alert('This month have 28 days')
                inputDay.value = '';
                return;
            }
            break;
    
        default:
            break;
    }

    //si el mes o el dia es menor a 10 agregar un 0 antes

    if(Number(monthValue) < 10){
        monthValue = `0${monthValue}`
    }

    if(Number(dayValue) < 10){
        dayValue = `0${dayValue}`
    }

    //validar año actual
    const today = new Date();
    const today_year = today.getFullYear();
    const today_month = today.getMonth()+1;
    const today_day = today.getDay();

    const birth = new Date(`${yearValue}-${monthValue}-${dayValue}T00:00:00`);
    const birth_year = birth.getFullYear();
    const birth_month = birth.getMonth()+1;
    const birth_day = birth.getDate();

    if(birth > today){
        alert('invalid date');
        inputYear.value = '';
        return;
    }

    //calcular fecha
    const total_days_birth = (birth_year * 365) + (birth_month * 30.416) + birth_day;
    const total_days_today = (today_year * 365) + (today_month * 30.416) + today_day;
   
    const total_days = total_days_today - total_days_birth;

    console.log(total_days);

    const age_years = total_days / 365;
    const months_ = total_days % 365;
    const age_months = months_ / 30.416;
    const days_ = age_months % 30.416;
    const age_days = days_ / 24;

    console.log(age_years);
    console.log(age_months);
    console.log(age_days);

    //print data

    resultYears.innerHTML = Math.floor(age_years);
    resultMonths.innerHTML = Math.floor(age_months);
    resultDays.innerHTML = Math.floor(age_days);
    
}
