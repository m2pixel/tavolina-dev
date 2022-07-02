import React, { useState, useEffect } from 'react'

export default function Table({ table, user }) {
  // const [lastOrder, setLastOrder] = useState({ name: '', total: 0 })
  const [lastOrder, setLastOrder] = useState({ name: '', total: 0 })
  useEffect(() => {
    // const item = JSON.parse(localStorage.getItem(table._id))

    // if (item) {
    //   setLastOrder(item)
    // }
    if (table.order.length > 0) {
      setLastOrder({ name: table.order[1], total: table.order[0] })
    }
  }, [table.order])

  const { name, total } = lastOrder

  const style = table.opened
    ? 'w-24 h-32 md:w-40 md:h-48 bg-tableOff text-white rounded font-space-grotesk py-2 text-center shadow-xl'
    : 'w-24 h-32 md:w-40 md:h-48 bg-bgTableOn text-white rounded font-space-grotesk py-2 text-center'

  return (
    <div className={style}>
      <div className="flex flex-col space-y-2 md:space-y-4">
        <p className="md:text-2xl border-b border-layerBg pb-1">{table.name}</p>
        {table.opened && (
          <p className="md:text-4xl font-medium">{total.toFixed(2)}&euro;</p>
        )}
        {table.opened && (
          <p className="text-[10px] md:text-base md:underline md:underline-offset-4">
            {name}
          </p>
        )}
        {table.opened && <p className="text-xs md:text-base">{user.name}</p>}
      </div>
    </div>
  )
}
