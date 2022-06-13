import React, { useState, useEffect } from 'react'

export default function Table({ table, user }) {
  const [lastOrder, setLastOrder] = useState({ name: '', total: 0 })
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem(table._id))

    if (item) {
      setLastOrder(item)
    }
  }, [table._id])

  const { name, total } = lastOrder

  const style = table.opened
    ? 'w-40 h-48 bg-tableOff text-stone-200 rounded font-space-grotesk py-2 text-center shadow-xl'
    : 'w-40 h-48 bg-bgTableOn text-white rounded font-space-grotesk py-2 text-center'

  return (
    <div className={style}>
      <div className="flex flex-col space-y-4">
        <p className="text-2xl border-b border-layerBg pb-1">{table.name}</p>
        {table.opened && (
          <p className="text-4xl font-medium">{total.toFixed(2)}&euro;</p>
        )}
        {table.opened && <p className="underline underline-offset-4">{name}</p>}
        {table.opened && <p>{user.name}</p>}
      </div>
    </div>
  )
}
