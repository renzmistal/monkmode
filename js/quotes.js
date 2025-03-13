/**
 * QuoteManager class for managing inspirational quotes
 */
export class QuoteManager {
  constructor(options) {
    this.quoteElement = options.quoteElement;
    this.authorElement = options.authorElement;
    this.updateInterval = options.updateInterval;
    this.quotes = [
      {
        text: "Focus on being productive instead of busy.",
        author: "Tim Ferriss"
      },
      {
        text: "Your focus determines your reality.",
        author: "Qui-Gon Jinn"
      },
      {
        text: "Simplicity boils down to two steps: Identify the essential. Eliminate the rest.",
        author: "Leo Babauta"
      },
      {
        text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
        author: "Stephen Covey"
      },
      {
        text: "It's not always that we need to do more but rather that we need to focus on less.",
        author: "Nathan W. Morris"
      },
      {
        text: "Concentrate all your thoughts upon the work in hand. The sun's rays do not burn until brought to a focus.",
        author: "Alexander Graham Bell"
      },
      {
        text: "The successful warrior is the average man, with laser-like focus.",
        author: "Bruce Lee"
      },
      {
        text: "Lack of direction, not lack of time, is the problem. We all have twenty-four hour days.",
        author: "Zig Ziglar"
      },
      {
        text: "Don't be fooled by the calendar. There are only as many days in the year as you make use of.",
        author: "Charles Richards"
      },
      {
        text: "The best way to predict your future is to create it.",
        author: "Abraham Lincoln"
      },
      {
        text: "You will never reach your destination if you stop and throw stones at every dog that barks.",
        author: "Winston Churchill"
      },
      {
        text: "The mind is everything. What you think you become.",
        author: "Buddha"
      }
    ];
    this.currentQuoteIndex = 0;
  }
  
  init() {
    this.displayRandomQuote();
    setInterval(() => this.displayRandomQuote(), this.updateInterval);
  }
  
  displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    
    // Make sure we don't show the same quote twice in a row
    if (randomIndex === this.currentQuoteIndex && this.quotes.length > 1) {
      this.displayRandomQuote();
      return;
    }
    
    this.currentQuoteIndex = randomIndex;
    const quote = this.quotes[this.currentQuoteIndex];
    
    this.quoteElement.textContent = `"${quote.text}"`;
    this.authorElement.textContent = `- ${quote.author}`;
  }
}
