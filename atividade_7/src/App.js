/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp"

import CreateStudent from "./components/student/CreateStudent";
import ListStudent from "./components/student/ListStudent";
import EditStudent from "./components/student/EditStudent";

import CreateProfessor from "./components/professor/CreateProfessor";
import ListProfessor from "./components/professor/ListProfessor";
import EditProfessor from "./components/professor/EditProfessor";
import FirebaseContext from "./utils/FirebaseContext";
import FirebaseUserService from "./services/FirebaseUserService";

import MyToast from "./utils/MyToast";

const AppPage = () =>
  <FirebaseContext.Consumer>
    {(firebase) => <App firebase={firebase} />}
  </FirebaseContext.Consumer>

function App(props) {

  const [logged, setLogged] = useState(false)

  const [showToast, setShowToast] = useState(false); //TOAST
  const [toast, setToast] = useState({ header: '', body: '' }) //TOAST

  const navigate = useNavigate()

  const logout = () => {
    FirebaseUserService.logout(
      props.firebase.getAuthentication(),
      (res) => {
        if (res) {
          props.firebase.setUser(null)
          setLogged(false)
          navigate('/')
        }
      }
    )
  }

  const renderLoginButtonLogout = () => {
    if (props.firebase.getUser() != null)
      return (
        <div style={{ marginRight: 20 }}>
          Olá, {props.firebase.getUser().email}
          <button onClick={() => logout()} style={{ marginLeft: 20 }}>Logout</button>
        </div>
      )
    return
  }

  //TOAST
  const renderToast = () => {
    return <MyToast
      show={showToast}
      header={toast.header}
      body={toast.body}
      setShowToast={setShowToast}
      bg='secondary'
    />
  }

  return (
    <div className="container">

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/"} className="navbar-brand" style={{ paddingLeft: 10 }}>CRUD</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="navitem">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Estudante
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="navitem">
                  <Link to="/createStudent" className="nav-link">Criar Estudante</Link>
                </li>
                <li className="navitem">
                  <Link to="/listStudent" className="nav-link">Listar Estudante</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Professor
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="navitem">
                  <Link to="/createProfessor" className="nav-link">Criar Professor</Link>
                </li>
                <li className="navitem">
                  <Link to="/listProfessor" className="nav-link">Listar Professor</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {renderToast()}
        {renderLoginButtonLogout()}
      </nav>
      <Routes>
        <Route path="/" element={<Home setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp setLogged={setLogged} setShowToast={setShowToast} setToast={setToast} />} />

        <Route path="createStudent" element={<CreateStudent setShowToast={setShowToast} setToast={setToast} />} />
        <Route path="listStudent" element={<ListStudent setShowToast={setShowToast} setToast={setToast} />} />
        <Route path="editStudent/:id" element={<EditStudent setShowToast={setShowToast} setToast={setToast} />} />

        <Route path="createProfessor" element={<CreateProfessor setShowToast={setShowToast} setToast={setToast} />} />
        <Route path="listProfessor" element={<ListProfessor />} setShowToast={setShowToast} setToast={setToast} />
        <Route path="editProfessor/:id" element={<EditProfessor setShowToast={setShowToast} setToast={setToast} />} />
      </Routes>
    </div>

  );
}

export default AppPage