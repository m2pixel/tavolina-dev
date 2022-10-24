import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeTable } from '../features/orders/orderSlice'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import Button from './Button'
import Spinner from './Spinner'

export default function ChangeTableModal({ order, table, tables }) {
  const [showModal, setShowModal] = React.useState(false)
  const [nextTable, setNextTable] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const filterTables = tables.filter((table) => !table.opened)

  const getTables = filterTables.map((t) => (
    <option key={t._id} value={t._id}>
      {t.name}
    </option>
  ))

  const activeModal = () => {
    setShowModal((prev) => !prev)
  }

  const changeTableUI = (data) => {
    dispatch(changeTable(data))
    setTimeout(() => {
      ;<Spinner />
      navigate('/')
    }, 300)
  }

  return (
    <>
      <Button
        title="Ndrro tavolinen"
        buttonStyle={9}
        icon={faShuffle}
        action={activeModal}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start bg-dark justify-between p-5 border-b-2 border-solid border-primary rounded-t">
                  <h3 className="text-xl text-white font-semibold">
                    Ndrrimi i tavolines: {table.name}
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-primary text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col  justify-center">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Tavolinat e lira:
                  </p>
                  <select
                    id="id"
                    name="id"
                    onChange={(e) => setNextTable((prev) => e.target.value)}
                  >
                    <option>**</option>
                    {getTables}
                  </select>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    title="Ndrro tavolinen"
                    buttonStyle={7}
                    icon={faShuffle}
                    obj={{
                      id: order._id,
                      tables: {
                        table: table._id,
                        nextTable,
                      },
                    }}
                    action={changeTableUI}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
