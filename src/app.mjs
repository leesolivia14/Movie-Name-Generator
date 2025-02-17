
import express from 'express'
import path from 'path'
import url from 'url';
import './db.mjs';

import { generateTitle, generateTitle_userinput } from './words.mjs';
import mongoose from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';
import { rmSync } from 'fs';

import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'express-flash';
//const LocalStrategy = require('passport-local').Strategy;
import { Strategy as localStrategy } from 'passport-local';
//const { localStrategy } = Strategy;


//const RandomSavedTitle = mongoose.model('RandomSavedTitle');
//const UserSavedTitle = mongoose.model('UserSavedTitle');
const User = mongoose.model('User');

//const RandomTitles = mongoose.model('RandomTitles');

import session from 'express-session';

import bcrypt from 'bcryptjs';
import { doesNotMatch } from 'assert';

const loginMessages = {"PASSWORDS DO NOT MATCH": 'Incorrect password', "USER NOT FOUND": 'User doesn\'t exist'};
const registrationMessages = {"USERNAME ALREADY EXISTS": "Username already exists", "USERNAME PASSWORD TOO SHORT": "Username or password is too short"};



const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false})); // be able to access in req
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views/'));
// configure app to use hbs as templating library
app.set('view engine', 'hbs');


// middleware to allow files from ./public to be served.
// if req.path exists in file system relative to ./public
// respond with that as body... otherwise, go on to next
// middleware


app.use(session({
    //secret: process.env.SESSION_SECRET //will encrypt
    secret: "verygoodsecret",
    resave: true,
    saveUninitialized: true
}));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(path.join(__dirname + '/public')));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy (function (username, password, done) {
    /*
    User.findOne({username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.'});
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                return done(err);
            }

            if (res === false) {
                return done(null, false, {message: 'Incorrect password'});
            }

            return done(null, user);
        });
    });
    */

    User.findOne({username: username}, (err, user) => {
        if (!err && user) {
            bcrypt.compare(password, user.password, (err, passwordMatch) => {
                if (passwordMatch) {
                    
                    return done(null, user);
                }
                else {
                    //res.render('login', {message: "Incorrect password"});
                    return done(null, false, {message: 'ERROR: Incorrect password'});
                }
            });
        } else {
            return done(null, false, { message: 'ERROR: Incorrect username'});
            //return done(null, false, req.flash('message', 'incorrect username'));
        }
    })

}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

// body parsing middleware for urlencoded bodies
// places parsed body into req.body




// example middleware function
app.use(function(req, res, next) {
    console.log('req.method:', req.method, req.path);
    console.log('req.query:', req.query);
    console.log('req.body:', req.body);

    //res.locals.success_alert_message = req.flash('success_alert_message');
   // res.locals.error_message = req.flash('error_message');
   // res.locals.error = req.flash('error');
    // call next to invoke next middleware function or route handler
    next();
});




app.get('/views/client.mjs', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/client.mjs'));
});



app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname +'/index.html'));
    
    var rand_title = generateTitle();
    rand_title_list.push(rand_title);

    if (req.isAuthenticated()) {
        User.findOne({username: req.user.username}).exec((err, docs) => {
            console.log(docs.titles)
            res.render('index', {loggedin: "Logout", savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1], username: req.user.username + "'s likes"});
        });
    }
    else {
        res.render('index', {loggedin: "Login", generatedTitle: rand_title_list[rand_title_list.length-1]});
    }

    
});



var rand_title_list = [];
var saved_titles = [];

