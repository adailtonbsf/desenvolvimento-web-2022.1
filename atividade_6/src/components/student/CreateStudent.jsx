import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FirebaseContext from "../../utils/FirebaseContext";
import FirebaseService from "../../services/FirebaseService";

const CreateStudentPage = () =>
    <FirebaseContext.Consumer>
        {(firebase) => <CreateStudent firebase={firebase} />}
    </FirebaseContext.Consumer>

function CreateStudent(props) {

    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [ira, setIRA] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        const newStudent = { name, course, ira }

        FirebaseService.createStudents(
            props.firebase.getFirestoreDb(),
            () => {
                navigate("/listStudent")
            }, newStudent
        )

        console.log(name)
        console.log(course)
        console.log(ira)
    }

    return (
        <>
            <main>
                <h2>
                    Criar Estudante
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Curso: </label>
                        <input type="text"
                            className="form-control"
                            value={course ?? ""}
                            name="course"
                            onChange={(event) => { setCourse(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>IRA: </label>
                        <input type="text"
                            className="form-control"
                            value={ira ?? 0}
                            name="ira"
                            onChange={(event) => { setIRA(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Criar Estudante" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default CreateStudentPage