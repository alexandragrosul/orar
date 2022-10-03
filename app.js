const orar = {
    1: [{
            name: "Ora de baza",
        },
        {
            name: "Ora de baza",
        },
        {
            name: "Exercitii",
        },
        {
            name: "L.eng./l.germ",
        },
        {
            name: "L.germ./l.eng",
        },
        {
            name: "Ins.muz/eur.",
        },
        {
            name: "Eur./ins.muz.",
        },
    ],
    2: [{
            name: "Ora de baza",
        },
        {
            name: "Ora de baza",
        },
        {
            name: "Exercitii",
        },
        {
            name: "Dezv. pers.",
        },
        {
            name: "Geografia",
        },
    ],
    3: [{
            name: "Ora de baza",
        },
        {
            name: "Ora de baza",
        },
        {
            name: "Exercitii",
        },
        {
            name: "Ed. plastic.",
        },
        {
            name: "L. romana",
        },
        {
            name: "Ed. muz.",
        },
    ],
    4: [{
            name: "Ora de baza",
        },
        {
            name: "Ora de baza",
        },
        {
            name: "Exercitii",
        },
        {
            name: "Ed. tehno.",
        },
        {
            name: "Ed. tehno.",
        },
    ],
    5: [{
            name: "Ora de baza",
        },
        {
            name: "Ora de baza",
        },
        {
            name: "Exercitii",
        },
        {
            name: "Ed. fizica",
        }, {
            name: "Ed. fizica",
        },
    ],
};

const currentDate = new Date();
const currentDay = currentDate.getDay();

const list = document.getElementById('orar_list')
const day = document.querySelector('.day')

const isWeekends = () => {
    return currentDay === 0 || currentDay === 6 ? true : false
}

const buildOrar = (day, isWeekend) => {
    if (isWeekend) {
        for (const predmet of orar[1]) {
            const newLi = document.createElement('li')
            newLi.innerText = predmet.name
            list.appendChild(newLi)

        }
    } else {
        for (const predmet of orar[++day]) {
            const newLi = document.createElement('li')
            newLi.innerText = predmet.name
            list.appendChild(newLi)

        }
    }
}

buildOrar(currentDay, isWeekends())