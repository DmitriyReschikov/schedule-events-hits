import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useContext } from "react"
import { IAuthContext, AuthContext } from "react-oauth2-code-pkce"
import { setupTokenInterceptor } from "./api/axios/instance"

const App = () => {

  const { token } = useContext<IAuthContext>(AuthContext)
  setupTokenInterceptor(token)

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App