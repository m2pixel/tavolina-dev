import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createStock } from '../../../features/stock/stockSlice'
import { getProducts } from '../../../features/products/productSlice'
import { toast } from 'react-toastify'
import Button from '../../Button'

function ProductForm({ reload, message }) {
  const [formData, setFormData] = useState({
    qty: '',
    product: '',
  })

  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const { name, qty } = formData
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (name === '' || qty === '') {
      toast.error('Fushat nuk duhet te jene te zbrazta')
    } else {
      dispatch(createStock(formData))
      reload()
    }
  }

  const filterProducts = products.products.filter(
    (product) => !product.unlimited
  )

  const showProducts = filterProducts?.map((product) => {
    return (
      <option value={product._id} key={product._id}>
        {product.name}
      </option>
    )
  })
  console.log(formData)
  return (
    <section className="flex flex-col items-center pt-5">
      <p className="w-2/3 text-sm text-center pb-5">
        Per te shtuar nje produkt ju lutem shenoni emrin e tavoline produktit,
        cmimin si dhe kategorine.
      </p>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-3">
          <div className="form-group">
            <select
              name="product"
              id="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full py-2 px-5 text-dark border border-dark rounded"
            >
              <option>-- Kategoria --</option>
              {showProducts}
            </select>
          </div>
          <input
            type="number"
            name="qty"
            id="qty"
            className="w-80 text-dark border border-dark rounded py-2 px-2"
            value={formData.qty}
            onChange={handleChange}
            placeholder="Sasia e produktit"
          />
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
