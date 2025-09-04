export const environment = process.env.NODE_ENV;
export const CLIENT_URL =
  environment === "development" ? "http://localhost:5173/app/" : "/app";

export const monthNames = [
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

export const quotesArray = [
  {
    quote: "If you are not taking care of your customer, your competitor will.",
    author: "Bob Hooey",
  },
  {
    quote:
      "Chase the vision, not the money; the money will end up following you.",
    author: "Tony Hsieh",
  },
  {
    quote:
      "Pretend that every single person you meet has a sign around his or her neck that says, ‘Make me feel important.’ Not only will you succeed in sales, you will succeed in life.",
    author: "Mary Kay Ash",
  },
  {
    quote:
      "Great salespeople are relationship builders who provide value and help their customers win.",
    author: "Jeffrey Gitomer",
  },
  {
    quote: "90 percent of selling is conviction and 10 percent is persuasion.",
    author: "Shiv Khera",
  },
  {
    quote:
      "You have to drop your sales mentality and start working with your prospects as if they’ve already hired you.",
    author: "Jill Konrath",
  },
  {
    quote:
      "I like to think of sales as the ability to gracefully persuade, not manipulate, a person or persons into a win-win situation.",
    author: "Bo Bennett",
  },
  {
    quote:
      "Don’t find customers for your products, find products for your customers.",
    author: "Seth Godin",
  },
  {
    quote:
      "Companies should be selling ideas more than benefits. Sell Ideas. Not stuff.",
    author: "Aaron Ross",
  },
  { quote: "Make a customer, not a sale.", author: "Katherine Barchetti" },
  {
    quote: "In sales, a referral is the key to the door of resistance.",
    author: "Bo Bennett",
  },
  {
    quote: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
  },
  {
    quote: "A-B-C. Always Be Closing.",
    author: "Blake in Glengarry Glen Ross",
  },
  {
    quote:
      "You’re only as good as your last sale, so you put your all into something and just hope that from that you can get your next job.",
    author: "Josh Peck",
  },
  {
    quote: "You don't compete on price. You compete on relationships.",
    author: "Patricia Fripp",
  },
  {
    quote:
      "Honest and transparent content is the best sales tool in the world. Period.",
    author: "Marcus Sheridan",
  },
  {
    quote:
      "Sales are contingent upon the attitude of the salesman, not the attitude of the prospect.",
    author: "William Clement Stone",
  },
  {
    quote: "The sales compensation plan is Batman, the sales contest is Robin.",
    author: "Mark Roberge",
  },
  {
    quote:
      "To me, job titles don’t matter. Everyone is in sales. It’s the only way we stay in business.",
    author: "Harvey Mackay",
  },
  { quote: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  {
    quote:
      "Anything that won’t sell, I don’t want to invent. Its sale is proof of utility, and utility is success.",
    author: "Thomas Edison",
  },
  {
    quote:
      "Every morning in Africa, a gazelle wakes up. It knows it must outrun the fastest lion or it will be killed. Every morning in Africa, a lion wakes up. It knows it must run faster than the slowest gazelle, or it will starve. It doesn’t matter whether you’re the lion or a gazelle – when the sun comes up, you’d better be running.",
    author: "Christopher McDougall",
  },
  {
    quote:
      "Even if you are on the right track, you’ll get run over if you just sit there.",
    author: "Will Rogers",
  },
  {
    quote:
      "For a leader, getting results is more important than getting credit.",
    author: "Bob Burg",
  },
  {
    quote:
      "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.",
    author: "Confucius",
  },
  {
    quote: "Trouble is only opportunity in work clothes.",
    author: "Henry J. Kaiser",
  },
  { quote: "80% of success is showing up.", author: "Woody Allen" },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    quote: "Don’t wish it were easier, wish you were better.",
    author: "Jim Rohn",
  },
  {
    quote: "Life shrinks or expands in proportion to one’s courage.",
    author: "Anais Nin",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    quote:
      "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
    author: "Winston Churchill",
  },
  {
    quote:
      "Opportunities are usually disguised as hard work, so most people don’t recognize them.",
    author: "Ann Landers",
  },
  {
    quote: "Focus on being productive instead of being busy.",
    author: "Tim Ferriss",
  },
  {
    quote: "We’re not here to take part, we’re here to take over.",
    author: "Conor McGregor",
  },
  {
    quote:
      "By working faithfully eight hours a day, you may eventually get to be boss and work twelve hours a day.",
    author: "Robert Frost",
  },
  {
    quote:
      "Time is the friend of the wonderful business, the enemy of the mediocre.",
    author: "Warren Buffett",
  },
  { quote: "Whatever you are, be a good one.", author: "Abraham Lincoln" },
  {
    quote:
      "If you really look closely, most overnight successes took a long time.",
    author: "Steve Jobs",
  },
  {
    quote:
      "Success looks a lot like failure up until the moment you break through the finish line.",
    author: "Dan Waldschmidt",
  },
  {
    quote: "Don’t watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote:
      "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.",
    author: "Biz Stone",
  },
  {
    quote: "Goals allow you to control the direction of change in your favor.",
    author: "Brian Tracy",
  },
  {
    quote: "Don’t be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  {
    quote:
      "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
    author: "Sheryl Sandberg",
  },
  {
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  { quote: "Be so good, they can’t ignore you.", author: "Steve Martin" },
  {
    quote: "Winning isn’t everything, but wanting to win is.",
    author: "Vince Lombardi",
  },
  {
    quote: "I am who I am today because of the choices I made yesterday.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Always do your best. What you plant now, you will harvest later.",
    author: "Og Mandino",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Become the person who would attract the results you seek.",
    author: "Jim Cathcart",
  },
  {
    quote: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  { quote: "The best revenge is massive success.", author: "Frank Sinatra" },
  {
    quote: "Do not let what you cannot do interfere with what you can do.",
    author: "John R. Wooden",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { quote: "A goal is a dream with a deadline.", author: "Napoleon Hill" },
  {
    quote:
      "Setting goals is the first step in turning the invisible into the visible.",
    author: "Tony Robbins",
  },
  { quote: "Well done is better than well said.", author: "Benjamin Franklin" },
  {
    quote:
      "Some men see things as they are and ask why … I dream of things that never were and ask why not?",
    author: "Robert Kennedy",
  },
  {
    quote: "The successful warrior is the average man, with laser-like focus.",
    author: "Bruce Lee",
  },
  {
    quote:
      "If you were happy every day of your life, you wouldn’t be human, you’d be a game show host.",
    author: "Gabriel Heather",
  },
  {
    quote: "If you’re going through hell, keep going.",
    author: "Winston Churchill",
  },
  {
    quote: "Tough times never last, but tough people do.",
    author: "Robert Schuller",
  },
  {
    quote:
      "Two roads diverged in a wood, and I – I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
  },
  {
    quote:
      "Success is the ability to go from failure to failure without losing your enthusiasm.",
    author: "Winston Churchill",
  },
  {
    quote:
      "Success is the culmination of failures, mistakes, false starts, confusion, and the determination to keep going anyway.",
    author: "Nick Gleason",
  },
  {
    quote:
      "You don’t learn to walk by following rules. You learn by doing and falling over.",
    author: "Richard Branson",
  },
  { quote: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  {
    quote: "You just can’t beat the person who never gives up.",
    author: "Babe Ruth",
  },
  {
    quote:
      "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack of will.",
    author: "Vince Lombardi",
  },
  {
    quote: "Every strike brings me closer to the next home run.",
    author: "Babe Ruth",
  },
  {
    quote:
      "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
    author: "David Brinkley",
  },
  {
    quote:
      "Success is never final, failure is never fatal. It’s courage that counts.",
    author: "John Wooden",
  },
  {
    quote:
      "Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no hope at all.",
    author: "Dale Carnegie",
  },
  {
    quote: "Today is always the most productive day of your week.",
    author: "Mark Hunter",
  },
  {
    quote: "Believe you can and you’re halfway there.",
    author: "Theodore Roosevelt",
  },
  { quote: "It hurt because it mattered.", author: "John Green" },
  {
    quote: "Alone we can do so little, together we can do so much.",
    author: "Helen Keller",
  },
  {
    quote:
      "Don’t look at your feet to see if you are doing it right. Just dance.",
    author: "Anne Lamott",
  },
  {
    quote: "Set your goals high, and don’t stop till you get there.",
    author: "Bo Jackson",
  },
  {
    quote:
      "You don’t have to see the whole staircase, just take the first step.",
    author: "Martin Luther King, Jr.",
  },
  {
    quote:
      "Think like a queen. A queen is not afraid to fail. Failure is another stepping stone to greatness.",
    author: "Oprah Winfrey",
  },
  {
    quote: "Don’t count the days. Make the days count.",
    author: "Muhammad Ali",
  },
  {
    quote:
      "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
    author: "Maya Angelou",
  },
  {
    quote:
      "It takes two to speak the truth – one to speak, and another to hear.",
    author: "Henry David Thoreau",
  },
  {
    quote: "Don’t get so busy making a living that you forget to make a life.",
    author: "Dolly Parton",
  },
  {
    quote:
      "Preparation, I have often said, is rightly two-thirds of any venture.",
    author: "Amelia Earhart",
  },
];

const quoteObj = quotesArray[Math.floor(Math.random() * quotesArray.length)];
console.log("quoteobj",quoteObj);
export const quote = quoteObj
  ? quoteObj
  : {
      quote:
        "If you are not taking care of your customer, your competitor will.",
      author: "Bob Hooey",
    };
