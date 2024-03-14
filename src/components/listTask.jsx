import React, { useEffect, useState } from "react";
import { Section } from "./index";

export default function ListTasks({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  let status = ["todo", "inprogress", "closed"];


  useEffect(() => {
    const filterTodos = tasks?.filter((task) => task.status === "todo");
    const filterInProgress = tasks?.filter(
      (task) => task.status === "inprogress"
    );
    const filterClosed = tasks?.filter((task) => task.status === "closed");

    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setClosed(filterClosed);
  }, [tasks]);


  return (
    <div className="flex justify-center gap-16">
      {status.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            closed={closed}
          />
        );
      })}
    </div>
  );
}
