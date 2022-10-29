import {
    getCurrentTime,
    isWeekends
} from "./modules/functions.js";
import {
    lessonsTime
} from "./modules/constants.js"


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}


const currentDate = new Date();
const currentDay = currentDate.getDay();

const list = document.getElementById('orar_list')
const dayToDisplay = document.getElementById('day')
const luniButton = document.getElementById('luni')
const martiButton = document.getElementById('marti')
const miercuriButton = document.getElementById('miercuri')
const joiButton = document.getElementById('joi')
const vineriButton = document.getElementById('vineri')

const selectClas = document.getElementById('clas-selection')
let orar = null
const classSelected = localStorage.getItem('clasa') ? localStorage.getItem('clasa') : "VI A"

function setSelectedClass() {
    for (let option of selectClas.options) {
        if (option.value === classSelected) {
            selectClas.options[option.index].selected = true;
        }
    }
}

setSelectedClass()

function getOrar(clasa) {
    fetch("./waldorf.json")
        .then(response => {
            return response.json()
        })
        .then(data => orar = data[clasa])
        .then(() => {
            buildOrar(currentDay, isWeekends(currentDay))
        })
}

getOrar(classSelected)

function buildOrar(day, isWeekend) {
    list.innerHTML = ''
    if (isWeekend) {
        luniButton.classList.add('active')
        for (let i = 0; i < orar[1].length; i++) {
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerHTML = `<div style="margin-left: 1rem">${orar[1][i].name} </div> <div style="margin-left: auto; font-size: 16px">${lessonsTime[i].start} - ${lessonsTime[i].end} </div>`
            list.appendChild(newLi)

        }
    } else {
        switch (day) {
            case 1:
                luniButton.classList.add('active')
                break
            case 2:
                martiButton.classList.add('active')
                break
            case 3:
                miercuriButton.classList.add('active')
                break
            case 4:
                joiButton.classList.add('active')
                break
            case 5:
                vineriButton.classList.add('active')
                break


        }
        for (let i = 0; i < orar[day].length; i++) {
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerHTML = `<div style="margin-left: 1rem">${orar[day][i].name} </div> <div style="margin-left: auto; font-size: 16px">${lessonsTime[i].start} - ${lessonsTime[i].end} </div>`
            list.appendChild(newLi)
        }
    }
}

const removeActiveTab = () => {
    luniButton.classList.remove('active')
    martiButton.classList.remove('active')
    miercuriButton.classList.remove('active')
    joiButton.classList.remove('active')
    vineriButton.classList.remove('active')
}

luniButton.addEventListener('click', () => {
    removeActiveTab()

    luniButton.classList.add('active')

    buildOrar(1, false)
})
martiButton.addEventListener('click', () => {
    removeActiveTab()
    martiButton.classList.add('active')
    buildOrar(2, false)
})
miercuriButton.addEventListener('click', () => {
    removeActiveTab()

    miercuriButton.classList.add('active')
    buildOrar(3, false)
})
joiButton.addEventListener('click', () => {
    removeActiveTab()

    joiButton.classList.add('active')
    buildOrar(4, false)
})
vineriButton.addEventListener('click', () => {
    removeActiveTab()

    vineriButton.classList.add('active')
    buildOrar(5, false)
})

selectClas.addEventListener('change', function () {
    localStorage.setItem('clasa', this.value)
    getOrar(this.value)
    buildOrar(currentDay, isWeekends(currentDay))
})


const today = new Date()
const autumnHolidays = new Date(2022, 11, 24)
const daysToVacation = document.querySelector('#daysToVacation')
daysToVacation.innerText = Math.floor((autumnHolidays.getTime() - today.getTime()) / (1000 * 3600 * 24))

const themeSwitch = document.getElementById("themeSwitch");
let isDarkTheme = false

if (localStorage.getItem('isDark') === null) {
    localStorage.setItem('isDark', 'false')
} else {
    isDarkTheme = JSON.parse(localStorage.getItem('isDark'))
}

if (isDarkTheme) {
    document.body.classList.toggle('dark-theme');
    themeSwitch.innerText = isDarkTheme ? 'Light' : 'Dark'
    themeSwitch.classList.remove('btn-dark', 'btn-light')
    if (isDarkTheme) {
        themeSwitch.classList.add('btn-light')
    } else {
        themeSwitch.classList.add('btn-dark')

    }
}

themeSwitch.addEventListener("click", function () {
    isDarkTheme = !isDarkTheme
    localStorage.setItem('isDark', isDarkTheme ? 'true' : 'false')
    document.body.classList.toggle('dark-theme');
    themeSwitch.innerText = isDarkTheme ? 'Light' : 'Dark'
    themeSwitch.classList.remove('btn-dark', 'btn-light')
    if (isDarkTheme) {
        themeSwitch.classList.add('btn-light')
    } else {
        themeSwitch.classList.add('btn-dark')

    }
})



// setInterval(() => console.log(getCurrentTime()), 60000)