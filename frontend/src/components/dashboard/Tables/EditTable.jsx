import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Button'
import {
  getTable,
  getTables,
  updateTable,
} from '../../../features/tables/tableSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../Spinner'

export default function EditTable() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
  })
  const { name } = formData
  const { table, tables, isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.tables
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTable(id))
    dispatch(getTables())

    if (isError) {
      console.log('Error: ', message)
    }

    if (isSuccess && Object.keys(table).length > 0) {
      setFormData((prev) => ({
        ...prev,
        name: table.name,
      }))
    }
  }, [id, isSuccess, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const tableExist = tables.filter((table) => table.name === name)
  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('Sheno emrin e tavolines')
    } else if (tableExist.length > 0) {
      toast.error('Tavolina egziston')
    } else {
      dispatch(updateTable({ id: id, name: { name: name } }))
      message !== '' && toast.success(message)
      navigate('/dashboard/tables')
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center pt-5">
          <p className="w-2/3 text-sm text-center pb-5">
            Per te ndryshuar kategorine ju lutem plotesoni emrin e kategorise me
            poshte.
          </p>

          <section className="">
            <form className="" onSubmit={onSubmit}>
              <div className="flex flex-col justify-center mt-5 space-y-5">
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full py-2 text-dark border border-dark px-5 rounded"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Emri"
                    onChange={onChange}
                  />
                </div>
                <button
                  className="w-80 bg-dark rounded font-bold text-sm hover:bg-opacity-80 uppercase text-white py-3"
                  type="submit"
                >
                  Ruaj
                </button>
                <Link to="/dashboard/tables">
                  <Button title="Kthehu mbrapa" buttonStyle={6} />
                </Link>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}
