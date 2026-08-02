/**
 * STUPID - Jokes Database
 * A massive collection of dad jokes, dark humor, and satirical content
 */

// ============================================
// Main Jokes Database
// ============================================
const STUPID_JOKES = {
    // ============================================
    // DAD JOKES (The Cringe Collection)
    // ============================================
    dadJokes: [
        // User's Requested Jokes
        "I'm afraid for the calendar. Its days are numbered.",
        "My wife said I should do lunges to stay in shape. That would be a big step forward.",
        "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one.",
        "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
        "What do you call a factory that makes okay products? A satisfactory.",
        "I only know 25 letters of the alphabet. I don't know y.",
        
        // Classic Dad Jokes
        "My wife said I should do lunges to stay in shape. That would be a big step forward.",
        "Why do fathers take an extra pair of socks when they go golfing? In case they get a hole in one.",
        "Singing in the shower is fun until you get soap in your mouth. Then it's a soap opera.",
        "What do you call a factory that makes okay products? A satisfactory.",
        "I only know 25 letters of the alphabet. I don't know y.",
        "Did you hear about the claustrophobic astronaut? He just needed a little space.",
        "Why don't eggs tell jokes? They'd crack each other up.",
        "I used to be a baker, but I couldn't make enough dough.",
        "What's the best time to go to the dentist? Tooth-hurty.",
        
        // Animal Dad Jokes
        "What do you call a bear with no teeth? A gummy bear.",
        "Why can't you explain puns to kleptomaniacs? They always take things literally.",
        "What do you call a sleeping bull? A bulldozer.",
        "Why did the scarecrow win an award? Because he was outstanding in his field.",
        "What do you get from a pampered cow? Spoiled milk.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call a fish wearing a bowtie? Sofishticated.",
        "Why did the bicycle fall over? Because it was two-tired.",
        "What do you call cheese that isn't yours? Nacho cheese.",
        "Why did the golfer bring two pairs of pants? In case he got a hole in one.",
        
        // Food Dad Jokes
        "Why did the tomato turn red? Because it saw the salad dressing.",
        "What do you call fake spaghetti? An impasta.",
        "Why did the coffee file a police report? It got mugged.",
        "What do you call a sad coffee? Depresso.",
        "Why did the cookie go to the doctor? It was feeling crumb-y.",
        "What do you call a can opener that doesn't work? A can't opener.",
        "Why did the banana go to the doctor? It wasn't peeling well.",
        "What do you call a potato at a computer? A chip.",
        "Why did the grape stop in the middle of the road? It ran out of juice.",
        "What do you call bread that's a spy? A loaf agent.",
        
        // Punny Dad Jokes
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What did one wall say to the other wall? I'll meet you at the corner.",
        "What do you do with a sick chemist? If you can't helium, and you can't curium, you might as well barium.",
        "Why did the math book look sad? Because it had too many problems.",
        "What did the ocean say to the beach? Nothing, it just waved.",
        "Why did the painting go to jail? For framing.",
        "What do you call a fake noodle? An impasta.",
        "Why did the music teacher go to jail? Because she got caught bass-ing.",
        "What do you call a dinosaur with an extensive vocabulary? A thesaurus.",
        "Why did the student eat his homework? Because the teacher said it was a piece of cake.",
        
        // Work/Office Dad Jokes
        "Why did the employee bring a ladder to work? Because they wanted to take their career to the next level.",
        "What do you call a meeting that could have been an email? A waste of time.",
        "Why did the computer go to therapy? It had too many bytes of emotional baggage.",
        "What do you call a can opener that doesn't work? A can't opener.",
        "Why did the spreadsheet break up with the database? It needed some space.",
        "What do you call a team of horses that work together? A horsepower.",
        "Why did the office plant get promoted? It had outstanding leaves.",
        "What do you call a boss who's always right? A myth.",
        "Why did the employee bring a mirror to work? To reflect on their performance.",
        "What do you call a meeting with no agenda? A surprise party.",
        
        // Technology Dad Jokes
        "Why did the programmer quit his job? He didn't get arrays.",
        "What's a computer's favorite snack? Microchips.",
        "Why did the developer go broke? Because he used up all his cache.",
        "What do you call a computer that sings? A-Dell.",
        "Why did the WiFi and the computer get married? Because they had a connection.",
        "What do you call a computer that's cold? A freeze-PC.",
        "Why did the smartphone break up with the tablet? It needed more space.",
        "What do you call a hacker who doesn't take a bath? A stink-pad.",
        "Why did the router go to therapy? It had too many issues.",
        "What do you call a computer that's a spy? A byte.",
        
        // Sports Dad Jokes
        "Why did the golfer bring an extra sock? In case he got a hole in one.",
        "What do you call a snowman with a six pack? An ab-ominable snowman.",
        "Why did the baseball player bring a ladder to the game? To reach the high notes.",
        "What do you call a football player who's also a baker? A dough-back.",
        "Why did the tennis player get kicked out of the restaurant? Because he kept love-ing the food.",
        "What do you call a basketball player who's also a musician? A jam session.",
        "Why did the soccer player bring string to the game? So he could tie the score.",
        "What do you call a runner who's also a chef? A fast food worker.",
        "Why did the boxer bring a pencil to the ring? To draw first blood.",
        "What do you call a swimmer who's also a musician? A pool star.",
        
        // Travel Dad Jokes
        "Why did the tourist bring a ladder to the bar? Because he heard the drinks were on the house.",
        "What do you call a fake vacation? A stay-cation.",
        "Why did the suitcase go to school? To get packed with knowledge.",
        "What do you call a hotel for ants? A flea-bag motel.",
        "Why did the passport get a promotion? It had outstanding credentials.",
        "What do you call a plane that's always late? A delay-naire.",
        "Why did the backpack go to therapy? It had too many issues.",
        "What do you call a road that's always changing? A detour.",
        "Why did the map get a job? It wanted to find its place in the world.",
        "What do you call a tourist who's always lost? A human GPS.",
        
        // Holiday Dad Jokes
        "Why did the Christmas tree go to the barber? It needed a trim.",
        "What do you call a snowman party? A snowball.",
        "Why did Santa's helper see the doctor? Because he had low elf esteem.",
        "What do you get when you cross a snowman and a vampire? Frostbite.",
        "Why did the Easter egg hide? Because it was a little chicken.",
        "What do you call a witch who lives at the beach? A sand-witch.",
        "Why did the turkey join the band? Because it had the drumsticks.",
        "What do you call a reindeer with bad manners? Rude-olph.",
        "Why did the leprechaun cross the road? To get to the other s-ide.",
        "What do you call a ghost's true love? His ghoul-friend."
    ],
    
    // ============================================
    // DARK DAD JOKES (The Dangerous Zone)
    // ============================================
    darkDadJokes: [
        // User's Requested Jokes
        "I told my wife she should embrace her mistakes. So she gave me a hug.",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo.",
        "I have a stepladder because my real ladder left when I was just a kid.",
        "The other day, my wife asked me to pass the lipstick. I accidentally threw it at her.",
        "My therapist says I have a preoccupation with vengeance. We'll see about that.",
        "I don't trust stairs. They're always up to something.",
        "Give a man a plane ticket, he flies for a day. Push him out of the plane, he flies for the rest of his life.",
        
        // Family & Relationships
        "My grandfather has the heart of a lion and a lifetime ban from the zoo.",
        "I have a stepladder because my real ladder left when I was just a kid.",
        "The other day, my wife asked me to pass the lipstick. I accidentally threw it at her.",
        "My therapist says I have a preoccupation with vengeance. We'll see about that.",
        "I don't trust stairs. They're always up to something.",
        "Give a man a plane ticket, he flies for a day. Push him out of the plane, he flies for the rest of his life.",
        "My wife told me to stop impersonating a flamingo. I had to put my foot down.",
        "I told my kids I was going to teach them about taxes. They cried.",
        "My wife said I never listen to her. Or something like that.",
        
        // Work & Money
        "I told my boss I needed a raise because of inflation. He gave me a balloon.",
        "My resume says I'm a team player. It doesn't specify which team.",
        "I told my boss I was leaving because I found a better job. He said, 'Good, you start Monday.'",
        "My bank account is like a black hole. Money goes in, but nothing comes out.",
        "I told my boss I was working from home. He said, 'From which home?'",
        "My retirement plan is to win the lottery. So far, it's not working.",
        "I told my boss I needed a mental health day. He said, 'You've been taking them for years.'",
        "My career is like a bad golf game. I keep hitting the ball, but I never get anywhere.",
        "I told my boss I was quitting. He said, 'You can't quit, you were never hired.'",
        "My salary is like a mirage. It looks good from far away, but it's not real.",
        
        // Health & Fitness
        "I told my doctor I broke my arm in two places. He told me to stop going to those places.",
        "My fitness routine is simple. I run out of money before I run out of excuses.",
        "I told my trainer I wanted to get in shape. He said, 'Round is a shape.'",
        "My diet is working great. I've lost 10 pounds. Unfortunately, it was from my wallet.",
        "I told my doctor I was addicted to chocolate. He said, 'You need to break that habit.' I said, 'I can't, it's a Hershey's habit.'",
        "My exercise routine: I walk to the fridge, I walk to the couch, I walk to the bed. That's my cardio.",
        "I told my doctor I was depressed. He said, 'You need to get out more.' I said, 'I am out. I'm at your office.'",
        "My fitness goal is to be able to reach the TV remote without getting up.",
        "I told my doctor I was having trouble sleeping. He said, 'Count sheep.' I said, 'I do, but they keep jumping over the fence.'",
        "My diet is simple. I eat whatever I want, and then I feel bad about it.",
        
        // Technology & Social Media
        "I told my phone I was going to delete some apps. It said, 'But we're friends!' I said, 'No, we're not.'",
        "My computer is like my ex. It takes forever to start up, and when it does, it doesn't work right.",
        "I told my WiFi I was going to unplug it. It said, 'But I'll miss you.' I said, 'No, you won't.'",
        "My social media feed is like a bad relationship. It's full of drama, and I can't look away.",
        "I told my GPS I was lost. It said, 'You're not lost, you're just not where you're supposed to be.'",
        "My phone is like a needy friend. It's always asking for attention.",
        "I told my computer I was going to upgrade it. It said, 'But I'm perfect the way I am.' I said, 'No, you're not.'",
        "My email inbox is like a black hole. Things go in, but they never come out.",
        "I told my smart speaker to play some music. It said, 'I'm sorry, I can't do that.' I said, 'Then why are you called a smart speaker?'",
        "My phone battery is like my motivation. It dies at the most inconvenient times.",
        
        // Life & Philosophy
        "I told my reflection I was going to change. It said, 'Yeah, right.'",
        "My life is like a bad movie. I keep waiting for it to get better, but it never does.",
        "I told my future self I was going to be successful. He said, 'Keep dreaming.'",
        "My luck is like a bad penny. It always turns up at the worst possible time.",
        "I told my dreams I was going to make them come true. They said, 'We'll believe it when we see it.'",
        "My life is like a bad joke. It's not funny, and it goes on too long.",
        "I told my goals I was going to achieve them. They said, 'We've heard that before.'",
        "My motivation is like a bad WiFi signal. It comes and goes at the worst possible times.",
        "I told my problems I was going to solve them. They said, 'We'll be here when you get back.'",
        "My life is like a bad book. I can't put it down, but I don't want to keep reading.",
        
        // Death & Morbidity
        "I told my gravestone I was going to visit it someday. It said, 'I'll be waiting.'",
        "My will says I want to be cremated. That way, I can finally get a little heat.",
        "I told my coffin I was going to lie down in it someday. It said, 'I'll be ready.'",
        "My tombstone will say, 'I told you I was sick.'",
        "I told my life insurance agent I was going to live forever. He said, 'That's not how this works.'",
        "My bucket list is simple. I want to kick the bucket.",
        "I told my doctor I wanted to live to be 100. He said, 'Do you have a backup plan?'",
        "My last words will be, 'I told you so.'",
        "I told my family I wanted to be buried with my money. They said, 'We'll see about that.'",
        "My epitaph will read, 'I told you I wasn't feeling well.'"
    ],
    
    // ============================================
    // WELLNESS INDUSTRY ROASTS
    // ============================================
    wellnessRoasts: [
        // User's Requested Jokes
        "Our app uses blockchain to track your kale intake.",
        "New study confirms: breathing is the new meditation.",
        "Subscribe for $49.99/month to access... air.",
        "This feature is powered by crystals and venture capital.",
        
        // General Wellness
        "New study confirms: breathing is the new meditation.",
        "Subscribe for $49.99/month to access... air.",
        "This feature is powered by crystals and venture capital.",
        "Our wellness program is 100% organic, gluten-free, and completely useless.",
        "Achieve inner peace with our patented breathing technique: inhale, exhale, repeat.",
        "Our app is scientifically proven to do something. We're not sure what, but it sounds impressive.",
        "Wellness is a journey. Ours is a journey to your wallet.",
        "Our holistic approach combines ancient wisdom with modern marketing.",
        "Wellness isn't a destination, it's a subscription.",
        
        // Meditation & Mindfulness
        "Our guided meditations are so relaxing, you'll fall asleep and miss the point.",
        "Clear your mind of all thoughts. Especially the ones about how this app costs $12.99/month.",
        "Our mindfulness exercises are designed to help you focus. You'll focus on how much this costs.",
        "Achieve enlightenment with our 30-day meditation challenge. You'll quit by day 3.",
        "Our meditation app: the only thing more expensive than therapy, and less effective.",
        "Find your center. Then realize it's not where you thought it was.",
        "Our breathing exercises are scientifically proven to make you lightheaded.",
        "Meditate with us. Or don't. We don't care. But we'll charge you either way.",
        "Our mindfulness app: because ignoring your problems has never been more aesthetic.",
        "Achieve inner peace. Or at least the illusion of it.",
        
        // Fitness & Nutrition
        "Our fitness app tracks your steps, your calories, and your failures.",
        "Get in shape with our revolutionary program: move more, eat less. You won't do either.",
        "Our nutrition app tells you what to eat. You'll ignore it and eat chips.",
        "Track your macros. Or don't. We'll judge you either way.",
        "Our workout app: because paying for a gym membership wasn't enough.",
        "Get fit with our 30-day challenge. You'll quit by day 2.",
        "Our fitness trackers are so accurate, they can detect your excuses.",
        "Lose weight with our patented method: eat less, move more. Groundbreaking.",
        "Our nutrition plans are customized to your needs. Your needs are to stop eating junk.",
        "Get stronger with our resistance training. You'll resist the urge to actually do it.",
        
        // Mental Health
        "Our mental health app: because your problems are our business.",
        "Track your moods. Watch as they all trend downward.",
        "Our therapy app is cheaper than a real therapist. It's also less effective.",
        "Journal your feelings. Then realize they're all negative.",
        "Our anxiety app: because worrying about your anxiety is a great way to reduce anxiety.",
        "Track your emotions. Realize you only have one: disappointment.",
        "Our mental wellness app: because ignoring your problems is a form of self-care.",
        "Feel better with our positive affirmations. You won't.",
        "Our mood tracker: because nothing says 'self-care' like quantifying your misery.",
        "Improve your mental health with our app. Or don't. We'll still charge you.",
        
        // Sleep
        "Our sleep tracker: because lying awake at night worrying about your sleep is the best way to fall asleep.",
        "Get better sleep with our app. You'll stay up all night using it.",
        "Our sleep analysis is so detailed, it can tell you exactly how bad your sleep is.",
        "Track your REM cycles. Realize you don't have any.",
        "Our sleep app: because counting sheep is outdated.",
        "Get the recommended 8 hours of sleep. Our app will remind you that you didn't.",
        "Our sleep tracker: the only thing keeping you up at night.",
        "Improve your sleep hygiene. Or don't. We'll still judge you.",
        "Our sleep app: because your bed is the only place you're truly successful.",
        "Get better rest with our app. You'll be too busy using it to actually sleep.",
        
        // Productivity
        "Our productivity app: because doing nothing has never been more organized.",
        "Get more done with our time management system. You won't.",
        "Our to-do list app: because writing things down is the first step to not doing them.",
        "Track your tasks. Watch as they all remain incomplete.",
        "Our productivity tracker: the only thing you'll be productive at is tracking your lack of productivity.",
        "Get organized with our app. You'll spend more time organizing than doing.",
        "Our time management app: because procrastination is a skill that needs to be managed.",
        "Increase your productivity with our app. Or don't. We'll still charge you.",
        "Our task manager: because forgetting to do things is a task in itself.",
        "Get more done in less time. Or at least feel guilty about not getting more done in less time."
    ],
    
    // ============================================
    // CORPORATE GASLIGHTING CLASSICS
    // ============================================
    corporateGaslighting: [
        // User's Requested Jokes
        "We're like a family here. (A dysfunctional one.)",
        "Your feedback is important to us. (It's not.)",
        "We value work-life balance. (Emails sent at 2 AM prove this.)",
        "This meeting could have been an email. (This email could have been silence.)",
        
        // Workplace Culture
        "Your feedback is important to us. (It's not.)",
        "We value work-life balance. (Emails sent at 2 AM prove this.)",
        "This meeting could have been an email. (This email could have been silence.)",
        "We're all in this together. (But you're the one who's going to get fired.)",
        "Your input is valuable. (We'll ignore it.)",
        "We have an open door policy. (But the door is always closed.)",
        "We're a team. (You're the weak link.)",
        "Your opinion matters. (But not as much as mine.)",
        "We're all equal here. (But some are more equal than others.)",
        
        // Performance Reviews
        "You're doing great! (But not great enough.)",
        "Your work is satisfactory. (Which means it's not good.)",
        "You're meeting expectations. (Which are very low.)",
        "You have so much potential. (That you're not living up to.)",
        "Your performance is consistent. (Consistently mediocre.)",
        "You're a valuable member of the team. (But we could replace you tomorrow.)",
        "Your work is important. (But not as important as you think.)",
        "You're doing a good job. (For someone with your limitations.)",
        "Your contributions are noted. (And forgotten.)",
        "You're exceeding expectations. (Which were set very low.)",
        
        // Meetings
        "This meeting is mandatory. (But optional for me.)",
        "We'll keep this meeting short. (We won't.)",
        "This is a quick sync. (It will take 2 hours.)",
        "Let's circle back on this. (We never will.)",
        "We'll follow up on this. (We won't.)",
        "This is a working meeting. (No one will work.)",
        "Let's take this offline. (So we can ignore it.)",
        "We'll revisit this next quarter. (We'll forget about it by then.)",
        "This is a brainstorming session. (Where all ideas are bad.)",
        "Let's align on this. (So we can all be wrong together.)",
        
        // Human Resources
        "We're a meritocracy. (If you have merit, you'll be rewarded. You don't.)",
        "We promote from within. (But not you.)",
        "We have a zero-tolerance policy. (For everything except incompetence.)",
        "We're an equal opportunity employer. (But we'll still find a reason not to hire you.)",
        "We value diversity. (As long as you think like us.)",
        "We have a no-tolerance policy for harassment. (But we tolerate a lot of other things.)",
        "We're committed to work-life balance. (But we'll still expect you to work 60 hours a week.)",
        "We have an open-door policy. (But the door is always locked.)",
        "We're a learning organization. (You'll learn that you're replaceable.)",
        "We value transparency. (But we'll still hide things from you.)",
        
        // Leadership
        "I have an open door policy. (But I'm never in my office.)",
        "My door is always open. (But I'm usually on a call.)",
        "I value your input. (But I'll do what I want anyway.)",
        "I'm here to support you. (But I won't actually help.)",
        "I have complete confidence in you. (To fail.)",
        "I believe in you. (To disappoint me.)",
        "I'm always available. (But I never respond to emails.)",
        "I have an open mind. (But it's already made up.)",
        "I value transparency. (But I'll still lie to you.)",
        "I'm here to help. (But I won't.)",
        
        // Layoffs & Restructuring
        "We're restructuring. (You're fired.)",
        "We're pivoting. (We have no idea what we're doing.)",
        "We're right-sizing. (We're downsizing.)",
        "We're optimizing our workforce. (We're firing people.)",
        "We're realigning our strategy. (We're panicking.)",
        "We're focusing on our core competencies. (We're giving up on everything else.)",
        "We're streamlining operations. (We're cutting costs.)",
        "We're investing in our future. (We're firing you.)",
        "We're making tough decisions. (You're one of them.)",
        "We're positioning ourselves for growth. (We're laying people off.)"
    ],
    
    // ============================================
    // RANDOM CHAOS ENERGY
    // ============================================
    randomChaos: [
        // User's Requested Jokes
        "You're not lazy, you're just on energy-saving mode.",
        "Your bed is a magical place where you suddenly remember everything you were supposed to do.",
        "I'm not arguing, I'm just explaining why I'm right.",
        "Common sense is like deodorant. The people who need it most never use it.",
        
        // Life Observations
        "Your bed is a magical place where you suddenly remember everything you were supposed to do.",
        "I'm not arguing, I'm just explaining why I'm right.",
        "Common sense is like deodorant. The people who need it most never use it.",
        "The early bird gets the worm. The second mouse gets the cheese.",
        "If at first you don't succeed, skydiving is not for you.",
        "I used to be indecisive. Now I'm not so sure.",
        "You can't have everything. Where would you put it?",
        "I'm not superstitious, but I am a little stitious.",
        "The grass is always greener on the other side. That's because it's usually artificial turf.",
        
        // Technology
        "My computer runs on Windows. So do I, most days.",
        "I have a love-hate relationship with my phone. Mostly hate.",
        "My WiFi is like my motivation. It comes and goes.",
        "I don't always test my code, but when I do, I do it in production.",
        "My phone battery is like my will to live. It dies at the most inconvenient times.",
        "I have a photographic memory. It's just not very developed.",
        "My computer is faster than me. And that's saying something.",
        "I don't always back up my data, but when I do, it's already too late.",
        "My phone is smarter than me. And that's depressing.",
        "I have a smart home. It's smarter than I am.",
        
        // Work
        "I work hard so I can afford the things I don't have time to use.",
        "My job is like a bad relationship. I keep coming back for more.",
        "I don't have a work-life balance. I have a work-life imbalance.",
        "My boss is like a bad movie villain. He keeps coming back.",
        "I work to live, but I mostly just work.",
        "My job description says 'other duties as assigned.' That's all I do.",
        "I have a 9 to 5 job. It's more like 8 to 6, but who's counting?",
        "My work ethic is strong. My motivation is not.",
        "I'm not lazy, I'm just highly efficient at doing nothing.",
        "My job is my passion. My passion is napping.",
        
        // Relationships
        "My love life is like a bad movie. I keep watching, but it never gets better.",
        "I'm not single, I'm in a long-term relationship with my couch.",
        "My dating profile says I'm adventurous. That means I'll try new restaurants.",
        "I'm not picky, I just have high standards. And no one meets them.",
        "My love language is food. And by food, I mean I eat my feelings.",
        "I'm not commitment-phobic, I'm just highly selective. And I select no one.",
        "My ideal date is someone who doesn't talk. And brings food.",
        "I'm not lonely, I'm just highly independent. And slightly desperate.",
        "My love life is like a bad WiFi signal. It comes and goes.",
        "I'm not heartless, I just have a very small heart. And it's already taken.",
        
        // Money
        "I don't have a spending problem. I have a not-making-enough problem.",
        "My bank account is like a black hole. Money goes in, but nothing comes out.",
        "I'm not broke, I'm just financially challenged. And by challenged, I mean broke.",
        "My retirement plan is to win the lottery. So far, it's not working.",
        "I don't have a shopping addiction. I have a retail therapy need.",
        "My credit score is like my love life. Both are in the toilet.",
        "I'm not cheap, I'm just highly frugal. And by frugal, I mean broke.",
        "My financial advisor says I need to diversify. I said, 'I have multiple credit cards, isn't that diverse?'",
        "I don't have a money problem. I have a not-having-money problem.",
        "My savings account is like my willpower. Both are empty.",
        
        // Health
        "I'm not out of shape, I'm just in a different shape. A round one.",
        "My fitness routine is simple. I run out of money before I run out of excuses.",
        "I'm not overweight, I'm just easier to see.",
        "My diet is working great. I've lost 10 pounds. Unfortunately, it was from my wallet.",
        "I'm not lazy, I'm just highly efficient at conserving energy.",
        "My exercise routine: I walk to the fridge, I walk to the couch, I walk to the bed. That's my cardio.",
        "I'm not unhealthy, I'm just highly experienced at being unwell.",
        "My doctor says I need to exercise more. I said, 'I exercise my right to remain on the couch.'",
        "I'm not sick, I'm just highly allergic to work.",
        "My fitness goal is to be able to reach the TV remote without getting up.",
        
        // Food
        "I'm not a foodie, I'm just highly committed to eating.",
        "My diet is simple. If it's edible, I eat it. If it's not, I try anyway.",
        "I don't have a sweet tooth, I have sweet teeth. All of them.",
        "My love language is food. And by food, I mean I eat my feelings.",
        "I'm not a picky eater, I'm just highly selective. And I select everything.",
        "My cooking skills are simple. I can open a can, I can microwave, I can order takeout.",
        "I don't have a food addiction. I have a food appreciation.",
        "My diet is balanced. I hold the ice cream in one hand and the pizza in the other.",
        "I'm not a glutton, I'm just highly enthusiastic about food.",
        "My favorite food group is the 'all of them' group.",
        
        // Philosophy
        "I'm not a philosopher, but I do have a lot of deep thoughts. Mostly about food.",
        "Life is short. So am I. On both counts.",
        "I'm not a deep thinker, but I do think deeply about napping.",
        "The meaning of life is to find happiness. I find it in food.",
        "I'm not wise, but I do have a lot of opinions. Mostly about things I don't understand.",
        "Life is a journey. I'm lost.",
        "I'm not spiritual, but I do believe in the power of napping.",
        "The secret to happiness is low expectations. Mine are in the basement.",
        "I'm not a dreamer, but I do dream about food. A lot.",
        "Life is what you make of it. I make it about food."
    ],
    
    // ============================================
    // MOTIVATIONAL (BUT MEAN)
    // ============================================
    meanMotivation: [
        "You're doing great... for someone with your limitations.",
        "Every day is a new opportunity to disappoint yourself.",
        "Believe in yourself! Or don't. I'm not your dad.",
        "You have so much potential. Most of it is untapped.",
        "The only way to do great work is to love what you do. You don't.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts. You have no courage.",
        "Your time is limited, so don't waste it living someone else's life. You're wasting it living no life at all.",
        "The future belongs to those who believe in the beauty of their dreams. Your dreams are stupid.",
        "Strive not to be a success, but rather to be of value. You have no value.",
        "You miss 100% of the shots you don't take. You miss 100% of the shots you do take too.",
        "The journey of a thousand miles begins with one step. You took zero.",
        "To thine own self be true. Your self is the problem.",
        "This too shall pass. Unfortunately, so will you.",
        "The only limit to our realization of tomorrow is our doubts of today. Your doubts are justified.",
        "Do one thing every day that scares you. You're scared of everything, so this should be easy.",
        "Life is what happens when you're busy making other plans. Your plans are stupid.",
        "In the middle of every difficulty lies opportunity. The opportunity to fail spectacularly.",
        "The best way to predict the future is to invent it. Your future is already invented: it's failure.",
        "You are enough. Just barely, but you are.",
        "The only person you are destined to become is the person you decide to be. And you've decided to be a disappointment."
    ],
    
    // ============================================
    // SELF-DEPRECATING
    // ============================================
    selfDeprecating: [
        "I'm not lazy, I'm just highly efficient at doing nothing.",
        "I'm not a failure, I'm just highly experienced at not succeeding.",
        "I'm not stupid, I just have a lot of bad ideas. And I act on all of them.",
        "I'm not ugly, I just have a face that only a mother could love. And she's questionable.",
        "I'm not a bad person, I just make a lot of bad decisions. And I stand by all of them.",
        "I'm not a quitter, I just know when to cut my losses. And I cut them constantly.",
        "I'm not a loser, I'm just highly skilled at coming in second place.",
        "I'm not a procrastinator, I'm just highly committed to doing things at the last possible moment.",
        "I'm not a liar, I just have a very active imagination. And I use it constantly.",
        "I'm not a coward, I just have a very strong sense of self-preservation. And it tells me to run away.",
        "I'm not a bad friend, I just have a very selective memory. And I forget everything.",
        "I'm not a bad employee, I just have a very different definition of 'hard work.'",
        "I'm not a bad partner, I just have a very low bar for what constitutes a good relationship.",
        "I'm not a bad person, I just have a lot of room for improvement. And I'm not improving.",
        "I'm not a failure, I'm just highly experienced at learning what doesn't work."
    ],
    
    // ============================================
    // INSULTS (PLAYFUL)
    // ============================================
    playfulInsults: [
        "Bless your heart.",
        "You're a few sandwiches short of a picnic.",
        "The lights are on but nobody's home.",
        "You're not the sharpest tool in the shed.",
        "You're a few bricks shy of a load.",
        "You're not playing with a full deck.",
        "You're a few fries short of a Happy Meal.",
        "You're not the brightest bulb in the box.",
        "You're a few cards short of a full deck.",
        "You're not the sharpest crayon in the box.",
        "You're a few beers short of a six-pack.",
        "You're not the brightest star in the sky.",
        "You're a few marbles short of a full set.",
        "You're not the sharpest pencil in the drawer.",
        "You're a few screws loose. And not in a fun way.",
        "You're not the brightest button on the remote.",
        "You're a few chips short of a full stack.",
        "You're not the sharpest knife in the drawer.",
        "You're a few tiles short of a full Scrabble set."
    ]
};

