function TableItem({ table, deleteTable }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{table.name}</td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <button className="bg-secondary text-white px-2 py-1 rounded">
          Edit
        </button>
      </td>
      <td className="text-sm text-dark  font-light px-6 py-4">
        <button
          className="bg-primary text-white px-2 py-1 rounded"
          onClick={() => deleteTable(table._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TableItem
