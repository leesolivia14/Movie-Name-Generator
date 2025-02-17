//import words from 'an-array-of-english-words' assert { type: "json"};

//prints out all words that contain "fun"
//console.log(words.filter(d => /fun/.test(d)));

//import mongoose from 'mongoose';

console.log("why");

/*
// TODO: find out a way to distinguish parts of speech.
// ex) words ending with "tion" are nouns, "-ly" are adverbs, etc??
// combinations allowed:
    - adverb + verb
    - adverb + noun allowed
    - article + verb
    - article + noun
    - preposition + noun
    - preposition + verb
    - ...pattern: as long as noun and verb is last word it's fine
*/



// the code below works with "index.html", but failed to get it work with index.hbs..


let ADJECTIVES_LIST = ["Lion", "Good", "Bad", "Neutral"];

let NOUNS_LIST = ["King", "Person", "Day"];

let USER_LIKES = [];

function generateRandNum(list) {
    //console.log(list[Math.floor(Math.random() * list.length)]);
    return list[Math.floor(Math.random() * list.length)];

}


/*
let generated_title_box = document.getElementById('generated-title');

function generateTitle() {
    let rand_adj = generateRandNum(ADJECTIVES_LIST);
    let rand_noun = generateRandNum(NOUNS_LIST);

    let rand_title = `${rand_adj} ${rand_noun}`;

    generated_title_box.innerHTML = rand_title;
}

let generate_button = document.getElementById('generate-button');
generate_button.addEventListener('click', generateTitle);
*/

/*
function likeTitle() {
    //USER_LIKES.push(`${generated_title_box.innerHTML}`);

    //app.RandomSavedTitle
    const newTitle = new app.UserSavedTitle({
        title: generated_title_box.innerHTML
    });

    newTitle.save((err) => {
        if (err) {
            console.log("Title save error");
            res.redirect('/save-your-own');
        }
        else {
            RandomSavedTitle.find({}).exec((err, savedTitles) => {
                
                res.render('save-your-own', {savedTitles: savedTitles, generatedTitle: savedTitles[savedTitles.length-1].title});
            });
        }
    });

    const textbox = document.getElementById('user-likes-list');
    //textbox.innerHTML += `${generated_title_box.innerHTML}`+ "\n";
    //textbox.appendChild(generated_title_box.innerHTML\n`);
    let new_like = document.createElement("li");
    let node = document.createTextNode(`${generated_title_box.innerHTML}`);

    let remove = document.createElement("span");
    remove.setAttribute("class", "remove");
    let remove_node = document.createTextNode("x");

    remove.appendChild(remove_node);
    new_like.appendChild(node);
    new_like.appendChild(remove);
    textbox.appendChild(new_like);
}
let like_button = document.getElementById('like-button');
like_button.addEventListener('click', likeTitle);
*/

const retrieveRandomTitle = () => {
    
    return generated_title_box.innerHTML;

}

/*
function removeLike() {
    let remove_buttons = document.getElementsByClassName("remove");

    // https://www.w3schools.com/howto/howto_js_close_list_items.asp
    for (i = 0; i < remove_buttons.length; i++) {
        remove_buttons[i].addEventListener("click", function() {
            this.parentElement.style.display = 'none';
        });
    }

}

let remove_buttons = document.getElementsByClassName("remove");
remove_buttons.addEventListener('click', removeLike);




const submit_button = document.querySelector('input[type="submit"]');
submit_button.addEventListener('click', handleClick);

function handleClick(evt) {
    // if you dont wnt to actually submit
    //evt.preventDefault();

    const user_input = document.querySelector('#user-input').value;

    const textbox = document.getElementById('user-likes-list');
    //textbox.innerHTML += `${generated_title_box.innerHTML}`+ "\n";
    //textbox.appendChild(generated_title_box.innerHTML\n`);
    let new_like = document.createElement("li");
    let node = document.createTextNode(`${user_input}`);

    let remove = document.createElement("span");
    remove.setAttribute("class", "remove");
    let remove_node = document.createTextNode("x");

    remove.appendChild(remove_node);
    new_like.appendChild(node);
    new_like.appendChild(remove);
    textbox.appendChild(new_like);
}

*/



// this will make Ajax request when the form is submitted.




