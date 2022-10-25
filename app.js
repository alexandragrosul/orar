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
console.log(selectClas.options)
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
            buildOrar(currentDay, isWeekends())
        })
}

getOrar(classSelected)

const lessonsTime = [{
        start: '8:30',
        end: '09:15'
    },
    {
        start: '9:30',
        end: '10:20'
    },
    {
        start: '10:35',
        end: '11:20'
    },
    {
        start: '11:35',
        end: '12:20'
    },
    {
        start: '12:30',
        end: '13:15'
    },
    {
        start: '13:30',
        end: '14:15'
    },
    {
        start: '14:25',
        end: '15:10'
    }
]





function isWeekends() {
    return currentDay === 0 || currentDay === 6 ? true : false
}

const getDay = (day) => {
    switch (day) {
        case 1:
            return 'Luni'
        case 2:
            return 'Marti'
        case 3:
            return 'Miercuri'
        case 4:
            return 'Joi'
        case 5:
            return 'Vineri'
        default:
            return "Weekenduri"
    }
}

function buildOrar(day, isWeekend) {
    list.innerHTML = ''
    if (isWeekend) {
        luniButton.classList.add('active')
        for (let i = 0; i < orar[1].length; i++) {
            // for (const predmet of orar[1]) {
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerText = orar[1][i].name
            list.appendChild(newLi)

        }
        // dayToDisplay.innerText = `Orar pentru Luni`
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
            // for (const predmet of orar[day]) {
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerHTML = `<div style="margin-left: 1rem">${orar[day][i].name} </div> <div style="margin-left: auto; font-size: 16px">${lessonsTime[i].start} - ${lessonsTime[i].end} </div>`
            // newLi.innerText = `${orar[day][i].name} ${lessonsTime[i].start} - ${lessonsTime[i].end} `
            list.appendChild(newLi)

        }
        // dayToDisplay.innerText = `Orar pentru ${getDay(currentDay+1)}`
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
    buildOrar(currentDay, isWeekends())
})

// buildOrar(currentDay, isWeekends())

const today = new Date()
const autumnHolidays = new Date(2022, 9, 31)
console.log({
    autumnHolidays
})
console.log({
    today
})
const daysToVacation = document.querySelector('#daysToVacation')
daysToVacation.innerText = Math.floor((autumnHolidays.getTime() - today.getTime()) / (1000 * 3600 * 24))