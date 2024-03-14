import React, { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SET_DATA } from "../redux/action.type";
import TaskModal from "../modal/createCardModal";

export default function Lists({ task, tasks, setTasks }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    const removeFilter = tasks.filter((item) => item.id !== id);
    dispatch({ type: SET_DATA, payload: removeFilter });
    toast("Task removed", { icon: "☠️" });
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleSubmit = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div
        ref={drag}
        className={`relative  mt-8 shadow-md ${
          isDragging ? "opacity-25 " : "opacity-100"
        } rounded-md `}
        onClick={() => handleSubmit()}
      >
        <div className="flex p-4 justify-between items-center mb-2">
          <p className="text-sm text-gray-500 ">{task.date}</p>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click propagation to parent div
              handleRemove(task.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-lg p-2 font-medium">{task.name}</p>
        <p className="text-sm py-4 px-1 text-gray-700">{task.dec}</p>
      </div>
      {isOpenModal && (
        <TaskModal
          isOpen={isOpenModal}
          onClose={handleClose}
          tasks={tasks}
          setTasks={setTasks}
          isEdit={true}
          edittasks={task}
        />
      )}
    </>
  );
}
