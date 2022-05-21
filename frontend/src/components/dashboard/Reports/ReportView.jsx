import React from 'react'

export default function ReportView({ report }) {
  console.log(report.orders.map((r) => r.name))

  const reportRender = report.orders.map((order) => {
    return (
      <tr className="border-b">
        <td className="px-6 py-1 text-sm text-dark ">{order.name}</td>
        <td className="px-6 py-1 text-sm text-dark ">{order.qty}</td>
        <td className="px-6 py-1 text-sm text-dark ">{order.price}&euro;</td>
      </tr>
    )
  })
  return (
    <div className="container mx-auto md:w-1/3 flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-dark px-6 text-left"
                  >
                    Produkti
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-dark  px-6 text-left"
                  >
                    Sasia
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-dark  px-6 text-left"
                  >
                    Cmimi
                  </th>
                </tr>
              </thead>
              <tbody>{reportRender}</tbody>
            </table>
            <div className="flex flex-col items-center md:items-end pt-5">
              <p>
                Kamarieri: <strong>{report.user}</strong>
              </p>
              <p>
                Total: <strong>{report.total}&euro;</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
