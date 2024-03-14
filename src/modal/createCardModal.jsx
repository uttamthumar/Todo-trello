// import React from "react";

// export default function CreateCardModal() {
//   return <div></div>;
// }

// TaskModal.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATA } from "../redux/action.type";
import toast from "react-hot-toast";

const TaskModal = ({
  isOpen,
  onClose,
  tasks,
  setTasks,
  edittasks = {},
  isEdit = false,
}) => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [task, setTask] = useState({
    id: "",
    name: "",
    dec: "",
    date: "",
    status: "todo", //can also be inprogresh and closed
  });

  useEffect(() => {
    console.log("hello");
    if (isEdit) {
      setTask(edittasks);
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = validation(task);
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      toast.error("Please check all Field");
    } else {
      if (isEdit) {
        const indexToUpdate = tasks?.findIndex(
          (obj) => obj.id === edittasks.id
        );
        if (indexToUpdate !== -1) {
          const updatedTask = [...tasks];
          updatedTask[indexToUpdate] = task;
          dispatch({ type: SET_DATA, payload: updatedTask });
          onClose();
          toast.success("Task Updated");
        }
      } else {
        setTasks((prev) => {
          const list = [...prev, task];
          dispatch({ type: SET_DATA, payload: list });
          return list;
        });
        onClose();
        setTask({
          id: "",
          name: "",
          dec: "",
          date: "",
          status: "todo",
        });
        toast.success("Task created");
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    // setTask({ ...task, id: new Date().getTime(), name: value });
    setError({ ...error, [name]: null });
    isEdit
      ? setTask({ ...task, id: edittasks.id, [name]: value })
      : setTask({ ...task, id: new Date().getTime(), [name]: value });
  };

  const validation = (data) => {
    let errors = {};
    let { name, dec, date } = data;
    if (!name) {
      errors.name = "name is required";
    }
    if (!dec) {
      errors.dec = "dec is required";
    }
    if (!date) {
      errors.date = "date is required";
    }

    return errors;
  };

  return (
    <div
      aria-labelledby="modal-title"
      role="dialog"
      // aria-modal="true"
      className={`${
        isOpen ? "block" : "hidden"
      } fixed px-20 inset-0 bg-black bg-opacity-50 z-[50] flex justify-center items-center backdrop`}
    >
      <div className="bg-slate-200 p-8 relative w-[50%] z-[50] rounded-lg">
        <h2 className="text-[2vw] text-slate-800 font-bold my-2">
          {isEdit ? "Edit Task" : " Create New Task"}
        </h2>
        <span className="absolute top-0 right-0 p-3" onClick={() => onClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="name"
              value={task.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="dec"
              value={task.dec}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            />
            {error.dec && (
              <p className="text-red-500 text-sm mt-1">{error.dec}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="date"
              value={task.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {error.date && (
              <p className="text-red-500 text-sm mt-1">{error.date}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              //   type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isEdit ? "Edit task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
