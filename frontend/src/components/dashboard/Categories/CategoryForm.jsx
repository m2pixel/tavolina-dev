import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../../features/categories/categorySlice'
import Button from '../../Button'

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
          <input
            type="text"
            name="text"
            id="text"
            className="w-80 text-dark border border-dark rounded py-2 px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sheno emrin"
          />
          <Button title="Shto kategori" buttonStyle={7} />
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

export default CategoryForm
