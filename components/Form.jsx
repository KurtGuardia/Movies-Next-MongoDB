import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Form = ({ formData, formNewMovie = true }) => {
  const router = useRouter()

  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot,
  })

  const [message, setMessage] = useState([])

  const handleChange = (e) => {
    const { value, name } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formNewMovie) {
      postData(form)
    } else {
      putData(form)
    }
  }

  const putData = async (form) => {
    const { id } = router.query
    setMessage([])
    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key]
          setMessage((oldMessage) => [
            ...oldMessage,
            { message: error.message },
          ])
        }
      } else {
        setMessage([])
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postData = async (form) => {
    try {
      const res = await fetch('/api/movie', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key]
          setMessage((oldMessage) => [
            ...oldMessage,
            { message: error.message },
          ])
        }
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <h1 className='my-3'>Agregar Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control my-2'
          placeholder='Title'
          autoComplete='off'
          value={form.title}
          onChange={handleChange}
          name='title'
        />
        <input
          type='text'
          className='form-control my-2'
          placeholder='Plot'
          autoComplete='off'
          value={form.plot}
          onChange={handleChange}
          name='plot'
        />
        <button
          className='btn btn-primary w-100 m-2'
          type='submit'
        >
          {formNewMovie ? 'Agregar' : 'Editar'}
        </button>
        <Link href='/'>
          <a className='btn btn-warning w-100'>Volver...</a>
        </Link>
        {message.map(({ message }) => (
          <p key={message}>{message}</p>
        ))}
      </form>
    </div>
  )
}

export default Form
