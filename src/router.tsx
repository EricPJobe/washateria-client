import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Dryers } from "./pages/Dryers";
import { Roles } from "./pages/Roles";
import { Tasks } from "./pages/Tasks";
import { Users } from "./pages/Users";
import { VendingMachines } from "./pages/VendingMachines";
import { Washers } from "./pages/Washers";
import { Home } from "./pages/Home";
import WasherForm from "./forms/WasherForm";
import DryerForm from "./forms/DryerForm";
import RoleForm from "./forms/RoleForm";
import TaskForm from "./forms/TaskForm";
import UserForm from "./forms/UserForm";
import VendingMachineForm from "./forms/VendingMachineForm";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "dashboard",
          element: <Home />,
        },
        {
          path: "roles",
          element: <Roles />,
        },
        {
          path: "roles/:id",
          element: <RoleForm />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "users/:id",
          element: <UserForm />,
        },
        {
          path: "washers",
          element: <Washers />,
        },
        {
          path: "washers/:id",
          element: <WasherForm />,
        },
        {
          path: "dryers",
          element: <Dryers />,
        },
        {
          path: "dryers/:id",
          element: <DryerForm />,
        },
        {
          path: "vendingmachines",
          element: <VendingMachines />,
        },
        {
          path: "vendingmachines/:id",
          element: <VendingMachineForm />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "tasks/:id",
          element: <TaskForm />,
        },
      ],
    },
  ]);