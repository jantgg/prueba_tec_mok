import React from "react";
import "./row.css";

function Row({ user, index, deleteUser, isShadingEnabled }) {
  const rowClass = isShadingEnabled ? (index % 2 === 0 ? "par" : "impar") : "";

  return (
    <tr className={`row  ${rowClass}`}>
    <td><img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} /></td>
      <td>{user.name.first}</td>
      <td>{user.name.last}</td>
      <td>{user.location.country}</td>
      
      <td>
        <button onClick={() => deleteUser(user.email)}>Borrar</button>
      </td>
    </tr>
  );
}

export default Row;
