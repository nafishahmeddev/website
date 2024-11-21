import HomePage from "./pages/HomePage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ResumePage from "./pages/ResumePage";
import FintrackerPrivacyPage from "./pages/fintracker/FintrackerPrivacyPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
  },
  {
    path: "/fintracker/privacy",
    element: <FintrackerPrivacyPage />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
