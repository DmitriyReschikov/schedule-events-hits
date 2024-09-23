import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './oauth/authConfig.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing/routing.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authConfig={authConfig}>
    <RouterProvider router={router} ></RouterProvider>
  </AuthProvider>
)