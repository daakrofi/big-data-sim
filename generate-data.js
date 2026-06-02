const fs = require('fs');
const path = require('path');

const mockDataDir = path.join(__dirname, 'mock-data');
if (!fs.existsSync(mockDataDir)) {
  fs.mkdirSync(mockDataDir);
}

function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function weightedChoice(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomDate(daysBack) {
  return new Date(Date.now() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
}

// 1. Generate search_referrals.csv (1,500 rows)
// Fields: detailed marketing analytics export with impressions, clicks, specificity, platform, and proxy conversion signals
function generateSearchReferrals() {
  const referrers = ['Google', 'Bing', 'YouTube', 'Reddit', 'TikTok', 'Instagram', 'DuckDuckGo', 'Steam Search', 'Direct'];
  const searchTerms = [
    { term: 'life sim alternative with better customization', intent: 'Life Simulation', cluster: 'Customization Demand', platform: 'PC/Steam', growth: 48, sentiment: 0.62, weight: 13 },
    { term: 'life simulation game with mod support', intent: 'Life Simulation', cluster: 'Modding Demand', platform: 'PC/Steam', growth: 51, sentiment: 0.58, weight: 12 },
    { term: 'cosy game character creator and houses', intent: 'Life Simulation', cluster: 'Cozy Customization', platform: 'Switch/PC', growth: 44, sentiment: 0.72, weight: 11 },
    { term: 'games like TownLife but not paywall dlc', intent: 'Life Simulation', cluster: 'Competitor Dissatisfaction', platform: 'PC/Steam', growth: 39, sentiment: -0.18, weight: 9 },
    { term: 'ai social simulation game relationships', intent: 'Life Simulation', cluster: 'AI Systems', platform: 'PC', growth: 31, sentiment: 0.21, weight: 7 },
    { term: 'next highland skating game', intent: 'Skateboarding', cluster: 'Franchise Intent', platform: 'Console/PC', growth: 16, sentiment: 0.67, weight: 8 },
    { term: 'streetline skate multiplayer custom parks', intent: 'Skateboarding', cluster: 'UGC and Multiplayer', platform: 'Console/PC', growth: 28, sentiment: 0.74, weight: 8 },
    { term: 'expressive movement sports game', intent: 'Action Sports', cluster: 'Movement Sandbox', platform: 'Console/PC', growth: 23, sentiment: 0.55, weight: 7 },
    { term: 'open world skate bike parkour game', intent: 'Action Sports', cluster: 'Open World Sports', platform: 'Console/PC', growth: 27, sentiment: 0.5, weight: 7 },
    { term: 'racing game career mode realistic handling', intent: 'Racing', cluster: 'Career Mode', platform: 'Console', growth: 4, sentiment: 0.22, weight: 6 },
    { term: 'realistic car handling mods', intent: 'Racing', cluster: 'Physics Enthusiast', platform: 'PC', growth: -4, sentiment: 0.31, weight: 4 },
    { term: 'Apex Circuit sequel release date', intent: 'Racing', cluster: 'Franchise Intent', platform: 'Console', growth: 1, sentiment: 0.28, weight: 4 },
    { term: 'motorsport management team strategy game', intent: 'Motorsport Management', cluster: 'Management Niche', platform: 'PC', growth: 9, sentiment: 0.34, weight: 3 },
    { term: 'driver lifestyle motorsport management', intent: 'Motorsport Management', cluster: 'Lifestyle Variant', platform: 'PC/Console', growth: 12, sentiment: 0.18, weight: 2 }
  ];
  const countries = ['US', 'UK', 'DE', 'FR', 'JP', 'CA', 'AU', 'BR'];
  const devices = ['Desktop', 'Mobile', 'Console Browser', 'Tablet'];
  const stages = ['Needs Recognition', 'Information Search', 'Alternative Evaluation', 'Purchase Intent'];
  const landingPages = {
    'Life Simulation': ['/games/lifespace', '/news/simulation-roadmap', '/community/modding-policy'],
    'Skateboarding': ['/games/streetline-skate', '/community/park-builder', '/news/streetline-season'],
    'Action Sports': ['/projects/open-world-sports', '/games/streetline-skate', '/community/challenges'],
    'Racing': ['/games/apex-circuit', '/games/highland-velocity', '/support/wheel-setup'],
    'Motorsport Management': ['/projects/motorsport-management', '/games/apex-circuit']
  };

  let csvContent = 'ClickID,Timestamp,Referrer,SearchTerm,PrimaryIntent,SpecificKeywordCluster,TargetPlatform,Country,Device,LandingPage,Impressions,Clicks,CTRPercent,AverageSearchPosition,TrendGrowthPercent,SentimentScore,JourneyStage,WishlistProxyRatePercent\n';
  
  for (let i = 1; i <= 1500; i++) {
    const ref = choice(referrers);
    const searchObj = weightedChoice(searchTerms);
    const country = choice(countries);
    const date = randomDate(120);
    const timestamp = date.toISOString();
    const stage = choice(stages);
    const device = choice(devices);
    const landingPage = choice(landingPages[searchObj.intent] || ['/']);
    const specificityBoost = searchObj.term.split(' ').length > 4 ? 1.4 : 1;
    const baseImpressions = searchObj.intent === 'Life Simulation' ? 9000 : (searchObj.intent === 'Racing' ? 3800 : 5200);
    const impressions = Math.max(120, Math.floor(baseImpressions * (0.35 + Math.random() * 1.45)));
    const ctr = clamp((searchObj.growth > 25 ? 5.8 : 3.4) * specificityBoost + (Math.random() * 2.2 - 0.8), 1.1, 14.5);
    const clicks = Math.max(1, Math.round(impressions * ctr / 100));
    const avgPosition = clamp((searchObj.intent === 'Life Simulation' ? 5.4 : 7.2) + (Math.random() * 5 - 2.5), 1.1, 18.5);
    const proxy = clamp((ctr * 0.55) + (searchObj.sentiment > 0.5 ? 1.9 : 0.4) + (stage === 'Purchase Intent' ? 2.1 : 0) + (Math.random() * 1.8), 0.3, 12.8);
    
    csvContent += `REF-${100000 + i},${timestamp},${ref},"${searchObj.term}",${searchObj.intent},${searchObj.cluster},${searchObj.platform},${country},${device},${landingPage},${impressions},${clicks},${ctr.toFixed(2)},${avgPosition.toFixed(1)},${searchObj.growth},${searchObj.sentiment.toFixed(2)},${stage},${proxy.toFixed(2)}\n`;
  }
  
  fs.writeFileSync(path.join(mockDataDir, 'search_referrals.csv'), csvContent);
  console.log('Generated search_referrals.csv with 1,500 rows');
}

// 2. Generate historical_sales.csv (1,200 rows)
// Fields: TxID, Date, GameTitle, Genre, Platform, PriceUSD, Country, Refunded, SupportTicketRaised
function generateHistoricalSales() {
  const games = [
    { title: 'Highland Velocity', genre: 'Racing', price: 59.99, refundRate: 0.024, ticketRate: 0.08, pcShare: 0.3 },
    { title: 'Apex Circuit', genre: 'Racing', price: 59.99, refundRate: 0.018, ticketRate: 0.06, pcShare: 0.25 },
    { title: 'Streetline Skate', genre: 'Skateboarding', price: 39.99, refundRate: 0.011, ticketRate: 0.04, pcShare: 0.4 },
    { title: 'LifeSpace', genre: 'Life Simulation', price: 49.99, refundRate: 0.125, ticketRate: 0.28, pcShare: 0.85 }
  ];
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Switch'];
  const countries = ['US', 'UK', 'DE', 'FR', 'JP', 'CA', 'AU', 'BR'];

  let csvContent = 'TxID,Date,GameTitle,Genre,Platform,PriceUSD,Country,Refunded,SupportTicketRaised\n';

  for (let i = 1; i <= 1200; i++) {
    const game = games[Math.floor(Math.random() * games.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    // Platform distribution
    let plat = 'PlayStation';
    const randPlat = Math.random();
    if (randPlat < game.pcShare) {
      plat = 'PC';
    } else if (randPlat < game.pcShare + 0.35) {
      plat = 'PlayStation';
    } else if (randPlat < game.pcShare + 0.65) {
      plat = 'Xbox';
    } else {
      plat = game.genre === 'Life Simulation' ? 'PC' : 'Switch';
    }

    const date = new Date(Date.now() - Math.random() * 365 * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const refunded = Math.random() < game.refundRate ? 'TRUE' : 'FALSE';
    const ticketRaised = Math.random() < game.ticketRate ? 'TRUE' : 'FALSE';

    csvContent += `TX-${200000 + i},${date},${game.title},${game.genre},${plat},${game.price},${country},${refunded},${ticketRaised}\n`;
  }

  fs.writeFileSync(path.join(mockDataDir, 'historical_sales.csv'), csvContent);
  console.log('Generated historical_sales.csv with 1,200 rows');
}

// 3. Generate bug_reports.csv (1,000 rows)
// Fields: BugID, GameTitle, Severity, Category, Description, Status, ResolutionTimeDays, Reporter
function generateBugReports() {
  const severities = ['Critical', 'Major', 'Minor', 'Trivial'];
  const reporters = ['QA Engine', 'QA Lead', 'Community Coordinator', 'User Report', 'Moderator Team'];
  
  const lifeSimBugs = [
    { cat: 'Simulation Engine', desc: 'NPC state machine loops indefinitely causing game lock' },
    { cat: 'Save System', desc: 'Save file corrupts when closing game during autosave' },
    { cat: 'Social AI', desc: 'Characters walk through walls during socialization events' },
    { cat: 'UI', desc: 'Customization overlay freezes character mesh selection' },
    { cat: 'Memory', desc: 'Leak in custom asset loader leads to crash after 45 mins' },
    { cat: 'Simulation Engine', desc: 'Relationship level resets randomly after post-party cleanup' },
    { cat: 'AI Pathfinding', desc: 'NPC routing stuck on door frames in multi-story houses' },
    { cat: 'Physics Engine', desc: 'Furniture placement coordinates clip causing physics explosion' },
    { cat: 'Mod SDK', desc: 'Custom mod loader crashes when importing third-party textures' }
  ];

  const sportsBugs = [
    { cat: 'Physics', desc: 'Skateboard clips slightly into high curbs on high-speed grind' },
    { cat: 'Animation', desc: 'Character foot positioning slightly off during manual kickflip' },
    { cat: 'UI', desc: 'Leaderboard fails to refresh on slow network connection' },
    { cat: 'Physics', desc: 'Car collision with soft tyre barrier sends physics engine unstable' },
    { cat: 'Audio', desc: 'Skateboard grinding sound effect continues looping after dismount' }
  ];

  let csvContent = 'BugID,GameTitle,Severity,Category,Description,Status,ResolutionTimeDays,Reporter\n';

  for (let i = 1; i <= 1000; i++) {
    let gameTitle = 'LifeSpace';
    let bugObj = {};
    let severity = 'Major';

    // 70% of support tickets are for the buggy LifeSpace game
    if (Math.random() < 0.70) {
      gameTitle = 'LifeSpace';
      bugObj = lifeSimBugs[Math.floor(Math.random() * lifeSimBugs.length)];
      // LifeSpace has higher severity distribution
      const randSev = Math.random();
      severity = randSev < 0.35 ? 'Critical' : (randSev < 0.7 ? 'Major' : 'Minor');
    } else {
      const titles = ['Streetline Skate', 'Apex Circuit', 'Highland Velocity'];
      gameTitle = titles[Math.floor(Math.random() * titles.length)];
      bugObj = sportsBugs[Math.floor(Math.random() * sportsBugs.length)];
      const randSev = Math.random();
      severity = randSev < 0.1 ? 'Critical' : (randSev < 0.35 ? 'Major' : (randSev < 0.8 ? 'Minor' : 'Trivial'));
    }

    const status = Math.random() < 0.95 ? 'Closed' : 'Open';
    const reporter = reporters[Math.floor(Math.random() * reporters.length)];
    
    // Resolution times are much higher for critical/LifeSpace bugs
    let resTime = Math.floor(Math.random() * 5) + 1; // 1-5 days default
    if (gameTitle === 'LifeSpace') {
      resTime = severity === 'Critical' ? (Math.floor(Math.random() * 45) + 15) : (Math.floor(Math.random() * 20) + 5);
    } else if (severity === 'Critical') {
      resTime = Math.floor(Math.random() * 10) + 5;
    }

    csvContent += `BUG-${300000 + i},${gameTitle},${severity},${bugObj.cat},"${bugObj.desc}",${status},${resTime},${reporter}\n`;
  }

  fs.writeFileSync(path.join(mockDataDir, 'bug_reports.csv'), csvContent);
  console.log('Generated bug_reports.csv with 1,000 rows');
}

// 4. Generate competitor_comparison.csv (1,000 rows)
// Fields: CompetitorTitle,Genre,EstActiveUsersMAU,AverageReviewScore,LaunchPriceUSD,ModdingSupport,DLCFrequency,CrossPlaySupport,VisualStyle,CommunitySentiment
function generateCompetitorComparison() {
  const competitors = [
    { title: 'Speedway Unlimited', genre: 'Racing', score: 78, price: 59.99, mod: 'No', dlc: 'High (Monthly)', cross: 'Yes', style: 'Photorealistic', sentiment: 'Neutral' },
    { title: 'Turbo Asphalt 9', genre: 'Racing', score: 81, price: 59.99, mod: 'No', dlc: 'Medium (Quarterly)', cross: 'Yes', style: 'Photorealistic', sentiment: 'Positive' },
    { title: 'Grind & Slide', genre: 'Skateboarding', score: 88, price: 29.99, mod: 'Yes', dlc: 'Low', cross: 'No', style: 'Stylized', sentiment: 'Highly Positive' },
    { title: 'Skate Park Legends', genre: 'Skateboarding', score: 74, price: 19.99, mod: 'Yes', dlc: 'Medium', cross: 'No', style: 'Stylized', sentiment: 'Neutral' },
    { title: 'TownLife', genre: 'Life Simulation', score: 68, price: 0.00, mod: 'Yes', dlc: 'Very High', cross: 'Yes', style: 'Cartoonish', sentiment: 'Mixed' },
    { title: 'Cosy Valley', genre: 'Life Simulation', score: 92, price: 24.99, mod: 'No', dlc: 'Low', cross: 'Yes', style: 'Stylized', sentiment: 'Highly Positive' },
    { title: 'Pixel Society', genre: 'Life Simulation', score: 84, price: 14.99, mod: 'Yes', dlc: 'Low', cross: 'No', style: 'Retro Pixel', sentiment: 'Positive' }
  ];

  let csvContent = 'WeekID,CompetitorTitle,Genre,EstActiveUsersMAU,AverageReviewScore,LaunchPriceUSD,ModdingSupport,DLCFrequency,CrossPlaySupport,VisualStyle,CommunitySentiment\n';

  for (let i = 1; i <= 1000; i++) {
    const comp = competitors[Math.floor(Math.random() * competitors.length)];
    const week = `2025-W${String((i % 52) + 1).padStart(2, '0')}`;
    
    // Add realistic noise to active users
    let noise = (Math.random() - 0.5) * 0.15; // +/- 7.5% noise
    let baseMAU = 1000000;
    if (comp.genre === 'Life Simulation') {
      baseMAU = comp.title === 'TownLife' ? 15000000 : 4000000;
    } else if (comp.genre === 'Racing') {
      baseMAU = 3500000;
    }
    const mau = Math.floor(baseMAU * (1 + noise));

    csvContent += `WK-${10000 + i},${comp.title},${comp.genre},${mau},${comp.score},${comp.price},${comp.mod},${comp.dlc},${comp.cross},${comp.style},${comp.sentiment}\n`;
  }

  fs.writeFileSync(path.join(mockDataDir, 'competitor_comparison.csv'), csvContent);
  console.log('Generated competitor_comparison.csv with 1,000 rows');
}

// Execute all
generateSearchReferrals();
generateHistoricalSales();
generateBugReports();
generateCompetitorComparison();
console.log('All mock files written to mock-data/');
