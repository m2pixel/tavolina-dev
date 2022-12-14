import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReports, getReport } from '../../../features/reports/reportSlice'
import ReportItem from './ReportItem'
import ReportView from './ReportView'
import Spinner from '../../Spinner'

export default function Calendar() {
  const dispatch = useDispatch()
  const [showTable, setShowTable] = useState(false)

  const { reports, report, isLoading, isError, isSucces, message } =
    useSelector((state) => state.reports)

  useEffect(() => {
    if (isError) {
      console.log('error: ', message)
    }
    dispatch(getReports())
  }, [dispatch, isError, message])

  if (isLoading) {
    return <b>Loading ...</b>
  }

  const deleteReport = (id) => {}

  const showReport = (id) => {
    dispatch(getReport(id))
    setShowTable((prev) => !prev)
  }

  const toggle = () => {
    setShowTable((prev) => false)
  }

  const reportsRender = reports?.map((report) => {
    return (
      <ReportItem
        key={report._id}
        report={report}
        showReport={showReport}
        deleteReport={deleteReport}
      />
    )
  })

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto">
          <h2 className="flex justify-center font-semibold">
            Menaxhimi i raportit
          </h2>
          <div>
            {!showTable ? (
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead className="border-b">
                          <tr>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Kamarieri
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Mbyllja e ndrrimit
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Shfaq
                            </th>
                            <th
                              scope="col"
                              className="text-sm font-medium text-dark  px-6 py-4 text-left"
                            >
                              Fshije
                            </th>
                          </tr>
                        </thead>
                        <tbody>{reportsRender}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ReportView report={report} toggle={toggle} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
