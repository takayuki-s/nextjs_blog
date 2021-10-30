import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import link from 'next/link'
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
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      Hello Nextjs
    </div>
  )
}
export default BlogPage
