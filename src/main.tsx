import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './oauth/authConfig.ts'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authConfig={authConfig}>
    <App/>
  </AuthProvider>
)