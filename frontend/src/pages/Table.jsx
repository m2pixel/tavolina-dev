import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  getTable,
  openTable,
  closeTable,
  resetTable,
} from '../features/tables/tableSlice'
import { getCategories } from '../features/categories/categorySlice'
import ProductList from '../components/ProductList'
import TableData from '../components/TableData'
import Spinner from '../components/Spinner'
import {
  createOrder,
  getOrders,
  updateOrder,
} from '../features/orders/orderSlice'
import { toast } from 'react-toastify'
import {
  faPizzaSlice,
  faMugHot,
  faBurger,
  faCake,
  faReorder,
  faScissors,
} from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'
import uuid from 'react-uuid'

export default function Table() {
  // current category
  const [currentCategory, setCurrentCategory] = useState('Food')
  const { table } = useSelector((state) => state.tables)
  const { categories } = useSelector((state) => state.categories)
  const [total, setTotal] = useState(0)
  let price = 0

  const { order, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.orders
  )
  const [ordersUI, setOrdersUI] = useState([])
  const [currentOrder, setCurrentOrder] = useState([])
  const { name } = useParams()
  const id = table._id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  console.log('message', message, 'Error: ', isError)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTable({ name: name }))

    price = 0
  }, [dispatch, name])

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getOrders(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (isSuccess) {
      if (order.table === id) setOrdersUI(order.orders)
      else setOrdersUI([])
    }
  }, [order, id])

  console.log('orders: ', ordersUI)
  // set current category
  const changeCategory = (c) => {
    setCurrentCategory((prev) => c.name)
  }

  // show categories
  const showCategories = categories.map((category) => {
    return (
      <Button
        key={category._id}
        title={category.name}
        obj={category}
        action={changeCategory}
      />
    )
  })

  // add product to order
  const addItem = (product) => {
    // [
    //   {id, name, qty, price}
    // ]
    setCurrentOrder((prev) => [
      ...prev,
      {
        id: product._id,
        order_id: uuid(),
        name: product.name,
        qty: 1,
        price: product.price,
      },
    ])
  }

  const createOrderUI = (orders) => {
    if (orders.length > 0) {
      if (ordersUI.length > 0) {
        console.log({ id: order._id, orders: orders })
        // dispatch(updateOrder(order._id, currentOrder))
        dispatch(
          updateOrder({ id: order._id, orders: ordersUI.concat(orders) })
        )
        navigate('/')
      } else {
        console.log('created')
        dispatch(
          createOrder({
            table: table._id,
            user: user._id,
            orders: currentOrder,
          })
        )
        dispatch(openTable(table._id))
        navigate('/')
      }
    } else {
      toast.error('Nuk keni shtuar asnje produkt')
    }
    console.log('concated: ', ordersUI.concat(currentOrder))
  }
  const closeOrderUI = (id) => {
    dispatch(closeTable(id))
    navigate('/')
  }

  const deleteItem = (id) => {
    setCurrentOrder((prev) => prev.filter((order) => order.order_id !== id))
  }

  const totalPrice = ordersUI.map((order) => (price += order.price))

  const addCurrentOrderPrice = currentOrder.map(
    (order) => (price += order.price)
  )

  return (
    <div className="md:mx-10 md:my-10 font-space-grotesk">
      <div className="flex flex-col space-x-2 md:flex-row">
        <div className="w-full h-fit md:w-2/3">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row justify-around bg-layerBg space-x-3 py-2">
              {showCategories}
            </div>
            <div className="flex flex-wrap justify-around bg-layerBg">
              <ProductList add={addItem} category={currentCategory} />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:h-fit bg-layerBg">
          <p className="py-2 font-bold text-xl text-center">
            Tavolina: {table.name}
          </p>

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
          <div className="flex justify-end py-2">
            <span className="w-40 text-center bg-secondary font-bold text-xl py-2">
              {price} &euro;
            </span>
          </div>
          <div className="flex flex-row my-5 justify-around">
            <Button
              title="Porosite"
              icon={faReorder}
              buttonStyle={
                ordersUI.length > 0
                  ? 'bg-secondary text-white'
                  : 'bg-tableOff text-white'
              }
              obj={currentOrder}
              action={createOrderUI}
            />
            <Button
              title="Ndaje pagesen"
              icon={faScissors}
              buttonStyle="bg-tableOn text-layerBg"
            />
          </div>
          <div className="flex flex-col justify-center mx-2">
            <Button
              title="Paguaj"
              buttonStyle="bg-tableOff w-full text-layerBg hover:text-secondary"
              obj={table._id}
              action={closeOrderUI}
            />
            <span className="my-2 mx-5 border border-primary"></span>
            <div>
              <Link to="/">
                <Button
                  title="Kthehu mbrapa"
                  buttonStyle="bg-secondary w-full text-layerBg hover:text-tableOff"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
