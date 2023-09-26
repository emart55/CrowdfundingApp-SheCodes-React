import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage"
import ProjectPage from './pages/ProjectPage';
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar"
import CreateAccountPage from "./pages/CreateAccountPage";
import AboutPage from "./pages/AboutPage";
import NewProjectPage from './pages/NewProjectPage';
import ProjectsPage from "./pages/projectsPage"
import CreatePledgePage from './pages/CreatePledgePage';
import { AuthProvider } from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/createaccount",
        element: <CreateAccountPage />
      },
      {
        path: "/project/:id",
        element: <ProjectPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: '/newprojectpage',
        element: <NewProjectPage />,
      },
      { path: "/projects", 
      element: <ProjectsPage />   
      },
      {
        path: "/pledges",
        element: <CreatePledgePage /> 
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
