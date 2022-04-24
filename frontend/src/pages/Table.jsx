import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getTable, openTable, closeTable } from '../features/tables/tableSlice'
import { getCategories } from '../features/categories/categorySlice'
import ProductList from '../components/ProductList'
import TableData from '../components/TableData'
import { createOrder, getOrders } from '../features/orders/orderSlice'
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

export default function Table() {
  // current category
  const [currentCategory, setCurrentCategory] = useState('Food')
  const { table } = useSelector((state) => state.tables)
  const { categories } = useSelector((state) => state.categories)

  const [ordersUI, setOrdersUI] = useState(() => [])
  const { name } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTable({ name: name }))
  }, [dispatch])

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
    const item = ordersUI.filter((order) => order.name === product.name)

    if (item.length > 0) {
      setOrdersUI((prev) =>
        prev.map((order) => {
          return order.name === product.name
            ? {
                ...order,
                qty: order.qty + 1,
                price: (order.qty + 1) * product.price,
              }
            : order
        })
      )
    } else {
      setOrdersUI((prev) => [
        ...prev,
        {
          id: product._id,
          name: product.name,
          qty: 1,
          price: product.price,
        },
      ])
    }

    // const item = ordersUI.filter((order) => order.orders.name === product.name)
    // if (item.length > 0) {
    //   setOrdersUI((prev) =>
    //     prev.map((order) => {
    //       return order.orders.id === product._id
    //         ? {
    //             orders: {
    //               id: product._id,
    //               name: product.name,
    //               qty: order.orders.qty + 1,
    //               price: (order.orders.qty + 1) * product.price,
    //             },
    //           }
    //         : order
    //     })
    //   )
    // } else {
    //   setOrderlesUI((prev) => [
    //     ...prev,
    //     {
    //       orders: {
    //         id: product._id,
    //         name: product.name,
    //         qty: 1,
    //         price: product.price,
    //       },
    //     },
    //   ])
    // }
  }

  const createOrderUI = (orders) => {
    if (orders.length > 0) {
      dispatch(createOrder({ table: table._id, orders: orders }))
      dispatch(openTable(table._id))
      navigate('/')
    } else {
      toast.error('Nuk keni shtuar asnje produkt')
    }
  }

  const closeOrderUI = (id) => {
    dispatch(closeTable(id))
    navigate('/')
  }

  const deleteItem = (id) => {
    setOrdersUI((prev) => ordersUI.filter((order) => order.orders.id !== id))
  }

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

          <TableData
            key={table._id}
            table={table}
            deleteItem={deleteItem}
            ordersUI={ordersUI}
          />

          <div className="flex flex-row my-5 justify-around">
            <Button
              title="Porosite"
              icon={faReorder}
              buttonStyle={
                ordersUI.length > 0
                  ? 'bg-secondary text-white'
                  : 'bg-tableOff text-white'
              }
              obj={ordersUI}
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
