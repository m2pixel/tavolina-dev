import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../features/products/productSlice'
import { getCategories } from '../../../features/categories/categorySlice'
import { toast } from 'react-toastify'
import Button from '../../Button'

function ProductForm({ reload, message }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    qty: '',
    category: '',
    unlimited: false,
  })
  const { categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const { name, price, category } = formData
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || price === '' || category === '') {
      toast.error('Fushat nuk duhet te jene te zbrazta')
    } else {
      dispatch(createProduct(formData))
      reload()
    }
  }
  console.log(formData)
  const showCategories = categories.map((category) => {
    return (
      <option value={category.name} key={category._id}>
        {category.name}
      </option>
    )
  })

  return (
    <section className="flex flex-col items-center pt-5">
      <p className="w-2/3 text-sm text-center pb-5">
        Per te shtuar nje produkt ju lutem shenoni emrin e tavoline produktit,
        cmimin si dhe kategorine.
      </p>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            name="name"
            id="name"
            className="w-80 text-dark border border-dark rounded py-2 px-2"
            value={formData.name}
            onChange={handleChange}
            placeholder="Sheno emrin"
          />
          <input
            type="text"
            name="price"
            id="price"
            className="w-80 text-dark border border-dark rounded py-2 px-2"
            value={formData.price}
            onChange={handleChange}
            placeholder="Sheno cmimin"
          />
          <select
            name="category"
            id="role"
            value={formData.category}
            onChange={handleChange}
            className="w-full py-2 px-5 text-dark border border-dark rounded"
          >
            <option>-- Kategoria --</option>
            {showCategories}
          </select>
          <label htmlFor="unlimited" className="space-x-3 text-gray-500">
            <input
              type="checkbox"
              name="unlimited"
              id="unlimited"
              className="text-dark border border-dark rounded py-2 px-2"
              value={formData.unlimited}
              onChange={handleChange}
              placeholder="Sheno cmimin"
            />
            <span>Produkti nuk ka sasi</span>
          </label>
          <Button title="Shto produkt" buttonStyle={7} />
          <Button
            title="Kthehu mbrapa"
            buttonStyle={6}
            action={() => reload()}
          />
        </div>
      </form>
    </section>
  )
}

export default ProductForm
