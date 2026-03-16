// avatarData.js
// Each resident now has a personality type and advanced responses

RESIDENTS.forEach(r => {
  r.personality = ['friendly', 'suspicious', 'secretive', 'gossipy'][Math.floor(Math.random()*4)];
  r.memory = {}; // Tracks previous questions asked
});

// Response categories with dozens of options
const RESPONSE_TEMPLATES = {
  greetings: [
    "Hi there! How are you?",
    "Hello! I’m glad to see someone new around.",
    "Hey! You must be new in town.",
    "Greetings! I'm {name}.",
    "Oh, hi! Didn't expect visitors today.",
    "Hello, stranger. Careful around here."
  ],
  job: [
    "I work as {backstoryJob}.",
    "Oh, my backstory? {backstoryFull}",
    "You want to know about me? {backstoryFull}",
    "I spend my days {backstoryJob}.",
    "That's a long story, but basically {backstoryFull}."
  ],
  murder: [
    "I didn't see anything suspicious... or did I?",
    "Murder? I wouldn’t know anything about that.",
    "I heard rumors, but you didn’t hear it from me.",
    "I’m not saying anything about that, detective.",
    "Something happened last night… but I shouldn't say."
  ],
  hobbies: [
    "I love reading and walking around town.",
    "I enjoy baking and tasting pastries.",
    "I keep mostly to myself, but I like gardening.",
    "Music is my escape. What about you?",
    "I enjoy puzzles and solving riddles."
  ],
  gossip: [
    "I saw Ben sneaking around late last night.",
    "Clara has been asking a lot of questions recently.",
    "Alice has been acting strangely.",
    "I’m not sure what’s going on, but something is off.",
    "You didn’t hear it from me, but there’s tension in town."
  ],
  unknown: [
    "Huh.",
    "I don’t understand.",
    "Could you repeat that?",
    "I’m not sure what you mean."
  ]
};

// Dynamic dialogue generator
function getDialogueAdvanced(resident, playerInput) {
  playerInput = playerInput.toLowerCase();
  const name = resident.name;
  const backstoryJob = resident.backstory.split('.')[0].toLowerCase();
  const backstoryFull = resident.backstory;

  // Track repeated questions
  if (!resident.memory[playerInput]) resident.memory[playerInput] = 0;
  resident.memory[playerInput]++;

  function randomResponse(list){
    return list[Math.floor(Math.random()*list.length)]
      .replace("{name}", name)
      .replace("{backstoryJob}", backstoryJob)
      .replace("{backstoryFull}", backstoryFull);
  }

  // Keyword-based triggers
  if(playerInput.match(/hello|hi|hey|who are you/)) {
    return randomResponse(RESPONSE_TEMPLATES.greetings);
  }
  if(playerInput.match(/job|work|backstory|story/)) {
    return randomResponse(RESPONSE_TEMPLATES.job);
  }
  if(playerInput.match(/murder|kill|crime/)) {
    if(resident.personality === 'secretive' && resident.memory[playerInput] === 1){
      return "I might know something, but I can't tell you everything yet.";
    }
    if(resident.personality === 'suspicious') return randomResponse(RESPONSE_TEMPLATES.murder);
    if(resident.personality === 'friendly') return "I hope we can solve this together!";
    return randomResponse(RESPONSE_TEMPLATES.murder);
  }
  if(playerInput.match(/hobby|like|favorite|personal/)) {
    return randomResponse(RESPONSE_TEMPLATES.hobbies);
  }
  if(playerInput.match(/gossip|rumor|town|resident/)) {
    if(resident.personality === 'gossipy') return randomResponse(RESPONSE_TEMPLATES.gossip);
    return "I don't like talking about others.";
  }

  return randomResponse(RESPONSE_TEMPLATES.unknown);
}

// Example test
// console.log(getDialogueAdvanced(RESIDENTS[0], "hello, who are you?"));
// console.log(getDialogueAdvanced(RESIDENTS[1], "what is your job?"));
// console.log(getDialogueAdvanced(RESIDENTS[2], "did you see the murder?"));
// console.log(getDialogueAdvanced(RESIDENTS[3], "tell me a town gossip"));