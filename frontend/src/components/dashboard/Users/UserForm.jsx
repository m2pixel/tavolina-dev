import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../features/users/userSlice'
import { toast } from 'react-toastify'

function CategoryForm({ reload }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
  })

  const { name, email, password, password2, role } = formData

  const dispatch = useDispatch()

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
    } else if (role === '') {
      toast.error('Please select user role')
    } else {
      const userData = {
        name,
        email,
        password,
        role,
      }

      dispatch(createUser(userData))
      reload()
    }
  }

  return (
    <div className="flex flex-col items-center pt-5">
      <p className="text-sm pb-5">
        Per te shtuar nje kategori te re ju lutem shenoni emrin e kategorise.
      </p>

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
              className="w-80 bg-primary rounded font-bold text-sm hover:bg-secondary text-white py-3"
              type="submit"
            >
              Shto kategori
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default CategoryForm
