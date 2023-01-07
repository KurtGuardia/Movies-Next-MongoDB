import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'porfavor ingrese titulo amigoooooo'],
  },
  plot: {
    type: String,
    required: [true, 'porfavor ingrese el plot amigoooooo'],
  },
})

export default mongoose.models.Movie ||
  mongoose.model('Movie', MovieSchema)
