import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { ResultProvider } from "./Context/ResultContext";

createRoot(document.getElementById("root")).render(
  <ResultProvider>
    <RouterProvider router={router} />
  </ResultProvider>
);
