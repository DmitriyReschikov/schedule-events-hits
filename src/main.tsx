import ReactDOM from 'react-dom/client'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { authConfig } from './oauth/authConfig.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing/routing.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider authConfig={authConfig}>
    <Provider store={store}>
      <RouterProvider router={router} ></RouterProvider>
    </Provider>
  </AuthProvider>
)