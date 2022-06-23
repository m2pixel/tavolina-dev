import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProduct,
  updateProduct,
} from '../../../features/products/productSlice'
import { getCategories } from '../../../features/categories/categorySlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'
import Button from '../../Button'

export default function EditUser() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  })
  const { categories } = useSelector((state) => state.categories)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name, price, category } = formData
  const { product, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    dispatch(getProduct(id))
    dispatch(getCategories())

    if (isError) {
      console.log(message)
    }

    if (isSuccess && Object.keys(product).length > 0) {
      console.log('true')
      setFormData((prev) => ({
        ...prev,
        name: product.name,
        price: product.price,
        category: product.category,
      }))
    }
  }, [id, isSuccess, dispatch, isError])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || price === '' || category === '') {
      toast.error('Fushat nuk duhet te jene te zbrazta')
    } else {
      dispatch(updateProduct({ id: id, product: { name, price, category } }))
      message !== '' && toast.success(message)
      navigate('/dashboard/products')
    }
  }

  const showCategories = categories.map((category) => {
    return (
      <option value={category.name} key={category._id}>
        {category.name}
      </option>
    )
  })

  const goBack = () => {
    navigate('/dashboard/products')
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center pt-5">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i produkteve
          </h2>

          <section className="flex flex-col items-center pt-5">
            <p className="w-2/3 text-sm text-center pb-5">
              Per te ndryshuar te dhenat e produktit perkates, shini formen me
              poshte.
            </p>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col space-y-3">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-80 text-dark border border-dark rounded py-2 px-2"
                  value={name}
                  onChange={handleChange}
                  placeholder="Sheno emrin"
                />
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="w-80 text-dark border border-dark rounded py-2 px-2"
                  value={price}
                  onChange={handleChange}
                  placeholder="Sheno cmimin"
                />
                <div className="form-group">
                  <select
                    name="category"
                    id="role"
                    value={category}
                    onChange={handleChange}
                    className="w-full py-2 px-5 text-dark border border-dark rounded"
                  >
                    <option>-- Kategoria --</option>
                    {showCategories}
                  </select>
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
