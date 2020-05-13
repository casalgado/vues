const all = [
  {
    unit: "-",
    create: "",
    delete: "Valar Morgulis",
  },
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
    unit: "Adept",
    create: "Forward.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "It shall be done.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "Let none deter us.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "Por zalah.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "The Templar march.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "To glory.",
    delete: "",
  },
  {
    unit: "Adept",
    create: "We are of one mind.",
    delete: "",
  },
  {
    unit: "Agent Smith",
    create:
      "You hear that Mr. Anderson?... That is the sound of inevitability.",
    delete: "Goodbye, Mr. Anderson",
  },
  {
    unit: "Archon",
    create: "It will be.",
    delete: "Destroy, Annihilate, Obliterate",
  },
  {
    unit: "Archon",
    create: "It will be.",
    delete: "",
  },
  {
    unit: "Archon",
    create: "The merging is complete.",
    delete: "Mok tar'idan",
  },
  {
    unit: "Arya Stark",
    create: "",
    delete: "Fear cuts deeper than swords.",
  },
  {
    unit: "Banshee",
    create: "Done and done!",
    delete: "They ain't gettin' far.",
  },
  {
    unit: "Banshee",
    create: "Roger that.",
    delete: "This could get messy!",
  },
  {
    unit: "Battlecruiser",
    create: "What's with all these blinky lights?",
    delete: "I'm seeing double! Shoot them both!",
  },
  {
    unit: "Battlecruiser",
    create: "Acknowledged.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Course laid in.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "En route!",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Engage.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "I'm on it.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Okay.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Roger!",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Squadron en route.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Take it slow.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Whatever that means...",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Will do.",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Yes commander...",
    delete: "",
  },
  {
    unit: "Battlecruiser",
    create: "Yes sir.",
    delete: "",
  },
  {
    unit: "Bran and Ned Stark",
    create:
      "Bran thought about it. “Can a man be brave if he’s afraid?’ “That’s the only time he can be brave,” his father told him.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "To victory!",
    delete: "The end has come!",
  },
  {
    unit: "Carrier",
    create: "Agreed.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "Justice is served!",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "Na hazuum.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "Prepare to engage.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "The battle is won.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "The Khala is served!",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "The time is now.",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "To victory!",
    delete: "",
  },
  {
    unit: "Carrier",
    create: "Zhara ku'nuul.",
    delete: "",
  },
  {
    unit: "Cersei Lannister",
    create: "",
    delete: "“When you play the game of thrones, you win or you die.”",
  },
  {
    unit: "Cyclone",
    create: "Adjusting for new coordinates.",
    delete: "",
  },
  {
    unit: "Cyclone",
    create: "Cyclone en route.",
    delete: "",
  },
  {
    unit: "Cyclone",
    create: "I getcha.",
    delete: "",
  },
  {
    unit: "Cyclone",
    create: "In gear.",
    delete: "",
  },
  {
    unit: "Cyclone",
    create:
      "It's a cyclone, not a cyclops, alright? I don't care that it has one eye!",
    delete: "And... here... we... go.",
  },
  {
    unit: "Cyclone",
    create: "Moving into position.",
    delete: "",
  },
  {
    unit: "Cyclone",
    create: "Nothing will stop me!",
    delete: "",
  },
  {
    unit: "Cyclone",
    create: "Oh, i'll get there.",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "*ghostly moan*",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "As you say...",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "Energy... Need energy!",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "Oblivion awaits...",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "The Void burns...",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "We move...",
    delete: "",
  },
  {
    unit: "Dark Archon",
    create: "Will go...",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "By the Void",
    delete: "The void claims its own.",
  },
  {
    unit: "Dark Templar",
    create: "By the Void.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "Clever.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "I am but a phantom.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "I am intrigued.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "I am the blade of Shakuras.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "I am the blade of the Nerazim",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "I will comply.",
    delete: "",
  },
  {
    unit: "Dark Templar",
    create: "Khatum",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "Obedience",
    delete: "Speak and be heard.",
  },
  {
    unit: "Disruptor",
    create: "Darai de khassar.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "Eternal service.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "I comprehend.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "It is known.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "Obedience.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "So be it.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "Veritably.",
    delete: "",
  },
  {
    unit: "Disruptor",
    create: "With honor.",
    delete: "",
  },
  {
    unit: "Gandalf",
    create:
      "Many that live deserve death. And some that die deserve life. Can you give it to them? Then do not be eager to deal out death in judgement. For even the very wise cannot see all ends.",
    delete: "",
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
    unit: "Ghost",
    create: "Confirmed.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Copy that...",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Deploying...",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "I'm on it.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Nothing to it.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Okay...",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Roger.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Sounds like a plan.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "Will do.",
    delete: "",
  },
  {
    unit: "Ghost",
    create: "You're on.",
    delete: "",
  },
  {
    unit: "Gimli",
    create: "",
    delete: "Faithless is he that says farewell when the road darkens.",
  },
  {
    unit: "Hellbat",
    create: "Fuck the tires, let's light some fires.",
    delete: "Let's give 'em hell.",
  },
  {
    unit: "Hellbat",
    create: "Can't wait.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "Done and done.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "Hell yeah.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "Here we go.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "Hot footin' it out there.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "In motion.",
    delete: "",
  },
  {
    unit: "Hellbat",
    create: "Word.",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Absolutely!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "All day long!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Are you ready for this?",
    delete: "Put THAT in your tailpipe and smoke it!",
  },
  {
    unit: "Hellion",
    create: "Burnin' rubber!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "HELL yeah!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "I'm goin' in!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Is that it?",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Let's do this!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Pedal to the metal!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Right on!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Sound's sweet!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Sssmokin'!",
    delete: "",
  },
  {
    unit: "Hellion",
    create: "Word...",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "I will comply",
    delete: "Duty is my shield",
  },
  {
    unit: "High Templar",
    create: "In unity, there is strength",
    delete: "The true enemy is dishonor",
  },
  {
    unit: "High Templar",
    create: "En Taro Tassadar.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "I heed the call.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "I will comply.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "In unity, there is strength.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "O'lak natahl.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "Thus I serve.",
    delete: "",
  },
  {
    unit: "High Templar",
    create: "We are unanimous.",
    delete: "",
  },
  {
    unit: "House Lannister",
    create: "“A Lannister always pays his debts.”",
    delete: "",
  },
  {
    unit: "House Stark",
    create: "Winter is Coming",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "We march to victory.",
    delete: "Glory is eternal.",
  },
  {
    unit: "Immortal",
    create: "Ik sha'bi.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "It is destined.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "Khala dora.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "Our cannons shall sing.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "Por zalah.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "There shall be a reckoning.",
    delete: "",
  },
  {
    unit: "Immortal",
    create: "We march to victory.",
    delete: "",
  },
  {
    unit: "Jared Vennet",
    create: "Im Jacked to the tits!",
    delete: "",
  },
  {
    unit: "Lady Galadriel",
    create: "Even the smallest person can change the course of history.",
    delete: "",
  },
  {
    unit: "Liberator",
    create:
      "Here's freedom! And here's some freedom for you! Mamma's got a whole lot of freedom!",
    delete: "Target confirmed.",
  },
  {
    unit: "Liberator",
    create:
      'This vehicle is top of the line you know. The pinnacle of terran engineering." (beeping sound). "Ignore that. I don\'t know what that is.',
    delete: "Unleash hell.",
  },
  {
    unit: "Liberator",
    create: "As you say.",
    delete: "",
  },
  {
    unit: "Liberator",
    create: "Course set.",
    delete: "",
  },
  {
    unit: "Liberator",
    create: "Easy.",
    delete: "",
  },
  {
    unit: "Liberator",
    create: "Full speed.",
    delete: "",
  },
  {
    unit: "Liberator",
    create: "Initiating.",
    delete: "",
  },
  {
    unit: "Liberator",
    create: "Of course.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Actually, that IS a grenade in my pants.",
    delete: "Sucks to be you!",
  },
  {
    unit: "Marauder",
    create: "It's about to get heavy.",
    delete: "Say goodnight!",
  },
  {
    unit: "Marauder",
    create: "Ohhh, it's on.",
    delete: "Blow them all to hell!",
  },
  {
    unit: "Marauder",
    create: "Believe it.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "First round's on me.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Got it.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "I'm all about that.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "It's about to get heavy.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "It's go time.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Let's do this.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Of course.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Ohhh, it's on.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Sure thing.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Sure.",
    delete: "",
  },
  {
    unit: "Marauder",
    create: "Why not?",
    delete: "",
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
    unit: "Marine",
    create: "You want a piece of me, boy?",
    delete: "Die die die!",
  },
  {
    unit: "Marine",
    create: "Affirmative.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Aye aye, sir!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Boo ya!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Can do.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Confirmed.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Done and done!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Engaging.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Fine...",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Gangway, comin' through!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Go go go!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Got it.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "I feel ya.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "I got this!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "I'm on it!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "In bound!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Keep your shirt on, Sparky.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Lookin' forward to it.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "No problem!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Of course!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Orders received.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Outstanding!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Right.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Roger that!",
    delete: "",
  },
  {
    unit: "",
    create: "",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Sure thing!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Sure!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Ten-four.",
    delete: "",
  },
  {
    unit: "",
    create: "",
    delete: "",
  },
  {
    unit: "Marine",
    create: "That's fine.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Turbines to full.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Weapons hot!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Why not?",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Will do.",
    delete: "",
  },
  {
    unit: "Marine",
    create: "Yes sir!",
    delete: "",
  },
  {
    unit: "Marine",
    create: "You got it!",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Welcome to the Flying Meat Wagon.",
    delete: "Oh suck it up! You act like you got BOTH arms blown off!",
  },
  {
    unit: "Medivac",
    create: "Acknowledged.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Confirmed.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "ETA. One minute.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Heading out.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "I heard that.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "In bound.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "In the pipe, five by five.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Let's go.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Loud and clear.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "On my way.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Understood.",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Well hallelujah!",
    delete: "",
  },
  {
    unit: "Medivac",
    create: "Will do, command.",
    delete: "",
  },
  {
    unit: "Melisandre",
    create: "",
    delete: "“The night is dark and full of terrors”",
  },
  {
    unit: "Morty",
    create: "",
    delete:
      "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
  },
  {
    unit: "Mothership",
    create: "As all are one",
    delete: "Target confirmed.",
  },
  {
    unit: "Mothership",
    create: "By the heart of Aiur.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "Directive confirmed.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "Downloading orders.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "Endi beruki.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "Rono hashiik.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "We agree.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "We proceed.",
    delete: "",
  },
  {
    unit: "Mothership",
    create: "With purpose.",
    delete: "",
  },
  {
    unit: "Oracle",
    create:
      "Sparta must not go to war during Carnea...oh, sorry, a little late on that one.",
    delete: "Hold on, I broke a string.",
  },
  {
    unit: "Oracle",
    create: "Extrapolating strings.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "Harmonized.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "I see.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "It is destined.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "Na zuktai.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "Our fates are one.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "The stars align.",
    delete: "",
  },
  {
    unit: "Oracle",
    create: "We interpret.",
    delete: "",
  },
  {
    unit: "Phoenix",
    create:
      "We push ourselves to the end, and when we reach it, we push farther! So I guess that's not really the end...is it?",
    delete: "None shall escape.",
  },
  {
    unit: "Phoenix",
    create: "For honor!",
    delete: "",
  },
  {
    unit: "Phoenix",
    create: "I will comply.",
    delete: "",
  },
  {
    unit: "Phoenix",
    create: "I will stalk through the stars.",
    delete: "",
  },
  {
    unit: "Phoenix",
    create: "Na ferash.",
    delete: "",
  },
  {
    unit: "Phoenix",
    create: "On the wings of justice!",
    delete: "None shall escape.",
  },
  {
    unit: "Phoenix",
    create: "Sha'zu du templari!",
    delete: "",
  },
  {
    unit: "Phoenix",
    create: "Understood.",
    delete: "",
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
    unit: "Raven",
    create: "Command authority registered.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Commencing.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Immediately.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Job confirmed.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Order accepted.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Order acknowledged.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Right away.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Systems primed.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "This vessel will comply.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Under way.",
    delete: "",
  },
  {
    unit: "Raven",
    create: "Understood.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "These jets are burning my ass!",
    delete: "You can't get it cheaper, call the reaper.",
  },
  {
    unit: "Reaper",
    create: "Agreed.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "All right.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Done.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Fair enough.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "I'm goin'! I'm goin'!",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Let's do this!",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Nothing I can't handle.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Oh yeah, baby!",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Oh, that's all?",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "On the way.",
    delete: "",
  },
  {
    unit: "Reaper",
    create: "Yes, indeed.",
    delete: "",
  },
  {
    unit: "Rick",
    create: "Weddings are basically funerals with cake.",
    delete: "",
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
    unit: "SCV",
    create: "Gotcha.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "I'm goin'!",
    delete: "",
  },
  {
    unit: "SCV",
    create: "It's your dime...",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Move it!",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Roger.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Uh-huh...",
    delete: "",
  },
  {
    unit: "SCV",
    create: "We hear ya.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Well, butter my biscuit!",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Will do.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Woo hoo! Overtime!",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yeah whatever.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yeah, yeah.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yeah.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yep.",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yessir!",
    delete: "",
  },
  {
    unit: "SCV",
    create: "Yo...",
    delete: "",
  },
  {
    unit: "SCV",
    create: "You're da boss.",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "I'll give it my best shot!",
    delete: "I don't have to shoot ya. I can just run you over!",
  },
  {
    unit: "Siege Tank",
    create: "Ab-Sol-Lutely!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Af-fir-ma-tive!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Can do!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Definitely.",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Heavy metal.",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "I never tread lightly...",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "I'll give it my best shot!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "It's on me!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Let's roll!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Move it!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Oh, IT'S ON!!!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "On my way!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Rock and roll!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Rock on!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Rollin' out!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Rollin'!",
    delete: "",
  },
  {
    unit: "Siege Tank",
    create: "Yessir!",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "I AM ONE with the darkness!",
    delete: "Death comes to all",
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
    create: "For the reckoning!",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "I serve... for now.",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "Intriguing...",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "It shall be as you say.",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "Veraku.",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "Very well.",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "Very wise.",
    delete: "",
  },
  {
    unit: "Stalker",
    create: "We move unseen.",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "We are the spear of justice",
    delete: "Strike without warning.",
  },
  {
    unit: "Tempest",
    create: "A storm is brewing.",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "Confirmed.",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "For glory!",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "Forward to victory.",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "Kinetic matrix charged.",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "Por zalah!",
    delete: "",
  },
  {
    unit: "Tempest",
    create: "Throw fate to the winds.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Watch this.",
    delete: "Dropping the hammer.",
  },
  {
    unit: "Thor",
    create: "All over it.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Can do.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "I'll be back.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Let's go!",
    delete: "",
  },
  {
    unit: "Thor",
    create: "No problem.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Now, now, now!",
    delete: "",
  },
  {
    unit: "Thor",
    create: "OK, baby.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Right!",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Stick around.",
    delete: "",
  },
  {
    unit: "Thor",
    create: "Watch this.",
    delete: "",
  },
  {
    unit: "Tyrion Lannister",
    create:
      "Never forget what you are, for surely the world will not. Make it your strength. Then it can never be your weakness.",
    delete: "",
  },
  {
    unit: "Tywin Lannister",
    create: "",
    delete: "“A lion doesn’t concern himself with the opinions of a sheep.”",
  },
  {
    unit: "V",
    create:
      "Beneath this mask there is more than flesh, Beneath this mask there is an idea, Mr. Creedy, and ideas are bulletproof.",
    delete:
      "“You wear a mask for so long, you forget who you were beneath it.”",
  },
  {
    unit: "Varys",
    create:
      "Power resides where men believe it resides. It’s a trick, a shadow on the wall. And, a very small man can cast a very large shadow.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Agreed.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Alright.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Bold...",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Certainly.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Haha!",
    delete: "",
  },
  {
    unit: "Viking",
    create: "I like it.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Inbound.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "No one lives forever.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Very well.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Victory.",
    delete: "",
  },
  {
    unit: "Viking",
    create: "Yes indeed.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Infinity burns around us.",
    delete: "For Aiur!",
  },
  {
    unit: "Void Ray",
    create: "Andakur herak.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Annihilation commencing.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Calibrating void lenses.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Ik kudar anai.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "It shall be done.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Khas ara'shar.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Processed.",
    delete: "",
  },
  {
    unit: "Void Ray",
    create: "Systems at full.",
    delete: "",
  },
  {
    unit: "Ygritte",
    create: "",
    delete: "You know Nothing",
  },
  {
    unit: "Zealot",
    create: "Victory is the only truth that matters!",
    delete: "It is said that ignorance is bliss. Tell me, is that true?",
  },
  {
    unit: "Zealot",
    create: "By your will!",
    delete: "",
  },
  {
    unit: "Zealot",
    create: "En Taro Tassadar!",
    delete: "",
  },
  {
    unit: "Zealot",
    create: "For Artanis!",
    delete: "",
  },
  {
    unit: "Zealot",
    create: "Honor guide me!",
    delete: "",
  },
  {
    unit: "Zealot",
    create: "Khassar de templari!",
    delete: "",
  },
  {
    unit: "Zealot",
    create: "Ul'as addari!",
    delete: "",
  },
  {
    unit: "- SC2 Trivia",
    create:
      "If you click a sc2 SCV enough times he’ll tell you about his cousin Lester that once saw a zergling. This is a reference to a cinematic from the first starcraft game.",
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
