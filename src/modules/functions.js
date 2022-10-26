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