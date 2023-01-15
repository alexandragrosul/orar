import {
    notesList,
    lessonsTime,
} from "./constants.js"
export const getDay = (day) => {
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
/**
 * Function detect if given day is weekend
 * @param {number} day 
 * @returns boolean
 */
export function isWeekends(day) {
    return day === 0 || day === 6 ? true : false
}

export const getCurrentTime = () => {
    const today = new Date()
    const hours = today.getHours()
    const minutes = today.getMinutes()
    return `${hours}:${minutes}`
}

export function notesFromLocalStorage() {
    const notes = localStorage.getItem('notes')
    if (!notes) {
        localStorage.setItem('notes', JSON.stringify([]))
        return []
    }
    return JSON.parse(notes)
}

export function deleteNote(id) {
    const allNotes = notesFromLocalStorage()
    const result = allNotes.filter(todo => {
        return todo.id != id
    })
    buildNotes(notesList, result)
    localStorage.setItem('notes', JSON.stringify(result))
}

export function buildNotes(htmlElement, notes) {
    let allNotes = ""
    notes.forEach(function (el) {

        allNotes += ` <div class="col-12 d-flex justify-content-center">
        <div class="card text-bg-light mb-3" style="width : 100%">
            <div class="card-header">
            ${el.name}
            <a class="btn btn-danger btn-sm" data-id="${el.id}" >X</a>
            </div>
            <div class="card-body">
                <p class="card-text">${el.text}</p>
            </div>
        </div>
    </div>`

    })
    htmlElement.innerHTML = allNotes
    htmlElement.addEventListener('click', (e) => {
        deleteNote(e.path[0].dataset.id)
    })

}

export function daysTabs() {

    const luniButton = document.getElementById('luni')
    const martiButton = document.getElementById('marti')
    const miercuriButton = document.getElementById('miercuri')
    const joiButton = document.getElementById('joi')
    const vineriButton = document.getElementById('vineri')
    const orar = JSON.parse(localStorage.getItem('orar'))

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

        buildOrar(1, false, orar, lessonsTime)
    })
    martiButton.addEventListener('click', () => {
        removeActiveTab()
        martiButton.classList.add('active')
        buildOrar(2, false, orar, lessonsTime)
    })
    miercuriButton.addEventListener('click', () => {
        removeActiveTab()

        miercuriButton.classList.add('active')
        buildOrar(3, false, orar, lessonsTime)
    })
    joiButton.addEventListener('click', () => {
        removeActiveTab()

        joiButton.classList.add('active')
        buildOrar(4, false, orar, lessonsTime)
    })
    vineriButton.addEventListener('click', () => {
        removeActiveTab()

        vineriButton.classList.add('active')
        buildOrar(5, false, orar, lessonsTime)
    })
}

export function buildOrar(day, isWeekend, orar, lessonsTime) {
    const list = document.getElementById('orar_list')

    list.innerHTML = ''
    if (isWeekend) {
        document.getElementById('luni').classList.add('active')
        for (let i = 0; i < orar[1].length; i++) {
            const newLi = document.createElement('li')
            newLi.classList.add('list-group-item')
            newLi.innerHTML = `<div style="margin-left: 1rem">${orar[1][i].name} </div> <div style="margin-left: auto; font-size: 16px">${lessonsTime[i].start} - ${lessonsTime[i].end} </div>`
            list.appendChild(newLi)

        }
    } else {
        switch (day) {
            case 1:
                document.getElementById('luni').classList.add('active')
                break
            case 2:
                document.getElementById('marti').classList.add('active')
                break
            case 3:
                document.getElementById('miercuri').classList.add('active')
                break
            case 4:
                document.getElementById('joi').classList.add('active')
                break
            case 5:
                document.getElementById('vineri').classList.add('active')
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