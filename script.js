// pull a database of adjectives and nouns? idk

// eventually update to genres, too.

const adjectives = [
    "Fruitful",
    "One",
    "Second",
    "Short",
    "Beautiful",
    "Brave",
    "Hurtful",
    "Lonely",
    "Deliberate",
    "Why",
    "Early in the",
    "Late"
];

const nouns = [
    "World",
    "Bravery",
    "Pain",
    "Sounds",
    "Reality",
    "Homework",
    "Night",
    "Morning"
];



function generateTitle(){
    let result_text_box = document.getElementById("result");

    let random_adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    let random_noun = nouns[Math.floor(Math.random() * nouns.length)];
    let title = `${random_adjective} ${random_noun}`;
    result_text_box.innerHTML = title;
}



let generate_button = document.getElementById("generate_button");
generate_button.addEventListener("click", generateTitle);
