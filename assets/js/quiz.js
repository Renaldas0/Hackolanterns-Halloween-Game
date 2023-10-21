const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-box')
const submitButtonElement = document.getElementById('submit')

const easyDoor = document.getElementById('door-1')
const mediumDoor = document.getElementById('door-2')
const hardDoor = document.getElementById('door-3')

const questions = [
    // Easy Questions
   {
    question: 'Which friendly ghost is known for being a classic Halloween character?',
    answers : [
        {text: 'Casper', correct: true},
        {text: 'Slimer', correct: false},
        {text: 'Beetlejuice', correct: false},
    ],
    points: 1,
   },
   {
    question: 'What fruit is often used for bobbing at Halloween parties?',
    answers : [
        {text: 'Banana', correct: false},
        {text: 'Apple', correct: true},
        {text: 'Pear', correct: false},
    ],
    points: 1,
   },
   {
    question: 'What do children traditionally say when they go trick-or-treating?',
    answers : [
        {text: 'Happy Halloween!', correct: false},
        {text: 'Trick or treat!', correct: true},
        {text: 'Give me candy!', correct: false},
    ],
    points: 1,
   },
   {
    question: 'Which popular costume theme often involves black capes, broomsticks, and pointy hats?',
    answers : [
        {text: 'Ghost', correct: false},
        {text: 'Pirate', correct: false},
        {text: 'Witch', correct: true},
    ],
    points: 1,
   },
   {
    question: 'What is the term for a scary story told to frighten people during Halloween season?',
    answers : [
        {text: 'Ghost story', correct: true},
        {text: 'Fairytale', correct: false},
        {text: 'Love story', correct: false},
    ],
    points: 1,
   },
   {
    question: 'What is the term for a large, carved pumpkin with a scary face lit by a candle?',
    answers : [
        {text: 'Pumpkin pie', correct: false},
        {text: 'Squash', correct: false},
        {text: 'Jack-o-lantern', correct: true},
    ],
    points: 1,
   },
   {
    question: 'What do many people hang outside their homes to create a spooky atmosphere during Halloween?',
    answers : [
        {text: 'Christmas lights', correct: false},
        {text: 'Spider webs', correct: true},
        {text: 'Flower pots', correct: false},
    ],
    points: 1,
   },
   {
    question: 'Which folklore creature is known for transforming into a bat and sucking the blood of its victims?',
    answers : [
        {text: 'Zombie', correct: false},
        {text: 'Werewolf', correct: false},
        {text: 'Vampire', correct: true},
    ],
    points: 1,
   },
   {
    question: 'What is the traditional activity of walking from house to house and collecting candy on Halloween called?',
    answers : [
        {text: 'Trick or treating', correct: true},
        {text: 'Ghost hunting', correct: false},
        {text: 'Pumpkin carving', correct: false},
    ],
    points: 1,
   },
   {
    question: 'Which classic monster is known for being made from body parts and brought to life by electricity?',
    answers : [
        {text: 'Dracula', correct: false},
        {text: "Frankenstein's Monster", correct: true},
        {text: 'The Wolfman', correct: false},
    ],
    points: 1,
   },
   {
    question: 'What is the name of the cursed videotape that brings death to anyone who watches it in the horror film "The Ring"?',
    answers : [
        {text: 'The Evil Within', correct: false},
        {text: 'The Grudge', correct: false},
        {text: 'The Ring', correct: true},
    ],
    points: 1,
   },
   // Medium Questions
   {
    question: "What is the name of the town where the events of Washington Irving's 'The Legend of Sleepy Hollow' take place?",
    answers : [
        {text: 'Willowbrook', correct: false},
        {text: 'Tarry Town', correct: true},
        {text: 'Haunted Hollow', correct: false},
    ],
    points: 2,
   },
   {
    question: 'Which 1993 Disney movie features three witches who return from the dead and cause havoc on Halloween night?',
    answers : [
        {text: 'The Witches of Eastwick', correct: false},
        {text: 'The Nightmare Before Christmas', correct: true},
        {text: 'Hocus Pocus', correct: true},
    ],
    points: 2,
   },
   {
    question: 'Which classic monster is commonly associated with silver bullets as a means of defeating it?',
    answers : [
        {text: 'Mummy', correct: false},
        {text: 'Werewolf', correct: true},
        {text: 'Zombie', correct: false},
    ],
    points: 2,
   },
   {
    question: 'In Mexican culture, what holiday is celebrated from October 31st to November 2nd to honor deceased loved ones?',
    answers : [
        {text: 'Day of the Dead', correct: true},
        {text: 'Halloween', correct: false},
        {text: "All Saint's Day", correct: false},
    ],
    points: 2,
   },
   {
    question: 'Which famous magician and escape artists died on Halloween 1926?',
    answers : [
        {text: 'Copperfield', correct: false},
        {text: 'Blaine', correct: false},
        {text: 'Houdini', correct: true},
    ],
    points: 2,
   },
   {
    question: 'Which classic horror novel features a scientist who creates a serum to transform into a monstrous, evil alter ego?',
    answers : [
        {text: 'Frankenstein', correct: false},
        {text: 'Dr. Jekyll and Mr. Hyde', correct: true},
        {text: 'Dracula', correct: false},
    ],
    points: 2,
   },
   {
    question: 'What Halloween tradition involves creating a decorative arrangement of cornstalks, gourds, and pumpkins?',
    answers : [
        {text: 'Apple bobbing', correct: false},
        {text: 'Pumpkin carving', correct: false},
        {text: 'Harvest display', correct: true},
    ],
    points: 2,
   },
   {
    question: "What is the name of the fictional hotel in Stephen King's 'The Shining,' known for its supernatural occurrences?",
    answers : [
        {text: 'Overlook Hotel', correct: true},
        {text: 'The Shady Rest Inn', correct: false},
        {text: 'Bates Motel', correct: false},
    ],
    points: 2,
   },
   {
    question: 'In the "Nightmare on Elm Street" film series, who is the villain who haunts teenagers in their dreams?',
    answers : [
        {text: 'Leatherface', correct: false},
        {text: 'Freddy Krueger', correct: true},
        {text: 'Michael Myers', correct: false},
    ],
    points: 2,
   },
   {
    question: "In Bram Stoker's 'Dracula,' what is the primary weakness of vampires?",
    answers : [
        {text: 'Silver bullets', correct: false},
        {text: 'Sunlight', correct: false},
        {text: 'Garlic', correct: true},
    ],
    points: 2,
   },
   {
    question: 'What is the name of the famous masked killer in the "Halloween" movie series?',
    answers : [
        {text: 'Jason Voorhees', correct: false},
        {text: 'Michael Myers', correct: true},
        {text: 'Freddy Kreuger', correct: false},
    ],
    points: 2,
   },
   // Hard Questions
   {
    question: 'What is the name of the ancient Celtic festival that is believed to have inspired Halloween?',
    answers : [
        {text: 'Beltane', correct: false},
        {text: 'Samhain', correct: true},
        {text: 'Yule', correct: false},
    ],
    points: 3,
   },
   {
    question: 'Which author wrote the short story "The Tell-Tale Heart," known for its eerie depiction of guilt and paranoia?',
    answers : [
        {text: 'Edgar Allan Poe', correct: true},
        {text: 'H.P. Lovecraft', correct: false},
        {text: 'Shirley Jackson', correct: false},
    ],
    points: 3,
   },
   {
    question: 'What is the term for the practice of dressing up in costumes to mimic the appearance of the deceased during Halloween?',
    answers : [
        {text: 'Ghosting', correct: false},
        {text: 'Cosplay', correct: false},
        {text: 'Mummery', correct: true},
    ],
    points: 3,
   },
   {
    question: 'What is the name of the spectral ship commanded by the fictional pirate Captain Davy Jones?',
    answers : [
        {text: 'The Flying Dutchman', correct: true},
        {text: 'The Jolly Roger', correct: false},
        {text: 'The Black Pearl', correct: false},
    ],
    points: 3,
   },
   {
    question: 'In the legend of the Headless Horseman, what is the name of the character who encounters the ghostly rider?',
    answers : [
        {text: 'Rip Van Winkle', correct: false},
        {text: 'Ichabod Crane', correct: true},
        {text: 'Brom Bones', correct: false},
    ],
    points: 3,
   },
   {
    question: 'What is the name of the protagonist in the film "The Sixth Sense," who can see and communicate with the dead?',
    answers : [
        {text: 'Norman Bates', correct: false},
        {text: 'Danny Torrance', correct: false},
        {text: 'Cole Sear', correct: true},
    ],
    points: 3,
   },
   {
    question: "In the classic 1931 film 'Frankenstein' who portrayed the iconic character of Dr. Frankenstein's monster?",
    answers : [
        {text: 'Boris Karloff', correct: true},
        {text: 'Bela Lugosi', correct: false},
        {text: 'Lon Chaney', correct: false},
    ],
    points: 3,
   },
   {
    question: 'What is the name of the legendary Scottish castle that is believed to be haunted by a ghostly piper and a headless drummer?',
    answers : [
        {text: 'Balmoral Castle', correct: false},
        {text: 'Glamis Castle', correct: true},
        {text: 'Edinburgh Castle', correct: false},
    ],
    points: 3,
   },
   {
    question: "In Bram Stoker's 'Dracula,' who is the first character to be turned into a vampire by Count Dracula?",
    answers : [
        {text: 'Jonathan Harker', correct: false},
        {text: 'Mina Harker', correct: false},
        {text: 'Lucy Westenra', correct: true},
    ],
    points: 3,
   },
   {
    question: "What is the name of the vengeful spirit in Japanese folklore known for crawling out of the television in the horror film 'Ringu' and its American adaptation, 'The Ring'?",
    answers : [
        {text: 'Kayako Saeki', correct: false},
        {text: 'Sadako Yamamura', correct: true},
        {text: 'Samara Morgan', correct: false},
    ],
    points: 3,
   },
   {
    question: 'What is the title of the 1974 horror film, based on a novel by Stephen King, that features a telekinetic teenage girl with psychic abilities?',
    answers : [
        {text: 'Carrie', correct: true},
        {text: 'The Shining', correct: false},
        {text: 'The Omen', correct: false},
    ],
    points: 3,
   },
   {
    question: 'In the classic short story "The Tell-Tale Heart" by Edgar Allan Poe, what causes the narrator to confess his crime to the police?',
    answers : [
        {text: 'The relentless sound of a heartbeat', correct: true},
        {text: 'The presence of a ghostly figure', correct: false},
        {text: 'A sudden bout of remorse', correct: false},
    ],
    points: 3,
   },
]