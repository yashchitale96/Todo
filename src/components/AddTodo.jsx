import { useState } from "react";

function AddTodo() {
  const [text, addText] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  function changeHandler(e) {
    addText(e.target.value);
  }

  function clickHandler(e) {
    e.preventDefault();
    const addedData = {
      id: Date.now(),
      text: text
    };
    setData([...data, addedData]);
    addText("");
  }

  function handleDelete(id) {
    const updatedData = data.filter(inputvalue => inputvalue.id !== id);
    setData(updatedData);
  }

  function editHandler(id, currentText) {
    setEditId(id);
    setEditText(currentText);
  }

  function saveEditHandler(id) {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, text: editText } : item
    );
    setData(updatedData);
    setEditId(null);
    setEditText("");
  }

  return (
    <div>
      <label htmlFor="">Add Task: </label>
      <input
        type="text"
        onChange={changeHandler}
        value={text}
        placeholder="Add a Task"
      />
      <button onClick={clickHandler}>Add</button>

      {data.map((inputvalue) => (
        <div key={inputvalue.id}>
          <div style={{ display: "flex", gap: "5px" }}>
            <input type="checkbox" />

            {editId === inputvalue.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEditHandler(inputvalue.id)}>✅</button>
              </>
            ) : (
              <>
                <p>{inputvalue.text}</p>
                <button onClick={() => editHandler(inputvalue.id, inputvalue.text)}>✏️</button>
              </>
            )}

            <button
              style={{ borderStyle: "none", background: "white" }}
              onClick={() => handleDelete(inputvalue.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddTodo;
