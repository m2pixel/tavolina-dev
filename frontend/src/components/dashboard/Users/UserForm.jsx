import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../features/users/userSlice'
import { toast } from 'react-toastify'
import Button from '../../Button'

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
              <option value="user">Kamarier</option>
              <option value="admin">Menaxher</option>
            </select>
          </div>
          <button
            className="w-80 bg-dark rounded font-bold text-sm hover:bg-opacity-80 uppercase text-white py-3"
            type="submit"
          >
            Shto perdorues
          </button>
          `
          <Button
            title="Kthehu mbrapa"
            action={() => reload()}
            buttonStyle={6}
          />
          `
        </form>
      </section>
    </div>
  )
}

export default CategoryForm
