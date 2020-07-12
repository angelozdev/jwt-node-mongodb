const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   const token = req.headers.authorization;
   if(!token) return res.sendStatus(401);
   const decode = jwt.verify(token, process.env.PRIVATE_KEY)

   if(decode.id){
      req.userID = decode.id;
      next()
   }
}


module.exports = {
   verifyToken
}