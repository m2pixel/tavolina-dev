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

  const showCurrentOrders = currentOrder?.map((order) => {
    return (
      <TableItem
        key={uuid()}
        order={order}
        deleteItem={deleteItem}
        status="currentOrder"
      />
    )
  })

  return (
    <div className="overflow-x-auto">
      <div className="mx-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Sasia</th>
              <th>Cmimi</th>
              <th>Largo</th>
            </tr>
          </thead>
          <tbody className="border-b borde-primary my-5">{showOrders}</tbody>
          <tbody>{showCurrentOrders}</tbody>
        </table>
      </div>
    </div>
  )
}
