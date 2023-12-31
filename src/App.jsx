import { useEffect, useState } from "react";
import "./App.css";
// import PencilIcon from "../public/pencil.svg";
// import DelIcon from "../public/del.svg";
// import CancelIcon from "../public/cancel.svg";
// import AddIcon from "../public/add.svg";
function App() {
  const listTask = JSON.parse(localStorage.getItem("listTask"));
  const [list, setList] = useState(listTask ?? []);
  const [count, setCount] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");

  const handleChange = async (e) => {
    const inputValue = await e.target.value;
    setNewTask(inputValue);
  };
  const handleChangeUpdate = async (e) => {
    const inputValue = await e.target.value;
    setUpdateTask(inputValue);
  };
  const handleAdd = () => {
    if (newTask != "") {
      var nextId;
      list.length == 0 ? (nextId = 0) : (nextId = list[list.length - 1].id + 1);
      var newList = [
        ...list,
        { id: nextId, name: newTask, isDone: false, isEditing: false },
      ];
      setList(newList);
      setNewTask("");
      localStorage.setItem("listTask", JSON.stringify(newList));
    }
  };
  const handleReset = () => {
    setList([]);
    localStorage.removeItem("listTask");
  };
  const handleEdit = (id) => {
    var newList = list.map((task) =>
      task.id === id ? { ...task, isEditing: true } : task
    );
    setList(newList);
    setUpdateTask(list.find((task) => task.id == id).name);
  };
  const handleCancel = (id) => {
    var newList = list.map((task) =>
      task.id === id ? { ...task, isEditing: false } : task
    );
    setList(newList);
    setUpdateTask("");
  };
  const handleDelete = (id) => {
    var newList = list.filter((task) => task.id != id);
    setList(newList);
    localStorage.setItem("listTask", JSON.stringify(newList));
  };
  const handleUpdate = (id) => {
    if (updateTask) {
      var newList = list.map((task) =>
        task.id === id ? { ...task, isEditing: false, name: updateTask } : task
      );
      setList(newList);
      localStorage.setItem("listTask", JSON.stringify(newList));
    }
  };
  const handleChangeStatus = (id) => {
    var newList = list.map((task) =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setList(newList);
    localStorage.setItem("listTask", JSON.stringify(newList));
  };
  useEffect(() => {
    var toDoList = list.filter((task) => task.isDone == false);
    setCount(toDoList.length);
  }, [list]);
  return (
    <div className="mt-16 w-[500px]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between ">
          <h1 className="tracking-[.25em] text-3xl font-bold uppercase text-white dark:text-blue-600 ">
            my tasks
          </h1>
          <button className="flex flex-wrap w-10 h-15 justify-center content-center p-0 bg-slate-300 ">
            <svg
              className="h-4 w-4 text-black"
              viewBox="0 0 24 24"
              fill="inherit"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
        <div className="p-3 bg-white border rounded-lg flex justify-between ">
          <div className="flex flex-wrap content-center gap-2 w-full">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <input
              placeholder="Add a new task..."
              className="w-5/6"
              name="new"
              id="new"
              onChange={(e) => {
                handleChange(e);
              }}
              value={newTask}
            />
          </div>
          <div>
            <button className="text-gray-500 uppercase" onClick={() => handleAdd()}>
              Add
            </button>
          </div>
        </div>
        <div className="p-3 bg-white border rounded-lg flex flex-col gap-5 min-h-80">
          <div className=" flex justify-between border-b-2 pb-3">
            <p className="text-gray-500">{count} tasks left</p>
            <button className="text-gray-500" onClick={() => handleReset()}>
              Clear all tasks
            </button>
          </div>
          {list.length ? (
            <div className="flex flex-col gap-3">
              {list.map((task) => (
                <div
                  className="flex justify-between border-b-2 pb-3"
                  key={task.id}
                >
                  <div className="flex gap-3">
                    {!task.isEditing && (
                      <input
                        className=""
                        type="checkbox"
                        name={task}
                        id={task.id}
                        onClick={() => handleChangeStatus(task.id)}
                        defaultChecked={task.isDone}
                      />
                    )}
                    <input
                      className={`font-semibold bg-white ${
                        task.isDone ? "line-through text-gray-500" : ""
                      }`}
                      value={updateTask !== "" && task.isEditing ? updateTask : task.name}
                      onChange={(e) => handleChangeUpdate(e)}
                      disabled={!task.isEditing}
                    />
                  </div>
                  <div className="flex gap-3">
                    {task.isEditing ? (
                      <>
                        <button onClick={() => handleUpdate(task.id)}>
                          <svg
                            className="text-gray-500"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button onClick={() => handleCancel(task.id)}>
                          <svg
                            className="text-gray-500"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(task.id)}>
                          <svg
                            className="text-gray-500"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(task.id)}>
                          <svg
                            width="20"
                            height="20"
                            className=" text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-center content-center h-full font-semibold">
              <p className="text-gray-500">Empty task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
