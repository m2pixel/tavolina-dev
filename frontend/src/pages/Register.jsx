import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
  })

  const { name, email, password, password2, role } = formData

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
      if (role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch, role])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
        role,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="flex justify-center">
        <h1>Add new user</h1>
        <span className="block-inline"></span>
      </section>

      <section className="flex justify-center mt-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="w-full">
            <input
              type="text"
              className="w-full py-2 text-gray-600 px-5 border rounded"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="w-full py-2 text-gray-600 px-5 border rounded"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <select
              name="role"
              id="role"
              value={role}
              onChange={onChange}
              className="w-full py-2 text-gray-600 px-5 border rounded"
            >
              <option>Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 font-semibold text-gray-200 px-5 border rounded"
            >
              Add user
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
