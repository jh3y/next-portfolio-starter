import Head from 'next/head'
import Layout from '@/components/layout'
import Image from '@/components/image'
import NextImage from 'next/image'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home: next-portfolio-starter</title>
      </Head>
      <main className="prose lg:prose-xl mx-auto">
        <h1>Next Portfolio Starter</h1>
        <h2>Get up and running with your next portfolio in no time at all!</h2>
        <Image
          className="w-24 h-24"
          src="/images/galaxy_vbrntm.jpg"
          alt="Stars at night"
          width={250}
          height={250}
          sizes={['(max-width: 400px) 100px', '250px']}
        />
        <NextImage
          src="/images/galaxy_vbrntm.jpg"
          alt="Stars at night"
          width={250}
          height={250}
        />
      </main>
    </Layout>
  )
}
