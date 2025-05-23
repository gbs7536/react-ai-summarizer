import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";

export const routerConfig = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <NoteList />,
      },
      {
        path: "notes/:id",
        element: <NoteDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;