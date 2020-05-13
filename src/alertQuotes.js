const all = [
  {
    unit: "Adept",
    create: "Faith before fear.",
    delete: "May your death be swift.",
  },
  {
    unit: "Adept",
    create: "It shall be done.",
    delete: "Spare none who oppose us.",
  },
  {
    unit: "Archon",
    create: "It will be.",
    delete: "Destroy, Annihilate, Obliterate",
  },
  {
    unit: "Archon",
    create: "The merging is complete.",
    delete: "Mok tar'idan",
  },
  {
    unit: "Carrier",
    create: "To victory!",
    delete: "The end has come!",
  },
  {
    unit: "Dark Templar",
    create: "By the Void",
    delete: "The void claims its own.",
  },
  {
    unit: "Disruptor",
    create: "Obedience",
    delete: "Speak and be heard.",
  },
  {
    unit: "High Templar",
    create: "In unity, there is strength",
    delete: "The true enemy is dishonor",
  },
  {
    unit: "High Templar",
    create: "I will comply",
    delete: "Duty is my shield",
  },
  {
    unit: "Immortal",
    create: "We march to victory.",
    delete: "Glory is eternal.",
  },
  {
    unit: "Mothership",
    create: "As all are one",
    delete: "Target confirmed.",
  },
  {
    unit: "Phoenix",
    create:
      "We push ourselves to the end, and when we reach it, we push farther! So I guess that's not really the end...is it?",
    delete: "None shall escape.",
  },
  {
    unit: "Stalker",
    create: "I serve... for now.",
    delete: "Now you see me. Now you don't! (pause) Oh wait, here I am...",
  },
  {
    unit: "Stalker",
    create: "We move unseen.",
    delete: "The Void hungers",
  },
  {
    unit: "Stalker",
    create: "I am one with the darkness!",
    delete: "Death comes to all",
  },
  {
    unit: "Void Ray",
    create: "Infinity burns around us.",
    delete: "For Aiur!",
  },
  {
    unit: "Oracle",
    create:
      "Sparta must not go to war during Carnea...oh, sorry, a little late on that one.",
    delete: "Hold on, I broke a string.",
  },
  {
    unit: "Tempest",
    create: "We are the spear of justice",
    delete: "Strike without warning.",
  },
  {
    unit: "Zealot",
    create: "Victory is the only truth that matters!",
    delete: "It is said that ignorance is bliss. Tell me, is that true?",
  },
  {
    unit: "Banshee",
    create: "Roger that.",
    delete: "This could get messy!",
  },
  {
    unit: "Banshee",
    create: "Done and done!",
    delete: "They ain't gettin' far.",
  },
  {
    unit: "Battlecruiser",
    create: "What's with all these blinky lights?",
    delete: "I'm seeing double! Shoot them both!",
  },
  {
    unit: "Cyclone",
    create:
      "It's a cyclone, not a cyclops, alright? I don't care that it has one eye!",
    delete: "And... here... we... go.",
  },
  {
    unit: "Ghost",
    create: "Sounds like a plan.",
    delete: "Now that's an ass-whooping.",
  },
  {
    unit: "Ghost",
    create:
      "Today's forecast is...extra bomby, slight chance of mushroom clouds.",
    delete: "All too easy.",
  },
  {
    unit: "Ghost",
    create:
      "Whenever I see a world untouched by war, a world of innocence, a world of lush forests and clear rivers. (pause) I really just wanna nuke the crap out of it!",
    delete: "You have something on your face. (gunshot) Got it.",
  },
  {
    unit: "Hellbat",
    create: "Fuck the tires, let's light some fires.",
    delete: "Let's give 'em hell.",
  },
  {
    unit: "Hellion",
    create: "Are you ready for this?",
    delete: "Put THAT in your tailpipe and smoke it!",
  },
  {
    unit: "Liberator",
    create:
      'This vehicle is top of the line you know. The pinnacle of terran engineering." (beeping sound). "Ignore that. I don\'t know what that is.',
    delete: "Unleash hell.",
  },
  {
    unit: "Liberator",
    create:
      "Here's freedom! And here's some freedom for you! Mamma's got a whole lot of freedom!",
    delete: "Target confirmed.",
  },
  {
    unit: "Marauder",
    create: "Ohhh, it's on.",
    delete: "Blow them all to hell!",
  },
  {
    unit: "Marauder",
    create: "It's about to get heavy.",
    delete: "Say goodnight!",
  },
  {
    unit: "Marauder",
    create: "Actually, that IS a grenade in my pants.",
    delete: "Sucks to be you!",
  },
  {
    unit: "Marine",
    create: "You want a piece of me, boy?",
    delete: "Die die die!",
  },
  {
    unit: "Marine",
    create: "Armed and ready!",
    delete: "How do you take a leak in this damn suit?",
  },
  {
    unit: "Marine",
    create: "Keep your shirt on, Sparky.",
    delete: "You ever notice that nobody ever comes back to the barracks?",
  },
  {
    unit: "Medivac",
    create: "Welcome to the Flying Meat Wagon.",
    delete: "Oh suck it up! You act like you got BOTH arms blown off!",
  },
  {
    unit: "Reaper",
    create: "These jets are burning my ass!",
    delete: "You can't get it cheaper, call the reaper.",
  },
  {
    unit: "SCV",
    create: "Woo hoo! Overtime!",
    delete: "It's your dime...",
  },
  {
    unit: "SCV",
    create: "You're da boss.",
    delete: "Well, butter my biscuit!",
  },
  {
    unit: "Siege Tank",
    create: "I'll give it my best shot!",
    delete: "I don't have to shoot ya. I can just run you over!",
  },
  {
    unit: "Thor",
    create: "Watch this.",
    delete: "Dropping the hammer.",
  },
  {
    unit: "Queen of Blades",
    create: "The evolution continues.",
    delete: "The Swarm will consume all.",
  },
  {
    unit: "Queen of Blades",
    create: "The Swarm never rests.",
    delete: '(sigh) "So many worlds to conquer. So little time.',
  },
  {
    unit: "",
    create: "",
    delete: "",
  },
  {
    unit: "Tyrion Lannister",
    create:
      "Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness.",
    delete: "",
  },
  {
    unit: "House Stark",
    create: "Winter is Coming",
    delete: "",
  },
  {
    unit: "Ygritte",
    create: "",
    delete: "You know Nothing",
  },
  {
    unit: "Bran and Ned Stark",
    create:
      "Bran thought about it. “Can a man be brave if he’s afraid?’ “That’s the only time he can be brave,” his father told him.",
    delete: "",
  },
  {
    unit: "Arya Stark",
    create: "",
    delete: "Fear cuts deeper than swords.",
  },
  {
    unit: "Tywin Lannister",
    create: "",
    delete: "“A lion doesn’t concern himself with the opinions of a sheep.”",
  },
  {
    unit: "Cersei Lannister",
    create: "",
    delete: "“When you play the game of thrones, you win or you die.”",
  },
  {
    unit: "House Lannister",
    create: "“A Lannister always pays his debts.”",
    delete: "",
  },
  {
    unit: "-",
    create: "",
    delete: "Valar Morgulis",
  },
  {
    unit: "Melisandre",
    create: "",
    delete: "“The night is dark and full of terrors”",
  },
  {
    unit: "Varys",
    create:
      "Power resides where men believe it resides. It’s a trick, a shadow on the wall. And, a very small man can cast a very large shadow.",
    delete: "",
  },
  {
    unit: "Lady Galadriel",
    create: "Even the smallest person can change the course of history.",
    delete: "",
  },
  {
    unit: "Gandalf",
    create:
      "Many that live deserve death. And some that die deserve life. Can you give it to them? Then do not be eager to deal out death in judgement. For even the very wise cannot see all ends.",
    delete: "",
  },
  {
    unit: "Gimli",
    create: "",
    delete: "Faithless is he that says farewell when the road darkens.",
  },
  {
    unit: "Jared Vennet",
    create: "Im Jacked to the tits!",
    delete: "",
  },
  {
    unit: "V",
    create:
      "Beneath this mask there is more than flesh, Beneath this mask there is an idea, Mr. Creedy, and ideas are bulletproof.",
    delete:
      "“You wear a mask for so long, you forget who you were beneath it.”",
  },
  {
    unit: "Agent Smith",
    create:
      "You hear that Mr. Anderson?... That is the sound of inevitability.",
    delete: "Goodbye, Mr. Anderson",
  },
  {
    unit: "Morty",
    create: "",
    delete:
      "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
  },
  {
    unit: "Rick",
    create: "Weddings are basically funerals with cake.",
    delete: "",
  },
];

const cquotes = all
  .map((e) => {
    return { unit: e.unit, quote: e.create };
  })
  .filter((e) => e.quote.length > 0);
const dquotes = all
  .map((e) => {
    return { unit: e.unit, quote: e.delete };
  })
  .filter((e) => e.quote.length > 0);
export { cquotes };
export { dquotes };
