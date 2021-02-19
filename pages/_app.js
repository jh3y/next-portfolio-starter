import 'tailwindcss/tailwind.css'
import T from 'prop-types'

const Portfolio = ({ Component, pageProps }) => <Component {...pageProps} />
Portfolio.propTypes = {
  Component: T.elementType,
  pageProps: T.object,
}

export default Portfolio
