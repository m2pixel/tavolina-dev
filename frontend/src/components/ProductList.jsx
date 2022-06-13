import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../features/products/productSlice'
import Button from './Button'

export default function ProductList({ category, add }) {
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  // filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === category
  )

  // show products
  const showProducts = filteredProducts.map((product) => {
    return (
      <Button
        key={product._id}
        title={product.name}
        obj={product}
        action={add}
        // buttonStyle="bg-dark underline underline-offset-8 decoration-secondary text-white hover:text-secondary"
      />
    )
  })
  return (
    <div className="flex flex-wrap gap-2 justify-between h-fit px-2 py-2">
      {showProducts}
    </div>
  )
}
