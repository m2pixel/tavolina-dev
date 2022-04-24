import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../features/products/productSlice'
import { getCategories } from '../../../features/categories/categorySlice'

function ProductForm({ reload }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  })
  const { categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createProduct(formData))
    reload()
  }

  const showCategories = categories.map((category) => {
    return <option value={category.name}>{category.name}</option>
  })

  return (
    <section className="flex flex-col items-center pt-5">
      <p className="w-2/3 text-sm pb-5">
        Per te shtuar nje produkt ju lutem shenoni emrin e tavoline produktit,
        cmimin si dhe kategorine.
      </p>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-3">
          <label htmlFor="text" className="font-semibold text-dark">
            Emri
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-80 border border-primary-400 rounded py-2 px-2"
            value={formData.name}
            onChange={handleChange}
            placeholder="Sheno emrin"
          />
          <label htmlFor="price" className="font-semibold text-dark">
            Cmimi
          </label>
          <input
            type="text"
            name="price"
            id="price"
            className="w-80 border border-primary-400 rounded py-2 px-2"
            value={formData.price}
            onChange={handleChange}
            placeholder="Sheno cmimin"
          />
          <label htmlFor="category" className="font-semibold text-dark">
            Kategoria
          </label>
          <div className="form-group">
            <select
              name="category"
              id="role"
              value={formData.category}
              onChange={handleChange}
              className="w-full py-2 text-gray-600 px-5 border rounded"
            >
              <option>-- Kategoria --</option>
              {showCategories}
            </select>
          </div>
          <button
            className="w-80 bg-primary rounded font-bold text-sm hover:bg-secondary text-white py-3"
            type="submit"
          >
            Shto produktin
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProductForm
