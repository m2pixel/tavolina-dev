import uuid from 'react-uuid'

export default function Card({ list, title, titleHead }) {
  return (
    <div className="w-full md:w-2/5 shadow-2xl rounded">
      <div className="w-full bg-dark text-white py-2 uppercase text-center font-semibold rounded-t border-b-2 border-primary">
        <span>{title}</span>
      </div>

      <table className="w-full table-fixed text-center text-gray-500">
        <thead className="xs:text-xs text-gray-700 uppercase bg-gray-200 ">
          <tr>
            {titleHead.map((th) => (
              <th key={uuid()} scope="col" className="px-6 py-3">
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  )
}

// export default function Card({ title, list, titleHead }) {
//   return (
//     <div className="w-auto md:w-auto shadow-2xl rounded">
//       <div className="w-full bg-dark text-white py-2 uppercase text-center font-semibold rounded-t border-b-2 border-primary">
//         <span>{title}</span>
//       </div>

//       <table className="w-full text-center text-gray-500">
//         <thead className="xs:text-xs text-gray-700 uppercase bg-gray-200 ">
//           <tr>
//             {titleHead.map((th) => (
//               <th key={uuid()} scope="col" className="px-6 py-3">
//                 {th}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>{list}</tbody>
//       </table>
//     </div>
//   )
// }
