import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPostsData } from '../lib/fetch'
import { POST } from '../types/types'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
interface STATICPROPS {
  posts: POST[]
}

const BlogPage: React.FC<STATICPROPS> = ({ posts }) => {
  const [hasToken, setHasToken] = useState(false)
  const logout = () => {
    cookie.remove('access_token')
    setHasToken(false)
  }
  const deletePost = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/delete-blog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${cookie.get('access_token')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      }
    })
  }
  useEffect(() => {
    if (cookie.get('access_token')) {
      setHasToken(true)
    }
  }, [])
  return (
    <Layout title="Blog">
      <p className="text-4xl mb-10">blog page</p>
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a className="cursor-pointer border-b border-gray-500 hover:bg-gray-300">
                  {post.title}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </Layout>
  )
}
export default BlogPage
