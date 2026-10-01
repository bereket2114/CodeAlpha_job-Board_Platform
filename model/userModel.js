const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const { flushCompileCache } = require("node:module");

const userSchema = new mongoose.Schema({

    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        unique: true,
        required: true
    }  
});

// Password hash middleware.
 
 userSchema.pre('save', async function () {
  const user = this
// only hash the password if it has been modified or new
  if (!user.isModified('password')) { 
    return;
  }

 try{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

// Override the plain text password with the hashed one(encrypted one)
      user.password = hash
    } catch (err) {
      throw err;
    }
})

// Helper method for validating user's password.
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

module.exports= mongoose.model('jobBoardUser', userSchema);
