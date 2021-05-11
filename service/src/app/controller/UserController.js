const User = require('../model/User')

class UserController{

  async store(req, res, next){

    try{

      const { name, email, city } = req.body

      let user = await User.findOne({email})
    
      if(!user){

        user = await User.create({
          name,
          email,
          city
        })

      }

      return res.json(user)

    }catch(err){
      return next(err)
    }

  }

  async destroy(req, res, next){
    
    try{

      const {email} = req.params

      const user = await User.deleteOne({email})

      return res.json(user)
    }catch(err){
      return next(err)
    }
  }

}

module.exports = new UserController()