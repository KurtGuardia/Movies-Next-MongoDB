import connectDB from '../../lib/dbConnect'
import Movie from '../../models/Movie'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MoviePage = ({ success, error, movie }) => {
  const router = useRouter()

  if (!success) {
    return (
      <div className='container text-center my-5'>
        <h1> {error} :-(</h1>
        <Link href='/'>
          <a className='btn btn-success'>Volver...</a>
        </Link>
      </div>
    )
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Detalle de Movie</h1>
      <div className='card'>
        <div className='card-body'>
          <div className='card-title'>
            <h5 className='text-uppercase'>
              {movie.title}
            </h5>
          </div>
          <p className='fw-light'>{movie.plot}</p>
          <Link href='/'>
            <a className='me-2 btn btn-success btn-sm'>
              Volver...
            </a>
          </Link>
          <Link href={`/${movie._id}/edit`}>
            <a className='me-2 btn btn-warning btn-sm'>
              Editar
            </a>
          </Link>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => deleteData(movie._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoviePage

export const getServerSideProps = async ({ params }) => {
  try {
    await connectDB()
    const movie = await Movie.findById(params.id).lean()

    if (!movie) {
      return {
        props: {
          success: false,
          error: 'peli no encontrada',
        },
      }
    }
    movie._id = `${movie._id}`

    return {
      props: {
        success: true,
        movie,
      },
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return {
        props: {
          success: false,
          error: 'id no valido',
        },
      }
    }

    return {
      props: {
        success: false,
        error: 'Error de servidor',
      },
    }
  }
}
