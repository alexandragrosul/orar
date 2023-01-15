import {
    lessonsTime,
    list,
    dayToDisplay,
    selectClas,
    addNoteButton,
    inputNoteName,
    inputNoteText,
    daysToVacation,
    themeSwitch,
    notesList,
    logo,
    schools,
    availableSchools,
    daysSwithcer,
} from "./modules/constants.js"
import {
    getCurrentTime,
    isWeekends,
    notesFromLocalStorage,
    buildNotes,
    deleteNote,
    daysTabs,
    buildOrar
} from "./modules/functions.js";



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}


const currentDate = new Date();
const currentDay = currentDate.getDay();
let orar = null
const classSelected = localStorage.getItem('clasa') ? localStorage.getItem('clasa') : "VI A"
const schoolSelected = localStorage.getItem('school') ? localStorage.getItem('school') : ""

function setSelectedClass() {
    for (let option of selectClas.options) {
        if (option.value === classSelected) {
            selectClas.options[option.index].selected = true;
        }
    }
}

setSelectedClass()

function getOrar(school, clasa) {
    fetch(`./src/schools/${school}.json`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            orar = data[clasa]
            localStorage.setItem('orar', JSON.stringify(orar))
        })
        .then(() => {
            daysSwithcer.innerHTML = `
            <li class="nav-item">
            <a id="luni" class="nav-link " aria-current="page" href="#">Ln</a>
            </li>
            <li class="nav-item">
            <a id="marti" class="nav-link" href="#">Ma</a>
            </li>
            <li class="nav-item">
            <a id="miercuri" class="nav-link" href="#">Mi</a>
            </li>
            <li class="nav-item">
            <a id="joi" class="nav-link " href="#">Joi</a>
            </li>
            <li class="nav-item">
            <a id="vineri" class="nav-link " href="#">Vi</a>
            </li>
            `
            buildOrar(currentDay, isWeekends(currentDay), orar, lessonsTime)
            daysTabs()
        })
}

/*
daca in localStorage este scoala aleseaconstruim orarul pentru scoala respectiva
*/
if (schoolSelected) {
    getOrar(schoolSelected, classSelected)
} else {
    let allSchools = `<div class="col-12 text-center">
    <h2>Scoli</h2>
</div>`
    for (let school of availableSchools) {
        allSchools += `<div class="card col-12">
        <div class="card-body text-center row align-items-center" style="padding: 6px">
            <div class="col-3">
                <img src="https://www.recenzii.md/template/review/assets/img/nologo-company.png"
                    class="card-img-top" alt="...">
            </div>
            <div class="col-6" style="padding: 0">
                <h5 class="card-title">${school.name}</h5>
            </div>
            <div class="col-3">
                <a href="#" class="btn btn-success btn-sm " data-name="${school.link}" >Select</a>
            </div>
        </div>
    </div>`
        break
    }
    schools.innerHTML = allSchools
    schools.addEventListener('click', (e) => {
        e.preventDefault()
        schools.innerHTML = ''
        const selectedSchool = e.path[0].dataset.name
        localStorage.setItem('school', selectedSchool);
        getOrar(selectedSchool, "VI A")
        document.querySelector('.repetitor').innerHTML = ''
    })
}

selectClas.addEventListener('change', function () {
    localStorage.setItem('clasa', this.value)
    getOrar(localStorage.getItem('school'), this.value)
    buildOrar(currentDay, isWeekends(currentDay), orar, lessonsTime)
})


const today = new Date()
const autumnHolidays = new Date(2022, 11, 24)
daysToVacation.innerText = Math.floor((autumnHolidays.getTime() - today.getTime()) / (1000 * 3600 * 24))

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
        logo.innerHTML = '<img src="logo/logo_dark.png" alt="logo">'
    } else {
        themeSwitch.classList.add('btn-dark')
        logo.innerHTML = '<img src="logo/logo_light.png" alt="logo">'
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
        logo.innerHTML = '<img src="logo/logo_dark.png" alt="logo">'
    } else {
        themeSwitch.classList.add('btn-dark')
        logo.innerHTML = '<img src="logo/logo_light.png" alt="logo">'
    }
})

let notes = notesFromLocalStorage();


addNoteButton.addEventListener('click', () => {
    if (inputNoteName.value !== '' && inputNoteText !== '') {
        localStorage.setItem('notes', JSON.stringify(notesFromLocalStorage().concat([{
            id: new Date().getTime(),
            name: inputNoteName.value,
            text: inputNoteText.value
        }])))
        notes = notesFromLocalStorage();
        buildNotes(notesList, notes)
        var myModalEl = document.getElementById('notesModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide()
    }

    inputNoteName.value = ''
    inputNoteText.value = ''
})
buildNotes(notesList, notes)
// setInterval(() => console.log(getCurrentTime()), 60000)