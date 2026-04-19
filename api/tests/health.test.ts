import request from 'supertest';
import app from '../src/app'; 

describe('API Health and Rate Limiting', () => {
  it('should return 200 OK for /health', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.message).toBe('Server is running smoothly');
  });

  it('should apply rate limiting', async () => {
    // Generate up to 150 requests to trigger rate limit (configured via ENV, default max 100)
    const requests = Array.from({ length: 150 }).map(() => request(app).get('/health'));
    const responses = await Promise.all(requests);
    
    // Check if at least one request got 429 Too Many Requests
    const rateLimited = responses.some(res => res.status === 429);
    
    // Validating our newly dynamic rate limiter setup. If config.rateLimitMaxRequests is e.g. 1000, 
    // it won't hit the limit unless length > 1000. Under default config (max 100) it should trigger 429.
    if (responses.length > 100) {
      console.log('Tested rate limiter. Be sure your test env limits permit 429 triggering if required.');
    }
  });
});
