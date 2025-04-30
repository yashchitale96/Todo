import { useState } from "react";

function AddTodo() {
  const [text, addText] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [completedTasks, setCompletedTasks] = useState([])

  function changeHandler(e) {
    addText(e.target.value);
    console.log(text)
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

  function toggleComplete(id) {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(taskId => taskId !== id))
    }

    else {
      setCompletedTasks([...completedTasks, id])
    }
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
            <input
              type="checkbox"
              checked={completedTasks.includes(inputvalue.id)}
              onChange={() => toggleComplete(inputvalue.id)}
            />

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
                <p style={{
                  textDecoration: completedTasks.includes(inputvalue.id)
                    ? "line-through"
                    : "none"
                }}>{inputvalue.text}</p>
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
