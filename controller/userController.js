const passport = require('passport')
const validator = require('validator')
const User = require('../model/userModel')
const path = require('path')


module.exports = {

getLoginPage :(req, res) => {
// If the user is already logged in redirect him to the next page (skip the login form, but this will work for one hour then the session expired and ask log in again.)
    if (req.user) {
        return res.redirect('/')
      }
// If the user is new or come after one hour latter send the login page and log in again
    res.render( 'login' , {
    })
  },

//This route is happening after sending the login page and  during in the middle of login process and click login button.
// Or if there something wrong with login process send those message to the user.
postLogin : (req, res, next) => {
    const validationErrors = []  
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/register/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
      if (err) { 
        return next(err)
      }
      if (!user) {  // if the user is not there or logged out redirect him to the login page
        req.flash('errors', info)
        return res.redirect('/register/login')
      }
      console.log('the authenticated user is:', user)

//Else if this role is exist and the user was registered for this page redirect him to the next page
      req.logIn(user, (err) => {
        if (err) { 
          return next(err) 
        } 
       // else the user is logged in redirect him to the next page.
          req.flash('success', { msg: 'Success! You are logged in.' })
          res.redirect('/')
        })
    })(req, res, next) 

  },
  
// If the user ask a log out req redirect him to the register main page and destroy his session and cookies.
logout: (req, res, next) => {
// 1. Check user role BEFORE logging out / destroying session
    const userRole = req.user ? req.user.role : null;

// 2. Log out the user from Passport
    req.logout(function (err) {
        if (err) { return next(err); }
        console.log('User has logged out.');

        // 3. Destroy session
        req.session.destroy((err) => {
            if (err) {
                console.log('Error : Failed to destroy the session during logout.', err);
            }
      // 4. Clear cookie
              res.clearCookie('connect.sid');
      // 5. Redirect the user to the the login page
              return res.redirect('/register/login');
        });
    });
},

getSignupPage : (req, res) => {
// If already logged in, send them to their correct dashboard instead of the signup page
  if (req.user) {
      return res.redirect('/');
   
  }
//If the user new and ask to register send to him a register page
  res.render( 'register' , {
    title: 'Create Account'
  });
},
 
//This route is happening during in the middle of register or after click the register button. if there is any error or mistake send those messages
postRegister : async (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
  
    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        
        return res.redirect('/register/signup') // redirect to the sign up page
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

  try{
    req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dot: false})
    const email = req.body.email.toLowerCase().trim()
    const fullname = req.body.fullName.toLowerCase().trim()

// Check if the user is already Exist or not  
    const existingUser = await User.findOne({
      $or: [
        {email: email},
        {fullName: fullname}
      ]
    })

if (existingUser) {
    req.flash('errors', {
        msg: 'Account with that email address or username already exists.'
    });

    return res.redirect('/register/signup');
}
  

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role  // Assign role from request body 
    })
// use await to save the user
    await user.save()

  // log the user in via passport after successful registration
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          return res.redirect('/')

        })
  } catch(err){    // This catch any data-base connection errors
    return next(err)
  }
}

}