// ============================================
// Helper Functions
// ============================================

/**
 * Get a random joke from a specific category
 * @param {string} category - The joke category
 * @returns {string} A random joke from the category
 */
function getRandomJoke(category) {
    const jokes = STUPID_JOKES[category];
    if (!jokes || jokes.length === 0) {
        return getRandomJoke('dadJokes'); // Fallback to dad jokes
    }
    return jokes[Math.floor(Math.random() * jokes.length)];
}

/**
 * Get a random joke from any category
 * @returns {string} A random joke
 */
function getRandomJokeAny() {
    const categories = Object.keys(STUPID_JOKES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return getRandomJoke(randomCategory);
}

/**
 * Get multiple random jokes from a category
 * @param {string} category - The joke category
 * @param {number} count - Number of jokes to return
 * @returns {string[]} Array of random jokes
 */
function getMultipleRandomJokes(category, count) {
    const jokes = STUPID_JOKES[category];
    if (!jokes || jokes.length === 0) {
        return getMultipleRandomJokes('dadJokes', count);
    }
    
    const result = [];
    const usedIndices = new Set();
    
    for (let i = 0; i < count && i < jokes.length; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * jokes.length);
        } while (usedIndices.has(randomIndex));
        
        usedIndices.add(randomIndex);
        result.push(jokes[randomIndex]);
    }
    
    return result;
}

