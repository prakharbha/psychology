/**
 * 301 Redirects Mapping
 * 
 * Add your old URLs here with their corresponding new URLs.
 * Format: '/old-path' => '/new-path'
 * 
 * To find old indexed pages:
 * 1. Google Search Console: Go to Coverage or Pages section
 * 2. Google Search: Use "site:your-old-domain.com" to see indexed pages
 * 3. Google Analytics: Check top pages report
 * 4. Server logs: Check 404 errors to see what people are trying to access
 */

export const redirects: Record<string, string> = {
  // Old URLs from previous site - 301 redirects for SEO
  // Note: Removed identical redirects where old URL = new URL:
  // - /modernisation-scale (same)
  // - /anxiety-test-a-test (same)
  // - /bhatia-verbal-intelligence-test-hindi (same)
  '/advertising-attitude-scale-bilingual': '/advertising-attitude-scale',
  '/study-habit-scale-bilingual': '/study-habit-scale',
  '/depression-scale-d-scalebilingual': '/depression-scale',
  '/karma-yoga-scale-bilingual': '/karma-yoga-scale',
  '/the-value-test-bilingual': '/the-value-test',
  '/self-concept-scale-hindi': '/self-concept-scale',
  '/reservation-attitude-scale-bilingual': '/reservation-attitude-scale',
  '/organizational-climate-scale-bilingual': '/organizational-climate-scale',
  '/eco-friendly-behaviour-inventory-bilingual': '/eco-friendly-behaviour-inventory',
  '/psycho-social-variable-scale-bilingual': '/psycho-social-variable-scale',
  '/altruism-scale-altr-scale-bilingual': '/altruism-scale',
  '/frustration-test-f-test-bilingual': '/frustration-test',
  '/role-stress-for-working-women-bilingual': '/role-stress-working-women',
  '/feeling-of-crowding-scale-fcs-bilingual': '/feeling-of-crowding-scale',
  '/multi-variables-personality-inventory-mpi-hindi': '/multi-variables-personality-inventory',
  '/self-society-scale-s-s-scale-bilingual': '/self-society-scale',
  '/swadharma-scale-k-s-s-scale-bilingual': '/swadharma-scale-k-s',
  '/span-of-immediate-memory-auditory-experiment-bilingual': '/span-of-immediate-memory',
  '/psychosocial-resources-scale-p-r-scale-bilingual': '/psychosocial-resources-scale',
  '/academic-stress-scale-a-s-scale-bilingual': '/academic-stress-scale',
  '/students-stress-scale-s-s-scale-bilingual': '/students-stress-scale',
  '/parental-expectation-scale-p-e-scale-bilingual': '/parental-expectation-scale',
  '/anxiety-test-for-adulta-test-for-adult-bilingual': '/anxiety-test-adult',
  '/extraversion-introversion-inventory-e-i-i-bilingual': '/extraversion-introversion-inventory',
  '/general-well-being-scale-g-w-scale-bilingual': '/general-wellbeing-scale',
  '/quality-of-life-scale-q-o-l-scale-bilingual': '/quality-of-life-scale',
  '/life-satisfaction-scale-l-s-scale-bilingual': '/life-satisfaction-scale',
  '/swadharma-scale-s-scale-bilingual': '/swadharma-scale',
  '/home-environment-scale-hes-bilingual': '/home-environment-scale',
};

/**
 * Get redirect destination for a given path
 */
export function getRedirect(path: string): string | null {
  // Exact match
  if (redirects[path]) {
    return redirects[path];
  }
  
  // Check with trailing slash
  if (path.endsWith('/') && redirects[path.slice(0, -1)]) {
    return redirects[path.slice(0, -1)];
  }
  
  // Check without trailing slash
  if (!path.endsWith('/') && redirects[path + '/']) {
    return redirects[path + '/'];
  }
  
  return null;
}

