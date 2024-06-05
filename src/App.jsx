import { useState, useRef, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [Todo, setTodo] = useState("");
  const [values, setvalues] = useState([]);
  const [ShowFinished, setShowFinished] = useState(false);
  const SaveToLS = () => {
    localStorage.setItem("values", JSON.stringify(values));
  };

  useEffect(() => {
    let todoString = localStorage.getItem("values");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("values"));
      setvalues(todos);
    }
  }, []);

  const HanddleAdd = () => {
    setvalues([...values, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    SaveToLS();
  };

  const HanddleChange = (e) => {
    setTodo(e.target.value);
  };

  const HanddleEdit = (id) => {
    const todo = values.filter((item) => {
      return item.id === id;
    });
    setTodo(todo[0].Todo);

    let index = values.filter((items) => {
      return items.id !== id;
    });
    setvalues(index);
    SaveToLS();
  };

  const HanddleDelete = (e, id) => {
    let index = values.filter((items) => {
      return items.id !== id;
    });
    setvalues(index);
    SaveToLS();
  };

  const HanddleCheckBox = (e) => {
    let id = e.target.name;
    const index = values.findIndex((items) => {
      console.log(items);
      return items.id === id;
    });
    let newValues = [...values];
    newValues[index].isCompleted = !newValues[index].isCompleted;
    setvalues(newValues);
    SaveToLS();
  };

  const HanddleFinished = (e) => {
    setShowFinished(!ShowFinished);
  };

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-2/4">
        <p className="font-bold text-center text-xl">
          Your Todo Planner at one place
        </p>
        <div className="addTodo my-5 flex flex-col gap-2">
          <h2 className="text-lg font-bold">Add Todos</h2>

          <input
            type="text"
            className="full rounded-full p-1 "
            onChange={HanddleChange}
            value={Todo}
            name={values}
          />
          <button
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1  text-white rounded-full "
            onClick={HanddleAdd}
            disabled={Todo.length < "3"}
          >
            Save
          </button>
        </div>
        <input
          type="checkbox"
          name=""
          id=""
          checked={ShowFinished}
          onChange={HanddleFinished}
        />{" "}
        Show Finished
        <div className="h-[2px] bg-black opacity-80"></div>
        <h1 className="text-2xl font-bold">Your todos</h1>
        <div className="todos">
          {values.length === 0 && <div className="m-5">No todos here</div>}
          {values.map((items) => {
            return (
              (ShowFinished || !items.isCompleted) && (
                <div
                  className="todo flex w-2/4 my-3 justify-between"
                  key={items.id}
                >
                  <input
                    type="checkbox"
                    name={items.id}
                    checked={items.isCompleted}
                    onChange={HanddleCheckBox}
                  />
                  <div className={items.isCompleted ? "line-through" : ""}>
                    {items.Todo}
                  </div>
                  <div className="buttons flex">
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-1 py-px text-white rounded-md mx-1"
                      onClick={() => {
                        HanddleEdit(items.id);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1"
                      onClick={(e) => {
                        HanddleDelete(e, items.id);
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
