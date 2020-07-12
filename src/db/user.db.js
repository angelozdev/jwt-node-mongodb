const User = require('../models/User');


const signup = (user) => {
   return Promise.resolve(User.create(user))
}

const showUsers = () => {
   return Promise.resolve(User.find({}))
}

const getUser = (id) => (
   User.findById(id, { password: 0, __v: 0 })
      .then(user => {
         if(!user) throw new Error('This user doesn\'t exists')
         return user
      })
)

const login = (emailorname) => (
   User.findOne({ $or: [ { email: emailorname }, { username: emailorname } ] })
      .then(user => {
         if(!user) throw new Error('[UserDB] User does not exist')
         return user
      })
)

module.exports = {
   signup,
   showUsers,
   getUser,
   login
}