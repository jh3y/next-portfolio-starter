import T from 'prop-types'
import Head from 'next/head'
import ThemeToggle from '@/components/theme-toggle'
const Layout = ({ children }) => {
  return (
    <div className="dark:bg-red-200 bg-blue-100 min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeToggle />
      {children}
      <footer>
        <a
          href="https://twitter.com/jh3yy"
          target="_blank"
          rel="noopener noreferrer">
          Powered by jh3y ʕ •ᴥ•ʔ
        </a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: T.any,
}

export default Layout
