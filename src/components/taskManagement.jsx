import React, { useEffect, useState } from "react";
import { CreateTask, TopHeader } from "./index";
import { ListTasks } from "./index";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (data && data) {
      setTasks(data);
    }
  }, [data]);

  return (
      <>
      <TopHeader />
    <div className="bg-slate-100 flex flex-col h-screen w-full text-center pt-32 gap-16">
      <Toaster />
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks} />
    </div>
    </>
  );
}
