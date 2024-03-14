import React from "react";
import { Header } from "./index";
import { Lists } from "./index";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { SET_DATA } from "../redux/action.type";
import toast from "react-hot-toast";

export default function Section({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  closed,
}) {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      addItemTosection(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "text";
  let bg = "bg-slate-500";
  let taskToMap = todos;

  if (status === "inprogress") {
    text = "inprogress";
    bg = "bg-red-500";
    taskToMap = inProgress;
  }
  if (status === "closed") {
    text = "closed";
    bg = "bg-green-500";
    taskToMap = closed;
  }
  const addItemTosection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: status };
        }
        return item;
      });
      dispatch({ type: SET_DATA, payload: mTasks });
      toast("Task Status Changed", { icon: "✔️" });
      return mTasks;
    });
  };
  return (
    <div
      ref={drop}
      className={`w-64 h-72 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={taskToMap.length} />
      {taskToMap.length > 0 &&
        taskToMap.map((task, index) => {
          return (
            <Lists key={index} task={task} tasks={tasks} setTasks={setTasks} />
          );
        })}
    </div>
  );
}
