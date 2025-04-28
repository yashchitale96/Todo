import { useState } from "react";

function AddTodo() {
  const [text, addText] = useState("");
  const [data, setData] = useState([]);

  function changeHandler(e) {
    addText(e.target.value);
    console.log(text);
  }

  function clickHandler(e) {
    e.preventDefault();
    const addedData = {
      id: Date.now(),
      text: text
    };
    setData([...data, addedData]);    // Corrected here
    addText("");
  }

  function handleDelete(id) {
    const updatedData = data.filter(inputvalue => inputvalue.id !== id);
    setData(updatedData);
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
            <p>{inputvalue.text}</p>    {/* Use inputvalue.text */}
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
