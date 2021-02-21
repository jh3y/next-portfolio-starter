import Head from 'next/head'
import Layout from '@/components/layout'
import Image from '@/components/image'
// import Image from 'next/image'

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
        <Image src="/images/galaxy_vbrntm.jpg" alt="Stars at night" width={[100, 250]} sizes={['(max-width: 400px) 100px', '250px']} />
      </main>
    </Layout>
  )
}
