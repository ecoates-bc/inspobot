const CATEGORIES = {
    times: {
        "A_TIME": ["ancient"],
        "O_TIME": [
            "14th-century",
            "15th-century",
            "16th-century",
            "17th-century",
            "18th-century",
        ],
        "M_TIME": [
            "19th-century",
            "Victorian",
            "20th-century",
            "contemporary",
        ]
    },

    locations: {
        "A_LOCATION": [
            "Roman",
            "Greek",
            "Mayan",
            "Chinese",
            "Egyptian",
            
        ]
    },

    adjectives: {
        "ADJ": [
            "disruptive",
            "famous",
            "tragic",
            "gifted",
            "infamous",
            "radical",
            "talented",
            "timid",
            "boring",
            "quaint",
            "maverick",
            "genius",
            "turbulent",
            "jovial",
            "gregarious",
            "dashing",
            "machiavellian",
            "conniving",
            "virtuous",
            "controversial",
            "enigmatic",
            "lethargic",
            "ignominious",
            "notorious",
            "heartthrob",
            "ingenious",
            "mysterious",
            "legendary",
            "insipid",
        ]
    },

    professions: {
        "A_PROFESSION": [
            "merchant",
            "general",
            "philosopher",
            "mathematician",
            "preist",
        ],

        "O_PROFESSION": [
            "industrialist",
            "general",
            "scientist",
            "politician",
            "statesman",
            "writer",
            "playwright",
            "essayist",
            "scholar",
            "explorer",
            "composer",
            "courtier",
            "aristocrat",
            "monk",
        ],

        "M_PROFESSION": [
            "businessperson",
            "businesswoman",
            "politician",
            "writer",
            "comedian",
            "movie star",
            "linguist",
            "thinker",
            "activist",
            "philosopher",
            "entrepreneur",
            "computer scientist",
            "journalist",
            "musician",
            "singer-songwriter",
            "conductor",
            "athlete",
            "mountaineer",
            "dadaist",
            "postmodernist",
            "painter",
            "hacker",
        ],
    }
};

const RULES = {
    ancient: ["A_TIME", "A_LOCATION", "A_PROFESSION"],
    olden: ["ADJ", "O_TIME", "O_PROFESSION"],
    modern: ["ADJ", "M_TIME", "M_PROFESSION"],
};

const IMG_TYPES = {
    ancient: [
        "mosaic",
        "painting",
        "statue",
        "artifact",
    ],

    olden: [
        "painted",
        "lithograph",
        "illuminated manuscript",
        "oil painting",
        "fresco",
    ],

    modern: [
        "cubist caricature",
        "cartoon",
        "collage",
        "photograph",
        "old sepia photograph",
        "black and white photo",
    ]
};


function randomChoice(collection) {
    const index = Math.floor(Math.random() * collection.length);
    return collection[index];
}


function createCharacter() {
    const era = randomChoice(["ancient", "olden", "modern"]);
    const rule = RULES[era];
    let description = [];
    rule.forEach((step) => {
        Object.keys(CATEGORIES).forEach((category) => {
            const category_obj = CATEGORIES[category];
            if (category_obj.hasOwnProperty(step)) {
                description.push(randomChoice(category_obj[step]))
            }
        })
    });

    return {description: description.join(" "), era: era}
}


function getCharacterPrompt() {
    const character = createCharacter();
    const prompt = `Make up a name for a fictional ${character.description}. Do not use an existing name.`;
    return {character: character.description, prompt: prompt, era: character.era};
}


function getQuotePrompt(character, name) {
    const prompt = `Make up an inspirational quote said by ${name}, a fictional ${character}. Do not repeat the name of the speaker. Do not use an existing quote.`;
    return {prompt: prompt}
}


function getImagePrompt(character, name, era) {
    let imageStyle = "";
    Object.keys(IMG_TYPES).forEach((category) => {
        if (era === category) {
            imageStyle = randomChoice(IMG_TYPES[era])
        }
    });

    const prompt = `A ${imageStyle} portrait of ${name}, a fictional ${character}.`;
    return {prompt: prompt}
}


module.exports = { getCharacterPrompt, getQuotePrompt, getImagePrompt };