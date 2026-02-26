import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.jsx'
import './index.css'

export const createRoot = ViteReactSSG(
  { routes: [{ path: '/', element: <App /> }] }
)
