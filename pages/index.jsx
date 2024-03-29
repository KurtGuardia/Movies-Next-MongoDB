import Head from 'next/head'
import connectDB from '../lib/dbConnect'
import Movie from '../models/Movie'
import Link from 'next/link'

export default function Home({ movies }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='container'>
        <h1>Movies</h1>
        <Link href='/new'>
          <a className='btn btn-primary w-100'>Agregar</a>
        </Link>
        {movies.map(({ _id, title, plot }) => (
          <div className='card m-2' key={_id}>
            <div className='card-body'>
              <div className='h5 text-uppercase'>
                {title}
              </div>
              <p className='fw-lght'>{plot}</p>
              <Link href={`/${_id}`}>
                <a className='btn btn-success btn-sm'>
                  Mas info..
                </a>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export async function getServerSideProps() {
  try {
    await connectDB()

    const res = await Movie.find({})

    const movies = res.map((doc) => {
      const movie = doc.toObject()
      movie._id = `${movie._id}`
      return movie
    })

    return { props: { movies } }
  } catch (error) {
    console.log(
      '🚀 ~ file: index.jsx:47 ~ getServerSideProps ~ error',
      error,
    )
  }
}
