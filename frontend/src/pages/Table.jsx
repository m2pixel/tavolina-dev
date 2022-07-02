import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  getTable,
  getTables,
  openTable,
  closeTable,
} from '../features/tables/tableSlice'
import { getCategories } from '../features/categories/categorySlice'
import ProductList from '../components/ProductList'
import TableData from '../components/TableData'
import Spinner from '../components/Spinner'
import {
  createOrder,
  getOrders,
  updateOrder,
  resetOrder,
} from '../features/orders/orderSlice'
import { toast } from 'react-toastify'
import {
  faAnglesLeft,
  faDollarSign,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons'
import { getShift } from '../features/shifts/shiftSlice'
import Button from '../components/Button'
import uuid from 'react-uuid'
import Modal from '../components/ChangeTableModal'

export default function Table() {
  let price = 0
  // current category
  const [currentCategory, setCurrentCategory] = useState('')
  const { table, tables } = useSelector((state) => state.tables)
  const categories = useSelector((state) => state.categories)
  const { shift, isError } = useSelector((state) => state.shifts)
  const { order, isSuccess, isLoading, message } = useSelector(
    (state) => state.orders
  )
  const [ordersUI, setOrdersUI] = useState([])
  const [currentOrder, setCurrentOrder] = useState([])
  const { name } = useParams()
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTable(id))
    dispatch(getTables())
    dispatch(getShift(user._id))

    if (tables.length > 0) {
      const filterTables = tables?.filter((table) => table._id === id)

      return filterTables.length === 0 ? navigate('/error/404') : 1
    }

    price = 0
  }, [dispatch, name, isError])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getOrders(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (isSuccess) {
      if (order.table === id && !order.paid) setOrdersUI(order.orders)
      else setOrdersUI([])
    }

    /**
     * nese lista e kategorive eshte me e madhe se 0
     * dhe currentCategory eshte e zbrazet
     * initializo currentCategory me emrin e kategoris e cila
     * gjendet para ne liste
     **/
    if (categories.categories.length > 0 && currentCategory === '') {
      setCurrentCategory((prev) => categories.categories[0].name)
    }
  }, [order, id, isSuccess, message, categories.isSuccess])

  // set current category
  const changeCategory = (c) => {
    setCurrentCategory((prev) => c.name)
  }

  // show categories
  const showCategories = categories.categories.map((category) => {
    return (
      <Button
        buttonStyle={1}
        key={category._id}
        title={category.name}
        obj={category}
        action={changeCategory}
      />
    )
  })

  // return current hour and minutes
  const getDate = () => {
    const now = new Date()
    const current = now.getHours() + ':' + now.getMinutes()

    return current
  }

  // add product to order
  const addItem = (product) => {
    setCurrentOrder((prev) => [
      ...prev,
      {
        id: product._id,
        order_id: uuid(),
        name: product.name,
        qty: 1,
        price: product.price,
        time: getDate(),
      },
    ])
  }

  const orderAndPaid = (orders) => {
    if (orders.length > 0) {
      dispatch(
        createOrder({
          table: table._id,
          user: user._id,
          shift: shift._id,
          orders: currentOrder,
          total: price,
          paid: true,
        })
      )
      dispatch(resetOrder())
      setTimeout(() => {
        ;<Spinner />
        navigate('/')
      }, 300)
    }
  }
  const createOrderUI = (orders) => {
    if (orders.length > 0) {
      if (ordersUI.length > 0) {
        const concatedOrders = ordersUI.concat(orders)
        dispatch(
          updateOrder({
            id: order._id,
            orders: concatedOrders,
            total: price,
            paid: false,
          })
        )
        localStorage.setItem(
          table._id,
          JSON.stringify({
            total: price,
            name: concatedOrders[concatedOrders.length - 1].name,
          })
        )
        setTimeout(() => {
          ;<Spinner />
          navigate('/')
        }, 300)
      } else {
        dispatch(
          createOrder({
            table: table._id,
            user: user._id,
            shift: shift._id,
            orders: currentOrder,
            total: price,
            paid: false,
          })
        )
        localStorage.setItem(
          table._id,
          JSON.stringify({
            total: price,
            name: currentOrder[currentOrder.length - 1].name,
          })
        )
        dispatch(openTable(table._id))
        setTimeout(() => {
          ;<Spinner />
          navigate('/')
        }, 300)
      }
    } else {
      toast.error('Nuk keni shtuar asnje produkt')
    }
  }

  const closeOrderUI = (id) => {
    if (ordersUI.length > 0) {
      if (currentOrder.length > 0) {
        const concatedOrders = ordersUI.concat(currentOrder)
        dispatch(
          updateOrder({ id: order._id, orders: concatedOrders, paid: true })
        )
        dispatch(closeTable(id))
        dispatch(resetOrder())
        localStorage.removeItem(table._id)
        setTimeout(() => {
          ;<Spinner />
          navigate('/')
        }, 300)
      } else {
        dispatch(closeTable(id))
        dispatch(resetOrder())
        localStorage.removeItem(table._id)
        setTimeout(() => {
          ;<Spinner />
          navigate('/')
        }, 300)
      }
    } else {
      toast.error('Nuk ka asnje porosi per te paguar.')
    }
  }

  const deleteItem = (id) => {
    setCurrentOrder((prev) => prev.filter((order) => order.order_id !== id))
  }

  const totalPrice = ordersUI?.map((order) => (price += order.price))

  const addCurrentOrderPrice = currentOrder.map(
    (order) => (price += order.price)
  )

  return (
    <div className="md:mx-10 md:my-10 font-space-grotesk text-dark">
      <div className="flex flex-col md:flex-row md:space-x-5">
        <div className="w-full h-fit md:w-2/3">
          <div className="flex flex-col md:space-y-6">
            <div className="flex flex-row justify-between bg-primary bg-opacity-20 py-2 px-1 md:p-2 md:rounded">
              {showCategories}
            </div>
            <div className="bg-secondary bg-opacity-20 md:rounded">
              <ProductList add={addItem} category={currentCategory} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 pb-5 rounded bg-layerBg">
          <div className="bg-dark text-white py-2 uppercase text-center font-semibold rounded-t border-b-2 border-primary">
            <span>Tavolina: {table.name}</span>
          </div>

          {isLoading ? (
            <Spinner />
          ) : (
            <TableData
              key={table._id}
              currentOrder={currentOrder}
              deleteItem={deleteItem}
              ordersUI={ordersUI}
            />
          )}
          <div className="flex justify-end py-2 mx-2 space-x-3">
            <input
              type="text"
              name="order_msg"
              id="order_msg"
              placeholder="Defino porosine"
              className="w-3/5 border border-secondary bg-secondary bg-opacity-20  text-dark placeholder-dark px-2"
            />
            <span className="w-2/5 text-center bg-tableOn font-bold text-xl py-2">
              {price.toFixed(2)} &euro;
            </span>
          </div>
          <div className="flex flex-col justify-center mx-2">
            <div className="flex flex-row">
              <div className="w-2/4">
                <Button
                  title="Porosite"
                  buttonStyle={currentOrder.length > 0 ? 2 : 3}
                  obj={currentOrder}
                  action={createOrderUI}
                  icon={faCheckDouble}
                />
              </div>
              <span className="mx-2"></span>
              {ordersUI.length > 0 ? (
                <div className="w-2/4">
                  <Button
                    title="Paguaj"
                    buttonStyle={ordersUI.length > 0 ? 2 : 3}
                    obj={table._id}
                    action={closeOrderUI}
                    icon={faDollarSign}
                  />
                </div>
              ) : (
                <div className="w-2/4">
                  <Button
                    title="Paguaj"
                    buttonStyle={currentOrder.length > 0 ? 2 : 3}
                    obj={currentOrder}
                    action={orderAndPaid}
                    icon={faDollarSign}
                  />
                </div>
              )}
            </div>
            <span className="my-2 mx-5 border border-primary"></span>
            <div>
              <Modal order={order} table={table} tables={tables} />
            </div>
            <span className="my-2 mx-5 border border-primary"></span>
            <div className="">
              <Link to="/">
                <Button title="Kthehu" buttonStyle={9} icon={faAnglesLeft} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
