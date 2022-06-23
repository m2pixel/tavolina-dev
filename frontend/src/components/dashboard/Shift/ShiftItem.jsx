export default function ShiftItem({ shift, user, close }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('eit-it')
  }
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{shift._id}</td>
      <td className="px-6 py-4 text-sm text-dark ">{user}</td>
      <td className="px-6 py-4 text-sm text-dark ">
        {shift.closed ? 'Mbyllur' : 'Hapur'}
      </td>
      <td className="px-6 py-4 text-sm text-dark ">
        {convertDate(shift.createdAt)}
      </td>
      <td className="text-sm text-dark  font-light px-6 py-4">
        {!shift.closed ? (
          <button
            className="bg-primary text-white px-2 py-1 rounded font-semibold"
            onClick={() => close(shift._id)}
          >
            Mbylle
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-400 text-white px-2 py-1 rounded font-semibold"
          >
            Mbylle
          </button>
        )}
      </td>
    </tr>
  )
}
