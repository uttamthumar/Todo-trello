import { useState } from "react";
import "./App.css";
import TaskManagement from "./components/taskManagement";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="bg-blue-200 h-screen content-stretch">
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Router />
        </DndProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
