import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import scss from "./Todo.module.scss";

const Todo = () => {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [inputAge, setInputAge] = useState("");
  const [inputImg, setInputImg] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [newInputValue, setNewInputValue] = useState("");
  const [newInputAge, setNewInputAge] = useState("");
  const [newInputImg, setNewInputImg] = useState("");

  const edit = (item) => {
    setNewInputValue(item.title);
    setNewInputAge(item.age);
    setNewInputImg(item.img);
    setIsEdit(item.id);
  };

  const saveTodo = (id) => {
    dispatch({
      type: "EDIT",
      payload: {
        id: id,
        newData: {
          title: newInputValue,
          age: newInputAge,
          img: newInputImg,
        },
      },
    });

    setIsEdit(null);
  };

  const handleAdd = () => {
    if (inputValue === "" || inputAge === "" || inputImg === "") {
      return null;
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: new Date().toISOString(),
          title: inputValue,
          age: inputAge,
          img: inputImg,
          completed: false,
        },
      });
    }

    setInputValue("");
    setInputAge("");
    setInputImg("");
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const DeleteAll = () => {
    dispatch({ type: "DELETE_ALL" });
  };
  const toggleCompleted = (id) => {
    dispatch({ type: "TOGGLE_COMPLETED", payload: { id } });
  };

  return (
    <div>
      <div className={scss.todo}>
        <input
          type="text"
          placeholder="text....."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="date"
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
        />
        <input
          type="url"
          placeholder="image"
          value={inputImg}
          onChange={(e) => setInputImg(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={DeleteAll}>DeleteAll</button>
      </div>

      {todos.map((item) =>
        isEdit === item.id ? (
          <div key={item.id} className={scss.edit}>
            <div className={scss.aside}>
              <input
                type="text"
                value={newInputValue}
                onChange={(e) => setNewInputValue(e.target.value)}
              />
              <input
                type="date"
                value={newInputAge}
                onChange={(e) => setNewInputAge(e.target.value)}
              />
              <input
                type="text"
                value={newInputImg}
                onChange={(e) => setNewInputImg(e.target.value)}
              />
              <button onClick={() => saveTodo(item.id)}>Save</button>
              <button onClick={() => setIsEdit(null)}>cancel</button>
            </div>
          </div>
        ) : (
          <div className={scss.render} key={item.id}>
            <div className={scss.items}>
              <input
                type="checkbox"
                checked={item.completed}
                className={scss.line}
                onChange={() => toggleCompleted(item.id)}
              />
              <p>{item.title}</p>
              <p>{item.age}</p>
              <img src={item.img} alt="image" />
              <button
                className={scss.delete}
                onClick={() => deleteTodo(item.id)}
              >
                delete
              </button>
              <button className={scss.update} onClick={() => edit(item)}>
                update
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Todo;
