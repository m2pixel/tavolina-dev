import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Button from '../components/Button'
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

    if (isSuccess && user) {
      if (user.permission) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }

    if (user) {
      navigate('/')
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

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-layerBg">
      <div className="bg-white py-5 px-5 rounded-2xl shadow-xl">
        {isLoading ? (
          <Spinner />
        ) : (
          <section className="flex flex-col items-center space-y-5">
            <img
              src="/logo-128x84.png"
              width="128"
              height="84"
              alt="Tavolina"
            />
            <h2 className="text-2xl font-semibold text-dark">Log in</h2>
            <p className="text-sm">Sheno email adresen dhe fjalekalimin</p>
          </section>
        )}

        <section className="flex justify-center my-5">
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="w-full py-2 px-5 text-dark placeholder-dark border border-dark text-center rounded"
                id="email"
                name="email"
                value={email}
                placeholder="Email adresa"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="w-full py-2 px-5 text-dark placeholder-dark border border-dark text-center rounded"
                id="password"
                name="password"
                value={password}
                placeholder="Fjalekalimi"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="w-80 bg-tableOff cursor-pointer rounded font-bold text-sm hover:opacity-80 uppercase text-white py-3 px-2 text-center"
              >
                Kyçu
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Login
