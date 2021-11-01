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
  return <></>
}

export default Auth
