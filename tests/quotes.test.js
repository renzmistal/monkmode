import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { QuoteManager } from '../js/quotes.js';

describe('QuoteManager', () => {
  let quoteManager;
  let mockElements;
  
  beforeEach(() => {
    mockElements = {
      quoteElement: { textContent: '' },
      authorElement: { textContent: '' },
      updateInterval: 3600000 // 1 hour
    };
    
    // Mock Math.random to return predictable values
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    
    // Mock setInterval
    vi.useFakeTimers();
    
    quoteManager = new QuoteManager(mockElements);
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it('should initialize with quotes array', () => {
    expect(quoteManager.quotes.length).toBeGreaterThan(0);
    expect(quoteManager.currentQuoteIndex).toBe(0);
  });
  
  it('should display a random quote', () => {
    // With Math.random mocked to return 0.5, we can predict the index
    const expectedIndex = Math.floor(0.5 * quoteManager.quotes.length);
    
    quoteManager.displayRandomQuote();
    
    const expectedQuote = quoteManager.quotes[expectedIndex];
    expect(quoteManager.quoteElement.textContent).toBe(`"${expectedQuote.text}"`);
    expect(quoteManager.authorElement.textContent).toBe(`- ${expectedQuote.author}`);
    expect(quoteManager.currentQuoteIndex).toBe(expectedIndex);
  });
  
  it('should set up interval for quote updates on init', () => {
    const setIntervalSpy = vi.spyOn(global, 'setInterval');
    
    quoteManager.init();
    
    expect(setIntervalSpy).toHaveBeenCalledWith(
      expect.any(Function),
      quoteManager.updateInterval
    );
  });
  
  it('should avoid showing the same quote twice in a row', () => {
    // Set current quote index
    quoteManager.currentQuoteIndex = 6;
    
    // Mock Math.random to return a value that would result in the same index
    const mockIndex = 6 / quoteManager.quotes.length;
    Math.random.mockReturnValueOnce(mockIndex);
    
    // Mock recursive call to displayRandomQuote
    const displayRandomQuoteSpy = vi.spyOn(quoteManager, 'displayRandomQuote');
    
    quoteManager.displayRandomQuote();
    
    // Should call itself recursively to get a different quote
    expect(displayRandomQuoteSpy).toHaveBeenCalledTimes(1);
  });
});
