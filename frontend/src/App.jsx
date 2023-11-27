import HomePage from "./pages/HomePage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ResumePage from "./pages/ResumePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
