const mongoose = require('mongoose')


const PostUserSchema = new mongoose.Schema({
  description:{type: String, required: true},
  like: {type: Array},
  imgUrl: {type: String},
  hashTags: {type: String},
  user:{type: mongoose.Types.ObjectId, ref:'user'}
}, {
  timestamps: true
})

PostUserSchema.methods.setImgUrl = function setImgUrl (filename) {

  this.imgUrl = `${process.env.HOST}/public/${filename}`
}

const POSTSBYUSERS  = mongoose.model('postUser', PostUserSchema)

module.exports = POSTSBYUSERS