import '../styles/globals.css'
import '../styles/topics.css'
import '../styles/categoryPage.css'
import Head from 'next/head'
import ErrorBoundary from '../components/common/ErrorBoundary'
import { ThemeProvider } from '../context/ThemeContext'
import { NewsProvider } from '../context/NewsContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <title>FlashPatrika - Breaking News & Updates</title>
      </Head>
      <ErrorBoundary>
        <NewsProvider>
          <Component {...pageProps} />
        </NewsProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default MyApp