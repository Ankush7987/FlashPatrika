import '../styles/globals.css'
import '../styles/topics.css'
import '../styles/categoryPage.css'
import ErrorBoundary from '../components/common/ErrorBoundary'
import { ThemeProvider } from '../context/ThemeContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default MyApp