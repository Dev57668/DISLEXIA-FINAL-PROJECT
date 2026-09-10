/**
 * DyslexiaQuest - Comprehensive 10-Language Translation Dictionary
 * Languages supported:
 * 1. English (en) - Default
 * 2. हिन्दी (hi) - Hindi
 * 3. मराठी (mr) - Marathi
 * 4. தமிழ் (ta) - Tamil
 * 5. తెలుగు (te) - Telugu
 * 6. বাংলা (bn) - Bengali
 * 7. ગુજરાતી (gu) - Gujarati
 * 8. ಕನ್ನಡ (kn) - Kannada
 * 9. മലയാളം (ml) - Malayalam
 * 10. ਪੰਜਾਬੀ (pa) - Punjabi
 */

export const TRANSLATIONS = {
  en: {
    // Brand & Header
    brandTitle: "DyslexiaQuest",
    brandSub: "Canopy Adventure & Learning",
    navCamp: "Camp & Map",
    navExpeditions: "6 Expeditions",
    navPassport: "Explorer Passport",
    navJournal: "Guide Journal",
    fontDyslexic: "Dyslexic",
    fontStandard: "Standard",
    soundOn: "Sound On",
    soundOff: "Sound Off",
    passportsTitle: "EXPLORER PASSPORTS",
    newPassport: "+ New",
    managePassports: "Manage All Passports",
    classLabel: "Class",
    juniorExplorer: "Junior Explorer",
    guestExplorer: "Junior Explorer (Guest)",
    currentExplorerLabel: "CURRENT EXPLORER:",
    calibratedFor: "Calibrated for",

    // Hero Section
    heroTag: "THE LOST CANOPY OF LEXIS • COGNITIVE ADVENTURE",
    heroTitlePrefix: "Ready for the",
    heroTitleHighlight: "Jungle Quest?",
    heroLead: "Step into a magical hand-drawn storybook canopy where fun adventure games evaluate and strengthen reading fluency, letter orientation (b vs d), phonological speech, and 3D spatial reasoning!",
    btnStartExpedition: "Begin Module 01 Expedition",
    btnExploreGlades: "Explore All 6 Glades",
    btnEditPassport: "Edit Passport",

    // Mascot
    mascotTitle: "OLLIE THE EXPEDITION GUIDE",
    mascotIdle: "I follow your cursor! Click me!",
    mascotHappy: "You've got this, Explorer!",
    mascotCelebrate: "Hooray! Adventure awaits!",
    mascotNote: "Ollie's Note: Move your mouse around! My eyes follow your cursor. Click me anytime for cheerful encouragement!",

    // Modules
    mod1Name: "Eagle Eye Island",
    mod1Title: "Visual Perception & Direction",
    mod1Subtitle: "Letter Reversals (b vs d) & Symmetry",
    mod1Badge: "27 Items • 3 Levels",
    mod1Desc: "Spot mirror reversals and find the hidden directional glyphs in the sacred canopy grove.",

    mod2Name: "Echo Sanctuary",
    mod2Title: "Auditory Processing & Speech",
    mod2Subtitle: "Phonemic Awareness & Oral Voice Fluency",
    mod2Badge: "Microphone Active",
    mod2Desc: "Speak the secret jungle words aloud into the parrot's crystal to evaluate oral phoneme timing.",

    mod3Name: "Vine Weaver's Treehouse",
    mod3Title: "Written Expression & Memory",
    mod3Subtitle: "Orthographic Anagram Reconstruction",
    mod3Badge: "Tactile Anagrams",
    mod3Desc: "Untangle scrambled letter vines to form magical words and exercise visual working memory.",

    mod4Name: "Maths Jutsu Temple",
    mod4Title: "Mathematical Logic & Reasoning",
    mod4Subtitle: "Dyscalculia Screening & Arithmetic",
    mod4Badge: "Quantitative Logic",
    mod4Desc: "Master bamboo counting rods, number sense, and multi-tier mental arithmetic challenges.",

    mod5Name: "Sunstone Altar",
    mod5Title: "Spatial Geometry & 3D Solids",
    mod5Subtitle: "3D Form Rotation & Structural Reasoning",
    mod5Badge: "Tactile 3D Altar",
    mod5Desc: "Spin ancient sunlit solid crystals (cubes, prisms, pyramids) to decode geometric alignments.",

    mod6Name: "Storyteller's Lagoon",
    mod6Title: "Reading Comprehension",
    mod6Subtitle: "Passage Fluency & Semantic Recall",
    mod6Badge: "Class Calibrated",
    mod6Desc: "Dive into enchanted jungle stories, pace your oral reading speed, and answer comprehension quests.",

    // Trail Map
    trailMapTitle: "THE CANOPY EXPEDITION TRAIL",
    trailMapSubtitle: "Six multisensory assessment waypoints. Complete each waypoint to earn ancient canopy relics.",
    trailProgress: "Trail Progress",
    waypointsCompleted: "Waypoints Completed",
    relicsCollected: "Ancient Relics Collected",
    launchExpedition: "Launch Expedition →",
    completed: "Completed",
    readyToExplore: "Ready to Explore",

    // Methodology Tablet
    clinicalEngine: "CLINICAL DIAGNOSTIC ENGINE",
    evidenceBasedTitle: "Evidence-Based Cognitive Assessment",
    evidenceBasedDesc: "As your child explores the jungle glades, DyslexiaQuest captures multi-factor clinical telemetry: orthographic mirror confusion rates (b vs d), speech recognition confidence, 3D rotational spatial accuracy, and arithmetic timing.",
    feat1: "Standardized mirror letter reversal error index (b/d/p/q)",
    feat2: "Real-time voice phoneme analysis via Web Speech API",
    feat3: "Printable diagnostic summaries calibrated for schools & clinicians",
    btnOpenDiagnostic: "Open Student Diagnostic Dashboard →",
    metricsPreview: "EXPEDITION METRICS PREVIEW",
    visualOrthography: "Visual Orthography:",
    phoneticSpeech: "Phonetic Speech:",
    spatialSolids: "Spatial 3D Solids:",
    dyscalculiaRisk: "Dyscalculia Risk:",
    gradeAligned: "Grade Aligned",
    advanced: "Advanced",
    lowNormal: "Low / Normal",
    allReady: "ALL 6 EXPEDITIONS READY",

    // Stages Screen
    stagesEyebrow: "CLINICAL & EDUCATIONAL CURRICULUM",
    stagesTitle: "Cognitive Assessment Modules",
    stagesDesc: "Select an assessment module below. Real-time response performance is tracked and analyzed.",
    savedProgress: "Saved Assessment Progress",
    backBtn: "← BACK",
    portalBtn: "3D Website Portal",
    difficultyLevel: "Difficulty Level:",

    // Profile Screen
    profileHeading: "Explorer Passport & Assessment Profiles",
    profileSub: "Create and manage student records, calibrate grade-level difficulty, and track cognitive development.",
    studentNameLabel: "Student / Explorer Name",
    studentAgeLabel: "Age",
    studentGradeLabel: "Class / Grade Level",
    savePassportBtn: "Save Explorer Passport",
    activeProfileTitle: "Active Explorer",
    allProfilesTitle: "Saved Passports",

    // Teacher Screen
    teacherTitle: "Guide & Teacher Expedition Journal",
    teacherSub: "Comprehensive clinical diagnostic telemetry and IEP accommodation recommendations.",
    btnPrintReport: "Print Diagnostic Journal",
    btnExportJson: "Export Telemetry (JSON)",
    studentDirectory: "Student Assessment Directory",
    clinicalSummary: "Clinical Diagnostic Summary",

    // Common Controls
    startAdventure: "Start Adventure",
    next: "Next",
    submit: "Submit",
    tryAgain: "Try Again",
    congratulations: "Congratulations!",
    score: "Score",
    accuracy: "Accuracy",
    timeTaken: "Time Taken",

    // Footer
    footerTitle: "DyslexiaQuest • The Lost Canopy of Lexis",
    footerTagline: "Engineered with love for dyslexic minds, visual-orthographic reinforcement, and inclusive learning."
  },

  hi: {
    // Brand & Header
    brandTitle: "डिस्लेक्सियाक्वेस्ट",
    brandSub: "जंगल खोज यात्रा और शिक्षण",
    navCamp: "कैंप और नक्शा",
    navExpeditions: "६ खोज यात्राएं",
    navPassport: "खोजकर्ता पासपोर्ट",
    navJournal: "मार्गदर्शक डायरी",
    fontDyslexic: "डिस्लेक्सिक",
    fontStandard: "मानक फ़ॉन्ट",
    soundOn: "ध्वनि चालू",
    soundOff: "ध्वनि बंद",
    passportsTitle: "खोजकर्ता पासपोर्ट सूची",
    newPassport: "+ नया",
    managePassports: "सभी पासपोर्ट प्रबंधित करें",
    classLabel: "कक्षा",
    juniorExplorer: "बाल खोजकर्ता",
    guestExplorer: "बाल खोजकर्ता (अतिथि)",
    currentExplorerLabel: "वर्तमान खोजकर्ता:",
    calibratedFor: "निर्धारित कक्षा",

    // Hero Section
    heroTag: "लेक्सिस का रहस्यमयी जंगल • संज्ञानात्मक साहसिक यात्रा",
    heroTitlePrefix: "क्या आप तैयार हैं",
    heroTitleHighlight: "जंगल यात्रा के लिए?",
    heroLead: "एक जादुई चित्रात्मक जंगल में कदम रखें जहाँ मनोरंजक साहसिक खेल पठन प्रवाह, अक्षरों की दिशा (b बनाम d), ध्वन्यात्मक उच्चारण और 3D स्थानिक समझ का मूल्यांकन व सुधार करते हैं!",
    btnStartExpedition: "मॉड्यूल ०१ अभियान शुरू करें",
    btnExploreGlades: "सभी ६ वन प्रभाग देखें",
    btnEditPassport: "पासपोर्ट बदलें",

    // Mascot
    mascotTitle: "ऑली - जंगल गाइड उल्लू",
    mascotIdle: "मेरी आँखें कर्सर को देखती हैं! मुझे छूएं!",
    mascotHappy: "शाबाश खोजकर्ता, आप कर सकते हैं!",
    mascotCelebrate: "हुर्रे! नया रोमांच आपका इंतज़ार कर रहा है!",
    mascotNote: "ऑली का संदेश: माउस हिलाएं! मेरी आँखें आपके साथ चलती हैं। जब चाहें मुझे छूएं!",

    // Modules
    mod1Name: "चील दृष्टि द्वीप",
    mod1Title: "दृश्य अनुभूति और दिशा बोध",
    mod1Subtitle: "दर्पण अक्षर (b बनाम d) और समरूपता",
    mod1Badge: "२७ प्रश्न • ३ स्तर",
    mod1Desc: "पवित्र जंगल कुंज में दर्पण अक्षरों की उलझन पहचानें और सही दिशा खोजें।",

    mod2Name: "गूँज अभयारण्य",
    mod2Title: "श्रवण समझ और वाणी",
    mod2Subtitle: "ध्वनि पहचान और मौखिक वाचन प्रवाह",
    mod2Badge: "माइक सक्रिय",
    mod2Desc: "तोते के क्रिस्टल में जंगल के जादुई शब्द बोलें और अपनी ध्वनि गति परखें।",

    mod3Name: "लता बुनकर कुटिया",
    mod3Title: "लिखित अभिव्यक्ति और स्मृति",
    mod3Subtitle: "उलझे अक्षरों से शब्द निर्माण (एनाग्राम)",
    mod3Badge: "स्पर्श शब्द पहेली",
    mod3Desc: "उलझी लताओं से अक्षर सुलझाकर जादुई शब्द बनाएं और कार्यशील स्मृति बढ़ाएं।",

    mod4Name: "गणित जुत्सु मंदिर",
    mod4Title: "गणितीय तर्क और विचार",
    mod4Subtitle: "डिस्कैल्कुलिया जांच और अंकगणित",
    mod4Badge: "संख्यात्मक तर्क",
    mod4Desc: "बांस की गिनती छड़ियों, संख्या बोध और मानसिक गणित की चुनौतियों में महारत पाएं।",

    mod5Name: "सूर्यशिला वेदी",
    mod5Title: "स्थानिक ज्यामिति और 3D रूप",
    mod5Subtitle: "3D संरचना घूर्णन और स्थानिक समझ",
    mod5Badge: "3D वेदी",
    mod5Desc: "प्राचीन सूर्य-क्रिस्टल (घन, प्रिज्म, पिरामिड) घुमाकर ज्यामितीय रहस्य सुलझाएं।",

    mod6Name: "कथावाचक झील",
    mod6Title: "पठन बोध और समझ",
    mod6Subtitle: "गद्यांश वाचन गति और शब्द स्मरण",
    mod6Badge: "कक्षा अनुसार अनुकूलित",
    mod6Desc: "मनोरम जंगल कथाओं में डूबें, पठन गति सुधारें और प्रश्नों के सही उत्तर दें।",

    // Trail Map
    trailMapTitle: "कैनोपी अभियान मार्ग",
    trailMapSubtitle: "छह बहु-संवेदी पड़ाव। प्राचीन अवशेष जीतने के लिए प्रत्येक पड़ाव पूरा करें।",
    trailProgress: "मार्ग प्रगति",
    waypointsCompleted: "पड़ाव पूर्ण",
    relicsCollected: "प्राचीन अवशेष अर्जित",
    launchExpedition: "अभियान शुरू करें →",
    completed: "पूर्ण",
    readyToExplore: "तैयार",

    // Methodology Tablet
    clinicalEngine: "नैदानिक मूल्यांकन इंजन",
    evidenceBasedTitle: "प्रमाण-आधारित संज्ञानात्मक मूल्यांकन",
    evidenceBasedDesc: "जैसे-जैसे बच्चा जंगल में खेलता है, डिस्लेक्सियाक्वेस्ट सूक्ष्म नैदानिक डेटा एकत्र करता है: दर्पण अक्षर भ्रम दर (b/d), वाक् पहचान सटीकता और 3D स्थानिक तर्क।",
    feat1: "मानकीकृत दर्पण अक्षर (b/d/p/q) त्रुटि सूचकांक",
    feat2: "वेब स्पीच API द्वारा वास्तविक समय ध्वनि विश्लेषण",
    feat3: "शिक्षकों और चिकित्सकों के लिए मुद्रण योग्य विस्तृत रिपोर्ट",
    btnOpenDiagnostic: "विद्यार्थी मूल्यांकन डैशबोर्ड खोलें →",
    metricsPreview: "अभियान मैट्रिक्स पूर्वावलोकन",
    visualOrthography: "दृश्य अक्षर पहचान:",
    phoneticSpeech: "ध्वन्यात्मक वाचन:",
    spatialSolids: "3D स्थानिक रूप:",
    dyscalculiaRisk: "डिस्कैल्कुलिया जोखिम:",
    gradeAligned: "कक्षा अनुसार उत्तम",
    advanced: "उत्कृष्ट",
    lowNormal: "न्यूनतम / सामान्य",
    allReady: "सभी ६ अभियान तैयार हैं",

    // Stages Screen
    stagesEyebrow: "शैक्षणिक एवं नैदानिक पाठ्यक्रम",
    stagesTitle: "संज्ञानात्मक मूल्यांकन मॉड्यूल",
    stagesDesc: "नीचे एक मूल्यांकन मॉड्यूल चुनें। आपकी प्रतिक्रिया का वास्तविक समय में विश्लेषण किया जाएगा।",
    savedProgress: "सहेजी गई प्रगति",
    backBtn: "← पीछे जाएं",
    portalBtn: "3D मुख्य पोर्टल",
    difficultyLevel: "कठिनाई स्तर:",

    // Profile Screen
    profileHeading: "खोजकर्ता पासपोर्ट और प्रोफ़ाइल",
    profileSub: "विद्यार्थी रिकॉर्ड बनाएं, कक्षा स्तर निर्धारित करें और सीखने की प्रगति देखें।",
    studentNameLabel: "विद्यार्थी / खोजकर्ता का नाम",
    studentAgeLabel: "आयु",
    studentGradeLabel: "कक्षा / श्रेणी",
    savePassportBtn: "पासपोर्ट सहेजें",
    activeProfileTitle: "सक्रिय खोजकर्ता",
    allProfilesTitle: "सहेजे गए पासपोर्ट",

    // Teacher Screen
    teacherTitle: "मार्गदर्शक और शिक्षक मूल्यांकन डायरी",
    teacherSub: "विस्तृत नैदानिक डेटा और व्यक्तिगत शिक्षण सिफारिशें।",
    btnPrintReport: "मूल्यांकन रिपोर्ट प्रिंट करें",
    btnExportJson: "डेटा निर्यात करें (JSON)",
    studentDirectory: "विद्यार्थी सूची",
    clinicalSummary: "नैदानिक सारांश",

    // Common Controls
    startAdventure: "रोमांच शुरू करें",
    next: "आगे",
    submit: "जमा करें",
    tryAgain: "पुनः प्रयास करें",
    congratulations: "बधाई हो!",
    score: "अंक",
    accuracy: "सटीकता",
    timeTaken: "लिया गया समय",

    // Footer
    footerTitle: "डिस्लेक्सियाक्वेस्ट • लेक्सिस का रहस्यमयी जंगल",
    footerTagline: "डिस्लेक्सिक बच्चों के आत्मविश्वास और समावेशी शिक्षण के लिए प्रेमपूर्वक निर्मित।"
  },

  mr: {
    // Brand & Header
    brandTitle: "डिस्लेक्सियाक्वेस्ट",
    brandSub: "जंगल साहसी मोहीम आणि शिक्षण",
    navCamp: "तळ आणि नकाशा",
    navExpeditions: "६ मोहिमा",
    navPassport: "शोधक पासपोर्ट",
    navJournal: "मार्गदर्शक रोजनिशी",
    fontDyslexic: "डिस्लेक्सिक",
    fontStandard: "प्रमाणित फॉन्ट",
    soundOn: "आवाज सुरू",
    soundOff: "आवाज बंद",
    passportsTitle: "शोधक पासपोर्ट यादी",
    newPassport: "+ नवीन",
    managePassports: "सर्व पासपोर्ट व्यवस्थापित करा",
    classLabel: "इयत्ता",
    juniorExplorer: "बाल शोधक",
    guestExplorer: "बाल शोधक (पाहुणा)",
    currentExplorerLabel: "सध्याचा शोधक:",
    calibratedFor: "अनुकूलित इयत्ता",

    // Hero Section
    heroTag: "लेक्सिसचे गूढ जंगल • संज्ञानात्मक साहसी मोहीम",
    heroTitlePrefix: "तुम्ही तयार आहात का",
    heroTitleHighlight: "जंगल मोहिमेसाठी?",
    heroLead: "एका जादुई सचित्र जंगलात पाऊल टाका जिथे मनोरंजक खेळांद्वारे वाचन वेग, अक्षरांची दिशा (b विरुद्ध d), उच्चार आणि 3D अवकाशीय आकलनाचे अचूक मूल्यमापन केले जाते!",
    btnStartExpedition: "मॉड्यूल ०१ मोहीम सुरू करा",
    btnExploreGlades: "सर्व ६ वन विभाग पहा",
    btnEditPassport: "पासपोर्ट बदला",

    // Mascot
    mascotTitle: "ऑली - जंगल वाटाड्या घुबड",
    mascotIdle: "मी तुमच्या कर्सरकडे पाहतो! मला स्पर्श करा!",
    mascotHappy: "छान शोधक, तुम्ही नक्की जिंकणार!",
    mascotCelebrate: "व्वा! नवीन साहस वाट पाहत आहे!",
    mascotNote: "ऑलीची टीप: माउस फिरवा! माझे डोळे तुमच्यासोबत फिरतात. मला कधीही स्पर्श करा!",

    // Modules
    mod1Name: "गरुड दृष्टी बेट",
    mod1Title: "दृष्टी आकलन आणि दिशा बोध",
    mod1Subtitle: "आरसा अक्षरे (b विरुद्ध d) व सममिती",
    mod1Badge: "२७ प्रश्न • ३ स्तर",
    mod1Desc: "पवित्र जंगलात आरशातील उलट अक्षरे ओळखा आणि योग्य दिशा शोधा.",

    mod2Name: "प्रतिध्वनी अभयारण्य",
    mod2Title: "श्रवण प्रक्रिया आणि वाणी",
    mod2Subtitle: "ध्वनी ओळख आणि तोंडी वाचन ओघ",
    mod2Badge: "माइक सुरू",
    mod2Desc: "पोपटाच्या स्फटिकात जंगलातील जादुई शब्द मोठ्याने बोला आणि ध्वनी गती तपासा.",

    mod3Name: "लता विणकराचे घर",
    mod3Title: "लिखित अभिव्यक्ती आणि स्मृती",
    mod3Subtitle: "अक्षर जुळवणीतून शब्द रचना (अॅनाग्राम)",
    mod3Badge: "शब्द कोडे",
    mod3Desc: "गुंतलेल्या वेलींमधून अक्षरे सुलझावून जादुई शब्द बनवा आणि स्मृती सुधारा.",

    mod4Name: "गणित जुत्सू मंदिर",
    mod4Title: "गणितीय तर्क आणि विचार",
    mod4Subtitle: "डिसकॅल्क्युलिया तपासणी आणि अंकगणित",
    mod4Badge: "संख्यात्मक तर्क",
    mod4Desc: "बांबूच्या काठ्या, संख्या ज्ञान आणि तोंडी गणिताची आव्हाने सहज पेला.",

    mod5Name: "सूर्यशिळा वेदी",
    mod5Title: "अवकाशीय भूमिती आणि 3D आकार",
    mod5Subtitle: "3D आकार फिरवणे आणि अवकाशीय तर्क",
    mod5Badge: "3D वेदी",
    mod5Desc: "प्राचीन सूर्य-स्फटिक (घन, त्रिकोण, पिरॅमिड) फिरवून भूमितीय रहस्ये उलगडा.",

    mod6Name: "कथाकाराचे तळे",
    mod6Title: "वाचन आकलन आणि समज",
    mod6Subtitle: "उतारा वाचन वेग आणि शब्द स्मरण",
    mod6Badge: "इयत्तेनुसार सानुकूल",
    mod6Desc: "मनोरम जंगल कथांमध्ये रमा, वाचन वेग वाढवा आणि प्रश्नांची उत्तरे द्या.",

    // Trail Map
    trailMapTitle: "कॅनॉपी मोहीम मार्ग",
    trailMapSubtitle: "सहा बहु-संवेदी थांबे. प्राचीन अवशेष मिळवण्यासाठी प्रत्येक टप्पा पूर्ण करा.",
    trailProgress: "मार्ग प्रगती",
    waypointsCompleted: "टप्पे पूर्ण",
    relicsCollected: "अवशेष गोळा झाले",
    launchExpedition: "मोहीम सुरू करा →",
    completed: "पूर्ण",
    readyToExplore: "तयार",

    // Methodology Tablet
    clinicalEngine: "वैद्यकीय निदान इंजिन",
    evidenceBasedTitle: "पुरावा-आधारित संज्ञानात्मक मूल्यांकन",
    evidenceBasedDesc: "मूल जंगलात खेळत असताना डिस्लेक्सियाक्वेस्ट अचूक डेटा नोंदवते: आरसा अक्षर गोंधळ (b/d), उच्चार अचूकता आणि 3D अवकाशीय विचार.",
    feat1: "मानकीकृत आरसा अक्षर (b/d/p/q) त्रुटी निर्देशांक",
    feat2: "वेब स्पीच API द्वारे रिअल-टाइम उच्चार विश्लेषण",
    feat3: "शाळा व डॉक्टरांसाठी उपयुक्त मुद्रणयोग्य अहवाल",
    btnOpenDiagnostic: "विद्यार्थी निदान डॅशबोर्ड उघडा →",
    metricsPreview: "मोहीम आकडेवारी पूर्वावलोकन",
    visualOrthography: "दृष्टी अक्षर ओळख:",
    phoneticSpeech: "उच्चार अचूकता:",
    spatialSolids: "3D आकार समज:",
    dyscalculiaRisk: "डिसकॅल्क्युलिया धोका:",
    gradeAligned: "इयत्तेनुसार योग्य",
    advanced: "प्रगत",
    lowNormal: "कमी / सामान्य",
    allReady: "सर्व ६ मोहिमा सज्ज आहेत",

    // Stages Screen
    stagesEyebrow: "शैक्षणिक आणि वैद्यकीय अभ्यासक्रम",
    stagesTitle: "संज्ञानात्मक मूल्यांकन विभाग",
    stagesDesc: "खालीलपैकी एक मूल्यांकन विभाग निवडा. तुमच्या प्रतिसादाचे त्वरित विश्लेषण केले जाईल.",
    savedProgress: "जतन केलेली प्रगती",
    backBtn: "← मागे",
    portalBtn: "3D मुख्य पोर्टल",
    difficultyLevel: "काठिण्य पातळी:",

    // Profile Screen
    profileHeading: "शोधक पासपोर्ट आणि प्रोफाइल",
    profileSub: "विद्यार्थी नोंदी ठेवा, इयत्ता निवडा आणि शिकण्याची प्रगती पाहा.",
    studentNameLabel: "विद्यार्थी / शोधकाचे नाव",
    studentAgeLabel: "वय",
    studentGradeLabel: "इयत्ता / वर्ग",
    savePassportBtn: "पासपोर्ट जतन करा",
    activeProfileTitle: "सक्रिय शोधक",
    allProfilesTitle: "जतन केलेले पासपोर्ट",

    // Teacher Screen
    teacherTitle: "मार्गदर्शक व शिक्षक अभ्यास रोजनिशी",
    teacherSub: "सविस्तर निदान डेटा आणि वैयक्तिक शैक्षणिक शिफारसी.",
    btnPrintReport: "अहवाल प्रिंट करा",
    btnExportJson: "डेटा निर्यात करा (JSON)",
    studentDirectory: "विद्यार्थी यादी",
    clinicalSummary: "निदान सारांश",

    // Common Controls
    startAdventure: "साहस सुरू करा",
    next: "पुढे",
    submit: "सादर करा",
    tryAgain: "पुन्हा प्रयत्न करा",
    congratulations: "अभिनंदन!",
    score: "गुण",
    accuracy: "अचूकता",
    timeTaken: "लागलेला वेळ",

    // Footer
    footerTitle: "डिस्लेक्सियाक्वेस्ट • लेक्सिसचे गूढ जंगल",
    footerTagline: "डिस्लेक्सिक मुलांच्या सर्वांगीण प्रगतीसाठी आणि सर्वसमावेशक शिक्षणासाठी स्नेहाने तयार केलेले."
  },

  ta: {
    // Brand & Header
    brandTitle: "டிஸ்லெக்ஸியாக்வெஸ்ட்",
    brandSub: "காட்டு சாகசமும் கற்றலும்",
    navCamp: "முகாம் & வரைபடம்",
    navExpeditions: "6 பயணங்கள்",
    navPassport: "ஆராய்ச்சியாளர் பாஸ்போர்ட்",
    navJournal: "வழிகாட்டி குறிப்பேடு",
    fontDyslexic: "டிஸ்லெக்ஸிக் எழுத்து",
    fontStandard: "வழக்கமான எழுத்து",
    soundOn: "ஒலி இயக்கத்தில்",
    soundOff: "ஒலி அணைக்கப்பட்டது",
    passportsTitle: "ஆராய்ச்சியாளர் பாஸ்போர்ட்டுகள்",
    newPassport: "+ புதியது",
    managePassports: "அனைத்து பாஸ்போர்ட்டுகளையும் நிர்வகி",
    classLabel: "வகுப்பு",
    juniorExplorer: "இளம் ஆய்வாளர்",
    guestExplorer: "இளம் ஆய்வாளர் (விருந்தினர்)",
    currentExplorerLabel: "தற்போதைய ஆய்வாளர்:",
    calibratedFor: "வகுப்புக்கு ஏற்றது",

    // Hero Section
    heroTag: "லெக்ஸிஸ் மர்ம காடு • அறிவாற்றல் சாகச பயணம்",
    heroTitlePrefix: "நீங்கள் தயாரா",
    heroTitleHighlight: "காட்டு சாகசத்திற்கு?",
    heroLead: "மாயாஜால சித்திர காட்டுக்குள் நுழையுங்கள்! வாசிப்பு வேகம், எழுத்து திசை (b மற்றும் d), உச்சரிப்பு மற்றும் 3D இடவியல் அறிவை மேம்படுத்தும் வேடிக்கையான சாகச விளையாட்டுகள்!",
    btnStartExpedition: "தொகுதி 01 பயணத்தைத் தொடங்கு",
    btnExploreGlades: "அனைத்து 6 காடுகளையும் காண்க",
    btnEditPassport: "பாஸ்போர்ட் திருத்து",

    // Mascot
    mascotTitle: "ஆலி - வழிகாட்டி ஆந்தை",
    mascotIdle: "என் கண்கள் உங்கள் கர்சரைப் பின்தொடர்கின்றன! என்னை சொடுக்கவும்!",
    mascotHappy: "நன்றாக செய்கிறீர்கள் ஆய்வாளரே!",
    mascotCelebrate: "ஆஹா! புதிய சாகசம் காத்திருக்கிறது!",
    mascotNote: "ஆலியின் குறிப்பு: சுட்டியை நகர்த்துங்கள்! என் கண்கள் உங்களைப் பார்க்கும். எப்போது வேண்டுமானாலும் என்னை சொடுக்கலாம்!",

    // Modules
    mod1Name: "கழுகு பார்வை தீவு",
    mod1Title: "பார்வை அறிதலும் திசையும்",
    mod1Subtitle: "கண்ணாடி எழுத்துக்கள் (b vs d) & சமச்சீர்",
    mod1Badge: "27 வினாக்கள் • 3 நிலைகள்",
    mod1Desc: "புனித காட்டில் உள்ள கண்ணாடி எழுத்து குழப்பங்களைக் கண்டறிந்து சரியான திசையைக் கண்டுபிடிக்கவும்.",

    mod2Name: "எதிரொலி புகலிடம்",
    mod2Title: "கேட்டல் திறனும் பேச்சும்",
    mod2Subtitle: "ஒலி விழிப்புணர்வும் வாய்மொழி வாசிப்பும்",
    mod2Badge: "மைக் தயார்",
    mod2Desc: "கிளியின் படிகத்தில் ரகசிய காட்டு சொற்களை சத்தமாகப் பேசி ஒலி வேகத்தை சோதிக்கவும்.",

    mod3Name: "கொடி நெசவாளர் வீடு",
    mod3Title: "எழுத்து வெளிப்பாடும் நினைவாற்றலும்",
    mod3Subtitle: "எழுத்துக்களை இணைத்து சொல் உருவாக்குதல்",
    mod3Badge: "சொல் புதிர்",
    mod3Desc: "சிக்கலான கொடிகளில் உள்ள எழுத்துக்களைப் பிரித்து மாயாஜால சொற்களை உருவாக்கி நினைவாற்றலை வளர்க்கவும்.",

    mod4Name: "கணித ஜூட்சு கோயில்",
    mod4Title: "கணித தர்க்கமும் சிந்தனையும்",
    mod4Subtitle: "டிஸ்கால்குலியா பரிசோதனையும் எண்களும்",
    mod4Badge: "எண் தர்க்கம்",
    mod4Desc: "மூங்கில் குச்சிகள், எண் அறிவு மற்றும் மனக்கணக்கு சவால்களை எளிதாகக் கற்றுக்கொள்ளுங்கள்.",

    mod5Name: "சூரியக்கல் பீடம்",
    mod5Title: "இடவியல் வடிவியல் & 3D வடிவங்கள்",
    mod5Subtitle: "3D உருவ சுழற்சியும் இடவியல் சிந்தனையும்",
    mod5Badge: "3D பீடம்",
    mod5Desc: "பண்டைய சூரிய படிகங்களை (கனசதுரம், முப்பட்டகம், பிரமிடு) சுழற்றி வடிவியல் ரகசியங்களை அறியுங்கள்.",

    mod6Name: "கதைசொல்லி ஏரி",
    mod6Title: "வாசிப்புப் புரிதலும் அறிதலும்",
    mod6Subtitle: "பத்தி வாசிப்பு வேகமும் நினைவுகூர்தலும்",
    mod6Badge: "வகுப்புக்கேற்ப வடிவமைக்கப்பட்டது",
    mod6Desc: "அழகிய காட்டு கதைகளில் மூழ்கி, வாசிப்பு வேகத்தை அதிகரித்து கேள்விகளுக்குப் பதிலளிக்கவும்.",

    // Trail Map
    trailMapTitle: "காட்டு சாகச பாதை",
    trailMapSubtitle: "ஆறு பலபுலன் சோதனை நிலைகள். பண்டைய பொக்கிஷங்களை வெல்ல ஒவ்வொரு நிலையையும் முடிக்கவும்.",
    trailProgress: "பயண முன்னேற்றம்",
    waypointsCompleted: "முடிந்த நிலைகள்",
    relicsCollected: "சேகரித்த பொக்கிஷங்கள்",
    launchExpedition: "பயணத்தைத் தொடங்கு →",
    completed: "முடிந்தது",
    readyToExplore: "ஆராயத் தயார்",

    // Methodology Tablet
    clinicalEngine: "மருத்துவ பரிசோதனை கருவி",
    evidenceBasedTitle: "ஆதாரப்பூர்வ அறிவாற்றல் மதிப்பீடு",
    evidenceBasedDesc: "குழந்தை காட்டை ஆராயும்போது டிஸ்லெக்ஸியாக்வெஸ்ட் துல்லியமான தகவல்களைப் பதிவு செய்கிறது: கண்ணாடி எழுத்து பிழைகள் (b/d), பேச்சு உச்சரிப்பு மற்றும் 3D இடவியல் சிந்தனை.",
    feat1: "தரப்படுத்தப்பட்ட கண்ணாடி எழுத்து (b/d/p/q) பிழை குறியீடு",
    feat2: "Web Speech API மூலம் உடனுக்குடன் குரல் பகுப்பாய்வு",
    feat3: "பள்ளிகள் மற்றும் மருத்துவர்களுக்கான அச்சிடக்கூடிய விரிவான அறிக்கை",
    btnOpenDiagnostic: "மாணவர் பரிசோதனை பலகையைத் திற →",
    metricsPreview: "பயண அளவீடுகள் முன்னோட்டம்",
    visualOrthography: "பார்வை எழுத்து அறிதல்:",
    phoneticSpeech: "ஒலி உச்சரிப்பு:",
    spatialSolids: "3D வடிவ அறிவு:",
    dyscalculiaRisk: "டிஸ்கால்குலியா ஆபத்து:",
    gradeAligned: "வகுப்புக்கு ஏற்றது",
    advanced: "மேம்பட்டது",
    lowNormal: "குறைவு / இயல்பு",
    allReady: "அனைத்து 6 பயணங்களும் தயார்",

    // Stages Screen
    stagesEyebrow: "மருத்துவ மற்றும் கல்விப் பாடத்திட்டம்",
    stagesTitle: "அறிவாற்றல் மதிப்பீட்டு தொகுதிகள்",
    stagesDesc: "கீழே உள்ள தொகுதியைத் தேர்ந்தெடுக்கவும். உங்கள் பதில்கள் உடனுக்குடன் பகுப்பாய்வு செய்யப்படும்.",
    savedProgress: "சேமிக்கப்பட்ட முன்னேற்றம்",
    backBtn: "← பின்செல்",
    portalBtn: "3D முதன்மை தளம்",
    difficultyLevel: "கடினத்தன்மை நிலை:",

    // Profile Screen
    profileHeading: "ஆய்வாளர் பாஸ்போர்ட் & சுயவிவரங்கள்",
    profileSub: "மாணவர் பதிவுகளை உருவாக்கவும், வகுப்பு அளவை நிர்ணயிக்கவும், முன்னேற்றத்தைக் கண்காணிக்கவும்.",
    studentNameLabel: "மாணவர் / ஆய்வாளர் பெயர்",
    studentAgeLabel: "வயது",
    studentGradeLabel: "வகுப்பு / நிலை",
    savePassportBtn: "பாஸ்போர்ட்டை சேமிக்கவும்",
    activeProfileTitle: "தற்போதைய ஆய்வாளர்",
    allProfilesTitle: "சேமிக்கப்பட்ட பாஸ்போர்ட்டுகள்",

    // Teacher Screen
    teacherTitle: "வழிகாட்டி & ஆசிரியர் ஆய்வுக் குறிப்பேடு",
    teacherSub: "விரிவான மருத்துவ பரிசோதனைத் தகவல்களும் தனிப்பட்ட கற்பித்தல் பரிந்துரைகளும்.",
    btnPrintReport: "அறிக்கையை அச்சிடுக",
    btnExportJson: "தரவை ஏற்றுமதி செய் (JSON)",
    studentDirectory: "மாணவர் பட்டியல்",
    clinicalSummary: "மருத்துவ சுருக்கம்",

    // Common Controls
    startAdventure: "சாகசத்தைத் தொடங்கு",
    next: "அடுத்து",
    submit: "சமர்ப்பி",
    tryAgain: "மீண்டும் முயல்க",
    congratulations: "வாழ்த்துகள்!",
    score: "மதிப்பெண்",
    accuracy: "துல்லியம்",
    timeTaken: "எடுத்துக்கொண்ட நேரம்",

    // Footer
    footerTitle: "டிஸ்லெக்ஸியாக்வெஸ்ட் • லெக்ஸிஸ் மர்ம காடு",
    footerTagline: "டிஸ்லெக்ஸியா உள்ள குழந்தைகளின் பிரகாசமான எதிர்காலத்திற்காகவும் உள்ளடக்கிய கற்றலுக்காகவும் அன்புடன் உருவாக்கப்பட்டது."
  },

  te: {
    // Brand & Header
    brandTitle: "డిస్లెక్సియాక్వెస్ట్",
    brandSub: "అటవీ సాహసం మరియు అభ్యాసం",
    navCamp: "క్యాంప్ & మ్యాప్",
    navExpeditions: "6 అన్వేషణలు",
    navPassport: "అన్వేషకుడి పాస్‌పోర్ట్",
    navJournal: "గైడ్ జర్నల్",
    fontDyslexic: "డిస్లెక్సిక్ ఫాంట్",
    fontStandard: "సాధారణ ఫాంట్",
    soundOn: "శబ్దం ఆన్",
    soundOff: "శబ్దం ఆఫ్",
    passportsTitle: "అన్వేషకుల పాస్‌పోర్ట్‌లు",
    newPassport: "+ కొత్తది",
    managePassports: "అన్ని పాస్‌పోర్ట్‌లను నిర్వహించండి",
    classLabel: "తరగతి",
    juniorExplorer: "జూనియర్ అన్వేషకుడు",
    guestExplorer: "జూనియర్ అన్వేషకుడు (అతిథి)",
    currentExplorerLabel: "ప్రస్తుత అన్వేషకుడు:",
    calibratedFor: "అనుకూలీకరించిన తరగతి",

    // Hero Section
    heroTag: "లెక్సిస్ మాయా అడవి • జ్ఞాన సాహస యాత్ర",
    heroTitlePrefix: "మీరు సిద్ధంగా ఉన్నారా",
    heroTitleHighlight: "జంగిల్ క్వెస్ట్ కోసం?",
    heroLead: "మనోహరమైన చిత్రకథా అరణ్యంలోకి అడుగుపెట్టండి! చదివే వేగం, అక్షరాల దిశ (b మరియు d), ఉచ్చారణ మరియు 3D ప్రాదేశిక అవగాహనను పరీక్షించి మెరుగుపరిచే ఆహ్లాదకరమైన సాహస క్రీడలు!",
    btnStartExpedition: "మాడ్యూల్ 01 సాహసం ప్రారంభించండి",
    btnExploreGlades: "మొత్తం 6 అటవీ ప్రాంతాలను చూడండి",
    btnEditPassport: "పాస్‌పోర్ట్ మార్చండి",

    // Mascot
    mascotTitle: "ఆలీ - అటవీ గైడ్ గుడ్లగూబ",
    mascotIdle: "నా కళ్ళు మీ కర్సర్‌ను అనుసరిస్తాయి! నన్ను తాకండి!",
    mascotHappy: "చాలా బాగుంది అన్వేషకుడా, మీరు చేయగలరు!",
    mascotCelebrate: "హర్రే! కొత్త సాహసం వేచి ఉంది!",
    mascotNote: "ఆలీ సందేశం: మౌస్ కదపండి! నా కళ్ళు మీతో కదులుతాయి. ఎప్పుడైనా నన్ను తాకండి!",

    // Modules
    mod1Name: "డేగ కన్ను ద్వీపం",
    mod1Title: "దృశ్య అవగాహన & దిశా జ్ఞానం",
    mod1Subtitle: "అద్దం అక్షరాలు (b vs d) & సౌష్టవం",
    mod1Badge: "27 ప్రశ్నలు • 3 స్థాయిలు",
    mod1Desc: "పవిత్ర అడవిలో అద్దం అక్షరాల గందరగోళాన్ని గుర్తించి సరైన దిశను కనుగొనండి.",

    mod2Name: "ప్రతిధ్వని ఆశ్రమం",
    mod2Title: "శ్రవణ గ్రహణశక్తి & మాట",
    mod2Subtitle: "ధ్వని అవగాహన & మౌఖిక పఠన ధారాళత",
    mod2Badge: "మైక్ ఆన్ చేయబడింది",
    mod2Desc: "చిలుక స్ఫటికంలో అడవి మాయా పదాలను బిగ్గరగా పలికి మీ ఉచ్చారణ వేగాన్ని పరీక్షించండి.",

    mod3Name: "తీగల నేత ఇల్లు",
    mod3Title: "రాతపూర్వక వ్యక్తీకరణ & జ్ఞాపకశక్తి",
    mod3Subtitle: "చెదిరిన అక్షరాలతో పదాల నిర్మాణం (అనగ్రామ్)",
    mod3Badge: "పద పజిల్",
    mod3Desc: "చిక్కుబడ్డ తీగల నుండి అక్షరాలను విడదీసి మాయా పదాలను రూపొందించి జ్ఞాపకశక్తిని పెంచుకోండి.",

    mod4Name: "గణిత జుట్సు ఆలయం",
    mod4Title: "గణిత తర్కం & ఆలోచన",
    mod4Subtitle: "డిస్కాల్కులియా స్క్రీనింగ్ & అంకగణితం",
    mod4Badge: "సంఖ్యా తర్కం",
    mod4Desc: "వెదురు లెక్కింపు పుల్లలు, సంఖ్యా జ్ఞానం మరియు మానసిక గణిత సవాళ్లను నేర్చుకోండి.",

    mod5Name: "సూర్యశిలా వేదిక",
    mod5Title: "ప్రాదేశిక జ్యామితి & 3D ఆకారాలు",
    mod5Subtitle: "3D రూప భ్రమణం & ప్రాదేశిక తర్కం",
    mod5Badge: "3D వేదిక",
    mod5Desc: "పురాతన సూర్య స్ఫటికాలను (ఘనం, పట్టకం, పిరమిడ్) తిప్పి జ్యామితీయ రహస్యాలను ఛేదించండి.",

    mod6Name: "కథకుల సరస్సు",
    mod6Title: "పఠన గ్రహణశక్తి & అవగాహన",
    mod6Subtitle: "వ్యాస పఠన వేగం & పద జ్ఞాపకం",
    mod6Badge: "తరగతికి అనుకూలం",
    mod6Desc: "మంత్రముగ్ధమైన అటవీ కథలలో మునిగి తేలండి, పఠన వేగాన్ని పెంచండి మరియు ప్రశ్నలకు సమాధానమివ్వండి.",

    // Trail Map
    trailMapTitle: "క్యానోపీ సాహస మార్గం",
    trailMapSubtitle: "ఆరు బహుళ-ఇంద్రియ పరీక్షా కేంద్రాలు. పురాతన అవశేషాలను గెలవడానికి ప్రతి కేంద్రాన్ని పూర్తి చేయండి.",
    trailProgress: "మార్గ పురోగతి",
    waypointsCompleted: "పూర్తయిన కేంద్రాలు",
    relicsCollected: "సేకరించిన అవశేషాలు",
    launchExpedition: "సాహసం ప్రారంభించండి →",
    completed: "పూర్తయింది",
    readyToExplore: "అన్వేషణకు సిద్ధం",

    // Methodology Tablet
    clinicalEngine: "క్లినికల్ డయాగ్నస్టిక్ ఇంజిన్",
    evidenceBasedTitle: "ఆధారిత జ్ఞానపరమైన మూల్యాంకనం",
    evidenceBasedDesc: "పిల్లవాడు అడవిని అన్వేషిస్తున్నప్పుడు డిస్లెక్సియాక్వెస్ట్ ఖచ్చితమైన సమాచారాన్ని నమోదు చేస్తుంది: అద్దం అక్షరాల గందరగోళం (b/d), ఉచ్చారణ ఖచ్చితత్వం మరియు 3D ప్రాదేశిక తర్కం.",
    feat1: "ప్రామాణిక అద్దం అక్షరాల (b/d/p/q) లోపాల సూచిక",
    feat2: "Web Speech API ద్వారా నిజ-సమయ ధ్వని విశ్లేషణ",
    feat3: "పాఠశాలలు మరియు వైద్యుల కోసం ముద్రించదగిన సమగ్ర నివేదిక",
    btnOpenDiagnostic: "విద్యార్థి డయాగ్నస్టిక్ డాష్‌బోర్డ్ తెరవండి →",
    metricsPreview: "సాహస కొలమానాల ప్రివ్యూ",
    visualOrthography: "దృశ్య అక్షర గుర్తింపు:",
    phoneticSpeech: "ధ్వని ఉచ్చారణ:",
    spatialSolids: "3D ప్రాదేశిక ఆకారాలు:",
    dyscalculiaRisk: "డిస్కాల్కులియా ప్రమాదం:",
    gradeAligned: "తరగతికి తగినది",
    advanced: "ఉన్నతమైనది",
    lowNormal: "తక్కువ / సాధారణం",
    allReady: "మొత్తం 6 సాహసాలు సిద్ధంగా ఉన్నాయి",

    // Stages Screen
    stagesEyebrow: "క్లినికల్ & విద్యా పాఠ్యాంశాలు",
    stagesTitle: "జ్ఞానపరమైన మూల్యాంకన మాడ్యూల్స్",
    stagesDesc: "క్రింది మాడ్యూల్‌ను ఎంచుకోండి. మీ స్పందనలు నిజ-సమయంలో విశ్లేషించబడతాయి.",
    savedProgress: "భద్రపరిచిన పురోగతి",
    backBtn: "← వెనుకకు",
    portalBtn: "3D ప్రధాన పోర్టల్",
    difficultyLevel: "కఠినత స్థాయి:",

    // Profile Screen
    profileHeading: "అన్వేషకుడి పాస్‌పోర్ట్ & ప్రొఫైల్స్",
    profileSub: "విద్యార్థి రికార్డులను సృష్టించండి, తరగతి స్థాయిని నిర్ణయించండి మరియు పురోగతిని పర్యవేక్షించండి.",
    studentNameLabel: "విద్యార్థి / అన్వేషకుడి పేరు",
    studentAgeLabel: "వయస్సు",
    studentGradeLabel: "తరగతి / గ్రేడ్",
    savePassportBtn: "పాస్‌పోర్ట్ సేవ్ చేయండి",
    activeProfileTitle: "ప్రస్తుత అన్వేషకుడు",
    allProfilesTitle: "భద్రపరిచిన పాస్‌పోర్ట్‌లు",

    // Teacher Screen
    teacherTitle: "గైడ్ & ఉపాధ్యాయుల పరిశోధనా జర్నల్",
    teacherSub: "సమగ్ర రోగనిర్ధారణ సమాచారం మరియు వ్యక్తిగత బోధనా సిఫార్సులు.",
    btnPrintReport: "నివేదికను ప్రింట్ చేయండి",
    btnExportJson: "డేటాను ఎగుమతి చేయండి (JSON)",
    studentDirectory: "విద్యార్థుల జాబితా",
    clinicalSummary: "క్లినికల్ సారాంశం",

    // Common Controls
    startAdventure: "సాహసం ప్రారంభించండి",
    next: "తరువాత",
    submit: "సమర్పించు",
    tryAgain: "మళ్ళీ ప్రయత్నించండి",
    congratulations: "అభినందనలు!",
    score: "స్కోరు",
    accuracy: "ఖచ్చితత్వం",
    timeTaken: "పట్టిన సమయం",

    // Footer
    footerTitle: "డిస్లెక్సియాక్వెస్ట్ • లెక్సిస్ మాయా అడవి",
    footerTagline: "డిస్లెక్సిక్ పిల్లల ఆత్మవిశ్వాసం మరియు సమ్మిళిత విద్య కోసం ఎంతో ప్రేమతో రూపొందించబడింది."
  },

  bn: {
    // Brand & Header
    brandTitle: "ডিসলেক্সিয়াকোয়েস্ট",
    brandSub: "জঙ্গল অভিযান ও শিখন",
    navCamp: "ক্যাম্প ও মানচিত্র",
    navExpeditions: "৬টি অভিযান",
    navPassport: "অভিযাত্রী পাসপোর্ট",
    navJournal: "গাইড জার্নাল",
    fontDyslexic: "ডিসলেক্সিক ফন্ট",
    fontStandard: "সাধারণ ফন্ট",
    soundOn: "শব্দ চালু",
    soundOff: "শব্দ বন্ধ",
    passportsTitle: "অভিযাত্রী পাসপোর্ট তালিকা",
    newPassport: "+ নতুন",
    managePassports: "সকল পাসপোর্ট পরিচালনা করুন",
    classLabel: "শ্রেণি",
    juniorExplorer: "কনিষ্ঠ অভিযাত্রী",
    guestExplorer: "কনিষ্ঠ অভিযাত্রী (অতিথি)",
    currentExplorerLabel: "বর্তমান অভিযাত্রী:",
    calibratedFor: "নির্ধারিত শ্রেণি",

    // Hero Section
    heroTag: "লেক্সিসের রহস্যময় জঙ্গল • জ্ঞানীয় রোমাঞ্চকর অভিযান",
    heroTitlePrefix: "আপনি কি প্রস্তুত",
    heroTitleHighlight: "জঙ্গল অভিযানের জন্য?",
    heroLead: "একটি জাদুকরী গল্পময় জঙ্গলে প্রবেশ করুন যেখানে মজাদার খেলার মাধ্যমে পড়ার সাবলীলতা, অক্ষরের দিকভ্রান্তি (b বনাম d), উচ্চারণ এবং 3D স্থানিক বোধের মূল্যায়ন ও উন্নতি ঘটে!",
    btnStartExpedition: "মডিউল ০১ অভিযান শুরু করুন",
    btnExploreGlades: "সব ৬টি জঙ্গল অঞ্চল দেখুন",
    btnEditPassport: "পাসপোর্ট পরিবর্তন",

    // Mascot
    mascotTitle: "অলি - জঙ্গল গাইড প্যাঁচা",
    mascotIdle: "আমার চোখ আপনার কার্সার অনুসরণ করে! আমাকে স্পর্শ করুন!",
    mascotHappy: "দারুণ অভিযাত্রী, তুমি পারবে!",
    mascotCelebrate: "হুররে! নতুন অ্যাডভেঞ্চার অপেক্ষা করছে!",
    mascotNote: "অলিস নোট: মাউস নাড়ান! আমার চোখ আপনার সাথে নড়াচড়া করে। যখন খুশি আমাকে স্পর্শ করুন!",

    // Modules
    mod1Name: "ঈগল দৃষ্টি দ্বীপ",
    mod1Title: "দৃশ্যগত প্রত্যক্ষণ ও দিকনির্দেশনা",
    mod1Subtitle: "আয়না অক্ষর (b বনাম d) ও প্রতিসাম্য",
    mod1Badge: "২৭টি প্রশ্ন • ৩টি স্তর",
    mod1Desc: "পবিত্র কুঞ্জে আয়না অক্ষরের বিভ্রান্তি চিহ্নিত করুন এবং সঠিক দিক নির্দেশ করুন।",

    mod2Name: "প্রতিধ্বনি অভয়ারণ্য",
    mod2Title: "শ্রবণ প্রক্রিয়াকরণ ও বাক্শক্তি",
    mod2Subtitle: "ধ্বনি সচেতনতা ও মৌখিক পড়ার সাবলীলতা",
    mod2Badge: "মাইক সক্রিয়",
    mod2Desc: "তোতাপাখির স্ফটিকে বনের জাদুকরী শব্দগুলি জোরে বলুন এবং ধ্বনির সময়সীমা পরীক্ষা করুন।",

    mod3Name: "লতা বুনন কুটির",
    mod3Title: "লিখিত প্রকাশ ও স্মৃতিশক্তি",
    mod3Subtitle: "এলোমেলো অক্ষর সাজিয়ে শব্দ তৈরি (অ্যানাগ্রাম)",
    mod3Badge: "শব্দ ধাঁধা",
    mod3Desc: "জটিল লতা থেকে অক্ষর আলাদা করে জাদুকরী শব্দ তৈরি করুন এবং স্মৃতিশক্তি বাড়ান।",

    mod4Name: "গণিত জুতসু মন্দির",
    mod4Title: "গাণিতিক যুক্তি ও চিন্তা",
    mod4Subtitle: "ডিসক্যালকুলিয়া স্ক্রীনিং ও পাটিগণিত",
    mod4Badge: "সংখ্যাগত যুক্তি",
    mod4Desc: "বাঁশের গণনার কাঠি, সংখ্যাবোধ এবং মানসিক পাটিগণিতের চ্যালেঞ্জগুলো রপ্ত করুন।",

    mod5Name: "সূর্যশিলা বেদি",
    mod5Title: "স্থানিক জ্যামিতি ও 3D আকার",
    mod5Subtitle: "3D আকার ঘূর্ণন ও স্থানিক যুক্তি",
    mod5Badge: "3D বেদি",
    mod5Desc: "প্রাচীন সৌর স্ফটিক (ঘনক, প্রিজম, পিরামিড) ঘুরিয়ে জ্যামিতিক রহস্য সমাধান করুন।",

    mod6Name: "গল্পকারের হ্রদ",
    mod6Title: "পঠন অনুধাবন ও উপলব্ধি",
    mod6Subtitle: "অনুচ্ছেদ পড়ার গতি ও শব্দ স্মরণ",
    mod6Badge: "শ্রেণি উপযোগী",
    mod6Desc: "মুগ্ধকর জঙ্গল কাহিনিতে ডুব দিন, পড়ার গতি বাড়ান এবং প্রশ্নের সঠিক উত্তর দিন।",

    // Trail Map
    trailMapTitle: "ক্যানোপি অভিযান পথ",
    trailMapSubtitle: "ছয়টি বহু-সংবেদী পরীক্ষণ কেন্দ্র। প্রাচীন নিদর্শন জয়ের জন্য প্রতিটি স্তর সম্পূর্ণ করুন।",
    trailProgress: "অভিযান অগ্রগতি",
    waypointsCompleted: "সম্পূর্ণ স্তর",
    relicsCollected: "অর্জিত নিদর্শন",
    launchExpedition: "অভিযান শুরু করুন →",
    completed: "সম্পূর্ণ",
    readyToExplore: "অন্বেষণে প্রস্তুত",

    // Methodology Tablet
    clinicalEngine: "ক্লিনিকাল ডায়াগনস্টিক ইঞ্জিন",
    evidenceBasedTitle: "প্রমাণ-ভিত্তিক জ্ঞানীয় মূল্যায়ন",
    evidenceBasedDesc: "শিশু যখন জঙ্গল অন্বেষণ করে, ডিসলেক্সিয়াকোয়েস্ট সঠিক ক্লিনিকাল ডেটা সংগ্রহ করে: আয়না অক্ষরের বিভ্রান্তি (b/d), উচ্চারণ নির্ভুলতা এবং 3D স্থানিক যুক্তি।",
    feat1: "মানসম্মত আয়না অক্ষর (b/d/p/q) ত্রুটি সূচক",
    feat2: "Web Speech API দ্বারা রিয়েল-টাইম ভয়েস বিশ্লেষণ",
    feat3: "বিদ্যালয় ও চিকিৎসকদের জন্য মুদ্রণযোগ্য বিশদ রিপোর্ট",
    btnOpenDiagnostic: "শিক্ষার্থী মূল্যায়ন ড্যাশবোর্ড খুলুন →",
    metricsPreview: "অভিযান মেট্রিক্স পূর্বরূপ",
    visualOrthography: "দৃশ্যগত বর্ণ পরিচয়:",
    phoneticSpeech: "ধ্বনিগত উচ্চারণ:",
    spatialSolids: "3D স্থানিক আকার:",
    dyscalculiaRisk: "ডিসক্যালকুলিয়া ঝুঁকি:",
    gradeAligned: "শ্রেণি উপযোগী",
    advanced: "উন্নত",
    lowNormal: "কম / স্বাভাবিক",
    allReady: "সকল ৬টি অভিযান প্রস্তুত",

    // Stages Screen
    stagesEyebrow: "ক্লিনিকাল ও শিক্ষামূলক পাঠ্যক্রম",
    stagesTitle: "জ্ঞানীয় মূল্যায়ন মডিউল",
    stagesDesc: "নিচের একটি মডিউল নির্বাচন করুন। আপনার উত্তরের রিয়েল-টাইম বিশ্লেষণ করা হবে।",
    savedProgress: "সংরক্ষিত অগ্রগতি",
    backBtn: "← পেছনে যান",
    portalBtn: "3D প্রধান পোর্টাল",
    difficultyLevel: "কঠিনতার স্তর:",

    // Profile Screen
    profileHeading: "অভিযাত্রী পাসপোর্ট ও প্রোফাইল",
    profileSub: "শিক্ষার্থী রেকর্ড তৈরি করুন, শ্রেণির স্তর নির্ধারণ করুন এবং অগ্রগতি পর্যবেক্ষণ করুন।",
    studentNameLabel: "শিক্ষার্থী / অভিযাত্রীর নাম",
    studentAgeLabel: "বয়স",
    studentGradeLabel: "শ্রেণি / গ্রেড",
    savePassportBtn: "পাসপোর্ট সংরক্ষণ করুন",
    activeProfileTitle: "সক্রিয় অভিযাত্রী",
    allProfilesTitle: "সংরক্ষিত পাসপোর্টসমূহ",

    // Teacher Screen
    teacherTitle: "গাইড ও শিক্ষক গবেষণা জার্নাল",
    teacherSub: "বিস্তারিত ক্লিনিকাল ডেটা এবং ব্যক্তিগত শিক্ষা সুপারিশ।",
    btnPrintReport: "রিপোর্ট প্রিন্ট করুন",
    btnExportJson: "ডেটা এক্সপোর্ট করুন (JSON)",
    studentDirectory: "শিক্ষার্থী তালিকা",
    clinicalSummary: "ক্লিনিকাল সারসংক্ষেপ",

    // Common Controls
    startAdventure: "অভিযান শুরু করুন",
    next: "পরবর্তী",
    submit: "জমা দিন",
    tryAgain: "আবার চেষ্টা করুন",
    congratulations: "অভিনন্দন!",
    score: "স্কোর",
    accuracy: "নির্ভুলতা",
    timeTaken: "গৃহীত সময়",

    // Footer
    footerTitle: "ডিসলেক্সিয়াকোয়েস্ট • লেক্সিসের রহস্যময় জঙ্গল",
    footerTagline: "ডিসলেক্সিক শিশুদের উজ্জ্বল ভবিষ্যৎ ও অন্তর্ভুক্তিমূলক শিক্ষার জন্য ভালোবাসায় নির্মিত।"
  },

  gu: {
    // Brand & Header
    brandTitle: "ડિસ્લેક્સિયાક્વેસ્ટ",
    brandSub: "જંગલ સાહસ અને શિક્ષણ",
    navCamp: "કેમ્પ અને નકશો",
    navExpeditions: "૬ સાહસો",
    navPassport: "સંશોધક પાસપોર્ટ",
    navJournal: "માર્ગદર્શક ડાયરી",
    fontDyslexic: "ડિસ્લેક્સિક ફોન્ટ",
    fontStandard: "સામાન્ય ફોન્ટ",
    soundOn: "અવાજ ચાલુ",
    soundOff: "અવાજ બંધ",
    passportsTitle: "સંશોધક પાસપોર્ટ યાદી",
    newPassport: "+ નવું",
    managePassports: "બધા પાસપોર્ટ સંચાલિત કરો",
    classLabel: "ધોરણ",
    juniorExplorer: "બાળ સંશોધક",
    guestExplorer: "બાળ સંશોધક (મહેમાન)",
    currentExplorerLabel: "હાલના સંશોધક:",
    calibratedFor: "અનુકૂળ ધોરણ",

    // Hero Section
    heroTag: "લેક્સિસનું રહસ્યમય જંગલ • જ્ઞાનાત્મક સાહસિક સફર",
    heroTitlePrefix: "શું તમે તૈયાર છો",
    heroTitleHighlight: "જંગલ સફર માટે?",
    heroLead: "એક જાદુઈ સચિત્ર જંગલમાં પ્રવેશો જ્યાં મનોરંજક રમતો દ્વારા વાંચન ઝડપ, અક્ષરોની દિશા (b વિરુદ્ધ d), ઉચ્ચારણ અને 3D અવકાશીય સમજનું સચોટ મૂલ્યાંકન થાય છે!",
    btnStartExpedition: "મોડ્યુલ ૦૧ સાહસ શરૂ કરો",
    btnExploreGlades: "બધા ૬ વન વિભાગો જુઓ",
    btnEditPassport: "પાસપોર્ટ બદલો",

    // Mascot
    mascotTitle: "ઓલી - જંગલ ગાઇડ ઘુવડ",
    mascotIdle: "મારી આંખો કર્સરને અનુસરે છે! મને સ્પર્શ કરો!",
    mascotHappy: "શાબાશ સંશોધક, તમે જીતી શકશો!",
    mascotCelebrate: "અરે વાહ! નવું સાહસ રાહ જુએ છે!",
    mascotNote: "ઓલીનો સંદેશ: માઉસ ફેરવો! મારી આંખો તમારી સાથે ફરશે. ગમે ત્યારે મને અડો!",

    // Modules
    mod1Name: "ગરુડ દ્રષ્ટિ ટાપુ",
    mod1Title: "દ્રશ્ય સમજ અને દિશા બોધ",
    mod1Subtitle: "દર્પણ અક્ષરો (b વિરુદ્ધ d) અને સમપ્રમાણતા",
    mod1Badge: "૨૭ પ્રશ્નો • ૩ સ્તર",
    mod1Desc: "પવિત્ર જંગલમાં અરીસાના ઉલટા અક્ષરો ઓળખો અને સાચી દિશા શોધો.",

    mod2Name: "પડઘા અભયારણ્ય",
    mod2Title: "શ્રવણ પ્રક્રિયા અને વાણી",
    mod2Subtitle: "ધ્વનિ ઓળખ અને મૌખિક વાંચન પ્રવાહ",
    mod2Badge: "માઈક સક્રિય",
    mod2Desc: "પોપટના સ્ફટિકમાં જંગલના જાદુઈ શબ્દો મોટેથી બોલો અને ધ્વનિ ગતિ ચકાસો.",

    mod3Name: "વેલ વણકર કુટીર",
    mod3Title: "લેખિત અભિવ્યક્તિ અને સ્મૃતિ",
    mod3Subtitle: "ગૂંચવાયેલા અક્ષરોમાંથી શબ્દ રચના (એનાગ્રામ)",
    mod3Badge: "શબ્દ કોયડો",
    mod3Desc: "ગૂંચવાયેલી વેલોમાંથી અક્ષરો છૂટા પાડી જાદુઈ શબ્દો બનાવો અને સ્મૃતિ સુધારો.",

    mod4Name: "ગણિત જુત્સુ મંદિર",
    mod4Title: "ગાણિતિક તર્ક અને વિચાર",
    mod4Subtitle: "ડિસ્કેલ્ક્યુલિયા સ્ક્રીનીંગ અને અંકગણિત",
    mod4Badge: "સંખ્યાત્મક તર્ક",
    mod4Desc: "વાંસની ગણતરી સળીઓ, સંખ્યા જ્ઞાન અને માનસિક ગણિતના પડકારો સરળતાથી ઉકેલો.",

    mod5Name: "સૂર્યશિલા વેદી",
    mod5Title: "અવકાશીય ભૂમિતિ અને 3D આકારો",
    mod5Subtitle: "3D આકાર પરિભ્રમણ અને અવકાશીય તર્ક",
    mod5Badge: "3D વેદી",
    mod5Desc: "પ્રાચીન સૂર્ય-સ્ફટિકો (સમઘન, પ્રિઝમ, પિરામિડ) ફેરવી ભૂમિતિના રહસ્યો ઉકેલો.",

    mod6Name: "વાર્તાકારનું તળાવ",
    mod6Title: "વાંચન ગહનતા અને સમજ",
    mod6Subtitle: "ફકરા વાંચન ગતિ અને શબ્દ સ્મરણ",
    mod6Badge: "ધોરણ અનુસાર",
    mod6Desc: "સુંદર જંગલ કથાઓમાં ડૂબી જાઓ, વાંચન ઝડપ વધારો અને પ્રશ્નોના જવાબો આપો.",

    // Trail Map
    trailMapTitle: "કેનોપી સાહસ માર્ગ",
    trailMapSubtitle: "છ બહુ-સંવેદી પડાવો. પ્રાચીન અવશેષો જીતવા માટે દરેક તબક્કો પૂર્ણ કરો.",
    trailProgress: "માર્ગ પ્રગતિ",
    waypointsCompleted: "પૂર્ણ તબક્કા",
    relicsCollected: "એકત્રિત અવશેષો",
    launchExpedition: "સાહસ શરૂ કરો →",
    completed: "પૂર્ણ",
    readyToExplore: "તૈયાર",

    // Methodology Tablet
    clinicalEngine: "ક્લિનિકલ ડાયગ્નોસ્ટિક એન્જિન",
    evidenceBasedTitle: "પુરાવા-આધારિત જ્ઞાનાત્મક મૂલ્યાંકન",
    evidenceBasedDesc: "બાળક જંગલમાં રમે છે ત્યારે ડિસ્લેક્સિયાક્વેસ્ટ સચોટ માહિતી નોંધે છે: દર્પણ અક્ષરોની ભૂલો (b/d), વાણી શુદ્ધતા અને 3D અવકાશીય તર્ક.",
    feat1: "પ્રમાણભૂત દર્પણ અક્ષર (b/d/p/q) ક્ષતિ સૂચકાંક",
    feat2: "Web Speech API દ્વારા રીઅલ-ટાઇમ વાણી વિશ્લેષણ",
    feat3: "શાળાઓ અને ડોક્ટરો માટે છાપવા યોગ્ય વિગતવાર અહેવાલ",
    btnOpenDiagnostic: "વિદ્યાર્થી ડાયગ્નોસ્ટિક ડેશબોર્ડ ખોલો →",
    metricsPreview: "સાહસ પરિમાણો પૂર્વાવલોકન",
    visualOrthography: "દ્રશ્ય અક્ષર ઓળખ:",
    phoneticSpeech: "ધ્વનિ ઉચ્ચારણ:",
    spatialSolids: "3D અવકાશીય આકારો:",
    dyscalculiaRisk: "ડિસ્કેલ્ક્યુલિયા જોખમ:",
    gradeAligned: "ધોરણ અનુસાર યોગ્ય",
    advanced: "ઉચ્ચ સ્તર",
    lowNormal: "ઓછું / સામાન્ય",
    allReady: "બધા ૬ સાહસો તૈયાર છે",

    // Stages Screen
    stagesEyebrow: "શૈક્ષણિક અને ક્લિનિકલ અભ્યાસક્રમ",
    stagesTitle: "જ્ઞાનાત્મક મૂલ્યાંકન મોડ્યુલ્સ",
    stagesDesc: "નીચેથી એક મોડ્યુલ પસંદ કરો. તમારા પ્રતિભાવોનું તુરંત વિશ્લેષણ કરવામાં આવશે.",
    savedProgress: "સાચવેલી પ્રગતિ",
    backBtn: "← પાછા જાઓ",
    portalBtn: "3D મુખ્ય પોર્ટલ",
    difficultyLevel: "મુશ્કેલી સ્તર:",

    // Profile Screen
    profileHeading: "સંશોધક પાસપોર્ટ અને પ્રોફાઇલ",
    profileSub: "વિદ્યાર્થી રેકોર્ડ્સ બનાવો, ધોરણ પસંદ કરો અને શીખવાની પ્રગતિ જુઓ.",
    studentNameLabel: "વિદ્યાર્થી / સંશોધકનું નામ",
    studentAgeLabel: "ઉંમર",
    studentGradeLabel: "ધોરણ / વર્ગ",
    savePassportBtn: "પાસપોર્ટ સાચવો",
    activeProfileTitle: "સક્રિય સંશોધક",
    allProfilesTitle: "સાચવેલા પાસપોર્ટ",

    // Teacher Screen
    teacherTitle: "માર્ગદર્શક અને શિક્ષક સંશોધન ડાયરી",
    teacherSub: "વિગતવાર ડાયગ્નોસ્ટિક ડેટા અને વ્યક્તિગત શિક્ષણ ભલામણો.",
    btnPrintReport: "અહેવાલ પ્રિન્ટ કરો",
    btnExportJson: "ડેટા નિકાસ કરો (JSON)",
    studentDirectory: "વિદ્યાર્થી યાદી",
    clinicalSummary: "ક્લિનિકલ સારાંશ",

    // Common Controls
    startAdventure: "સાહસ શરૂ કરો",
    next: "આગળ",
    submit: "જમા કરો",
    tryAgain: "ફરી પ્રયાસ કરો",
    congratulations: "અભિનંદન!",
    score: "ગુણ",
    accuracy: "ચોકસાઈ",
    timeTaken: "લાગેલો સમય",

    // Footer
    footerTitle: "ડિસ્લેક્સિયાક્વેસ્ટ • લેક્સિસનું રહસ્યમય જંગલ",
    footerTagline: "ડિસ્લેક્સિક બાળકોના ઉત્સાહ અને સમાવેશી શિક્ષણ માટે પ્રેમપૂર્વક નિર્મિત."
  },

  kn: {
    // Brand & Header
    brandTitle: "ಡಿಸ್ಲೆಕ್ಸಿಯಾಕ್ವೆಸ್ಟ್",
    brandSub: "ಕಾಡಿನ ಸಾಹಸ ಮತ್ತು ಕಲಿಕೆ",
    navCamp: "ಕ್ಯಾಂಪ್ & ನಕ್ಷೆ",
    navExpeditions: "೬ ಸಾಹಸಗಳು",
    navPassport: "ಸಂಶೋಧಕ ಪಾಸ್‌ಪೋರ್ಟ್",
    navJournal: "ಮಾರ್ಗದರ್ಶಿ ದಿನಚರಿ",
    fontDyslexic: "ಡಿಸ್ಲೆಕ್ಸಿಕ್ ಫಾಂಟ್",
    fontStandard: "ಸಾಮಾನ್ಯ ಫಾಂಟ್",
    soundOn: "ಧ್ವನಿ ಆನ್",
    soundOff: "ಧ್ವನಿ ಆಫ್",
    passportsTitle: "ಸಂಶೋಧಕರ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು",
    newPassport: "+ ಹೊಸದು",
    managePassports: "ಎಲ್ಲಾ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    classLabel: "ತರಗತಿ",
    juniorExplorer: "ಕಿರಿಯ ಸಂಶೋಧಕ",
    guestExplorer: "ಕಿರಿಯ ಸಂಶೋಧಕ (ಅತಿಥಿ)",
    currentExplorerLabel: "ಪ್ರಸ್ತುತ ಸಂಶೋಧಕ:",
    calibratedFor: "ಹೊಂದಿಸಲಾದ ತರಗತಿ",

    // Hero Section
    heroTag: "ಲೆಕ್ಸಿಸ್ ಮಾಯಾ ಅರಣ್ಯ • ಜ್ಞಾನ ಸಾಹಸ ಯಾನ",
    heroTitlePrefix: "ನೀವು ಸಿದ್ಧರಿದ್ದೀರಾ",
    heroTitleHighlight: "ಕಾಡಿನ ಸಾಹಸಕ್ಕಾಗಿ?",
    heroLead: "ಚಿತ್ರಕಥೆಯ ಮಾಂತ್ರಿಕ ಅರಣ್ಯಕ್ಕೆ ಹೆಜ್ಜೆ ಇಡಿ! ಓದುವ ವೇಗ, ಅಕ್ಷರಗಳ ದಿಕ್ಕು (b ಮತ್ತು d), ಧ್ವನಿ ಉಚ್ಚಾರಣೆ ಮತ್ತು 3D ಪ್ರಾದೇಶಿಕ ಗ್ರಹಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ ಬಲಪಡಿಸುವ ಮೋಜಿನ ಸಾಹಸ ಆಟಗಳು!",
    btnStartExpedition: "ಮಾಡ್ಯೂಲ್ ೦೧ ಸಾಹಸ ಪ್ರಾರಂಭಿಸಿ",
    btnExploreGlades: "ಎಲ್ಲಾ ೬ ಅರಣ್ಯ ಭಾಗಗಳನ್ನು ನೋಡಿ",
    btnEditPassport: "ಪಾಸ್‌ಪೋರ್ಟ್ ಬದಲಾಯಿಸಿ",

    // Mascot
    mascotTitle: "ಆಲಿ - ಅರಣ್ಯ ಮಾರ್ಗದರ್ಶಿ ಗೂಬೆ",
    mascotIdle: "ನನ್ನ ಕಣ್ಣುಗಳು ನಿಮ್ಮ ಕರ್ಸರ್ ಅನ್ನು ಹಿಂಬಾಲಿಸುತ್ತವೆ! ನನ್ನನ್ನು ಮುಟ್ಟಿ!",
    mascotHappy: "ಅದ್ಭುತ ಸಂಶೋಧಕರೇ, ನೀವು ಗೆಲ್ಲಬಲ್ಲಿರಿ!",
    mascotCelebrate: "ಹುರ್ರೇ! ಹೊಸ ಸಾಹಸ ಕಾಯುತ್ತಿದೆ!",
    mascotNote: "ಆಲಿಯ ಟಿಪ್ಪಣಿ: ಮೌಸ್ ಚಲಾಯಿಸಿ! ನನ್ನ ಕಣ್ಣುಗಳು ನಿಮ್ಮೊಂದಿಗೆ ಚಲಿಸುತ್ತವೆ. ಯಾವಾಗ ಬೇಕಾದರೂ ನನ್ನನ್ನು ಮುಟ್ಟಿ!",

    // Modules
    mod1Name: "ಹದ್ದು ಕಣ್ಣಿನ ದ್ವೀಪ",
    mod1Title: "ದೃಶ್ಯ ಗ್ರಹಿಕೆ & ದಿಕ್ಕು ಬೋಧನೆ",
    mod1Subtitle: "ಕನ್ನಡಿ ಅಕ್ಷರಗಳು (b vs d) & ಸಮರೂಪತೆ",
    mod1Badge: "೨೭ ಪ್ರಶ್ನೆಗಳು • ೩ ಹಂತಗಳು",
    mod1Desc: "ಪವಿತ್ರ ಕಾಡಿನಲ್ಲಿ ಕನ್ನಡಿ ಅಕ್ಷರಗಳ ಗೊಂದಲಗಳನ್ನು ಗುರುತಿಸಿ ಸರಿಯಾದ ದಿಕ್ಕನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",

    mod2Name: "ಪ್ರತಿಧ್ವನಿ ಅಭಯಾರಣ್ಯ",
    mod2Title: "ಶ್ರವಣ ಪ್ರಕ್ರಿಯೆ & ಮಾತು",
    mod2Subtitle: "ಧ್ವನಿ ಅರಿವು & ಮೌಖಿಕ ಓದುವ ಸರಾಗತೆ",
    mod2Badge: "ಮೈಕ್ ಆನ್ ಆಗಿದೆ",
    mod2Desc: "ಗಿಳಿಯ ಸ್ಫಟಿಕದಲ್ಲಿ ಕಾಡಿನ ಮಾಂತ್ರಿಕ ಪದಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಹೇಳಿ ಧ್ವನಿ ವೇಗವನ್ನು ಪರೀಕ್ಷಿಸಿ.",

    mod3Name: "ಬಳ್ಳಿ ನೇಯ್ಗೆಯ ಮನೆ",
    mod3Title: "ಲಿಖಿತ ಅಭಿವ್ಯಕ್ತಿ & ಸ್ಮರಣಶಕ್ತಿ",
    mod3Subtitle: "ಅಸ್ತವ್ಯಸ್ತ ಅಕ್ಷರಗಳಿಂದ ಪದ ರಚನೆ (ಅನಾಗ್ರಾಮ್)",
    mod3Badge: "ಪದ ಒಗಟು",
    mod3Desc: "ಸಿಕ್ಕುಬಿದ್ದ ಬಳ್ಳಿಗಳಿಂದ ಅಕ್ಷರಗಳನ್ನು ಬಿಡಿಸಿ ಮಾಂತ್ರಿಕ ಪದಗಳನ್ನು ರಚಿಸಿ ಸ್ಮರಣಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಿ.",

    mod4Name: "ಗಣಿತ ಜುಟ್ಸು ದೇವಾಲಯ",
    mod4Title: "ಗಣಿತ ತರ್ಕ & ಚಿಂತನೆ",
    mod4Subtitle: "ಡಿಸ್ಕಾಲ್ಕುಲಿಯಾ ತಪಾಸಣೆ & ಅಂಕಗಣಿತ",
    mod4Badge: "ಸಂಖ್ಯಾ ತರ್ಕ",
    mod4Desc: "ಬಿದಿರಿನ ಎಣಿಕೆ ಕಡ್ಡಿಗಳು, ಸಂಖ್ಯಾ ಜ್ಞಾನ ಮತ್ತು ಮಾನಸಿಕ ಗಣಿತದ ಸವಾಲುಗಳನ್ನು ಕಲಿಯಿರಿ.",

    mod5Name: "ಸೂರ್ಯಶಿಲಾ ವೇದಿಕೆ",
    mod5Title: "ಪ್ರಾದೇಶಿಕ ರೇಖಾಗಣಿತ & 3D ಆಕಾರಗಳು",
    mod5Subtitle: "3D ಆಕಾರ ತಿರುಗಿಸುವಿಕೆ & ಪ್ರಾದೇಶಿಕ ತರ್ಕ",
    mod5Badge: "3D ವೇದಿಕೆ",
    mod5Desc: "ಪ್ರಾಚೀನ ಸೂರ್ಯ ಸ್ಫಟಿಕಗಳನ್ನು (ಘನ, ಪ್ರಿಸ್ಮ್, ಪಿರಮಿಡ್) ತಿರುಗಿಸಿ ರೇಖಾಗಣಿತದ ರಹಸ್ಯಗಳನ್ನು ತಿಳಿಯಿರಿ.",

    mod6Name: "ಕಥೆಗಾರರ ಸರೋವರ",
    mod6Title: "ಓದುವ ಗ್ರಹಿಕೆ & ತಿಳುವಳಿಕೆ",
    mod6Subtitle: "ಗದ್ಯಾಂಶ ಓದುವ ವೇಗ & ಪದ ಸ್ಮರಣೆ",
    mod6Badge: "ತರಗತಿಗೆ ಅನುಗುಣವಾಗಿದೆ",
    mod6Desc: "ಕಾಡಿನ ಸುಂದರ ಕಥೆಗಳಲ್ಲಿ ಮುಳುಗಿ, ಓದುವ ವೇಗವನ್ನು ಹೆಚ್ಚಿಸಿ ಮತ್ತು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",

    // Trail Map
    trailMapTitle: "ಕ್ಯಾನೋಪಿ ಸಾಹಸ ಪಥ",
    trailMapSubtitle: "ಆರು ಬಹು-ಇಂದ್ರಿಯ ಪರೀಕ್ಷಾ ಕೇಂದ್ರಗಳು. ಪ್ರಾಚೀನ ಅವಶೇಷಗಳನ್ನು ಗೆಲ್ಲಲು ಪ್ರತಿಯೊಂದು ಹಂತವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",
    trailProgress: "ಪಥದ ಪ್ರಗತಿ",
    waypointsCompleted: "ಪೂರ್ಣಗೊಂಡ ಹಂತಗಳು",
    relicsCollected: "ಸಂಗ್ರಹಿಸಿದ ಅವಶೇಷಗಳು",
    launchExpedition: "ಸಾಹಸ ಪ್ರಾರಂಭಿಸಿ →",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    readyToExplore: "ಅನ್ವೇಷಣೆಗೆ ಸಿದ್ಧ",

    // Methodology Tablet
    clinicalEngine: "ಕ್ಲಿನಿಕಲ್ ಡಯಾಗ್ನಸ್ಟಿಕ್ ಎಂಜಿನ್",
    evidenceBasedTitle: "ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಅರಿವಿನ ಮೌಲ್ಯಮಾಪನ",
    evidenceBasedDesc: "ಮಗು ಕಾಡನ್ನು ಅನ್ವೇಷಿಸುವಾಗ ಡಿಸ್ಲೆಕ್ಸಿಯಾಕ್ವೆಸ್ಟ್ ನಿಖರವಾದ ದತ್ತಾಂಶವನ್ನು ದಾಖಲಿಸುತ್ತದೆ: ಕನ್ನಡಿ ಅಕ್ಷರಗಳ ಗೊಂದಲ (b/d), ಧ್ವನಿ ನಿಖರತೆ ಮತ್ತು 3D ಪ್ರಾದೇಶಿಕ ತರ್ಕ.",
    feat1: "ಪ್ರಮಾಣಿತ ಕನ್ನಡಿ ಅಕ್ಷರಗಳ (b/d/p/q) ದೋಷ ಸೂಚ್ಯಂಕ",
    feat2: "Web Speech API ಮೂಲಕ ನೈಜ-ಸಮಯದ ಧ್ವನಿ ವಿಶ್ಲೇಷಣೆ",
    feat3: "ಶಾಲೆಗಳು ಮತ್ತು ವೈದ್ಯರಿಗಾಗಿ ಮುದ್ರಿಸಬಹುದಾದ ಸಮಗ್ರ ವರದಿ",
    btnOpenDiagnostic: "ವಿದ್ಯಾರ್ಥಿ ಡಯಾಗ್ನಸ್ಟಿಕ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ →",
    metricsPreview: "ಸಾಹಸ ಮಾಪನಗಳ ಮುನ್ನೋಟ",
    visualOrthography: "ದೃಶ್ಯ ಅಕ್ಷರ ಗುರುತಿಸುವಿಕೆ:",
    phoneticSpeech: "ಧ್ವನಿ ಉಚ್ಚಾರಣೆ:",
    spatialSolids: "3D ಪ್ರಾದೇಶಿಕ ಆಕಾರಗಳು:",
    dyscalculiaRisk: "ಡಿಸ್ಕಾಲ್ಕುಲಿಯಾ ಅಪಾಯ:",
    gradeAligned: "ತರಗತಿಗೆ ಸೂಕ್ತ",
    advanced: "ಉನ್ನತ ಮಟ್ಟ",
    lowNormal: "ಕಡಿಮೆ / ಸಾಮಾನ್ಯ",
    allReady: "ಎಲ್ಲಾ ೬ ಸಾಹಸಗಳು ಸಿದ್ಧವಾಗಿವೆ",

    // Stages Screen
    stagesEyebrow: "ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ಪಠ್ಯಕ್ರಮ",
    stagesTitle: "ಅರಿವಿನ ಮೌಲ್ಯಮಾಪನ ಮಾಡ್ಯೂಲ್‌ಗಳು",
    stagesDesc: "ಕೆಳಗಿನ ಒಂದು ಮಾಡ್ಯೂಲ್ ಆಯ್ಕೆಮಾಡಿ. ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತದೆ.",
    savedProgress: "ಉಳಿಸಲಾದ ಪ್ರಗತಿ",
    backBtn: "← ಹಿಂದೆ",
    portalBtn: "3D ಮುಖ್ಯ ಪೋರ್ಟಲ್",
    difficultyLevel: "ಕಷ್ಟದ ಮಟ್ಟ:",

    // Profile Screen
    profileHeading: "ಸಂಶೋಧಕ ಪಾಸ್‌ಪೋರ್ಟ್ & ಪ್ರೊಫೈಲ್‌ಗಳು",
    profileSub: "ವಿದ್ಯಾರ್ಥಿ ದಾಖಲೆಗಳನ್ನು ರಚಿಸಿ, ತರಗತಿ ಮಟ್ಟವನ್ನು ನಿಗದಿಪಡಿಸಿ ಮತ್ತು ಕಲಿಕೆಯ ಪ್ರಗತಿಯನ್ನು ವೀಕ್ಷಿಸಿ.",
    studentNameLabel: "ವಿದ್ಯಾರ್ಥಿ / ಸಂಶೋಧಕರ ಹೆಸರು",
    studentAgeLabel: "ವಯಸ್ಸು",
    studentGradeLabel: "ತರಗತಿ / ಗ್ರೇಡ್",
    savePassportBtn: "ಪಾಸ್‌ಪೋರ್ಟ್ ಉಳಿಸಿ",
    activeProfileTitle: "ಪ್ರಸ್ತುತ ಸಂಶೋಧಕ",
    allProfilesTitle: "ಉಳಿಸಲಾದ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು",

    // Teacher Screen
    teacherTitle: "ಮಾರ್ಗದರ್ಶಿ & ಶಿಕ್ಷಕರ ಸಂಶೋಧನಾ ದಿನಚರಿ",
    teacherSub: "ವಿವರವಾದ ಕ್ಲಿನಿಕಲ್ ಡೇಟಾ ಮತ್ತು ವೈಯಕ್ತಿಕ ಬೋಧನಾ ಶಿಫಾರಸುಗಳು.",
    btnPrintReport: "ವರದಿ ಮುದ್ರಿಸಿ",
    btnExportJson: "ಡೇಟಾ ರಫ್ತು ಮಾಡಿ (JSON)",
    studentDirectory: "ವಿದ್ಯಾರ್ಥಿಗಳ ಪಟ್ಟಿ",
    clinicalSummary: "ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶ",

    // Common Controls
    startAdventure: "ಸಾಹಸ ಪ್ರಾರಂಭಿಸಿ",
    next: "ಮುಂದೆ",
    submit: "ಸಲ್ಲಿಸಿ",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    congratulations: "ಅಭಿನಂದನೆಗಳು!",
    score: "ಅಂಕಗಳು",
    accuracy: "ನಿಖರತೆ",
    timeTaken: "ತೆಗೆದುಕೊಂಡ ಸಮಯ",

    // Footer
    footerTitle: "ಡಿಸ್ಲೆಕ್ಸಿಯಾಕ್ವೆಸ್ಟ್ • ಲೆಕ್ಸಿಸ್ ಮಾಯಾ ಅರಣ್ಯ",
    footerTagline: "ಡಿಸ್ಲೆಕ್ಸಿಕ್ ಮಕ್ಕಳ ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಸಮಗ್ರ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಪ್ರೀತಿಯಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ."
  },

  ml: {
    // Brand & Header
    brandTitle: "ഡിസ്‌ലെക്സിയാക്വസ്റ്റ്",
    brandSub: "കാട്ടു സാഹസികതയും പഠനവും",
    navCamp: "ക്യാമ്പും ഭൂപടവും",
    navExpeditions: "6 യാത്രകൾ",
    navPassport: "പര്യവേക്ഷക പാസ്‌പോർട്ട്",
    navJournal: "ഗൈഡ് ഡയറി",
    fontDyslexic: "ഡിസ്‌ലെക്സിക് ഫോണ്ട്",
    fontStandard: "സാധാരണ ഫോണ്ട്",
    soundOn: "ശബ്ദം ഓൺ",
    soundOff: "ശബ്ദം ഓഫ്",
    passportsTitle: "പര്യവേക്ഷക പാസ്‌പോർട്ടുകൾ",
    newPassport: "+ പുതിയത്",
    managePassports: "എല്ലാ പാസ്‌പോർട്ടുകളും കൈകാര്യം ചെയ്യുക",
    classLabel: "ക്ലാസ്",
    juniorExplorer: "ജൂനിയർ പര്യവേക്ഷകൻ",
    guestExplorer: "ജൂനിയർ പര്യവേക്ഷകൻ (അതിഥി)",
    currentExplorerLabel: "നിലവിലെ പര്യവേക്ഷകൻ:",
    calibratedFor: "ക്ലാസിന് അനുയോജ്യമായത്",

    // Hero Section
    heroTag: "ലെക്സിസിന്റെ മാന്ത്രിക കാട് • വൈജ്ഞാനിക സാഹസിക യാത്ര",
    heroTitlePrefix: "നിങ്ങൾ തയ്യാറാണോ",
    heroTitleHighlight: "കാട്ടു യാത്രയ്ക്കായി?",
    heroLead: "മാന്ത്രികമായ ഒരു ചിത്രകഥാ വനത്തിലേക്ക് കടന്നുചെല്ലൂ! വായനാ വേഗത, അക്ഷരങ്ങളുടെ ദിശ (b vs d), ശബ്ദ ഉച്ചാരണം, 3D സ്പേഷ്യൽ ബോധം എന്നിവ വിലയിരുത്തുന്ന രസകരമായ സാഹസിക കളികൾ!",
    btnStartExpedition: "മൊഡ്യൂൾ 01 യാത്ര ആരംഭിക്കുക",
    btnExploreGlades: "എല്ലാ 6 വനമേഖലകളും കാണുക",
    btnEditPassport: "പാസ്‌പോർട്ട് തിരുത്തുക",

    // Mascot
    mascotTitle: "ഓലി - ഗൈഡ് മൂങ്ങ",
    mascotIdle: "എന്റെ കണ്ണുകൾ നിങ്ങളുടെ കർസറെ പിന്തുടരുന്നു! എന്നെ തൊടൂ!",
    mascotHappy: "നന്നായി ചെയ്യുന്നു പര്യവേക്ഷകാ, നിനക്ക് സാധിക്കും!",
    mascotCelebrate: "ഹുറേ! പുതിയ സാഹസികത കാത്തിരിക്കുന്നു!",
    mascotNote: "ഓലിയുടെ കുറിപ്പ്: മൗസ് ചലിപ്പിക്കൂ! എന്റെ കണ്ണുകൾ നിങ്ങളോടൊപ്പം നീങ്ങും. എപ്പോൾ വേണമെങ്കിലും എന്നെ തൊടാം!",

    // Modules
    mod1Name: "പരുന്ത് ദൃഷ്ടി ദ്വീപ്",
    mod1Title: "ദൃശ്യ ഗ്രഹണവും ദിശാബോധവും",
    mod1Subtitle: "കണ്ണാടി അക്ഷരങ്ങൾ (b vs d) & സമമിതി",
    mod1Badge: "27 ചോദ്യങ്ങൾ • 3 ലെവലുകൾ",
    mod1Desc: "വിശുദ്ധ വനത്തിൽ കണ്ണാടി അക്ഷരങ്ങളുടെ ആശയക്കുഴപ്പം കണ്ടെത്തി ശരിയായ ദിശ കണ്ടെത്തുക.",

    mod2Name: "പ്രതിധ്വനി സങ്കേതം",
    mod2Title: "ശ്രവണ പ്രക്രിയയും സംസാരവും",
    mod2Subtitle: "ശബ്ദ അവബോധവും വായനാ ഒഴുക്കും",
    mod2Badge: "മൈക്ക് ഓൺ ആണ്",
    mod2Desc: "തത്തയുടെ സ്ഫടികത്തിൽ കാട്ടിലെ മാന്ത്രിക വാക്കുകൾ ഉറക്കെ പറഞ്ഞ് നിങ്ങളുടെ ഉച്ചാരണ വേഗത പരിശോധിക്കുക.",

    mod3Name: "വള്ളി നെയ്ത്തുകാരന്റെ വീട്",
    mod3Title: "എഴുത്തു പ്രകടനവും ഓർമ്മശക്തിയും",
    mod3Subtitle: "അക്ഷരങ്ങൾ കൂട്ടി വാക്കുകൾ നിർമ്മിക്കൽ",
    mod3Badge: "വാക്ക് പസിൽ",
    mod3Desc: "പിണഞ്ഞു കിടക്കുന്ന വള്ളികളിൽ നിന്ന് അക്ഷരങ്ങൾ വേർതിരിച്ച് മാന്ത്രിക വാക്കുകൾ ഉണ്ടാക്കി ഓർമ്മശക്തി വർദ്ധിപ്പിക്കുക.",

    mod4Name: "ഗണിത ജുത്സു ക്ഷേത്രം",
    mod4Title: "ഗണിത യുക്തിയും ചിന്തയും",
    mod4Subtitle: "ഡിസ്കാൽക്കുലിയ പരിശോധനയും അങ്കഗണിതവും",
    mod4Badge: "സംഖ്യാ യുക്തി",
    mod4Desc: "മുളങ്കോലുകൾ, സംഖ്യാബോധം, മാനസിക ഗണിത വെല്ലുവിളികൾ എന്നിവ എളുപ്പത്തിൽ പഠിക്കുക.",

    mod5Name: "സൂര്യശിലാ പീഠം",
    mod5Title: "സ്പേഷ്യൽ ജ്യാമിതി & 3D രൂപങ്ങൾ",
    mod5Subtitle: "3D രൂപങ്ങൾ തിരിക്കലും സ്പേഷ്യൽ യുക്തിയും",
    mod5Badge: "3D പീഠം",
    mod5Desc: "പുരാതന സൂര്യ സ്ഫടികങ്ങൾ (ക്യൂബ്, പ്രിസം, പിരമിഡ്) തിരിച്ച് ജ്യാമിതീയ രഹസ്യങ്ങൾ ചുരുളഴിക്കുക.",

    mod6Name: "കഥപറച്ചിലുകാരന്റെ തടാകം",
    mod6Title: "വായനാ ഗ്രഹണവും ധാരണയും",
    mod6Subtitle: "ഖണ്ഡിക വായനാ വേഗതയും ഓർമ്മിച്ചെടുക്കലും",
    mod6Badge: "ക്ലാസിന് അനുയോജ്യം",
    mod6Desc: "മനോഹരമായ കാട്ടു കഥകളിൽ മുഴുകുക, വായനാ വേഗത വർദ്ധിപ്പിക്കുക, ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക.",

    // Trail Map
    trailMapTitle: "കാനോപ്പി സാഹസിക പാത",
    trailMapSubtitle: "ആറ് മൾട്ടി-സെൻസറി പരിശോധനാ കേന്ദ്രങ്ങൾ. പുരാതന അവശിഷ്ടങ്ങൾ നേടുന്നതിനായി ഓരോ ഘട്ടവും പൂർത്തിയാക്കുക.",
    trailProgress: "പാതയിലെ പുരോഗതി",
    waypointsCompleted: "പൂർത്തിയായ ഘട്ടങ്ങൾ",
    relicsCollected: "ശേഖരിച്ച അവശിഷ്ടങ്ങൾ",
    launchExpedition: "യാത്ര ആരംഭിക്കുക →",
    completed: "പൂർത്തിയായി",
    readyToExplore: "പര്യവേക്ഷണത്തിന് തയ്യാറാണ്",

    // Methodology Tablet
    clinicalEngine: "ക്ലിനിക്കൽ ഡയഗ്നോസ്റ്റിക് എഞ്ചിൻ",
    evidenceBasedTitle: "ശാസ്ത്രീയ വൈജ്ഞാനിക വിലയിരുത്തൽ",
    evidenceBasedDesc: "കുട്ടി കാട് പര്യവേക്ഷണം ചെയ്യുമ്പോൾ ഡിസ്‌ലെക്സിയാക്വസ്റ്റ് കൃത്യമായ വിവരങ്ങൾ രേഖപ്പെടുത്തുന്നു: കണ്ണാടി അക്ഷര പിശകുകൾ (b/d), സംസാര ശുദ്ധി, 3D സ്പേഷ്യൽ യുക്തി.",
    feat1: "സ്റ്റാൻഡേർഡൈസ്ഡ് കണ്ണാടി അക്ഷര (b/d/p/q) പിശക് സൂചിക",
    feat2: "Web Speech API വഴി തത്സമയ ശബ്ദ വിശകലനം",
    feat3: "സ്കൂളുകൾക്കും ഡോക്ടർമാർക്കും ഉപയോഗപ്രദമായ വിശദമായ റിപ്പോർട്ട്",
    btnOpenDiagnostic: "വിദ്യാർത്ഥി പരിശോധനാ ഡാഷ്‌ബോർഡ് തുറക്കുക →",
    metricsPreview: "യാത്രാ അളവുകളുടെ പ്രിവ്യൂ",
    visualOrthography: "ദൃശ്യ അക്ഷര തിരിച്ചറിയൽ:",
    phoneticSpeech: "ശബ്ദ ഉച്ചാരണം:",
    spatialSolids: "3D സ്പേഷ്യൽ രൂപങ്ങൾ:",
    dyscalculiaRisk: "ഡിസ്കാൽക്കുലിയ സാധ്യത:",
    gradeAligned: "ക്ലാസിന് അനുയോജ്യം",
    advanced: "ഉയർന്ന നിലവാരം",
    lowNormal: "കുറവ് / സാധാരണ",
    allReady: "എല്ലാ 6 യാത്രകളും തയ്യാറാണ്",

    // Stages Screen
    stagesEyebrow: "ക്ലിനിക്കൽ & വിദ്യാഭ്യാസ പാഠ്യപദ്ധതി",
    stagesTitle: "വൈജ്ഞാനിക വിലയിരുത്തൽ മൊഡ്യൂളുകൾ",
    stagesDesc: "താഴെ നൽകിയിരിക്കുന്ന ഒരു മൊഡ്യൂൾ തിരഞ്ഞെടുക്കുക. നിങ്ങളുടെ പ്രതികരണങ്ങൾ തത്സമയം വിശകലനം ചെയ്യപ്പെടും.",
    savedProgress: "സൂക്ഷിച്ച പുരോഗതി",
    backBtn: "← പിന്നോട്ട്",
    portalBtn: "3D പ്രധാന പോർട്ടൽ",
    difficultyLevel: "കാഠിന്യ നിലവാരം:",

    // Profile Screen
    profileHeading: "പര്യവേക്ഷക പാസ്‌പോർട്ട് & പ്രൊഫൈലുകൾ",
    profileSub: "വിദ്യാർത്ഥി രേഖകൾ ഉണ്ടാക്കുക, ക്ലാസ് ലെവൽ നിശ്ചയിക്കുക, പഠന പുരോഗതി നിരീക്ഷിക്കുക.",
    studentNameLabel: "വിദ്യാർത്ഥി / പര്യവേക്ഷകന്റെ പേര്",
    studentAgeLabel: "പ്രായം",
    studentGradeLabel: "ക്ലാസ് / ഗ്രേഡ്",
    savePassportBtn: "പാസ്‌പോർട്ട് സൂക്ഷിക്കുക",
    activeProfileTitle: "സജീവ പര്യവേക്ഷകൻ",
    allProfilesTitle: "സൂക്ഷിച്ച പാസ്‌പോർട്ടുകൾ",

    // Teacher Screen
    teacherTitle: "ഗൈഡ് & അധ്യാപക ഗവേഷണ ഡയറി",
    teacherSub: "വിശദമായ ക്ലിനിക്കൽ വിവരങ്ങളും വ്യക്തിഗത അധ്യാപന നിർദ്ദേശങ്ങളും.",
    btnPrintReport: "റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക",
    btnExportJson: "വിവരങ്ങൾ എക്സ്പോർട്ട് ചെയ്യുക (JSON)",
    studentDirectory: "വിദ്യാർത്ഥികളുടെ പട്ടിക",
    clinicalSummary: "ക്ലിനിക്കൽ സംഗ്രഹം",

    // Common Controls
    startAdventure: "സാഹസികത ആരംഭിക്കുക",
    next: "അടുത്തത്",
    submit: "സമർപ്പിക്കുക",
    tryAgain: "വീണ്ടും ശ്രമിക്കുക",
    congratulations: "അഭിനന്ദനങ്ങൾ!",
    score: "സ്കോർ",
    accuracy: "കൃത്യത",
    timeTaken: "എടുത്ത സമയം",

    // Footer
    footerTitle: "ഡിസ്‌ലെക്സിയാക്വസ്റ്റ് • ലെക്സിസിന്റെ മാന്ത്രിക കാട്",
    footerTagline: "ഡിസ്‌ലെക്സിക് കുട്ടികളുടെ ശോഭനമായ ഭാവിക്കും സമഗ്ര വിദ്യാഭ്യാസത്തിനുമായി സ്നേഹത്തോടെ നിർമ്മിച്ചത്."
  },

  pa: {
    // Brand & Header
    brandTitle: "ਡਿਸਲੈਕਸੀਆਕਵੈਸਟ",
    brandSub: "ਜੰਗਲ ਮੁਹਿੰਮ ਅਤੇ ਸਿੱਖਿਆ",
    navCamp: "ਕੈਂਪ ਅਤੇ ਨਕਸ਼ਾ",
    navExpeditions: "੬ ਮੁਹਿੰਮਾਂ",
    navPassport: "ਖੋਜੀ ਪਾਸਪੋਰਟ",
    navJournal: "ਗਾਈਡ ਡਾਇਰੀ",
    fontDyslexic: "ਡਿਸਲੈਕਸਿਕ ਫੌਂਟ",
    fontStandard: "ਸਾਧਾਰਨ ਫੌਂਟ",
    soundOn: "ਆਵਾਜ਼ ਚਾਲੂ",
    soundOff: "ਆਵਾਜ਼ ਬੰਦ",
    passportsTitle: "ਖੋਜੀ ਪਾਸਪੋਰਟ ਸੂਚੀ",
    newPassport: "+ ਨਵਾਂ",
    managePassports: "ਸਾਰੇ ਪਾਸਪੋਰਟ ਪ੍ਰਬੰਧਿਤ ਕਰੋ",
    classLabel: "ਜਮਾਤ",
    juniorExplorer: "ਬਾਲ ਖੋਜੀ",
    guestExplorer: "ਬਾਲ ਖੋਜੀ (ਮਹਿਮਾਨ)",
    currentExplorerLabel: "ਮੌਜੂਦਾ ਖੋਜੀ:",
    calibratedFor: "ਜਮਾਤ ਮੁਤਾਬਕ ਤਿਆਰ",

    // Hero Section
    heroTag: "ਲੈਕਸਿਸ ਦਾ ਰਹੱਸਮਈ ਜੰਗਲ • ਗਿਆਨਾਤਮਕ ਸਾਹਸੀ ਸਫ਼ਰ",
    heroTitlePrefix: "ਕੀ ਤੁਸੀਂ ਤਿਆਰ ਹੋ",
    heroTitleHighlight: "ਜੰਗਲ ਮੁਹਿੰਮ ਲਈ?",
    heroLead: "ਇੱਕ ਜਾਦੂਈ ਕਹਾਣੀ ਵਰਗੇ ਜੰਗਲ ਵਿੱਚ ਕਦਮ ਰੱਖੋ ਜਿੱਥੇ ਮਜ਼ੇਦਾਰ ਖੇਡਾਂ ਰਾਹੀਂ ਪੜ੍ਹਨ ਦੀ ਰਫ਼ਤਾਰ, ਅੱਖਰਾਂ ਦੀ ਦਿਸ਼ਾ (b ਬਨਾਮ d), ਉਚਾਰਨ ਅਤੇ 3D ਸਥਾਨਿਕ ਸਮਝ ਦਾ ਸਹੀ ਮੁਲਾਂਕਣ ਤੇ ਸੁਧਾਰ ਹੁੰਦਾ ਹੈ!",
    btnStartExpedition: "ਮੋਡੀਊਲ ੦੧ ਮੁਹਿੰਮ ਸ਼ੁਰੂ ਕਰੋ",
    btnExploreGlades: "ਸਾਰੇ ੬ ਜੰਗਲ ਖੇਤਰ ਦੇਖੋ",
    btnEditPassport: "ਪਾਸਪੋਰਟ ਬਦਲੋ",

    // Mascot
    mascotTitle: "ਓਲੀ - ਜੰਗਲ ਗਾਈਡ ਉੱਲੂ",
    mascotIdle: "ਮੇਰੀਆਂ ਅੱਖਾਂ ਤੁਹਾਡੇ ਕਰਸਰ ਵੱਲ ਦੇਖਦੀਆਂ ਹਨ! ਮੈਨੂੰ ਛੂਹੋ!",
    mascotHappy: "ਸ਼ਾਬਾਸ਼ ਖੋਜੀ, ਤੁਸੀਂ ਕਰ ਸਕਦੇ ਹੋ!",
    mascotCelebrate: "ਵਾਹ! ਨਵਾਂ ਸਾਹਸ ਉਡੀਕ ਰਿਹਾ ਹੈ!",
    mascotNote: "ਓਲੀ ਦਾ ਸੁਨੇਹਾ: ਮਾਊਸ ਹਿਲਾਓ! ਮੇਰੀਆਂ ਅੱਖਾਂ ਤੁਹਾਡੇ ਨਾਲ ਘੁੰਮਦੀਆਂ ਹਨ। ਜਦੋਂ ਮਰਜ਼ੀ ਮੈਨੂੰ ਛੂਹੋ!",

    // Modules
    mod1Name: "ਬਾਜ਼ ਨਜ਼ਰ ਟਾਪੂ",
    mod1Title: "ਦ੍ਰਿਸ਼ਟੀ ਬੋਧ ਅਤੇ ਦਿਸ਼ਾ ਗਿਆਨ",
    mod1Subtitle: "ਸ਼ੀਸ਼ਾ ਅੱਖਰ (b ਬਨਾਮ d) ਅਤੇ ਸਮਰੂਪਤਾ",
    mod1Badge: "੨੭ ਸਵਾਲ • ੩ ਪੱਧਰ",
    mod1Desc: "ਪਵਿੱਤਰ ਜੰਗਲ ਵਿੱਚ ਸ਼ੀਸ਼ਾ ਅੱਖਰਾਂ ਦੀ ਉਲਝਣ ਪਛਾਣੋ ਅਤੇ ਸਹੀ ਦਿਸ਼ਾ ਲੱਭੋ।",

    mod2Name: "ਗੂੰਜ ਅਸਥਾਨ",
    mod2Title: "ਸੁਣਨ ਪ੍ਰਕਿਰਿਆ ਅਤੇ ਬੋਲਚਾਲ",
    mod2Subtitle: "ਧੁਨੀ ਪਛਾਣ ਅਤੇ ਮੌਖਿਕ ਪੜ੍ਹਨ ਰਫ਼ਤਾਰ",
    mod2Badge: "ਮਾਈਕ ਚਾਲੂ",
    mod2Desc: "ਤੋਤੇ ਦੇ ਕ੍ਰਿਸਟਲ ਵਿੱਚ ਜੰਗਲ ਦੇ ਜਾਦੂਈ ਸ਼ਬਦ ਉੱਚੀ ਬੋਲੋ ਅਤੇ ਧੁਨੀ ਸਮਾਂ ਪਰਖੋ।",

    mod3Name: "ਵੇਲ ਬੁਣਕਰ ਕੁੱਲੀ",
    mod3Title: "ਲਿਖਤੀ ਪ੍ਰਗਟਾਵਾ ਅਤੇ ਯਾਦਦਾਸ਼ਤ",
    mod3Subtitle: "ਉਲਝੇ ਅੱਖਰਾਂ ਤੋਂ ਸ਼ਬਦ ਨਿਰਮਾਣ (ਐਨਾਗ੍ਰਾਮ)",
    mod3Badge: "ਸ਼ਬਦ ਬੁਝਾਰਤ",
    mod3Desc: "ਉਲਝੀਆਂ ਵੇਲਾਂ ਤੋਂ ਅੱਖਰ ਸੁਲਝਾ ਕੇ ਜਾਦੂਈ ਸ਼ਬਦ ਬਣਾਓ ਅਤੇ ਯਾਦਦਾਸ਼ਤ ਤੇਜ਼ ਕਰੋ।",

    mod4Name: "ਹਿਸਾਬ ਜੁਤਸੂ ਮੰਦਰ",
    mod4Title: "ਗਣਿਤਕ ਤਰਕ ਅਤੇ ਸੋਚ",
    mod4Subtitle: "ਡਿਸਕੈਲਕੁਲੀਆ ਜਾਂਚ ਅਤੇ ਅੰਕਗਣਿਤ",
    mod4Badge: "ਸੰਖਿਆਤਮਕ ਤਰਕ",
    mod4Desc: "ਬਾਂਸ ਦੀਆਂ ਗਿਣਤੀ ਸੋਟੀਆਂ, ਸੰਖਿਆ ਗਿਆਨ ਅਤੇ ਮਾਨਸਿਕ ਹਿਸਾਬ ਦੀਆਂ ਚੁਣੌਤੀਆਂ ਨੂੰ ਹੱਲ ਕਰੋ।",

    mod5Name: "ਸੂਰਜ-ਪੱਥਰ ਵੇਦੀ",
    mod5Title: "ਸਥਾਨਿਕ ਰੇਖਾਗਣਿਤ ਅਤੇ 3D ਆਕਾਰ",
    mod5Subtitle: "3D ਆਕਾਰ ਘੁਮਾਉਣਾ ਅਤੇ ਸਥਾਨਿਕ ਤਰਕ",
    mod5Badge: "3D ਵੇਦੀ",
    mod5Desc: "ਪ੍ਰਾਚੀਨ ਸੂਰਜੀ ਕ੍ਰਿਸਟਲ (ਘਣ, ਪ੍ਰਿਜ਼ਮ, ਪਿਰਾਮਿਡ) ਘੁਮਾ ਕੇ ਰੇਖਾਗਣਿਤ ਦੇ ਭੇਦ ਖੋਲ੍ਹੋ।",

    mod6Name: "ਕਹਾਣੀਕਾਰ ਦੀ ਝੀਲ",
    mod6Title: "ਪੜ੍ਹਨ ਸਮਝ ਅਤੇ ਬੋਧ",
    mod6Subtitle: "ਪੈਰਾ ਪੜ੍ਹਨ ਰਫ਼ਤਾਰ ਅਤੇ ਸ਼ਬਦ ਯਾਦ",
    mod6Badge: "ਜਮਾਤ ਅਨੁਕੂਲ",
    mod6Desc: "ਮਨਮੋਹਕ ਜੰਗਲ ਕਹਾਣੀਆਂ ਵਿੱਚ ਡੁੱਬ ਜਾਓ, ਪੜ੍ਹਨ ਦੀ ਰਫ਼ਤਾਰ ਵਧਾਓ ਅਤੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ।",

    // Trail Map
    trailMapTitle: "ਕੈਨੋਪੀ ਮੁਹਿੰਮ ਮਾਰਗ",
    trailMapSubtitle: "ਛੇ ਬਹੁ-ਸੰਵੇਦੀ ਪੜਾਅ। ਪ੍ਰਾਚੀਨ ਨਿਸ਼ਾਨੀਆਂ ਜਿੱਤਣ ਲਈ ਹਰ ਪੜਾਅ ਪੂਰਾ ਕਰੋ।",
    trailProgress: "ਮਾਰਗ ਤਰੱਕੀ",
    waypointsCompleted: "ਮੁਕੰਮਲ ਪੜਾਅ",
    relicsCollected: "ਇਕੱਠੀਆਂ ਕੀਤੀਆਂ ਨਿਸ਼ਾਨੀਆਂ",
    launchExpedition: "ਮੁਹਿੰਮ ਸ਼ੁਰੂ ਕਰੋ →",
    completed: "ਪੂਰਾ ਹੋਇਆ",
    readyToExplore: "ਤਿਆਰ",

    // Methodology Tablet
    clinicalEngine: "ਕਲੀਨਿਕਲ ਡਾਇਗਨੌਸਟਿਕ ਇੰਜਣ",
    evidenceBasedTitle: "ਸਬੂਤ-ਅਧਾਰਤ ਗਿਆਨਾਤਮਕ ਮੁਲਾਂਕਣ",
    evidenceBasedDesc: "ਜਦੋਂ ਬੱਚਾ ਜੰਗਲ ਦੀ ਖੋਜ ਕਰਦਾ ਹੈ, ਡਿਸਲੈਕਸੀਆਕਵੈਸਟ ਸਹੀ ਡਾਟਾ ਇਕੱਠਾ ਕਰਦਾ ਹੈ: ਸ਼ੀਸ਼ਾ ਅੱਖਰ ਉਲਝਣ (b/d), ਬੋਲਣ ਸ਼ੁੱਧਤਾ ਅਤੇ 3D ਸਥਾਨਿਕ ਤਰਕ।",
    feat1: "ਮਿਆਰੀ ਸ਼ੀਸ਼ਾ ਅੱਖਰ (b/d/p/q) ਗਲਤੀ ਸੂਚਕਾਂਕ",
    feat2: "Web Speech API ਰਾਹੀਂ ਰੀਅਲ-ਟਾਈਮ ਆਵਾਜ਼ ਵਿਸ਼ਲੇਸ਼ਣ",
    feat3: "ਸਕੂਲਾਂ ਅਤੇ ਡਾਕਟਰਾਂ ਲਈ ਛਪਣਯੋਗ ਵਿਸਤ੍ਰਿਤ ਰਿਪੋਰਟ",
    btnOpenDiagnostic: "ਵਿਦਿਆਰਥੀ ਮੁਲਾਂਕਣ ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ →",
    metricsPreview: "ਮੁਹਿੰਮ ਮਾਪਦੰਡ ਝਲਕ",
    visualOrthography: "ਦ੍ਰਿਸ਼ਟੀ ਅੱਖਰ ਪਛਾਣ:",
    phoneticSpeech: "ਧੁਨੀ ਉਚਾਰਨ:",
    spatialSolids: "3D ਸਥਾਨਿਕ ਆਕਾਰ:",
    dyscalculiaRisk: "ਡਿਸਕੈਲਕੁਲੀਆ ਖਤਰਾ:",
    gradeAligned: "ਜਮਾਤ ਅਨੁਕੂਲ",
    advanced: "ਉੱਚ ਪੱਧਰੀ",
    lowNormal: "ਘੱਟ / ਸਾਧਾਰਨ",
    allReady: "ਸਾਰੀਆਂ ੬ ਮੁਹਿੰਮਾਂ ਤਿਆਰ ਹਨ",

    // Stages Screen
    stagesEyebrow: "ਵਿਦਿਅਕ ਅਤੇ ਕਲੀਨਿਕਲ ਪਾਠਕ੍ਰਮ",
    stagesTitle: "ਗਿਆਨਾਤਮਕ ਮੁਲਾਂਕਣ ਮੋਡੀਊਲ",
    stagesDesc: "ਹੇਠਾਂ ਦਿੱਤਾ ਗਿਆ ਇੱਕ ਮੋਡੀਊਲ ਚੁਣੋ। ਤੁਹਾਡੇ ਜਵਾਬਾਂ ਦਾ ਰੀਅਲ-ਟਾਈਮ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾਵੇਗਾ।",
    savedProgress: "ਸੰਭਾਲੀ ਗਈ ਤਰੱਕੀ",
    backBtn: "← ਪਿੱਛੇ ਜਾਓ",
    portalBtn: "3D ਮੁੱਖ ਪੋਰਟਲ",
    difficultyLevel: "ਮੁਸ਼ਕਲ ਪੱਧਰ:",

    // Profile Screen
    profileHeading: "ਖੋਜੀ ਪਾਸਪੋਰਟ ਅਤੇ ਪ੍ਰੋਫਾਈਲ",
    profileSub: "ਵਿਦਿਆਰਥੀ ਰਿਕਾਰਡ ਬਣਾਓ, ਜਮਾਤ ਚੁਣੋ ਅਤੇ ਸਿੱਖਣ ਦੀ ਤਰੱਕੀ ਦੇਖੋ।",
    studentNameLabel: "ਵਿਦਿਆਰਥੀ / ਖੋਜੀ ਦਾ ਨਾਂ",
    studentAgeLabel: "ਉਮਰ",
    studentGradeLabel: "ਜਮਾਤ / ਸ਼੍ਰੇਣੀ",
    savePassportBtn: "ਪਾਸਪੋਰਟ ਸੰਭਾਲੋ",
    activeProfileTitle: "ਮੌਜੂਦਾ ਖੋਜੀ",
    allProfilesTitle: "ਸੰਭਾਲੇ ਗਏ ਪਾਸਪੋਰਟ",

    // Teacher Screen
    teacherTitle: "ਗਾਈਡ ਅਤੇ ਅਧਿਆਪਕ ਖੋਜ ਡਾਇਰੀ",
    teacherSub: "ਵਿਸਤ੍ਰਿਤ ਕਲੀਨਿਕਲ ਡਾਟਾ ਅਤੇ ਵਿਅਕਤੀਗਤ ਸਿੱਖਿਆ ਸਿਫ਼ਾਰਸ਼ਾਂ।",
    btnPrintReport: "ਰਿਪੋਰਟ ਪ੍ਰਿੰਟ ਕਰੋ",
    btnExportJson: "ਡਾਟਾ ਐਕਸਪੋਰਟ ਕਰੋ (JSON)",
    studentDirectory: "ਵਿਦਿਆਰਥੀ ਸੂਚੀ",
    clinicalSummary: "ਕਲੀਨਿਕਲ ਸਾਰ",

    // Common Controls
    startAdventure: "ਸਾਹਸ ਸ਼ੁਰੂ ਕਰੋ",
    next: "ਅੱਗੇ",
    submit: "ਜਮ੍ਹਾ ਕਰੋ",
    tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    congratulations: "ਵਧਾਈਆਂ!",
    score: "ਅੰਕ",
    accuracy: "ਸ਼ੁੱਧਤਾ",
    timeTaken: "ਲਿਆ ਗਿਆ ਸਮਾਂ",

    // Footer
    footerTitle: "ਡਿਸਲੈਕਸੀਆਕਵੈਸਟ • ਲੈਕਸਿਸ ਦਾ ਰਹੱਸਮਈ ਜੰਗਲ",
    footerTagline: "ਡਿਸਲੈਕਸਿਕ ਬੱਚਿਆਂ ਦੇ ਆਤਮਵਿਸ਼ਵਾਸ ਅਤੇ ਸਮਾਵੇਸ਼ੀ ਸਿੱਖਿਆ ਲਈ ਪਿਆਰ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ।"
  }
};
