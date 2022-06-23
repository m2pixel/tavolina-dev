import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Button'
import {
  getCategories,
  updateCategory,
} from '../../../features/categories/categorySlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'

export default function EditCategory() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
  })
  const { name } = formData
  const { categories, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.categories
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCategories())

    if (isError) {
      console.log('Error: ', message)
    }

    if (isSuccess && categories.length > 0) {
      categories.map((category) => {
        return category._id === id
          ? setFormData((prev) => ({ name: category.name }))
          : category
      })
    }
  }, [id, isSuccess, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('Fushat nuk duhet te jene te zbrazta')
    } else {
      dispatch(updateCategory({ id: id, name: { name: name } }))
      message !== '' && toast.success(message)
      navigate('/dashboard/categories')
    }
  }

  const goBack = () => {
    navigate('/dashboard/categories')
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center pt-5">
          <p className="w-2/3 text-sm text-center pb-5">
            Per te ndryshuar kategorine ju lutem plotesoni emrin e kategorise me
            poshte.
          </p>

          <section className="">
            <form className="" onSubmit={onSubmit}>
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
                <Button title="Ruaj" buttonStyle={7} />
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
