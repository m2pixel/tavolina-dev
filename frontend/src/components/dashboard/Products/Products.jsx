import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from './ProductItem'
import ProductForm from './ProductForm'
import { toast } from 'react-toastify'
import {
  getProducts,
  deleteProduct,
  reset,
} from '../../../features/products/productSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import Button from '../../Button'
export default function Products() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  // const navigate = useNavigator()
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  )

  const deleteProductUI = (id) => {
    if (id) {
      dispatch(deleteProduct(id))
    }
  }

  const reloadAfterAddProduct = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } else if (isSuccess && message !== '') {
      toast.success(message)
    }

    dispatch(getProducts())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const productItems = products.map((product) => {
    return (
      <ProductItem
        key={product._id}
        product={product}
        deleteProduct={deleteProductUI}
      />
    )
  })

  const toggle = () => {
    setShowForm((prev) => true)
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i produkteve
          </h2>
          {showForm ? (
            <ProductForm reload={reloadAfterAddProduct} message={message} />
          ) : (
            <div>
              <div className="flex justify-end mx-5 my-5">
                <Button
                  title="Shto produkt"
                  icon={faPlus}
                  action={toggle}
                  buttonStyle={5}
                />
              </div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark px-6 py-4 text-left"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Edit
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>{productItems}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
