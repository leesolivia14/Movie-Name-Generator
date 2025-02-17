//import words from 'an-array-of-english-words' assert { type: "json" };
import {words} from 'popular-english-words'
import mongoose, { Mongoose } from 'mongoose';

//const words = require('an-array-of-english-words')
//const words_list = words.getAll();
const popular_words = words.getMostPopular(10000);

import './db.mjs';

//console.log(words.filter(d => /love/.test(d)))


// human condition
//console.log(words.filter(d => /kind/.test(d)))

// filter words by parts of speech
const words_model = mongoose.model('Words');

export function filterNouns (){

    const nouns = new words_model({
        words: popular_words.filter(w => w.endsWith('ion'))
    })
    nouns.save((err) => {
        if (err) {
            console.log(err)
        }
        else {
            //console.log(nouns)
        }
    });

}

filterNouns();



export function filterAdverbs (){

    const adverbs = new words_model({
        words: popular_words.filter(w => w.endsWith('ly'))
    })
    adverbs.save((err) => {
        if (err) {
            console.log(err)
        }
        else {
            //console.log(adverbs)
        }
    });

}

filterAdverbs();


export function filterVerbs (){

    const verbs = new words_model({
        words: popular_words.filter(w => w.endsWith('ing')) //this can be noun (gerand) or adjective
    })
    verbs.save((err) => {
        if (err) {
            console.log(err)
        }
        else {
            //console.log(verbs)
        }
    });

}

filterVerbs();


export function generateRandNum(list) {
    //console.log(list[Math.floor(Math.random() * list.length)]);
    return list[Math.floor(Math.random() * list.length)];

}

export function generateTitle() {
    let rand_adj = generateRandNum(popular_words);
    let rand_noun = generateRandNum(popular_words);

    let rand_title = `${rand_adj} ${rand_noun}`;

    return rand_title;
    //generated_title_box.innerHTML = rand_title;
}


export function generateTitle_userinput(userinput) {
    
    let rand_word = generateRandNum(popular_words);
    let num = Math.floor(Math.random() * 2);

    if (num == 1) {
        return `${rand_word} ${userinput}`
    }
    return `${userinput} ${rand_word}`
    
}
