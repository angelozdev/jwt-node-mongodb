const db = require('../db/user.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const signup = (req, res) => {
   const { username, email, password } = req.body;
   if(!username || !email || !password) return res.status(422).send('Some data is missing')
   bcrypt.hash(password, 10)
      .then(passwordEncrypted => {
         const user = {
            username: username.toLowerCase(),
            email,
            password: passwordEncrypted
         }
         return user;
      })
      .then(user => db.signup(user))
      .then(data => {
         const token = jwt.sign({ id: data._id }, process.env.PRIVATE_KEY, {
            expiresIn: 600
         })
         console.log('[UserController]', 'USER ADDED')
         res.send({data, token})
      })
      .catch(err => {
         res.sendStatus(500)
         console.error('[UserController]', err)
      })
}

const showUsers = (req, res) => {
   db.showUsers()
      .then(users => res.send(users))
      .catch(err => {
         res.sendStatus(500)
         console.error('[UserController]', err)
      })
}

const showMe = (req, res) => {
   db.getUser(req.userID)
      .then(user => res.send(user))
      .catch(err => {
         res.sendStatus(500)
         console.error(err)
      })
}


const login = (req, res) => {
   const { emailorname, password } = req.body;
   if(!emailorname || !password) return res.sendStatus(422);

   db.login(emailorname)
      .then( async (user) => {
         const isCorrect = await bcrypt.compare(password, user.password)
         return { isCorrect, user }
      })
      .then(({ isCorrect, user }) => {
         if(!isCorrect) return res.status(401).send('Incorrect Password');
         const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
            expiresIn: 600
         })
         res.send({ user, token })
      })
      .catch(err => {
         res.sendStatus(500)
         console.error(err)
      })
}



module.exports = {
   signup,
   showUsers,
   showMe,
   login
}