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
  const referrers = ['Google', 'Bing', 'YouTube', 'Reddit', 'TikTok', 'Instagram', 'DuckDuckGo', 'Steam Search', 'PlayStation Store', 'Xbox Store', 'Epic Store', 'Twitch'];
  const searchTerms = [
    { term: 'life sim alternative with better customization', intent: 'Life Simulation', cluster: 'Customization Demand', platform: 'PC/Steam', growth: 48, sentiment: 0.62, weight: 13 },
    { term: 'life simulation game with mod support', intent: 'Life Simulation', cluster: 'Modding Demand', platform: 'PC/Steam', growth: 51, sentiment: 0.58, weight: 12 },
    { term: 'cosy game character creator and houses', intent: 'Life Simulation', cluster: 'Cozy Customization', platform: 'Switch/PC', growth: 44, sentiment: 0.72, weight: 11 },
    { term: 'games like TownLife but not paywall dlc', intent: 'Life Simulation', cluster: 'Competitor Dissatisfaction', platform: 'PC/Steam', growth: 39, sentiment: -0.18, weight: 9 },
    { term: 'ai social simulation game relationships', intent: 'Life Simulation', cluster: 'AI Systems', platform: 'PC', growth: 31, sentiment: 0.21, weight: 7 },
    { term: 'next highland skating game', intent: 'Skateboarding', cluster: 'Franchise Intent', platform: 'Console/PC', growth: 16, sentiment: 0.67, weight: 3 },
    { term: 'streetline skate multiplayer custom parks', intent: 'Skateboarding', cluster: 'UGC and Multiplayer', platform: 'Console/PC', growth: 28, sentiment: 0.74, weight: 8 },
    { term: 'expressive movement sports game', intent: 'Action Sports', cluster: 'Movement Sandbox', platform: 'Console/PC', growth: 23, sentiment: 0.55, weight: 7 },
    { term: 'open world skate bike parkour game', intent: 'Action Sports', cluster: 'Open World Sports', platform: 'Console/PC', growth: 27, sentiment: 0.5, weight: 7 },
    { term: 'co-op survival crafting private servers', intent: 'Survival Crafting', cluster: 'Co-op Persistence', platform: 'PC/Console', growth: 43, sentiment: 0.46, weight: 10 },
    { term: 'survival game base automation multiplayer', intent: 'Survival Crafting', cluster: 'Base Automation', platform: 'PC/Steam', growth: 37, sentiment: 0.41, weight: 8 },
    { term: 'single player RPG no battle pass', intent: 'RPG Adventure', cluster: 'Live Service Fatigue', platform: 'PC/Console', growth: 34, sentiment: 0.33, weight: 9 },
    { term: 'open world RPG character creator romance', intent: 'RPG Adventure', cluster: 'Identity and Story', platform: 'PC/Console', growth: 29, sentiment: 0.56, weight: 8 },
    { term: 'management game deep career mode', intent: 'Strategy Management', cluster: 'Systems Depth', platform: 'PC', growth: 18, sentiment: 0.49, weight: 6 },
    { term: 'sports management game realistic transfers', intent: 'Strategy Management', cluster: 'Data Simulation', platform: 'PC', growth: 14, sentiment: 0.45, weight: 5 },
    { term: 'battle pass shooter burnout', intent: 'Shooter Live Service', cluster: 'Monetization Backlash', platform: 'PC/Console', growth: -9, sentiment: -0.42, weight: 7 },
    { term: 'new extraction shooter fair monetization', intent: 'Shooter Live Service', cluster: 'Fair Monetization', platform: 'PC/Console', growth: 11, sentiment: -0.08, weight: 4 },
    { term: 'racing game career mode realistic handling', intent: 'Racing', cluster: 'Career Mode', platform: 'Console', growth: 4, sentiment: 0.22, weight: 6 },
    { term: 'realistic car handling mods', intent: 'Racing', cluster: 'Physics Enthusiast', platform: 'PC', growth: -4, sentiment: 0.31, weight: 4 },
    { term: 'Apex Circuit sequel release date', intent: 'Racing', cluster: 'Franchise Intent', platform: 'Console', growth: 1, sentiment: 0.28, weight: 2 },
    { term: 'motorsport management team strategy game', intent: 'Motorsport Management', cluster: 'Management Niche', platform: 'PC', growth: 9, sentiment: 0.34, weight: 3 },
    { term: 'driver lifestyle motorsport management', intent: 'Motorsport Management', cluster: 'Lifestyle Variant', platform: 'PC/Console', growth: 12, sentiment: 0.18, weight: 2 }
  ];
  const countries = ['US', 'UK', 'DE', 'FR', 'JP', 'CA', 'AU', 'BR'];
  const devices = ['Desktop', 'Mobile', 'Console Browser', 'Tablet'];
  const stages = ['Needs Recognition', 'Information Search', 'Alternative Evaluation', 'Purchase Intent'];
  const ownedDestinations = {
    'Life Simulation': ['/games/lifespace', '/news/simulation-roadmap', '/community/modding-policy'],
    'Skateboarding': ['/games/streetline-skate', '/community/park-builder', '/news/streetline-season'],
    'Action Sports': ['/projects/open-world-sports', '/games/streetline-skate', '/community/challenges'],
    'Racing': ['/games/apex-circuit', '/games/highland-velocity', '/support/wheel-setup'],
    'Motorsport Management': ['/projects/motorsport-management', '/games/apex-circuit']
  };
  const marketDestinations = {
    'Life Simulation': ['Steam category: life and cozy simulation', 'YouTube results: life sim alternatives', 'Reddit thread: TownLife DLC complaints'],
    'Skateboarding': ['Steam category: skateboarding', 'YouTube results: custom park clips', 'Forum thread: skate game recommendations'],
    'Action Sports': ['Steam category: action sports', 'TikTok results: trick city clips', 'Reddit thread: open-world sports games'],
    'Racing': ['Steam category: racing', 'YouTube results: wheel support comparison', 'Forum thread: career mode rankings'],
    'Motorsport Management': ['Steam category: sports management', 'Forum thread: motorsport management depth'],
    'Survival Crafting': ['Steam category: survival crafting', 'YouTube results: co-op survival base building', 'Reddit thread: private server recommendations'],
    'RPG Adventure': ['Steam category: RPG', 'YouTube results: RPG character creator', 'Forum thread: anti battle-pass RPGs'],
    'Strategy Management': ['Steam category: strategy management', 'Newsletter result: sports management analysis', 'Forum thread: deep career mode'],
    'Shooter Live Service': ['Steam category: extraction shooter', 'Reddit thread: battle pass fatigue', 'Twitch category: competitive shooter']
  };

  let csvContent = 'ClickID,Timestamp,Referrer,SearchTerm,PrimaryIntent,SpecificKeywordCluster,TargetPlatform,Country,Device,SearchScope,DestinationType,Destination,Impressions,Clicks,CTRPercent,AverageSearchPosition,TrendGrowthPercent,SentimentScore,JourneyStage,WishlistProxyRatePercent\n';
  
  for (let i = 1; i <= 1500; i++) {
    const ref = choice(referrers);
    const searchObj = weightedChoice(searchTerms);
    const country = choice(countries);
    const date = randomDate(120);
    const timestamp = date.toISOString();
    const stage = choice(stages);
    const device = choice(devices);
    const ownedClick = ['Life Simulation', 'Skateboarding', 'Action Sports', 'Racing', 'Motorsport Management'].includes(searchObj.intent) && Math.random() < 0.22;
    const competitorResearch = !ownedClick && Math.random() < 0.34;
    const searchScope = ownedClick ? 'Highland owned clickthrough' : (competitorResearch ? 'Competitor/category research' : 'Market-wide category query');
    const destinationType = ownedClick ? 'Owned site' : (competitorResearch ? 'Competitor or community result' : 'Search results category');
    const landingPage = ownedClick
      ? choice(ownedDestinations[searchObj.intent] || ['Highland owned site'])
      : choice(marketDestinations[searchObj.intent] || ['General search results']);
    const specificityBoost = searchObj.term.split(' ').length > 4 ? 1.4 : 1;
    const baseImpressions = {
      'Life Simulation': 9000,
      'Survival Crafting': 7600,
      'RPG Adventure': 8200,
      'Shooter Live Service': 6800,
      'Racing': 3800,
      'Strategy Management': 3100,
      'Motorsport Management': 2400
    }[searchObj.intent] || 5200;
    const impressions = Math.max(120, Math.floor(baseImpressions * (0.35 + Math.random() * 1.45)));
    const ctr = clamp((searchObj.growth > 25 ? 5.8 : 3.4) * specificityBoost + (Math.random() * 2.2 - 0.8), 1.1, 14.5);
    const clicks = Math.max(1, Math.round(impressions * ctr / 100));
    const avgPosition = clamp((searchObj.intent === 'Life Simulation' ? 5.4 : 7.2) + (Math.random() * 5 - 2.5), 1.1, 18.5);
    const proxy = clamp((ctr * 0.55) + (searchObj.sentiment > 0.5 ? 1.9 : 0.4) + (stage === 'Purchase Intent' ? 2.1 : 0) + (Math.random() * 1.8), 0.3, 12.8);
    
    csvContent += `REF-${100000 + i},${timestamp},${ref},"${searchObj.term}",${searchObj.intent},${searchObj.cluster},${searchObj.platform},${country},${device},"${searchScope}","${destinationType}","${landingPage}",${impressions},${clicks},${ctr.toFixed(2)},${avgPosition.toFixed(1)},${searchObj.growth},${searchObj.sentiment.toFixed(2)},${stage},${proxy.toFixed(2)}\n`;
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

// 2b. Generate refund_escalation_data.csv (1,600 rows)
// Fields: refund and platform escalation records across Highland titles and genre comparators
function generateRefundEscalations() {
  const games = [
    { title: 'LifeSpace', genre: 'Life Simulation', rate: 0.36, price: 49.99, escalated: 0.42, reasons: ['Save corruption', 'Crash after long session', 'NPC AI failure', 'DLC value complaint', 'Mod incompatibility'] },
    { title: 'Streetline Skate', genre: 'Skateboarding', rate: 0.08, price: 39.99, escalated: 0.12, reasons: ['Controller calibration', 'Online park desync', 'Performance on older console', 'Refund after skill barrier'] },
    { title: 'Apex Circuit', genre: 'Racing', rate: 0.11, price: 59.99, escalated: 0.16, reasons: ['Wheel support issue', 'Career mode repetition', 'Leaderboard outage', 'License content mismatch'] },
    { title: 'TownLife', genre: 'Life Simulation', rate: 0.18, price: 0.00, escalated: 0.31, reasons: ['DLC pricing dispute', 'Expansion compatibility', 'Account entitlement issue', 'Mod update broke save'] },
    { title: 'Hearthwild', genre: 'Survival Crafting', rate: 0.14, price: 34.99, escalated: 0.20, reasons: ['Server rollback', 'Co-op connection failure', 'Early access content gap', 'Anti-cheat false positive'] },
    { title: 'Chronicle Vale', genre: 'RPG Adventure', rate: 0.10, price: 59.99, escalated: 0.13, reasons: ['Quest blocker', 'Performance stutter', 'Regional price dispute', 'Controller accessibility issue'] },
    { title: 'Club Director Pro', genre: 'Strategy Management', rate: 0.07, price: 39.99, escalated: 0.09, reasons: ['Database import failure', 'UI scaling issue', 'Simulation balance complaint', 'Localization error'] },
    { title: 'Zero Hour Arena', genre: 'Shooter Live Service', rate: 0.21, price: 0.00, escalated: 0.27, reasons: ['Battle pass chargeback', 'Matchmaking instability', 'Skin entitlement issue', 'Anti-cheat appeal'] }
  ];
  const storefronts = ['Steam', 'PlayStation Store', 'Xbox Store', 'Epic Store'];
  const regions = ['UK', 'US', 'DE', 'FR', 'JP', 'CA', 'AU', 'BR'];
  const tiers = ['Storefront auto-approved', 'Publisher review', 'Platform escalation', 'Legal/privacy review'];
  const statuses = ['Approved', 'Denied', 'Pending evidence', 'Partial credit issued', 'Chargeback risk'];

  let csvContent = 'RefundID,Date,GameTitle,Genre,PlatformStorefront,Region,PurchasePriceGBP,HoursPlayed,RefundRequested,RefundReason,ComplaintCategory,Escalated,EscalationTier,ResolutionStatus,ResolutionDays,SupportNotes\n';

  for (let i = 1; i <= 1600; i++) {
    const game = weightedChoice(games.map(g => ({ ...g, weight: g.rate * 100 })));
    const requested = Math.random() < game.rate ? 'TRUE' : 'FALSE';
    const escalated = requested && Math.random() < game.escalated ? 'TRUE' : 'FALSE';
    const reason = choice(game.reasons);
    const tier = escalated === 'TRUE' ? choice(tiers.slice(1)) : tiers[0];
    const status = requested === 'TRUE' ? choice(statuses) : 'No refund requested';
    const hours = clamp((Math.random() * 18) + (game.genre === 'Life Simulation' ? 3 : 0), 0.2, 38).toFixed(1);
    const days = requested === 'TRUE' ? Math.floor(Math.random() * (escalated === 'TRUE' ? 21 : 5)) + 1 : 0;
    const date = randomDate(240).toISOString().split('T')[0];
    const note = escalated === 'TRUE'
      ? `Escalated because player supplied logs or payment evidence for ${reason.toLowerCase()}`
      : (requested === 'TRUE' ? `Standard storefront review for ${reason.toLowerCase()}` : 'Telemetry record retained for refund-rate denominator');

    csvContent += `RF-${500000 + i},${date},${game.title},${game.genre},${choice(storefronts)},${choice(regions)},${game.price.toFixed(2)},${hours},${requested},"${reason}","${reason.split(' ')[0]} / support",${escalated},"${tier}","${status}",${days},"${note}"\n`;
  }

  fs.writeFileSync(path.join(mockDataDir, 'refund_escalation_data.csv'), csvContent);
  console.log('Generated refund_escalation_data.csv with 1,600 rows');
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
    { title: 'Pixel Society', genre: 'Life Simulation', score: 84, price: 14.99, mod: 'Yes', dlc: 'Low', cross: 'No', style: 'Retro Pixel', sentiment: 'Positive' },
    { title: 'Hearthwild', genre: 'Survival Crafting', score: 86, price: 34.99, mod: 'Partial', dlc: 'Medium', cross: 'Yes', style: 'Stylized Realism', sentiment: 'Positive' },
    { title: 'Frontier Ash', genre: 'Survival Crafting', score: 79, price: 29.99, mod: 'Yes', dlc: 'Medium', cross: 'Yes', style: 'Realistic', sentiment: 'Neutral' },
    { title: 'Chronicle Vale', genre: 'RPG Adventure', score: 90, price: 59.99, mod: 'No', dlc: 'Low', cross: 'No', style: 'High Fantasy', sentiment: 'Highly Positive' },
    { title: 'Mythward', genre: 'RPG Adventure', score: 82, price: 69.99, mod: 'No', dlc: 'Medium', cross: 'Yes', style: 'Cinematic', sentiment: 'Positive' },
    { title: 'Club Director Pro', genre: 'Strategy Management', score: 87, price: 39.99, mod: 'Database Edits', dlc: 'Medium', cross: 'No', style: 'Data UI', sentiment: 'Positive' },
    { title: 'Empire Desk', genre: 'Strategy Management', score: 80, price: 29.99, mod: 'Yes', dlc: 'Low', cross: 'No', style: 'Minimalist', sentiment: 'Neutral' },
    { title: 'Zero Hour Arena', genre: 'Shooter Live Service', score: 71, price: 0.00, mod: 'No', dlc: 'High (Seasonal)', cross: 'Yes', style: 'Military Sci-Fi', sentiment: 'Mixed' }
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
    } else if (comp.genre === 'Survival Crafting') {
      baseMAU = 5200000;
    } else if (comp.genre === 'RPG Adventure') {
      baseMAU = 6100000;
    } else if (comp.genre === 'Shooter Live Service') {
      baseMAU = 9000000;
    } else if (comp.genre === 'Strategy Management') {
      baseMAU = 1500000;
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
generateRefundEscalations();
generateBugReports();
generateCompetitorComparison();
console.log('All mock files written to mock-data/');
