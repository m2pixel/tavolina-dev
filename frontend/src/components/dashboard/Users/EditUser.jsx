import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, updateUser } from '../../../features/users/userSlice'
import { getRoles } from '../../../features/role/roleSlice'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'
import Button from '../../Button'

export default function EditUser() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
  })
  const [changePwd, setChangePwd] = useState(false)
  const { name, email, password, password2, role } = formData
  const { user, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.users
  )
  const { roles } = useSelector((state) => state.roles)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser(id))
    dispatch(getRoles())

    if (isError) {
      console.log(message)
    }

    if (isSuccess && user.length > 0) {
      setFormData((prev) => ({
        ...prev,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      }))
    }
  }, [id, isSuccess])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || role === '') {
      toast.error('Fushat nuk duhet te jene te zbrazta')
    } else {
      dispatch(updateUser({ id: id, user: { name, email, password, role } }))
      message !== '' && toast.success(message)
      navigate('/dashboard/users')
    }
  }

  const goBack = () => {
    navigate('/dashboard/users')
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center pt-5">
          <p className="w-2/3 text-sm text-center pb-5">
            Te dhenat e perdoruesit mund te ndryshoni ne formen me poshte.{' '}
            <br />
            Per te ndryshuar fjalekalimin shtypni butonin{' '}
            <strong>"Ndrysho Fjalekalimin"</strong>.
          </p>

          <section className="">
            <form className="" onSubmit={onSubmit}>
              {!changePwd ? (
                <div className="flex flex-col justify-center mt-5 space-y-5">
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
                </div>
              ) : (
                <div className="flex flex-col justify-center mt-5 space-y-5">
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
                  </div>{' '}
                </div>
              )}
              <div className="flex flex-row justify-between space-x-5 pt-5">
                <div
                  className="w-38 border border-dark text-dark cursor-pointer rounded font-bold text-sm hover:opacity-80 py-3 px-2 text-center"
                  onClick={() => setChangePwd((prev) => !prev)}
                >
                  {changePwd ? 'Ndrysho te dhenat' : 'Ndrysho fjalekalimin'}
                </div>
                <button
                  className="w-36 bg-dark rounded font-bold text-sm hover:bg-opacity-80 text-white py-3"
                  type="submit"
                >
                  Ruaj
                </button>
              </div>
              <div className="pt-5">
                <Button
                  title="Kthehu mbrapa"
                  buttonStyle={6}
                  action={() => goBack()}
                />
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
