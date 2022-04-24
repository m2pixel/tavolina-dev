import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../../features/categories/categorySlice'

function CategoryForm({ reload }) {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createCategory({ name }))
    setName('')
    reload()
  }

  return (
    <section className="flex flex-col items-center pt-5">
      <p className="text-sm pb-5">
        Per te shtuar nje kategori te re ju lutem shenoni emrin e kategorise.
      </p>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="text" className="font-semibold text-dark">
            Emri
          </label>
          <input
            type="text"
            name="text"
            id="text"
            className="w-80 border border-primary-400 rounded py-2 px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sheno emrin"
          />
          <button
            className="w-80 bg-primary rounded font-bold text-sm hover:bg-secondary text-white py-3"
            type="submit"
          >
            Shto kategori
          </button>
        </div>
      </form>
    </section>
  )
}

export default CategoryForm
