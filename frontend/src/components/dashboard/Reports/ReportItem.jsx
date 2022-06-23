function ReportItem({ report, showReport, deleteReport }) {
  const convertDate = (date) => {
    let convertDate = new Date(date)

    return convertDate.toLocaleString('eit-it')
  }
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm text-dark ">{report._id}</td>
      <td className="px-6 py-4 text-sm text-dark font-semibold ">
        {report.user}
      </td>
      <td className="px-6 py-4 text-sm text-dark ">
        {convertDate(report.createdAt)}
      </td>
      <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
        <button
          className="bg-secondary text-white px-2 py-1 rounded"
          onClick={() => showReport(report._id)}
        >
          Shfaq
        </button>
      </td>
      <td className="text-sm text-dark  font-light px-6 py-4">
        <button
          className="bg-primary text-white px-2 py-1 rounded"
          onClick={() => deleteReport(report._id)}
        >
          Fshije
        </button>
      </td>
    </tr>
  )
}

export default ReportItem
