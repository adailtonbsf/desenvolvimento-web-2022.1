const ProfessorModel = require('../../models/professor/ProfessorModel')

let professors = [
    { _id: 0, name: "Jefferson de Carvalho", university: "UFC", degree: "PhD" },
    { _id: 1, name: "Fulano de Tal", university: "UFC", degree: "PhD" },
    { _id: 2, name: "Sicrano de Tal", university: "UFC", degree: "PhD" },
    { _id: 3, name: "Beltrano de Tal", university: "UFC", degree: "PhD" }
]

let _id = 4;

class ProfessorService {

    static create(data) {
        let professor = new ProfessorModel(
            _id++,
            data.name,
            data.university,
            data.degree)
        professors.push(professor)
        return professor
    }

    static retrieve(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                return professors[i]
            }
        }
        return {}
    }

    static update(_id, data) {
        for (let p of professors) {
            if (p._id == _id) {
                p.name = data.name
                p.university = data.university
                p.degree = data.degree
                return p
            }
        }
        return null
    }

    static delete(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                professors.splice(i, 1)
                return true
            }
        }
        return false
    }

    static list() {
        return professors
    }

}

module.exports = ProfessorService