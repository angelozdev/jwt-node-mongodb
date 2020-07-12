const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   email: { type: String, required: true, unique: true }
},
{
   timestamps: true
})

module.exports = model('User', UserSchema, 'users')