import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../Spinner'
import CategoryForm from './CategoryForm'
import {
  getCategories,
  deleteCategory,
  reset,
} from '../../../features/categories/categorySlice'

export default function Tables() {
  const [showForm, setShowForm] = useState(false)
  const [msg, setMsg] = useState('')
  const dispatch = useDispatch()
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.categories
  )

  const deleteTableUI = (id) => {
    if (id) {
      dispatch(deleteCategory(id))
      setMsg('Table deleted')
    }
  }

  const reloadAfterAddTable = () => {
    setShowForm((prev) => false)
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getCategories())
    setMsg((prev) => '')
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch, msg])

  const categoriesItems = categories.map((category) => {
    return (
      <tr className="border-b" key={category._id}>
        <td className="px-6 py-4 text-sm text-dark ">{category.name}</td>
        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
          <button className="bg-secondary text-white px-2 py-1 rounded">
            Edit
          </button>
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

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i kategorive
          </h2>
          {showForm ? (
            <CategoryForm reload={reloadAfterAddTable} />
          ) : (
            <div>
              <div className="flex justify-end mx-10">
                <div
                  onClick={() => setShowForm((curr) => true)}
                  className="w-36 flex items-center justify-around cursor-pointer px-2 bg-dark text-primary rounded py-1 hover:text-secondary"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <p className="font-semibold">Shto kategori</p>
                </div>
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
