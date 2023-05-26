import React, { useState, useEffect } from "react";

import appFirebase from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Home = ({ correoUsuario }) => {
  const valorInicial = {
    uid: -1,
    name: "",
    puestoTrabajo: "",
    solicitud: "",
    ubicacion: "",
    fecha: "",
  };

  //Variables de estado
  const [user, setUser] = useState(valorInicial);
  const [lista, setLista] = useState([]);
  const [subId, setSubId] = useState("");

  //Funciones para los inputs

  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //funcionalidad para actualizar o guardar datos

  const guardarDatos = async (e) => {
    e.preventDefault();
    if (subId === "") {
      try {
        await addDoc(collection(db, "usuarios"), {
          ...user,
          uid: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await setDoc(doc(db, "usuarios", subId), {
        ...user,
        uid: auth.currentUser.uid,
      });
    }
    setUser({ ...valorInicial });
    setSubId("");
    getLista();
  };

  const getLista = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLista(docs.filter((item) => item.uid === auth.currentUser.uid));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLista();
  }, []);

  //funcion para eliminar el usuario
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "usuarios", id));
    getLista();
  };

  const getOne = async (id) => {
    try {
      const docRef = doc(db, "usuarios", id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subId !== "") {
      getOne(subId);
    }
  }, [subId]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <p>
        Bienvenido, <strong>{correoUsuario}</strong> Haz iniciado sesión{" "}
      </p>

      <button className="btn btn-primary" onClick={() => signOut(auth)}>
        Cerrar sesión
      </button>

      <hr />

      <div className="row">
        {/*Esta seccion sera el formulario*/}
        <div className="col-md-4">
          <h3 className="text-center mb-3">Ingresar usuario</h3>
          <form onSubmit={guardarDatos}>
            <div className="card card-body">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control mb-3"
                  placeholder="Ingresa el nombre del empleado"
                  onChange={capturarInputs}
                  value={user.name}
                />

                <select
                  class="form-select"
                  required
                  aria-label="Default select example"
                  name="puestoTrabajo"
                  className="form-control mb-3"
                  onChange={capturarInputs}
                  value={user.puestoTrabajo}
                >
                  <option selected>Seleccione el puesto de trabajo</option>
                  <option value="Masajes">Masajes</option>
                  <option value="TratamientosFaciales">
                    Tratamientos faciales
                  </option>
                  <option value="hidroterapia">hidroterapia</option>
                  <option value="">Ninguna de las anteriores</option>
                </select>

                <textarea
                  class="form-control"
                  name="solicitud"
                  required
                  rows="3"
                  placeholder="Descripción de la solicitud"
                  onChange={capturarInputs}
                  value={user.solicitud}
                ></textarea>
                <br />

                <input
                  type="text"
                  name="ubicacion"
                  required
                  className="form-control mb-3"
                  placeholder="Ingresa la ubicación dentro del spa"
                  onChange={capturarInputs}
                  value={user.ubicacion}
                />
                <input
                  type="date"
                  name="fecha"
                  required
                  className="form-control mb-3"
                  placeholder="Ingrese la fecha"
                  onChange={capturarInputs}
                  value={user.fecha}
                />
              </div>
              <button className="btn btn-primary">
                {subId === "" ? "Guardar" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
        {/*Esta seccion sera la lista de los usuarios*/}
        <div className="col-md-8">
          <h2 className="text-center mb-5">Lista de usuarios</h2>

          <div className="container card">
            <div className="card-body">
              {lista.map((list) => (
                <div key={list.id}>
                  <p>Mantenimiento inmueble: {list.name}</p>
                  <p>Mantenimiento mueble: {list.puestoTrabajo}</p>
                  <p>Descripción: {list.solicitud}</p>
                  <p>Ubicación: {list.ubicacion}</p>
                  <p>Fecha: {list.fecha}</p>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(list.id)}
                  >
                    Eliminar
                  </button>

                  <button
                    className="btn btn-success m-1"
                    onClick={() => setSubId(list.id)}
                  >
                    Actualizar
                  </button>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
