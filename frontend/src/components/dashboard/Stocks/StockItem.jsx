import { Link } from 'react-router-dom'

function StockItem({ stock, deleteStock }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('en-Us')
  }

  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{stock.product.name}</td>
      <td className="px-6 py-4 text-sm text-dark ">{stock.qty}</td>
      <td className="px-6 py-4 text-sm text-dark ">
        {convertDate(stock.createdAt)}
      </td>
      <td className="text-sm text-dark  font-light px-6 py-4">
        <button
          className="bg-primary text-white px-2 py-1 rounded"
          onClick={() => deleteStock(stock._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default StockItem
