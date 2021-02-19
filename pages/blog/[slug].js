/**
 * Based on https://github.com/vercel/next.js/blob/canary/examples/with-mdx-remote/pages/posts/%5Bslug%5D.js
 */
import T from 'prop-types'
import fs from 'fs'
import matter from 'gray-matter'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import path from 'path'
import Layout from '@/components/Layout'
// import { postFilePaths, POSTS_PATH } from '@/utils/posts/mdx-grab'

// const BigLink = (props) => (
//   <a className="text-xl color-blue-500" {...props}>
//     {props.children}
//   </a>
// )

// const components = {
//   // a: BigLink,
// }

const POSTS_PATH = path.join(process.cwd(), 'posts')

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))

const Post = ({ source, frontMatter }) => {
  const content = hydrate(source, {})
  return <Layout>{content}</Layout>
}
Post.propTypes = {
  source: T.object,
  frontMatter: T.object,
}

export default Post

export async function getStaticProps({ params }) {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await renderToString(content, {
    // components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export async function getStaticPaths() {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
