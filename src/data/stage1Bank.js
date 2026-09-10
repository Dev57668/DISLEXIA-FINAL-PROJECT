/* =========================================================
   STAGE 1 QUESTION BANK — CLASS 1 TO 5
   Visual Recognition
   5 Classes × 3 Levels (Easy, Medium, Hard) × 9 Questions = 135 Questions
   ========================================================= */

const makeVisualLevel = (
  levelId,
  title,
  difficulty,
  items,
  questionText,
  description
) => {
  return {
    id: levelId,
    level: levelId,
    title,
    difficulty,
    description,
    exercises: items.map((item, index) => ({
      id: `l${levelId}q${index + 1}`,
      type: "visual",
      question: item.question || questionText,
      visual: item.visual,
      options: item.options || [],
      answer: item.answer,
    })),
  };
};

export const CLASS_STAGE1_BANK = {
  1: [
    makeVisualLevel(
      1,
      "LEVEL 1 — EASY",
      "EASY",
      [
        { visual: "A", options: ["A", "B", "C", "D"], answer: "A", question: "Which capital letter is exactly the same? A" },
        { visual: "B", options: ["D", "B", "P", "R"], answer: "B", question: "Which capital letter is exactly the same? B" },
        { visual: "C", options: ["O", "C", "G", "D"], answer: "C", question: "Which capital letter is exactly the same? C" },
        { visual: "D", options: ["B", "D", "P", "Q"], answer: "D", question: "Which capital letter is exactly the same? D" },
        { visual: "E", options: ["F", "E", "L", "I"], answer: "E", question: "Which capital letter is exactly the same? E" },
        { visual: "F", options: ["E", "F", "T", "P"], answer: "F", question: "Which capital letter is exactly the same? F" },
        { visual: "G", options: ["C", "G", "Q", "O"], answer: "G", question: "Which capital letter is exactly the same? G" },
        { visual: "H", options: ["N", "H", "K", "M"], answer: "H", question: "Which capital letter is exactly the same? H" },
        { visual: "I", options: ["I", "L", "T", "J"], answer: "I", question: "Which capital letter is exactly the same? I" },
      ],
      "Which capital letter is exactly the same?",
      "Compare capital letters carefully and find the exact match."
    ),
    makeVisualLevel(
      2,
      "LEVEL 2 — MEDIUM",
      "MEDIUM",
      [
        { visual: "a", options: ["a", "e", "o", "d"], answer: "a", question: "Which lowercase letter matches a?" },
        { visual: "b", options: ["d", "b", "p", "q"], answer: "b", question: "Which lowercase letter matches b?" },
        { visual: "c", options: ["e", "c", "o", "a"], answer: "c", question: "Which lowercase letter matches c?" },
        { visual: "d", options: ["b", "p", "d", "q"], answer: "d", question: "Which lowercase letter matches d?" },
        { visual: "m", options: ["n", "m", "w", "u"], answer: "m", question: "Which lowercase letter matches m?" },
        { visual: "n", options: ["m", "n", "u", "h"], answer: "n", question: "Which lowercase letter matches n?" },
        { visual: "p", options: ["q", "p", "b", "d"], answer: "p", question: "Which lowercase letter matches p?" },
        { visual: "u", options: ["n", "u", "v", "w"], answer: "u", question: "Which lowercase letter matches u?" },
        { visual: "w", options: ["m", "w", "n", "u"], answer: "w", question: "Which lowercase letter matches w?" },
      ],
      "Which lowercase letter matches?",
      "Pay attention to letter direction, ascenders, and descenders."
    ),
    makeVisualLevel(
      3,
      "LEVEL 3 — HARD",
      "HARD",
      [
        { visual: "A a", options: ["A e", "A a", "B a", "a A"], answer: "A a", question: "Match A a" },
        { visual: "B b", options: ["B d", "B b", "D b", "b B"], answer: "B b", question: "Match B b" },
        { visual: "C c", options: ["C e", "c C", "C c", "G c"], answer: "C c", question: "Match C c" },
        { visual: "D d", options: ["B d", "D p", "D d", "d D"], answer: "D d", question: "Match D d" },
        { visual: "M m", options: ["M n", "N m", "M m", "m M"], answer: "M m", question: "Match M m" },
        { visual: "P p", options: ["P q", "P p", "B p", "p P"], answer: "P p", question: "Match P p" },
        { visual: "T t", options: ["T f", "F t", "T t", "t T"], answer: "T t", question: "Match T t" },
        { visual: "S s", options: ["S c", "S s", "C s", "s S"], answer: "S s", question: "Match S s" },
        { visual: "Z z", options: ["Z y", "Z z", "Y z", "z Z"], answer: "Z z", question: "Match Z z" },
      ],
      "Match the capital and small letter pair",
      "Notice both uppercase and lowercase forms together."
    ),
  ],

  2: [
    makeVisualLevel(
      1,
      "LEVEL 1 — EASY",
      "EASY",
      [
        { visual: "sh", options: ["sh", "ch", "th", "ph"], answer: "sh", question: "Match sh" },
        { visual: "ch", options: ["sh", "ch", "th", "wh"], answer: "ch", question: "Match ch" },
        { visual: "th", options: ["ph", "th", "ch", "sh"], answer: "th", question: "Match th" },
        { visual: "ph", options: ["th", "wh", "ph", "ch"], answer: "ph", question: "Match ph" },
        { visual: "bl", options: ["br", "bl", "cl", "gl"], answer: "bl", question: "Match bl" },
        { visual: "br", options: ["bl", "br", "dr", "gr"], answer: "br", question: "Match br" },
        { visual: "st", options: ["sp", "sk", "st", "sn"], answer: "st", question: "Match st" },
        { visual: "tr", options: ["tr", "dr", "pr", "br"], answer: "tr", question: "Match tr" },
        { visual: "cl", options: ["gl", "cl", "fl", "pl"], answer: "cl", question: "Match cl" },
      ],
      "Match the exact blend",
      "Recognize 2-letter phonic blends visually."
    ),
    makeVisualLevel(
      2,
      "LEVEL 2 — MEDIUM",
      "MEDIUM",
      [
        { visual: "play", options: ["play", "paly", "pl ay", "pley"], answer: "play", question: "Which pair is identical? play" },
        { visual: "green", options: ["gren", "green", "grean", "gerne"], answer: "green", question: "Which pair is identical? green" },
        { visual: "black", options: ["balck", "black", "blak", "blackk"], answer: "black", question: "Which pair is identical? black" },
        { visual: "chair", options: ["chari", "chair", "cheir", "ch air"], answer: "chair", question: "Which pair is identical? chair" },
        { visual: "smile", options: ["simle", "smile", "smiel", "smyle"], answer: "smile", question: "Which pair is identical? smile" },
        { visual: "train", options: ["trian", "train", "trean", "trainn"], answer: "train", question: "Which pair is identical? train" },
        { visual: "school", options: ["shcool", "school", "schol", "scoohl"], answer: "school", question: "Which pair is identical? school" },
        { visual: "flower", options: ["flwoer", "flower", "flowar", "flouer"], answer: "flower", question: "Which pair is identical? flower" },
        { visual: "basket", options: ["baskit", "basket", "bakset", "baskett"], answer: "basket", question: "Which pair is identical? basket" },
      ],
      "Which pair is identical?",
      "Identify letter reversals and subtle spacing differences."
    ),
    makeVisualLevel(
      3,
      "LEVEL 3 — HARD",
      "HARD",
      [
        { visual: "school", options: ["school", "schol", "scholl", "schooll"], answer: "school", question: "Which word is exactly the same?" },
        { visual: "friend", options: ["friend", "freind", "frend", "friand"], answer: "friend", question: "Which word is exactly the same?" },
        { visual: "little", options: ["little", "litle", "littel", "litttle"], answer: "little", question: "Which word is exactly the same?" },
        { visual: "garden", options: ["garden", "gardan", "gorden", "gardin"], answer: "garden", question: "Which word is exactly the same?" },
        { visual: "window", options: ["window", "windo", "widnow", "w indow"], answer: "window", question: "Which word is exactly the same?" },
        { visual: "yellow", options: ["yellow", "yelow", "yollow", "yellaw"], answer: "yellow", question: "Which word is exactly the same?" },
        { visual: "morning", options: ["morning", "mornning", "moring", "mornig"], answer: "morning", question: "Which word is exactly the same?" },
        { visual: "teacher", options: ["teacher", "techer", "teachar", "teacheer"], answer: "teacher", question: "Which word is exactly the same?" },
        { visual: "picture", options: ["picture", "pictur", "pikcture", "pictare"], answer: "picture", question: "Which word is exactly the same?" },
      ],
      "Which word is exactly the same?",
      "Spot small variations in longer Class 2 vocabulary."
    ),
  ],

  3: [
    makeVisualLevel(
      1,
      "LEVEL 1 — EASY",
      "EASY",
      [
        { visual: "br", options: ["br", "dr", "gr", "pr"], answer: "br", question: "Match br" },
        { visual: "pl", options: ["pl", "cl", "fl", "bl"], answer: "pl", question: "Match pl" },
        { visual: "str", options: ["str", "spr", "scr", "shr"], answer: "str", question: "Match str" },
        { visual: "ch", options: ["ch", "sh", "tch", "th"], answer: "ch", question: "Match ch" },
        { visual: "tion", options: ["tion", "t ion", "tian", "shon"], answer: "tion", question: "Match tion" },
        { visual: "ight", options: ["ight", "igth", "ihtg", "igt"], answer: "ight", question: "Match ight" },
        { visual: "ou", options: ["ou", "uo", "oi", "oa"], answer: "ou", question: "Match ou" },
        { visual: "ea", options: ["ea", "ae", "ee", "ia"], answer: "ea", question: "Match ea" },
        { visual: "ar", options: ["ar", "ra", "er", "or"], answer: "ar", question: "Match ar" },
      ],
      "Match the phonics pattern",
      "Recognize blends, digraphs, and word endings."
    ),
    makeVisualLevel(
      2,
      "LEVEL 2 — MEDIUM",
      "MEDIUM",
      [
        { visual: "plant", options: ["plant", "palnt", "plnat", "plan t"], answer: "plant", question: "Match plant" },
        { visual: "school", options: ["school", "shcool", "schol", "scoohl"], answer: "school", question: "Match school" },
        { visual: "bright", options: ["bright", "birght", "brigt", "brigth"], answer: "bright", question: "Match bright" },
        { visual: "street", options: ["street", "stree t", "steret", "strete"], answer: "street", question: "Match street" },
        { visual: "picture", options: ["picture", "picutre", "pictur", "pictare"], answer: "picture", question: "Match picture" },
        { visual: "friendship", options: ["friendship", "freindship", "friendhsip", "frendship"], answer: "friendship", question: "Match friendship" },
        { visual: "sunshine", options: ["sunshine", "sunshnie", "sunsine", "sunshene"], answer: "sunshine", question: "Match sunshine" },
        { visual: "birthday", options: ["birthday", "bithday", "birthdy", "birhtday"], answer: "birthday", question: "Match birthday" },
        { visual: "something", options: ["something", "somthing", "somehting", "somethign"], answer: "something", question: "Match something" },
      ],
      "Match the exact word",
      "Identify correct letter ordering in compound and multi-syllable words."
    ),
    makeVisualLevel(
      3,
      "LEVEL 3 — HARD",
      "HARD",
      [
        { visual: "because", options: ["because", "becuase", "becouse", "beacuse"], answer: "because", question: "Which word is exactly the same? because" },
        { visual: "different", options: ["different", "diffrent", "differant", "differnet"], answer: "different", question: "Which word is exactly the same? different" },
        { visual: "important", options: ["important", "importent", "impotant", "impor tant"], answer: "important", question: "Which word is exactly the same? important" },
        { visual: "remember", options: ["remember", "remmember", "remeber", "remembar"], answer: "remember", question: "Which word is exactly the same? remember" },
        { visual: "together", options: ["together", "togther", "togehter", "togethar"], answer: "together", question: "Which word is exactly the same? together" },
        { visual: "beautiful", options: ["beautiful", "beatiful", "beautifull", "beautifil"], answer: "beautiful", question: "Which word is exactly the same? beautiful" },
        { visual: "carefully", options: ["carefully", "careflly", "carefuly", "carfully"], answer: "carefully", question: "Which word is exactly the same? carefully" },
        { visual: "question", options: ["question", "qustion", "quesion", "queston"], answer: "question", question: "Which word is exactly the same? question" },
        { visual: "answer", options: ["answer", "anser", "answar", "anwser"], answer: "answer", question: "Which word is exactly the same? answer" },
      ],
      "Which word is exactly the same?",
      "Carefully scan tricky vowel pairs and letter sequences."
    ),
  ],

  4: [
    makeVisualLevel(
      1,
      "LEVEL 1 — EASY",
      "EASY",
      [
        { visual: "adventure", options: ["adventure", "adventur", "adven ture", "adveture"], answer: "adventure", question: "Which word is exactly the same? adventure" },
        { visual: "knowledge", options: ["knowledge", "knowlege", "knoledge", "knowledg"], answer: "knowledge", question: "Which word is exactly the same? knowledge" },
        { visual: "education", options: ["education", "educasion", "eduction", "educatian"], answer: "education", question: "Which word is exactly the same? education" },
        { visual: "remembering", options: ["remembering", "remebering", "rememberring", "remembring"], answer: "remembering", question: "Which word is exactly the same? remembering" },
        { visual: "understand", options: ["understand", "understnad", "understend", "undersand"], answer: "understand", question: "Which word is exactly the same? understand" },
        { visual: "community", options: ["community", "comunity", "communitty", "commnity"], answer: "community", question: "Which word is exactly the same? community" },
        { visual: "important", options: ["important", "importent", "importannt", "impotant"], answer: "important", question: "Which word is exactly the same? important" },
        { visual: "experience", options: ["experience", "experiance", "experence", "experrience"], answer: "experience", question: "Which word is exactly the same? experience" },
        { visual: "different", options: ["different", "diffrent", "differant", "differnet"], answer: "different", question: "Which word is exactly the same? different" },
      ],
      "Which word is exactly the same?",
      "Inspect polysyllabic word spellings with care."
    ),
    makeVisualLevel(
      2,
      "LEVEL 2 — MEDIUM",
      "MEDIUM",
      [
        { visual: "carefully organized", options: ["carefully organized", "carefully orgnaized", "carefull organized", "carefully organzied"], answer: "carefully organized", question: "Match the exact phrase:" },
        { visual: "important information", options: ["important information", "important informaton", "importent information", "information important"], answer: "important information", question: "Match the exact phrase:" },
        { visual: "beautiful environment", options: ["beautiful environment", "beautiful enviroment", "beatiful environment", "beautiful environmant"], answer: "beautiful environment", question: "Match the exact phrase:" },
        { visual: "daily practice", options: ["daily practice", "daily pratice", "dailey practice", "daily practise"], answer: "daily practice", question: "Match the exact phrase:" },
        { visual: "reading activity", options: ["reading activity", "reading activty", "raeding activity", "reading actvity"], answer: "reading activity", question: "Match the exact phrase:" },
        { visual: "school project", options: ["school project", "school porject", "schol project", "school projet"], answer: "school project", question: "Match the exact phrase:" },
        { visual: "careful observation", options: ["careful observation", "careful obsevation", "carefull observation", "careful observasion"], answer: "careful observation", question: "Match the exact phrase:" },
        { visual: "correct answer", options: ["correct answer", "corret answer", "correct anser", "corect answer"], answer: "correct answer", question: "Match the exact phrase:" },
        { visual: "visual attention", options: ["visual attention", "visuel attention", "visual attension", "visual atenttion"], answer: "visual attention", question: "Match the exact phrase:" },
      ],
      "Match the exact phrase",
      "Scan complete two-word phrases for precise spelling and word spacing."
    ),
    makeVisualLevel(
      3,
      "LEVEL 3 — HARD",
      "HARD",
      [
        { visual: "responsibility", options: ["responsibility", "responsiblity", "responsability", "responsibilty"], answer: "responsibility", question: "Match: responsibility" },
        { visual: "communication", options: ["communication", "comunication", "communicaton", "communicatian"], answer: "communication", question: "Match: communication" },
        { visual: "environment", options: ["environment", "enviroment", "environmant", "enviornment"], answer: "environment", question: "Match: environment" },
        { visual: "imagination", options: ["imagination", "imaganation", "imaginaton", "imaginition"], answer: "imagination", question: "Match: imagination" },
        { visual: "concentration", options: ["concentration", "concentraton", "consentration", "concentrasion"], answer: "concentration", question: "Match: concentration" },
        { visual: "information", options: ["information", "informaton", "informetion", "infomation"], answer: "information", question: "Match: information" },
        { visual: "organization", options: ["organization", "organazation", "organiztion", "organiation"], answer: "organization", question: "Match: organization" },
        { visual: "understanding", options: ["understanding", "understading", "understandng", "underestanding"], answer: "understanding", question: "Match: understanding" },
        { visual: "achievement", options: ["achievement", "acheivement", "achievment", "achievemant"], answer: "achievement", question: "Match: achievement" },
      ],
      "Match the exact spelling",
      "High visual discrimination for complex long words."
    ),
  ],

  5: [
    makeVisualLevel(
      1,
      "LEVEL 1 — EASY",
      "EASY",
      [
        { visual: "adventure", options: ["adventure", "adventur", "adventuree", "advennture"], answer: "adventure", question: "adventure" },
        { visual: "knowledge", options: ["knowledge", "knowlege", "knowledg", "knoledge"], answer: "knowledge", question: "knowledge" },
        { visual: "different", options: ["different", "diffrent", "differant", "differnet"], answer: "different", question: "different" },
        { visual: "important", options: ["important", "importent", "impotant", "importantt"], answer: "important", question: "important" },
        { visual: "education", options: ["education", "educasion", "eduction", "educatian"], answer: "education", question: "education" },
        { visual: "beautiful", options: ["beautiful", "beatiful", "beautifull", "beautifil"], answer: "beautiful", question: "beautiful" },
        { visual: "remember", options: ["remember", "remembar", "remeber", "rememberr"], answer: "remember", question: "remember" },
        { visual: "community", options: ["community", "comunity", "communitty", "commnity"], answer: "community", question: "community" },
        { visual: "understand", options: ["understand", "understnad", "understend", "undersand"], answer: "understand", question: "understand" },
      ],
      "Match the word exactly",
      "Recognize subtle letter double-ups and missing letters."
    ),
    makeVisualLevel(
      2,
      "LEVEL 2 — MEDIUM",
      "MEDIUM",
      [
        { visual: "careful observation", options: ["careful observation", "careful obsevation", "carefull observation", "careful observasion"], answer: "careful observation", question: "Match the exact phrase: careful observation" },
        { visual: "visual recognition", options: ["visual recognition", "visual recogniton", "visuel recognition", "visual recoginition"], answer: "visual recognition", question: "Match the exact phrase: visual recognition" },
        { visual: "reading comprehension", options: ["reading comprehension", "reading comprehesion", "reading comprhension", "reading comprehensoin"], answer: "reading comprehension", question: "Match the exact phrase: reading comprehension" },
        { visual: "written expression", options: ["written expression", "writen expression", "written expresion", "writtten expression"], answer: "written expression", question: "Match the exact phrase: written expression" },
        { visual: "learning difficulty", options: ["learning difficulty", "learning dificulty", "learing difficulty", "learning difficulity"], answer: "learning difficulty", question: "Match the exact phrase: learning difficulty" },
        { visual: "student progress", options: ["student progress", "studnet progress", "student prograss", "student progres"], answer: "student progress", question: "Match the exact phrase: student progress" },
        { visual: "correct response", options: ["correct response", "corret response", "correct responce", "corect response"], answer: "correct response", question: "Match the exact phrase: correct response" },
        { visual: "sentence structure", options: ["sentence structure", "sentance structure", "sentence strucure", "sentence stucture"], answer: "sentence structure", question: "Match the exact phrase: sentence structure" },
        { visual: "language development", options: ["language development", "language developement", "langage development", "language developmant"], answer: "language development", question: "Match the exact phrase: language development" },
      ],
      "Match the exact phrase",
      "Compare full technical and academic phrases carefully."
    ),
    makeVisualLevel(
      3,
      "LEVEL 3 — HARD",
      "HARD",
      [
        { visual: "responsibility", options: ["responsibility", "responsiblity", "responsability", "responsibilty"], answer: "responsibility", question: "Match: responsibility" },
        { visual: "communication", options: ["communication", "comunication", "communicaton", "communicatian"], answer: "communication", question: "Match: communication" },
        { visual: "concentration", options: ["concentration", "concentraton", "consentration", "concentrationn"], answer: "concentration", question: "Match: concentration" },
        { visual: "environment", options: ["environment", "enviroment", "environmant", "enviornment"], answer: "environment", question: "Match: environment" },
        { visual: "achievement", options: ["achievement", "acheivement", "achievment", "achievemant"], answer: "achievement", question: "Match: achievement" },
        { visual: "organization", options: ["organization", "organazation", "organiztion", "organiation"], answer: "organization", question: "Match: organization" },
        { visual: "understanding", options: ["understanding", "understading", "understandng", "underestanding"], answer: "understanding", question: "Match: understanding" },
        { visual: "observation", options: ["observation", "observasion", "obsevation", "observetion"], answer: "observation", question: "Match: observation" },
        { visual: "pronunciation", options: ["pronunciation", "pronounciation", "pronuncation", "pronunciaton"], answer: "pronunciation", question: "Match: pronunciation" },
      ],
      "Match the exact spelling",
      "Highest level visual discrimination with close orthographic distractors."
    ),
  ],
};
