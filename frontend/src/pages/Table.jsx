import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  getTable,
  getTables,
  openTable,
  closeTable,
} from '../features/tables/tableSlice'
import { userPermission, reset } from '../features/users/userSlice'
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

export default function Table({ permission }) {
  console.log('perm: ', permission)
  let price = 0
  // current category
  const [currentCategory, setCurrentCategory] = useState('')
  const { table, tables } = useSelector((state) => state.tables)
  const categories = useSelector((state) => state.categories)
  const { shift, isError } = useSelector((state) => state.shifts)
  const { order, isSuccess, isLoading, message } = useSelector(
    (state) => state.orders
  )
  const [orderMsg, setOrderMsg] = useState('')
  const [msg, setMsg] = useState('')
  const [ordersUI, setOrdersUI] = useState([])
  const [currentOrder, setCurrentOrder] = useState([])
  const { name } = useParams()
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const stateUser = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTable(id))
    dispatch(getTables())
    dispatch(getShift(user._id))
    // dispatch(userPermission(user._id))

    if (tables.length > 0) {
      const filterTables = tables?.filter((table) => table._id === id)

      return filterTables.length === 0 ? navigate('/error/404') : 1
    }

    price = 0

    return () => {
      dispatch(reset())
    }
  }, [dispatch, name, isError, user._id])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getOrders(id))
      dispatch(userPermission(user._id))
    }

    return () => {
      dispatch(resetOrder())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      if (order.table === id && !order.paid) {
        setOrdersUI(order.orders)
        setMsg(order.message)
      } else setOrdersUI([])
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
  console.log(stateUser.permission)
  useEffect(() => {
    if (Object.keys(order).length > 0) {
      if (order.user !== user._id && !permission) {
        toast.info('Nuk eshte tavolina juaj')
        navigate('/')
      }
    }
  }, [order, navigate, user._id])

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
          userName: user.name,
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
            userName: user.name,
            total: price,
            msg: orderMsg,
            paid: false,
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
            userName: user.name,
            shift: shift._id,
            orders: currentOrder,
            total: price,
            msg: orderMsg,
            paid: false,
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
        console.log('curr', concatedOrders)
        dispatch(
          updateOrder({
            id: order._id,
            orders: concatedOrders,
            msg: orderMsg,
            total: price,
            paid: true,
          })
        )
        dispatch(closeTable(id))
        dispatch(resetOrder())
        setTimeout(() => {
          ;<Spinner />
          navigate('/')
        }, 300)
      } else {
        dispatch(closeTable(id))
        dispatch(resetOrder())
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
              canDelete={stateUser.permission}
            />
          )}
          {msg && (
            <div className="mx-2">
              <p className="text-xs opacity-80 normal-case">
                <span className="font-bold">Messazhi: </span>
                {msg}
              </p>
            </div>
          )}
          <div className="flex justify-end py-2 mx-2 space-x-3">
            <input
              type="text"
              name="orderMsg"
              id="orderMsg"
              onChange={(e) => setOrderMsg((prev) => e.target.value)}
              placeholder="Lë nje mesazh"
              className="w-3/5 border border-secondary bg-secondary bg-opacity-20  text-dark placeholder-dark px-2"
            />
            <span className="w-2/5 text-center bg-tableOn font-bold text-xl py-2">
              {price.toFixed(2)} &euro;
            </span>
          </div>
          <div className="flex flex-col justify-center mx-2">
            <div className="flex flex-row md:flex-col lg:flex-row gap-2">
              <div className="w-2/4 md:w-full lg:w-2/4">
                <Button
                  title="Porosite"
                  buttonStyle={currentOrder.length > 0 ? 2 : 3}
                  obj={currentOrder}
                  action={createOrderUI}
                  icon={faCheckDouble}
                  t
                />
              </div>
              <span className="sm:invisible lg:invisible md:visible md:mx-5 lg:mx-0 md:border lg:border-secondary border-primary"></span>
              {ordersUI.length > 0 ? (
                <div className="w-2/4 md:w-full lg:w-2/4">
                  <Button
                    title="Paguaj"
                    buttonStyle={ordersUI.length > 0 ? 2 : 3}
                    obj={table._id}
                    action={closeOrderUI}
                    icon={faDollarSign}
                  />
                </div>
              ) : (
                <div className="w-2/4 md:w-full lg:w-2/4">
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
