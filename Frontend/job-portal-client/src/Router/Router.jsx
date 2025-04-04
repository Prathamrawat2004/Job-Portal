import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import Myjobs from "../Pages/Myjobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import SignUp from "../Pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Parent route
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },

      {
        path: "/my-job",
        element: (
          <ProtectedRoute>
            <Myjobs />
          </ProtectedRoute>
        ),
      },

      {
        path: "/salary",
        element: (
          <ProtectedRoute>
            <SalaryPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "edit-job/:id",
        element: <UpdateJob />,

        // fetching the content before the component renders
        loader: ({ params }) =>
          fetch(`http://localhost:5000/all-jobs/${params.id}`),
      },

      {
        path: "/job/:id",
        element: <JobDetails />,
      },

      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