/**
 * Get all categories
 * @returns {string[]} Array of all joke categories
 */
function getAllCategories() {
    return Object.keys(STUPID_JOKES);
}

/**
 * Get the number of jokes in a category
 * @param {string} category - The joke category
 * @returns {number} Number of jokes in the category
 */
function getCategoryCount(category) {
    return STUPID_JOKES[category] ? STUPID_JOKES[category].length : 0;
}

/**
 * Get the total number of jokes
 * @returns {number} Total number of jokes in the database
 */
function getTotalJokeCount() {
    return Object.values(STUPID_JOKES).reduce((sum, jokes) => sum + jokes.length, 0);
}

// ============================================
// Export for use in other modules
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STUPID_JOKES,
        getRandomJoke,
        getRandomJokeAny,
        getMultipleRandomJokes,
        getAllCategories,
        getCategoryCount,
        getTotalJokeCount
    };
}

// Make available globally
window.STUPID_JOKES = STUPID_JOKES;
window.getRandomJoke = getRandomJoke;
window.getRandomJokeAny = getRandomJokeAny;
window.getMultipleRandomJokes = getMultipleRandomJokes;
window.getAllCategories = getAllCategories;
window.getCategoryCount = getCategoryCount;
window.getTotalJokeCount = getTotalJokeCount;
