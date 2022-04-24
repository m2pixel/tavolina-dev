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
      />
    )
  })
  return <div className="my-2 mx-2 shadow">{showProducts}</div>
}
