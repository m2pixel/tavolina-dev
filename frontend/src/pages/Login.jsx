import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      if (user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center space-y-5">
        <img src="/128x128.png" />
        <h2 className="text-2xl font-semibold text-primary">Log in</h2>
        <p className="text-sm">
          Enter your email address and password to log in.
        </p>
      </section>

      <section className="flex justify-center mt-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="w-full py-2 text-gray-600 px-5 border rounded"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="w-full py-2 text-gray-600 px-5 border rounded"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="w-full py-2 bg-primary font-semibold text-dark px-5 rounded"
            >
              Log in
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
