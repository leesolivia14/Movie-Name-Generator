import mongoose, { Mongoose } from 'mongoose';
import mongooseSlugPlugin from 'mongoose-slug-plugin';

import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbconf;

import passportLocalMongoose from 'passport-local-mongoose';
import { stringify } from 'querystring';


if (process.env.NODE_ENV === 'PRODUCTION') {
    // if we're in PRODUCTION mode, then read the configration from a file
    // use blocking file io to do this...
    const fn = path.join(__dirname, 'config.json');
    const data = fs.readFileSync(fn);

    // our configuration file will be in json, so parse it and set the
    // conenction string appropriately!
    const conf = JSON.parse(data);
    dbconf = conf.dbconf;
} else {
     // if we're not in PRODUCTION mode, then use
    dbconf = 'mongodb://localhost/movie_name_generator';
}
// create a schema
// A schema represents a MongoDB collection.

// define the data in our collection


// temporary, will be included in User once logins have been figured out.
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    //email: {type: String, required: true},
    password: {type: String, unique: true, required: true},
    titles: [
        {type: String}
    ]

});




const WordsSchema = new mongoose.Schema({
    words: {type: Object}
});

UserSchema.plugin(passportLocalMongoose);
//RandomSavedTitleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});
//UserSavedTitleSchema.plugin(mongooseSlugPlugin, {tmpl: '<%=title%>'});

// "register" it so that mongoose knows about it
mongoose.model('User', UserSchema);

mongoose.model('Words', WordsSchema);
mongoose.connect(dbconf);
