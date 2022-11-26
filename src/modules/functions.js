import {
    notesList
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
    console.log(result);
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