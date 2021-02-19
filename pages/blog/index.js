import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import path from 'path'
import slugify from 'slugify'

import Layout from '@/components/layout'

const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

const Blog = ({ posts }) => {
  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.filePath}>
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
              <a>{post.data.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Blog

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath))
    const { content, data } = matter(source)

    return {
      content,
      data,
      filePath,
      slug: slugify(filePath.toLowerCase(), {
        remove: /[*+~.()'"!:@mdx]/gm,
      }),
    }
  })

  return { props: { posts } }
}
