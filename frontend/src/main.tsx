import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.ts'
import { theme } from './styles/theme.ts'
import { GlobalStyles } from './styles/GlobalStyles.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
