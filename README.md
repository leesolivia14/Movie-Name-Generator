# Movie Title Generator

## Overview

Dear film students, is coming up with a title the hardest part of your assignment? I got you.

Movie Title Generator is a web app that will generate randomized movie titles, with or without login. Users can register and login. The benefit of creating an account is that you will be able to save randomized movie titles that you like. In addition, you can also come up with your own movie titles and save them under your account. Users can feel free to remove titles that they don't want.

## Data Model

The application will store Users, titleList and wordList

* each list can have multiple items (by embedding)
* each user will have one list that contains all of their liked/added movie titles.


An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  savedTitles: // a list of titles that this user saved
  lastUpdated: // timestamp
}
```

An Example Word List

```javascript
{
  articles: Object,
  adjectives: Object,
  nouns: Object,
  adverbs: Object,
  verbs: Object
  lastUpdated: // timestamp
}
```


## User Stories or Use Cases

1. as a non-registered user, I can register a new account with the site
2. as a non-registered user, I can generate random movie titles
3. as a user, I can log in to the site
4. as a user, I can generate randomly generated movie titles
5. as a user, I can save randomly generated movie titles
6. as a user, I can add and save non-randomized movie titles through form to existing saved titles list
7. as a user, I can view all the movie titles I have saved in a single list
8. as a user, I can remove items in an existing saved titles list




## Annotations / References Used

1. [npm package "an-array-of-english-words" use](https://www.npmjs.com/package/an-array-of-english-words)

2. [github repo of "an-array-of-english-words"](https://github.com/words/an-array-of-english-words)

2. [tutorial on Natural Language Processing with JavaScript](https://javascript.plainenglish.io/how-to-do-natural-language-processing-with-javascript-a934018d03d4) - (will add link to source code that was based on this)
3. [tutorial on react.js](https://reactjs.org/tutorial/tutorial.html) - (will add link to source code that was based on this)
4. Passport.js authentication
