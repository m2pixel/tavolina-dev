import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import StockItem from './StockItem'
import StockForm from './StockForm'
import { toast } from 'react-toastify'
import {
  getStocks,
  deleteStock,
  reset,
} from '../../../features/stock/stockSlice'
import { getProducts } from '../../../features/products/productSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import Button from '../../Button'

export default function Stocks() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  // const navigate = useNavigator()
  const { stocks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.stocks
  )
  const products = useSelector((state) => state.products)

  const reload = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } else if (isSuccess && message !== '') {
      toast.success(message)
    }

    dispatch(getStocks())
    dispatch(getProducts())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const deleteStockUI = (id) => {
    if (id) {
      dispatch(deleteStock(id))
    }
  }

  const stockItems = stocks?.map((stock) => {
    return (
      <StockItem key={stock._id} stock={stock} deleteStock={deleteStockUI} />
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
        <div className="container mx-auto">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i stokut
          </h2>
          {showForm ? (
            <StockForm reload={reload} />
          ) : (
            <div>
              <div className="flex justify-end mx-5 my-5">
                <Button
                  title="Shto ne stok"
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
                              Produkti
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Sasia
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Data
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Delete
                            </th>
                          </tr>
                        </thead>
                        <tbody>{stockItems}</tbody>
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
