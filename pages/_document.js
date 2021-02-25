import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/**
          TODO:: Insert common things here.
        */}
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="A Portfolio accelerator built with Next.js, Storybook, Tailwind, and Netlify CMS" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
