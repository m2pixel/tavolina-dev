import TableItem from '../components/TableItem'
import uuid from 'react-uuid'

export default function TableData({ currentOrder, ordersUI, deleteItem }) {
  const showOrders = ordersUI?.map((order) => {
    return (
      <TableItem
        key={uuid()}
        order={order}
        deleteItem={deleteItem}
        status="orders"
      />
    )
  })
  console.log(ordersUI)

  const showCurrentOrders = currentOrder?.map((order) => {
    return (
      <TableItem
        key={uuid()}
        order={order}
        // createdAt={}
        deleteItem={deleteItem}
        status="currentOrder"
      />
    )
  })

  return (
    <div className="mx-2 my-5">
      <table className="table-auto w-full border-collapse border border-dark rounded">
        <thead className="bg-gray-300 bg-opacity-40">
          <tr>
            <th>Emri</th>
            <th>Sasia</th>
            <th>Cmimi</th>
            <th>Fshije</th>
          </tr>
        </thead>
        <tbody className="">{showOrders}</tbody>
        <tbody>{showCurrentOrders}</tbody>
      </table>
    </div>
  )
}
