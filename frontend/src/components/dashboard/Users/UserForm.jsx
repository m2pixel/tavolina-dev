import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../../features/users/userSlice'
import { getRoles } from '../../../features/role/roleSlice'
import { toast } from 'react-toastify'
import Button from '../../Button'
import { useEffect } from 'react'

function CategoryForm({ reload }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
  })

  const { name, email, password, password2, role } = formData
  const { roles, message } = useSelector((state) => state.roles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

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
    <div className="flex flex-col items-center justify-center pt-5">
      <p className="w-2/3 text-sm text-center pb-5">
        Per te shtuar nje perdorues ju duhet te plotesoni te dhenat e nevojshme
        per perdoruesin e ri.
      </p>

      <section className="flex justify-center mt-5">
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="w-full">
            <input
              type="text"
              className="w-full py-2 px-5 text-dark border border-dark rounded"
              id="name"
              name="name"
              value={name}
              placeholder="Emri"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="w-full py-2 px-5 text-dark border border-dark rounded"
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
              className="w-full py-2 px-5 text-dark border border-dark rounded"
              id="password"
              name="password"
              value={password}
              placeholder="Fjalekalimi"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="w-full py-2 px-5 text-dark border border-dark rounded"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Perserit fjalekalimin"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <select
              name="role"
              id="role"
              value={role}
              onChange={onChange}
              className="w-full py-2 px-5 text-dark border border-dark rounded"
            >
              <option>Roli</option>
              {roles?.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>
          <Button title="Shto perdorues" buttonStyle={7} />
          <Button
            title="Kthehu mbrapa"
            action={() => reload()}
            buttonStyle={6}
          />
        </form>
      </section>
    </div>
  )
}

export default CategoryForm
