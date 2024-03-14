import React, { useState } from "react";
import TaskModal from "../modal/createCardModal";

export default function CreateTask({ tasks, setTasks }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleSubmit = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-yellow-700 rounded-2xl hover:bg-yellow-600 px-8 h-12 text-white"
      >
        Create Task
      </button>
      {isOpenModal && (
        <TaskModal
          isOpen={isOpenModal}
          onClose={handleClose}
          task={tasks}
          setTasks={setTasks}
        />
      )}
    </div>
  );
}
