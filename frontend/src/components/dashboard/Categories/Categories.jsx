import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'
import Button from '../../Button'
import CategoryForm from './CategoryForm'
import {
  getCategories,
  deleteCategory,
  reset,
} from '../../../features/categories/categorySlice'

export default function Tables() {
  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const { categories, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.categories
  )

  const deleteTableUI = (id) => {
    if (id) {
      dispatch(deleteCategory(id))
    }
  }

  const reloadAfterAddTable = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      toast.error(message)
    } else if (isSuccess && message !== '') {
      toast.success(message)
    }

    dispatch(getCategories())
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const categoriesItems = categories.map((category) => {
    return (
      <tr className="border-b" key={category._id}>
        <td className="px-6 py-4 text-sm text-dark ">{category.name}</td>
        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
          <Link to={`/dashboard/category/${category._id}`}>
            <button className="bg-secondary text-white px-2 py-1 rounded">
              Edit
            </button>
          </Link>
        </td>
        <td className="text-sm text-dark  font-light px-6 py-4">
          <button
            className="bg-primary text-white px-2 py-1 rounded"
            onClick={() => deleteTableUI(category._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    )
  })

  const toggle = () => {
    setShowForm((curr) => true)
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i kategorive
          </h2>
          {showForm ? (
            <CategoryForm reload={reloadAfterAddTable} />
          ) : (
            <div>
              <div className="flex justify-end mx-5 my-5">
                <Button
                  title="Shto kategori"
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
                        <tbody>{categoriesItems}</tbody>
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
