export default function ShiftItem({ shift, user, close }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('en-Us')
  }

  return (
    <tr className="border-b">
      <td className="text-sm text-dark ">{convertDate(shift.createdAt)}</td>
      <td className="text-sm text-dark ">{convertDate(shift.updatedAt)}</td>
      <td className="text-sm text-dark ">{shift.user.name}</td>
      <td className="text-sm text-dark ">
        {shift.closed ? 'Mbyllur' : 'Hapur'}
      </td>
      <td className="text-sm text-dark  font-light py-4">
        <button
          className={
            shift.closed
              ? 'bg-gray-300 text-white px-2 py-1 rounded font-semibold'
              : 'bg-primary text-white px-2 py-1 rounded font-semibold'
          }
          onClick={() => close({ id: shift._id, user: shift.user._id})}
          disabled={shift.closed ? true : false}
        >
          Mbylle
        </button>
      </td>
    </tr>
  )
}
