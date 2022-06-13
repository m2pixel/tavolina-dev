import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTable } from '../../../features/tables/tableSlice'
import Button from '../../Button'

function TableForm({ reload }) {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createTable({ name }))
    setName('')
    reload()
  }

  return (
    <section className="flex flex-col items-center pt-5">
      <p className="text-sm pb-5">
        Per te shtuar nje tavoline ju lutem shenoni emrin/numrin e tavolines.
      </p>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-5">
          <input
            type="text"
            name="text"
            id="text"
            className="w-80 text-dark border border-dark rounded py-2 px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sheno emrin"
          />
          <button
            className="w-80 bg-dark rounded font-bold text-sm hover:opacity-80 uppercase text-white py-3"
            type="submit"
          >
            Shto tavoline
          </button>
          <Button
            title="Kthehu mbrapa"
            action={() => reload()}
            buttonStyle={6}
          />
        </div>
      </form>
    </section>
  )
}

export default TableForm
