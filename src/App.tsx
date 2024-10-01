import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { ToastContainer } from "./components/ToastContainer"


const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer/>
    </>
  )
}

export default App