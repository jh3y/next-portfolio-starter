import Head from 'next/head'
import Layout from '@/components/layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home: next-portfolio-starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="prose lg:prose-xl mx-auto">
        <h1>Next Portfolio Starter</h1>
        <h2>Get up and running with your next portfolio in no time at all!</h2>
      </main>
    </Layout>
  )
}
