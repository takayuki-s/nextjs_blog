import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch'
import { POST } from '../../types/types'
import { GetStaticProps, GetStaticPaths } from 'next'

const PostDetail: React.FC<POST> = ({
  title,
  content,
  username,
  tags,
  created_at,
}) => {
  return (
    <Layout title={title}>
      <div>
        {tags &&
          tags.map((tag, i) => (
            <span
              className={`px-2 py-2 m-1 text-white rounded ${
                i === 0
                  ? 'bg-blue-500'
                  : i === 1
                  ? 'bg-gray-500'
                  : i === 2
                  ? 'bg-green-500'
                  : i === 3
                  ? 'bg-yellow-500'
                  : i === 4
                  ? 'bg-indigo-500'
                  : 'bg-gray-400'
              }`}
              key={tag.id}
            >
              {tag.name}
            </span>
          ))}
      </div>
    </Layout>
  )
}

export default PostDetail
