import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PdfPage from './Pages/PdfPage';
import { ToastProvider } from 'tw-noti';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home"
import NewPdf from './Pages/NewPdf';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newpdf",
    element: <NewPdf />
  },
  {
    path: "/pdf",
    element: <PdfPage />,
  },

]);

function App() {

  return (
    <>
   <ToastProvider>
      <RouterProvider router={router}></RouterProvider>
    </ToastProvider>
    </>
  )
}

export default App
