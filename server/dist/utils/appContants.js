"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRandomQuotes = exports.quotesArray = exports.monthNames = exports.PUSHER_CLUSTER = exports.PUSHER_SECRET = exports.PUSHER_KEY = exports.JWT_SECRET = exports.PUHSER_APP_ID = exports.CLIENT_URL = exports.environment = void 0;
exports.environment = process.env.NODE_ENV;
exports.CLIENT_URL = exports.environment === "development" ? "http://localhost:5173/app/" : "/app";
exports.PUHSER_APP_ID = process.env.PUHSER_APP_ID;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.PUSHER_KEY = process.env.PUSHER_KEY;
exports.PUSHER_SECRET = process.env.PUSHER_SECRET;
exports.PUSHER_CLUSTER = process.env.PUSHER_CLUSTER;
exports.monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
exports.quotesArray = [
    {
        quote: "The secret of getting ahead is getting started",
        author: "Mark Twain",
    },
    {
        quote: "Success isn't about closing every deal; it's about never giving up on the next one",
        author: "Xoxoday Blog",
    },
    {
        quote: "You just can't beat the person who never gives up",
        author: "Unknown",
    },
    {
        quote: "The way to get started is to quit talking and begin doing",
        author: "Walt Disney",
    },
    {
        quote: "Don't watch the clock; do what it does. Keep going",
        author: "Sam Levenson",
    },
    {
        quote: "Sales are not about closing deals; they are about opening relationships",
        author: "Unknown",
    },
    {
        quote: "What differentiates sellers today is their ability to bring fresh ideas",
        author: "Jill Konrath",
    },
    {
        quote: "The best salespeople don't just hit targets—they set new ones",
        author: "Xoxoday Blog",
    },
    {
        quote: "The only place where success comes before work is in the dictionary",
        author: "Vidal Sassoon",
    },
    {
        quote: "The best way to predict the future is to create it",
        author: "Peter Drucker",
    },
    {
        quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time",
        author: "Thomas Edison",
    },
    {
        quote: "Learn from the mistakes of others. You can't live long enough to make them yourself.",
        author: "Eleanor Roosevelt",
    },
    {
        quote: "Always do your best. What you plant now, you will harvest later.",
        author: "Og Mandino",
    },
    {
        quote: "You’re not obligated to win. You’re obligated to keep trying to do the best you can every day.",
        author: "Marian Wright Edelman",
    },
    {
        quote: "Become the person who would attract the results you seek.",
        author: "Jim Cathcart",
    },
    {
        quote: "Growth and comfort do not coexist.",
        author: "Ginni Rometty",
    },
    {
        quote: "Either run the day or the day runs you.",
        author: "Jim Rohn",
    },
    {
        quote: "Do not focus on numbers. Focus on doing what you do best.",
        author: "Cassey Ho",
    },
    {
        quote: "I had to make my own living and my own opportunity. But I made it! Don’t sit down and wait for the opportunities to come. Get up and make them.",
        author: "Madam C.J. Walker",
    },
    {
        quote: "There’s always something to suggest that you’ll never be who you wanted to be. Your choice is to take it or keep on moving.",
        author: "Phylicia Rashad",
    },
    {
        quote: "Doubt is a killer. You just have to know who you are and what you stand for.",
        author: "Jennifer Lopez",
    },
    {
        quote: "Setting goals is the first step in turning the invisible into the visible.",
        author: "Tony Robbins",
    },
    {
        quote: "Believe you can, and you’re halfway there.",
        author: "Theodore Roosevelt",
    },
    {
        quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        author: "Zig Ziglar",
    },
    {
        quote: "It’s not who you are that holds you back, it’s who you think you’re not.",
        author: "Denis Waitley",
    },
    {
        quote: "Everything you’ve ever wanted is on the other side of fear.",
        author: "George Addair",
    },
    {
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
    },
    {
        quote: "The key to realizing a dream is to focus not on success but on significance — and then even the small steps and little victories along your path will take on greater meaning.",
        author: "Oprah Winfrey",
    },
    {
        quote: "Motivation will almost always beat mere talent.",
        author: "Norman Ralph Augustine",
    },
    {
        quote: "Change before you have to.",
        author: "Jack Welch",
    },
    {
        quote: "Human beings have an innate inner drive to be autonomous, self-determined, and connected to one another. And when that drive is liberated, people achieve more and live richer lives.",
        author: "Daniel Pink",
    },
    {
        quote: "Your network is your net worth.",
        author: "Porter Gale",
    },
    {
        quote: "The way to gain a good reputation is to endeavor to be what you desire to appear.",
        author: "Socrates",
    },
    {
        quote: "You can only become truly accomplished at something you love. Don’t make money your goal. Instead, pursue the things you love doing, and then do them so well that people can’t take their eyes off you.",
        author: "Maya Angelou",
    },
    {
        quote: "You can’t give up! If you give up, you’re like everybody else.",
        author: "Chris Evert",
    },
    {
        quote: "Life is short, and it’s up to you to make it sweet.",
        author: "Sadie Delany",
    },
    {
        quote: "There’s so much creativity in brokeness. Brokeness will have you making it work.",
        author: "Issa Rae",
    },
    {
        quote: "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
        author: "Sheryl Sandberg",
    },
    {
        quote: "Don’t try to do everything by yourself, but try to connect with people and resources. Having that discipline and perseverance is really important.",
        author: "Chieu Cao",
    },
    {
        quote: "Success seems to be connected with action. Successful people keep moving. They make mistakes, but they don’t quit.",
        author: "Conrad Hilton",
    },
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
    },
    {
        quote: "What you think, you become. What you feel, you attract. What you imagine, you create.",
        author: "Buddha",
    },
    {
        quote: "Just don’t give up what you’re trying to do. Where there is love and inspiration, I don’t think you can go wrong.",
        author: "Ella Fitzgerald",
    },
    {
        quote: "I attribute my success to this: I never gave or took any excuse.",
        author: "Florence Nightingale",
    },
    {
        quote: "Your attitude, not your aptitude, will determine your altitude.",
        author: "Zig Ziglar",
    },
    {
        quote: "I got lucky because I never gave up the search. Are you quitting too soon? Or are you willing to pursue luck with a vengeance?",
        author: "Jill Konrath",
    },
    {
        quote: "Quality performance starts with a positive attitude.",
        author: "Jeffrey Gitomer",
    },
    // --- Newly added quotes (with duplicates kept) ---
    {
        quote: "If you don’t give up on something you truly believe in, you will find a way.",
        author: "Roy T. Bennett",
    },
    {
        quote: "Life shrinks or expands in proportion to one's courage.",
        author: "Anais Nin",
    },
    {
        quote: "Failure will never overtake me if my determination to succeed is strong enough.",
        author: "Og Mandino",
    },
    {
        quote: "What you lack in talent can be made up with desire, hustle, and giving 110% all the time.",
        author: "Don Zimmer",
    },
    {
        quote: "The most difficult thing is the decision to act, the rest is merely tenacity. The fears are paper tigers. You can do anything you decide to do. You can act to change and control your life; and the procedure, the process, is its own reward.",
        author: "Amelia Earhart",
    },
    {
        quote: "All great achievements require time.",
        author: "Maya Angelou",
    },
    {
        quote: "You’re not obligated to win. You’re obligated to keep trying to do the best you can every day.",
        author: "Marian Wright Edelman",
    },
    {
        quote: "Nothing is impossible; the word itself says 'I'm possible!'",
        author: "Audrey Hepburn",
    },
    {
        quote: "The harder you work, the luckier you get.",
        author: "Mike Adenuga",
    },
    {
        quote: "You don’t close a sale; you open a relationship if you want to build a long-term, successful enterprise.",
        author: "Patricia Fripp",
    },
    {
        quote: "Sales are contingent upon the attitude of the salesman—not the attitude of the prospect.",
        author: "W. Clement Stone",
    },
    {
        quote: "If you are not taking care of your customer, your competitor will.",
        author: "Bob Hooey",
    },
    {
        quote: "People don’t buy what you do; they buy why you do it.",
        author: "Simon Sinek",
    },
    {
        quote: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
        author: "Colin Powell",
    },
    {
        quote: "It’s not about having the right opportunities. It’s about handling the opportunities right.",
        author: "Mark Hunter",
    },
    {
        quote: "Knowing what must be done does away with fear.",
        author: "Rosa Parks",
    },
    {
        quote: "All business is personal... Make your friends before you need them.",
        author: "Robert L. Johnson",
    },
    {
        quote: "Solve customer problems and make sure that the customer is representative of a large market and then you will have a pretty good formula.",
        author: "Melanie Perkins",
    },
    {
        quote: "Success isn’t about how much money you make; it’s about the difference you make in people’s lives.",
        author: "Michelle Obama",
    },
    {
        quote: "The most common way people give up their power is by thinking they don’t have any.",
        author: "Alice Walker",
    },
    {
        quote: "If you want to make money, you have to help someone else make money.",
        author: "Russell Simmons",
    },
    {
        quote: "If we are going to be part of the solution, we have to engage the problems.",
        author: "Majora Carter",
    },
    {
        quote: "Instead of looking at the past, I put myself ahead twenty years and try to look at what I need to do now in order to get there then.",
        author: "Diana Ross",
    },
    {
        quote: "If you don’t risk anything, you risk even more.",
        author: "Erica Jong",
    },
    {
        quote: "High expectations are the key to everything.",
        author: "Sam Walton",
    },
    {
        quote: "No one can make you feel inferior without your consent.",
        author: "Eleanor Roosevelt",
    },
    {
        quote: "You miss 100% of the shots you don’t take.",
        author: "Wayne Gretzky",
    },
    {
        quote: "Sales are not about selling anymore, but about building trust and educating.",
        author: "Siva Devaki",
    },
    {
        quote: "Don’t be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller",
    },
    {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
    },
    {
        quote: "The successful warrior is the average man, with laser-like focus.",
        author: "Bruce Lee",
    },
    {
        quote: "The key to successful leadership today is influence, not authority.",
        author: "Ken Blanchard",
    },
    {
        quote: "Never ever chase money. You should chase success because with success, money follows.",
        author: "Wilfred Emmanuel-Jones",
    },
    {
        quote: "Be passionate and move forward with gusto every single hour of every single day until you reach your goal.",
        author: "Ava DuVernay",
    },
    {
        quote: "When you undervalue what you do, the world will undervalue who you are.",
        author: "Oprah Winfrey",
    },
    {
        quote: "There have been so many people who have said to me, ‘You can’t do that,’ but I’ve had an innate belief that they were wrong. Be unwavering and relentless in your approach.",
        author: "Halle Berry",
    },
    {
        quote: "A goal is a dream with a deadline.",
        author: "Napoleon Hill",
    },
    {
        quote: "Winning isn’t everything, but wanting to win is.",
        author: "Vince Lombardi",
    },
    {
        quote: "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
        author: "Johann Wolfgang Von Goethe",
    },
    {
        quote: "No matter how many customers you have, each is an individual. The day you start thinking of them as this amorphous ‘collection’ and stop thinking of them as people is the day you start going out of business.",
        author: "Dharmesh Shah",
    },
    {
        quote: "You can’t just sit there and wait for people to give you that golden dream. You’ve got to get out there and make it happen for yourself.",
        author: "Diana Ross",
    },
    {
        quote: "Winning is great, sure, but if you are really going to do something in life, the secret is learning how to lose. Nobody goes undefeated all the time. If you can pick up after a crushing defeat, and go on to win again, you are going to be a champion someday.",
        author: "Wilma Rudolph",
    },
    {
        quote: "Don't settle for average. Bring your best to the moment. Then, whether it fails or succeeds, at least you know you gave all you had. We need to live the best that's in us.",
        author: "Angela Bassett",
    },
    {
        quote: "You just can't beat the person who never gives up.",
        author: "Babe Ruth",
    },
    {
        quote: "I thrive on obstacles. If I'm told that it can't be done, then I push harder.",
        author: "Issa Rae",
    },
    {
        quote: "The best way to sell something: Don’t sell anything. Earn the awareness, respect, and trust of those who might buy.",
        author: "Rand Fishkin",
    },
    {
        quote: "I have stood on a mountain of no’s for one yes.",
        author: "B. Smith",
    },
    {
        quote: "Treat objections as requests for further information.",
        author: "Brian Tracy",
    },
    {
        quote: "Selling is essentially a transfer of feelings.",
        author: "Zig Ziglar",
    },
    {
        quote: "The aim of marketing is to know and understand the customer so well the product or service fits him and sells itself.",
        author: "Peter Drucker",
    },
    {
        quote: "Make a customer, not a sale.",
        author: "Katherine Barchetti",
    },
    {
        quote: "What differentiates sellers today is their ability to bring fresh ideas.",
        author: "Jill Konrath",
    },
    {
        quote: "I have never worked a day in my life without selling. If I believe in something, I sell it, and I sell it hard.",
        author: "Estée Lauder",
    },
    {
        quote: "Leadership belongs to those who take it.",
        author: "Sheryl Sandberg",
    },
    {
        quote: "Beware of monotony; it's the mother of all deadly sins.",
        author: "Edith Wharton",
    },
    {
        quote: "You have to learn to keep your eyes on an ultimate goal. If you lose sight of that goal, you have to get out.",
        author: "Hamdi Ulukaya",
    },
    {
        quote: "I'd rather regret the things I've done than regret the things I haven't done.",
        author: "Lucille Ball",
    },
    {
        quote: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
    },
    {
        quote: "You can never leave footprints that last if you are always walking on tiptoe.",
        author: "Leymah Gbowee",
    },
];
var returnRandomQuotes = function () {
    var randomNum = Math.floor(Math.random() * exports.quotesArray.length);
    console.log(randomNum);
    return exports.quotesArray[randomNum];
};
exports.returnRandomQuotes = returnRandomQuotes;
