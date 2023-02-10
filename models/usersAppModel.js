const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password:[{type: String, required: true}],
    from: [{type: String, required: true}],
    role: {type: String, required: true},
    logged: {type: String, required: true},
    weight: {type: Number, required: true},
    size:{type: Number, required: true},
    imgUrl: {type: String, required: true},
    friends:{type: Array, required: true},
    recipes:{type: Array, required: true}

})

userSchema.methods.setImgUrl = function setImgUrl (filename) {

    this.imgUrl = `${process.env.HOST}/public/${filename}`
  }

const USERAPP = mongoose.model(
    'user',
    userSchema
)

module.exports = USERAPP