app.post('/', (req, res) => {
    // distinguish if title is generated by "next" button or "userinput"

    //const saveMethod = req.body[0];
    
    var rand_title = generateTitle();
    rand_title_list.push(rand_title);

    

    if (req.body.userinput !== undefined) {
        const userinput_title = generateTitle_userinput(req.body.userinput);

        rand_title_list.push(userinput_title);
        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username}).exec((err, docs) => {
                const likes = "likes";
                res.render('index', {loggedin: "Logout", savedTitles: docs.titles, generatedTitle: userinput_title});
            });
        }
        else {
            res.render('index', {loggedin: "Login", generatedTitle: userinput_title});
        }

    }

    

    //pink button pressed
    if (req.body.likeButton !== undefined && req.body.generateButton === undefined){
        if (req.isAuthenticated()) {

            User.findOneAndUpdate({username: req.user.username}, {$push: {"titles": rand_title_list[rand_title_list.length-2]}}, null, (err, docs) => {
                if (err) {
                    console.log(error)
                    return;
                } else {
                    console.log("AAaaaaaa", docs.titles);
                    saved_titles.push(rand_title_list[rand_title_list.length-2]);
                    //res.render('index', {savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
      
                }

                User.findOne({username: req.user.username}).exec((err, docs) => {
                    console.log(docs.titles)
                    console.log("this must work pink button pressed")
                    res.render('index', {loggedin: "Logout", savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
                });
            
            });

            /*
            if (req.body.userinput !== undefined) {
                User.findOne({username: req.user.username}).exec((err, docs) => {
                    const likes = "likes";
                    res.render('index', {loggedin: "Logout", savedTitles: docs.titles, generatedTitle: userinput_title});
                });
            }
            else {
                User.findOneAndUpdate({username: req.user.username}, {$push: {"titles": rand_title_list[rand_title_list.length-2]}}, null, (err, docs) => {
                    if (err) {
                        console.log(error)
                        return;
                    } else {
                        console.log("AAaaaaaa", docs.titles);
                        saved_titles.push(rand_title_list[rand_title_list.length-2]);
                        //res.render('index', {savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
          
                    }
    
                    User.findOne({username: req.user.username}).exec((err, docs) => {
                        console.log(docs.titles)
                        console.log("this must work pink button pressed")
                        res.render('index', {loggedIn: "Logout", savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
                    });
                
                });
            }
            
            */
            
            /*
            User.findOne({username: req.user.username}).exec((err, docs) => {
            
                res.render('index', {savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
            });

*/

        }
        else {
            res.redirect('/login');
        }
    
    } else if (req.body.generateButton !== undefined){ //generate button pressed
        // user is logged in

        if (req.isAuthenticated()) {
            User.findOne({username: req.user.username}).exec((err, docs) => {
                console.log(docs.titles)
                console.log('generate button presssed')
                const likes = "likes";
                res.render('index', {loggedin: "Logout", savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});
            });
        }
        else {
            res.render('index', {loggedin: "Login", generatedTitle: rand_title_list[rand_title_list.length-1]});
        }
        

    }
    
});



app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname +'/index.html'));
});


app.get('/profile', isLoggedIn, (req, res) => {
    //res.sendFile(path.join(__dirname +'/index.html'));
    User.findOne({username: req.user.username}).exec((err, docs) => {
        console.log(docs.titles)
        res.render('profile', {savedTitles: docs.titles, username: req.user.username + "'s likes"});
    });
    
});


app.post('/profile', (req, res) => {

    // distinguish if title is generated by "next" button or "userinput"

    const saveMethod = req.body[0];


    User.findOneAndUpdate({username: req.user.username}, {$push: {"titles": req.body.userinput}}, null, (err, docs) => {
        if (err) {
            console.log(error)
            return;
        } else {
            console.log("AAaaaaaa", docs.titles);
            saved_titles.push(req.body.userinput);
            //res.render('index', {savedTitles: docs.titles, generatedTitle: rand_title_list[rand_title_list.length-1]});

        }

        User.findOne({username: req.user.username}).exec((err, docs) => {
            console.log(docs.titles)
            res.render('profile', {savedTitles: docs.titles});
        });
    
    });


});

app.get('/login', (req, res) => {
    // GET request to /cats again
    // POST, REDIRECT ... GET
    // check if lives if numeric

    
    if (req.isAuthenticated()) {
        console.log("logout")
        res.redirect('logout');
    }

    const error_message = req.flash('error')[0];
    console.log(req.flash('error')[0]);
    console.log('login')
    //res.render('login', {errormsg: req.flash('error')[0]})
    res.render('login', {errormsg: error_message})
    
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


app.get('/logout', (req, res) => {
    req.logout(function(err) {
        res.redirect('/');
    })
});

app.get('/register', async (req, res) => {
    /*
    for "admin", "mypassword"
    const exists = await User.exists({username: "admin"});

    if (exists) {
        res.redirect('/login');
        return;
    }

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash("mypassword", salt, function (err, hash) {
            if (err) return next(err);

            const newAdmin = new User({
                username: "admin",
                password: hash,
                titles: []
            });

            newAdmin.save();

            res.redirect('/login');
        });
    });
    */
    res.render('register');

});

app.post('/register', async (req, res) => {
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);

            const newUser = new User({
                username: req.body.username,
                //email: req.body.email,
                password: hash,
                titles: []
            });
        
            newUser.save((err) => {
                if (err) {
                    console.log("user save error");
                    console.log(err)
                    res.redirect('register'); // include error code
                }
                else {
                    res.redirect('login');
                }
            });
        });
    });
    
});
        
  

       

//app.listen(3000);
const PORT = 3000;
app.listen((process.env.PORT || 3000), () => {
    console.log(`Server listening on ${PORT}`);
});