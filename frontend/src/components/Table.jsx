import React from 'react'

export default function Table({ table, user }) {
  
  const style = table.opened
    ? 'w-40 h-52 bg-tableOff rounded font-space-grotesk py-5 text-center'
    : 'w-40 h-52 bg-tableOn rounded font-space-grotesk py-5 text-center'

  return (
    <div className={style}>
      <div className="flex flex-col space-y-4">
        <p className="text-2xl underline underline-offset-2">{table.name}</p>
        {table.opened && (
          <p className="text-4xl font-medium">{table.price} &euro;</p>
        )}
        {table.opened && (
          <p className="underline underline-offset-4">last order</p>
        )}
        {table.opened && <p>{user.name}</p>}
      </div>
    </div>
  )
}
