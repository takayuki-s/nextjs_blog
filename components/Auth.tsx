import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'

const cookie = new Cookie()

const Auth: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState('')
  const [error, setError] = useState('')

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/jwt/create/`,
        { username: username, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        router.push('/')
      }
    } catch {
      setError('Login Error')
    }
  }

  return <></>
}

export default Auth
