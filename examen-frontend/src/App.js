import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Row from "./components/row.js";

function App() {
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [isShadingEnabled, setIsShadingEnabled] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setInitialUsers(data.results);
        console.log("Cantidad de usuarios:", data.results.length);
      });
  }, []);

  const deleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const sortUsersByCountry = () => {
    const sortedUsers = [...users].sort((a, b) =>
      a.location.country.localeCompare(b.location.country)
    );
    setUsers(sortedUsers);
  };

  const restoreUsers = () => {
    setUsers(initialUsers);
    setSelectedHeader("");
  };

  const filterUsersByCountry = (countrySubstring) => {
    const filteredUsers = initialUsers.filter((user) =>
      user.location.country
        .toLowerCase()
        .includes(countrySubstring.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const sortByField = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      let fieldA = a;
      let fieldB = b;
      field.split(".").forEach((part) => {
        fieldA = fieldA[part];
        fieldB = fieldB[part];
      });
      if (fieldA < fieldB) return -1;
      if (fieldA > fieldB) return 1;
      return 0;
    });
    setUsers(sortedUsers);
    setSelectedHeader(field);
  };

  return (
    <div className="App">
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={() => setIsShadingEnabled(!isShadingEnabled)}>
          {isShadingEnabled ? "Desactivar Sombreado" : "Activar Sombreado"}
        </button>
        <button onClick={sortUsersByCountry}>Ordenar por país</button>
        <button onClick={restoreUsers}>Restaurar Usuarios</button>
        <input
        placeholder="Filtrar por país"
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            filterUsersByCountry(e.target.value);
          }}
        />
      </header>
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th
              className="pointer"
              onClick={() => sortByField("name.first")}
              style={{
                backgroundColor: selectedHeader === "name.first" ? "green" : "",
              }}
            >
              Nombre
            </th>
            <th
              className="pointer"
              onClick={() => sortByField("name.last")}
              style={{
                backgroundColor: selectedHeader === "name.last" ? "green" : "",
              }}
            >
              Apellidos
            </th>
            <th
              className="pointer"
              onClick={() => sortByField("location.country")}
              style={{
                backgroundColor:
                  selectedHeader === "location.country" ? "green" : "",
              }}
            >
              País
            </th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <Row
              key={index}
              user={user}
              index={index}
              deleteUser={deleteUser}
              isShadingEnabled={isShadingEnabled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
