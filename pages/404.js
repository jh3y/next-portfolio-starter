import Head from 'next/head'
import Layout from '@/components/layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Oops!: next-portfolio-starter</title>
      </Head>
      <main className="prose lg:prose-xl mx-auto">
        <h1>ʕノ•ᴥ•ʔノ ︵ ┻━┻</h1>
        <Link href="/">Back to happiness</Link>
      </main>
    </Layout>
  )
}
