import React, { useState } from 'react';
import './App.css';

function DataTable({ data, onEdit, onDelete }) {
  return (
    <div className="data-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>IGN</th>
            <th>Rank</th>
            <th>Waktu Bermain</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.ign}</td>
              <td>{item.rank}</td>
              <td>{item.playTime}</td>
              <td>
                <button onClick={() => onEdit(item.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [name, setName] = useState('');
  const [ign, setIGN] = useState('');
  const [rank, setRank] = useState('');
  const [playTime, setPlayTime] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleIGN = (event) => {
    setIGN(event.target.value);
  };

  const handleRank = (event) => {
    setRank(event.target.value);
  };

  const handlePlayTime = (event) => {
    setPlayTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (name && ign && rank && playTime) {
      const newData = { name, ign, rank, playTime, id: Date.now() };
      setTableData([...tableData, newData]);
      setName('');
      setIGN('');
      setRank('');
      setPlayTime('');
    }
  };

  const handleEdit = (id) => {
    const updateUser = tableData.find((data) => data.id === id);

    if (updateUser) {
      setName(updateUser.name);
      setIGN(updateUser.ign);
      setRank(updateUser.rank);
      setPlayTime(updateUser.playTime);
      setEditingId(id);
    }
  };

  const handleUpdate = () => {
    if (name && ign && rank && playTime && editingId !== null) {
      const updateUser = { name, ign, rank, playTime, id: editingId };
      const updatedData = tableData.map((user) =>
        user.id === editingId ? { ...user, ...updateUser } : user
      );
      setTableData(updatedData);
      setName('');
      setIGN('');
      setRank('');
      setPlayTime('');
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    const updatedData = tableData.filter((data) => data.id !== id);
    setTableData(updatedData);
  };

  return (
    <div className="app-container">
      <h2>Daftar Rank Kelas</h2>
      
      <DataTable data={tableData} onEdit={handleEdit} onDelete={handleDelete} />

      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            value={name}
            onChange={handleName}
            placeholder="Nama"
          ></input>
          <input
            value={ign}
            onChange={handleIGN}
            placeholder="IGN"
          ></input>
          <input
            value={rank}
            onChange={handleRank}
            placeholder="Rank"
          ></input>
          <select value={playTime} onChange={handlePlayTime}>
            <option value="pagi">Pagi</option>
            <option value="siang">Siang</option>
            <option value="malam">Malam</option>
          </select>
        </fieldset>
        <button type="submit">Add Data</button>
      </form>

      <button type="submit" onClick={handleUpdate}>
        Update Data
      </button>
    </div>
  );
}

export default App;
//