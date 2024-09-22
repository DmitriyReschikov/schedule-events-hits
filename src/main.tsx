import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './oauth/authConfig.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authConfig={authConfig}>
      <App />
  </AuthProvider>
)
