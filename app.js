/* app.js - Highland Studios Interactive Big Data Analytics Exercise */

// --- 1. CONFIGURATION & SIMULATION DATA ---

const TEAMS_CONFIG = {
  "Team 1": "HIGHLAND-101",
  "Team 2": "HIGHLAND-202",
  "Team 3": "HIGHLAND-303",
  "Team 4": "HIGHLAND-404",
  "Team 5": "HIGHLAND-505",
  "Team 6": "HIGHLAND-606",
  "Team 7": "HIGHLAND-707",
  "Team 8": "HIGHLAND-808",
  "Team 9": "HIGHLAND-909",
  "Team 10": "HIGHLAND-010",
  "Admin": "admin1991"
};

// Available Project Options
const PROJECT_OPTIONS = {
  "racing_sequel": {
    name: "Racing Sequel",
    risk: "Low to Moderate",
    cost: "£12M - £15M",
    devTime: "3 Years",
    potential: "Predictable, Front-loaded",
    capability: "Strong (Proven team, existing physics engine)"
  },
  "skating_sequel": {
    name: "Skateboarding Sequel",
    risk: "Moderate",
    cost: "£8M - £10M",
    devTime: "2-3 Years",
    potential: "Strong long-tail word-of-mouth",
    capability: "Strong (Streetline Skate engine, high team morale)"
  },
  "open_world_sports": {
    name: "Open-World Action-Sports",
    risk: "Moderate to High",
    cost: "£16M - £20M",
    devTime: "4 Years",
    potential: "High streaming potential, microtransactions",
    capability: "Moderate (Adjacency to skating physics, requires server scaling)"
  },
  "lifesim_reboot": {
    name: "Life Simulation Reboot",
    risk: "High",
    cost: "£20M - £25M",
    devTime: "4-5 Years",
    potential: "Extremely High (Modding ecosystem, steady expansion packs)",
    capability: "Weak (Previous failure damaged morale, fragile AI simulation tools)"
  },
  "hybrid_lifestyle": {
    name: "Hybrid Lifestyle Sports Game",
    risk: "Moderate",
    cost: "£12M - £14M",
    devTime: "3 Years",
    potential: "Distinctive market positioning, self-expression",
    capability: "Good (Combines skating systems with avatar social features)"
  },
  "motorsport_mgmt": {
    name: "Motorsport Management & Lifestyle",
    risk: "Moderate",
    cost: "£6M - £8M",
    devTime: "2 Years",
    potential: "Niche, steady DLC/yearly updates",
    capability: "Moderate (Leverages racing credibility but needs spreadsheet design UI)"
  }
};

// Data Sources data model organized by stage (1-7)
const DATA_SOURCES = {
  // --- Stage 1 ---
  "s1_search_trends": {
    id: "s1_search_trends",
    stage: 1,
    name: "Search Trend Data",
    description: "Aggregated time-series data showing global search index scores for genres, gameplay terms, and platforms over the past 12 months.",
    format: "Structured time-series index",
    owner: "External marketing analytics vendor",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Identifies current consumer category volume)",
    limitations: "Search volume reflects curiosity and hype but does not guarantee purchase conversion. Highly susceptible to short-term viral events.",
    questions: "What are consumers currently interested in?",
    behaviour: "instant",
    dashboardType: "market_trends"
  },
  "s1_social_listening": {
    id: "s1_social_listening",
    stage: 1,
    name: "Social Listening Feed & Live Sentiment Parser",
    description: "Real-time scraped keyword logs and sentiment scores from public discussions on Reddit, TikTok, YouTube comments, and Discord servers. Features a live keyword tracker.",
    format: "Unstructured text & sentiment vectors",
    owner: "External social metrics platform",
    availability: "Immediate",
    refresh: "Hourly (Simulated Live)",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Diagnostic (Understands keyword associations and emotional valence)",
    limitations: "Social media users represent a vocal minority. Sentiment algorithms often misinterpret sarcasm, memes, and gaming jargon.",
    questions: "What are the common discussion patterns around genres?",
    behaviour: "live",
    liveType: "social"
  },
  "s1_parent_audience": {
    id: "s1_parent_audience",
    stage: 1,
    name: "Parent Company Audience Data",
    description: "Audience preference data showing entertainment overlaps, media consumption habits, and IP affinity from our parent company's wider entertainment ecosystem (streaming, comics, and merchandising).",
    format: "Structured behavioral cross-tab",
    owner: "Parent Company Corporate Analytics",
    availability: "Requires approval",
    refresh: "Quarterly",
    cost: 0,
    delay: 1, // RNG assigned dynamically at runtime between 60s and 300s
    analyticalUse: "Descriptive & Predictive",
    limitations: "Wider entertainment consumers (TV, movies) have different engagement patterns than active core gamers. Correlation does not imply direct gameplay conversion.",
    questions: "Is there a crossover audience within our parent corporate ecosystem?",
    behaviour: "email",
    emailKey: "parent_company_overlap"
  },

  // --- Stage 2 ---
  "s2_web_analytics": {
    id: "s2_web_analytics",
    stage: 2,
    name: "Website & Landing Page Analytics",
    description: "Clickstream data, visitor counts, referral sources, average time on page, and navigation heatmaps from Highland Studios' official portal and game detail pages.",
    format: "Structured web event records",
    owner: "Internal Web Infrastructure Team",
    availability: "Immediate",
    refresh: "Real-time",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Measures early investigation intent)",
    limitations: "Measures traffic to our own owned sites only. Fails to capture general category web behavior elsewhere.",
    questions: "Which Highland game franchise pages generate the highest engagement time?",
    behaviour: "instant",
    dashboardType: "web_clicks"
  },
  "s2_trailer_engagement": {
    id: "s2_trailer_engagement",
    stage: 2,
    name: "Trailer & Video Engagement Data",
    description: "Video retention curves, play counts, thumbs up/down ratios, and share metrics across platforms (YouTube, Twitch, Instagram) for our past game reveals.",
    format: "Structured media analytics log",
    owner: "Marketing Media Analytics",
    availability: "Immediate",
    refresh: "Daily",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Diagnostic",
    limitations: "Viewer retention peaks at cinematic action sequences, which may not correspond to core gameplay interest or quality expectations.",
    questions: "What trailers maintain the highest player attention scores?",
    behaviour: "instant",
    dashboardType: "video_retention"
  },
  "s2_search_referrals": {
    id: "s2_search_referrals",
    stage: 2,
    name: "Search Query Referral Dataset (1,500 Rows)",
    description: "Log of specific search terms that led users to click on Highland Studios links from Google, Bing, and DuckDuckGo search engine results.",
    format: "Structured CSV",
    owner: "SEO Marketing Operations",
    availability: "Immediate",
    refresh: "Daily",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Captures exact user search intent)",
    limitations: "Search engines redact a large portion of organic query keywords due to privacy policies (categorized as 'not provided').",
    questions: "What direct searches lead organic traffic to our game servers?",
    behaviour: "csv",
    csvFile: "search_referrals.csv"
  },

  // --- Stage 3 ---
  "s3_competitor_comparison": {
    id: "s3_competitor_comparison",
    stage: 3,
    name: "Competitor Comparison Dataset (1,000 Rows)",
    description: "A market intelligence database detailing comparable titles by competitor studios, including prices, review scores, peak MAUs, DLC structures, and modding details.",
    format: "Structured CSV",
    owner: "External Market Intelligence Partner",
    availability: "Immediate",
    refresh: "Monthly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Diagnostic (Maps the competitive space)",
    limitations: "Player numbers for private storefronts are estimates. Does not show developer cost structures of competitors.",
    questions: "How are competing titles priced and rated, and do they support modding?",
    behaviour: "csv",
    csvFile: "competitor_comparison.csv"
  },
  "s3_wishlist_data": {
    id: "s3_wishlist_data",
    stage: 3,
    name: "Wishlist & Follower Trends",
    description: "Database track of pre-release wishlist additions, follower growth curves, and store community subscriptions on platforms like Steam, PlayStation Store, and Xbox Live.",
    format: "Structured platform metrics",
    owner: "Digital Platform Operations",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Predictive (Leading indicator of launch week sales)",
    limitations: "Wishlist-to-sale conversion rates vary dramatically by genre, discount cadence, and critic reviews on launch day.",
    questions: "How quickly do wishlists grow in different genres?",
    behaviour: "instant",
    dashboardType: "wishlist_trends"
  },
  "s3_community_expectations": {
    id: "s3_community_expectations",
    stage: 3,
    name: "Community Expectations Analysis",
    description: "NLP processing results showing key topics, complaints, feature requests, and emotional valence of pre-release discussions for upcoming competitor titles.",
    format: "Unstructured NLP clusters",
    owner: "Community Moderation Team",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Diagnostic (Highlights gaps in competitor offerings)",
    limitations: "Vocal online critics often express strong structural demands (like modding or complex AI) that the broader casual player base may not care about.",
    questions: "What are the common expectations and worries around new game launches?",
    behaviour: "instant",
    dashboardType: "sentiment_explorer"
  },
  "s3_influencer_coverage": {
    id: "s3_influencer_coverage",
    stage: 3,
    name: "Influencer & Streamer Coverage Report",
    description: "Comprehensive study evaluating which genres and gameplay mechanics generate the highest streaming hours, viewer chat engagement, and organic co-streaming index on Twitch and YouTube Gaming.",
    format: "Pre-analyzed PDF Report",
    owner: "Influencer Relations Agency",
    availability: "Immediate",
    refresh: "Monthly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Predictive",
    limitations: "Streamer popularity is highly cyclical and depends heavily on active streamer sponsorships. Highly engaging spectator games are not always highly played games.",
    questions: "What games generate organic content and streaming interest?",
    behaviour: "report",
    reportKey: "influencer_coverage_report"
  },

  // --- Stage 4 ---
  "s4_historical_sales": {
    id: "s4_historical_sales",
    stage: 4,
    name: "Highland Historical Sales Logs (1,200 Rows)",
    description: "Transaction records, monthly sales curves, digital store division shares, and total unit sales for all major titles released by Highland Studios.",
    format: "Structured CSV",
    owner: "Finance & Accounting Operations",
    availability: "Immediate",
    refresh: "Historical (Closed)",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Establishes our financial baseline)",
    limitations: "Historical data reflects previous market conditions and historical marketing budgets, not necessarily future consumer behavior.",
    questions: "What were the actual unit sales and budgets of our past games?",
    behaviour: "csv",
    csvFile: "historical_sales.csv"
  },
  "s4_platform_sales_benchmark": {
    id: "s4_platform_sales_benchmark",
    stage: 4,
    name: "Platform Sales Benchmark Dataset",
    description: "Estimated gross sales revenue, download volume, and platform market split for the entire games industry across racing, sports, and simulation genres.",
    format: "Structured Market intelligence database",
    owner: "SuperData Market Metrics",
    availability: "Immediate",
    refresh: "Quarterly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Predictive",
    limitations: "Contains aggregated averages that hide the wide variance between highly successful blockbuster titles and average indie releases.",
    questions: "What are the overall category sales volumes across consoles and PC?",
    behaviour: "instant",
    dashboardType: "platform_sales"
  },
  "s4_ad_spend_analysis": {
    id: "s4_ad_spend_analysis",
    stage: 4,
    name: "Competitor Ad Spend & Acquisition Audit (Premium)",
    description: "Confidential audit from AdIntelligence Group mapping digital advertising spends, paid user acquisition rates, and Mobile App Install costs across competitors. Exceeds budget if combined with the NPS study.",
    format: "Structured Marketing Audit",
    owner: "AdIntelligence Group (Premium)",
    availability: "Requires purchase",
    refresh: "Quarterly",
    cost: 5000, // Costs £5,000
    delay: 0,
    analyticalUse: "Predictive & Diagnostic",
    limitations: "Estimates are modeled based on ad network bid ranges. Fails to record organic community viral channels.",
    questions: "What are the ad budgets and customer acquisition costs of competitor titles?",
    behaviour: "purchase",
    purchasedKey: "ad_spend_unlocked",
    dashboardType: "ad_spend_premium"
  },
  "s4_pricing_discount_behavior": {
    id: "s4_pricing_discount_behavior",
    stage: 4,
    name: "Pricing & Discount Decay Curves",
    description: "Historical data representing the speed of pricing decay, discount depth over 24 months post-launch, and the effect of bundle sales on total units sold.",
    format: "Structured CSV",
    owner: "Storefront Distribution Operations",
    availability: "Immediate",
    refresh: "Monthly",
    cost: 0,
    delay: 0,
    analyticalUse: "Diagnostic (Explains revenue curve patterns)",
    limitations: "Aggregates data over different economic environments; pricing elasticity can shift rapidly based on macroinflationary pressures.",
    questions: "How fast do prices decay in different genres?",
    behaviour: "instant",
    dashboardType: "pricing_decay"
  },

  // --- Stage 5 ---
  "s5_gameplay_telemetry": {
    id: "s5_gameplay_telemetry",
    stage: 5,
    name: "Gameplay Telemetry & Playtime Logs",
    description: "Anonymized internal play session metrics from active Highland titles: playtime distributions, mode selection shares, custom character setup times, and player progression milestones.",
    format: "Structured telemetry data",
    owner: "Internal Game Analytics Team",
    availability: "Immediate",
    refresh: "Daily batch",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Diagnostic (Evaluates content depth)",
    limitations: "Telemetry can only show *what* players do, not *why* they do it. Cannot identify user frustration or emotional disengagement.",
    questions: "How do players distribute their gameplay time inside our products?",
    behaviour: "instant",
    dashboardType: "gameplay_telemetry"
  },
  "s5_live_service_metrics": {
    id: "s5_live_service_metrics",
    stage: 5,
    name: "Live Service Engagement Dashboard",
    description: "Real-time reporting of Daily Active Users (DAU), Monthly Active Users (MAU), player retention curves (Day 1, 7, 30), and seasonal event revenue decay.",
    format: "Structured telemetry records",
    owner: "Live Ops Database",
    availability: "Immediate",
    refresh: "Near Real-Time",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Predictive",
    limitations: "Heavily skewed by active in-game events and updates; fails to represent the organic lifetime behavior of offline single-player components.",
    questions: "What is our current player base retention and churn profile?",
    behaviour: "live",
    liveType: "live_ops"
  },
  "s5_bug_reports": {
    id: "s5_bug_reports",
    stage: 5,
    name: "Support Tickets & Bug Logs (1,000 Rows)",
    description: "Customer service logs, crash summaries, QA reports, and ticket resolution times for all previous games, with categories for code crashes, audio bugs, and AI issues.",
    format: "Structured CSV",
    owner: "Customer QA and Support Operations",
    availability: "Immediate",
    refresh: "Continuous (Closed)",
    cost: 0,
    delay: 0,
    analyticalUse: "Diagnostic & Explanatory (Explains past game stability failure)",
    limitations: "Reflects only reported issues. Many users who encounter bugs simply quit the game and request refunds without submitting tickets.",
    questions: "What were the primary QA issues that ruined our previous simulation game?",
    behaviour: "csv",
    csvFile: "bug_reports.csv"
  },
  "s5_modding_ugc": {
    id: "s5_modding_ugc",
    stage: 5,
    name: "Modding & User Generated Content Data",
    description: "Public statistics on mod downloads, active creators, custom map shares, and tooling usage on platform workshops for relevant titles.",
    format: "Semi-structured public repository stats",
    owner: "Community Relations Operations",
    availability: "Requires approval",
    refresh: "Weekly",
    cost: 0,
    delay: 1, // RNG assigned dynamically
    analyticalUse: "Descriptive & Predictive",
    limitations: "Modding statistics are highly localized to PC platforms and Steam. Consoles show extremely low user-generated content engagement due to file restrictions.",
    questions: "Does supporting user modifications increase game lifetime value?",
    behaviour: "email",
    emailKey: "modding_ugc_approval"
  },

  // --- Stage 6 ---
  "s6_review_ratings": {
    id: "s6_review_ratings",
    stage: 6,
    name: "Critic & User Review Database",
    description: "Scraped text database of reviews and ratings from Metacritic, Steam, and PlayStation Store for Highland and competitor titles.",
    format: "Structured rating scores & unstructured text",
    owner: "Brand Management Operations",
    availability: "Immediate",
    refresh: "Daily",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Diagnostic (Measures consumer reception quality)",
    limitations: "Reviews are prone to 'review bombing' (coordinated negative reviews due to pricing, updates, or political controversies) which distorts product quality metrics.",
    questions: "What are the common critic and user complaints or praises for our titles?",
    behaviour: "instant",
    dashboardType: "reviews_word_cloud"
  },
  "s6_sentiment_analytics": {
    id: "s6_sentiment_analytics",
    stage: 6,
    name: "Post-Launch Sentiment & Topic Model",
    description: "NLP modeling database tracking semantic associations in review comments. Helps isolate emotional response patterns related to graphics, bugs, pricing, and mechanics.",
    format: "Structured NLP database",
    owner: "Highland Strategy Analytics Team",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Diagnostic (Isolates exact reasons for product failure/success)",
    limitations: "Sentiment parsers struggle with linguistic sarcasm, emojis, and specific gaming references.",
    questions: "What positive and negative concepts are correlated with genre reviews?",
    behaviour: "instant",
    dashboardType: "sentiment_explorer"
  },
  "s6_refunds_complaints": {
    id: "s6_refunds_complaints",
    stage: 6,
    name: "Refund Logs & Escalations",
    description: "Confidential records of digital game refunds requested through Steam, PlayStation Store, and Xbox storefronts, including selected reason categories.",
    format: "Confidential structured record",
    owner: "Platform Partnerships (External Relations)",
    availability: "Requires approval",
    refresh: "Monthly",
    cost: 0,
    delay: 1, // RNG assigned dynamically
    analyticalUse: "Diagnostic (Isolates immediate financial rejection causes)",
    limitations: "Storefronts only share generic categories (e.g. 'unplayable', 'not fun') without detailed comments, limiting granular diagnosis.",
    questions: "Why do buyers request refunds for our products?",
    behaviour: "email",
    emailKey: "refund_logs_approval"
  },

  // --- Stage 7 ---
  "s7_community_engagement": {
    id: "s7_community_engagement",
    stage: 7,
    name: "Community Continuation Logs",
    description: "Quantitative metrics tracking active membership, post frequency, and sharing rates on Reddit subreddits, fan wikis, and fan Discord servers over time.",
    format: "Structured community engagement statistics",
    owner: "Community Development Team",
    availability: "Immediate",
    refresh: "Daily",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Measures post-launch long-tail advocacy)",
    limitations: "Measures social chat volume, not player activity. A highly active forum may consist of a tiny percentage of hardcore fans.",
    questions: "Which genre communities display the longest active discussion lifetimes?",
    behaviour: "instant",
    dashboardType: "community_engagement_stats"
  },
  "s7_nps_survey": {
    id: "s7_nps_survey",
    stage: 7,
    name: "NPS & Player Survey Study (Premium)",
    description: "Commissioned post-launch consumer surveys assessing brand loyalty, Net Promoter Score (NPS), and open-ended feedback on game elements. Exceeds budget if combined with Ad Spend.",
    format: "Commissioned research analysis",
    owner: "Research Partner Agency (Premium)",
    availability: "Requires purchase",
    refresh: "Ad-hoc",
    cost: 7500,
    delay: 0,
    analyticalUse: "Diagnostic & Explanatory",
    limitations: "Measures customer perception from active surveys which can be biased by recent updates, storefront review campaigns, or temporary server issues.",
    questions: "What is our customer satisfaction rating and Net Promoter Score across genres?",
    behaviour: "purchase",
    purchasedKey: "nps_unlocked",
    dashboardType: "nps_premium"
  },
  "s7_creator_ecosystem": {
    id: "s7_creator_ecosystem",
    stage: 7,
    name: "Creator Ecosystem Report",
    description: "Market intelligence detailing stream counts, co-playing activity, and content clips generated by video creators, streamers, and tutorial writers.",
    format: "Pre-analyzed PDF Report",
    owner: "Creator Analytics Group",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive & Predictive",
    limitations: "Skewed toward games with flashy, random moments. Niche management games show low video counts but high player hours.",
    questions: "How do game genres perform in organic creator video loops?",
    behaviour: "report",
    reportKey: "creator_ecosystem_report"
  }
};

// Simulated Slack communications script (significantly expanded)
const SLACK_COMMUNICATIONS = {
  "general": [
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Morning team! Remember, we need to finalize our strategy proposal for the board by the end of today. We're choosing the direction for our next project.", time: "09:00 AM" },
    { sender: "Dave", role: "Lead Game Designer", avatarClass: "avatar-des", text: "Exciting times! I've been sketching out some design ideas for a skateboarding sequel, but also looking at the macro trends. The demand for cosy/lifestyle games is crazy right now.", time: "09:03 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Yes, the board is looking closely at the life sim market because the potential ROI is massive. But we have to make sure we can actually build it. Let's make sure we back up our suggestions with evidence.", time: "09:05 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "I'll join #dev-team now. We need a serious sync on what is realistic. We can't let taste or instinct dictate this. Board constraints are tight.", time: "09:08 AM" },
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "Welcome all strategy group members. The Board has set our budget limit for external analytics research to £10k. Keep in mind that we need to choose our purchases wisely. We can't afford everything.", time: "09:10 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Already seeing some solid search referral query differences. The PC simulation demand seems very distinct compared to typical console racers.", time: "09:12 AM" },
    { sender: "Dave", role: "Lead Game Designer", avatarClass: "avatar-des", text: "Let's be clear: a standard racing game (Option 1) will perform well at launch. But does it create the kind of long-tail community engagement the parent company wants?", time: "09:15 AM" },
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "Exactly. The parent company owns massive lifestyle brands. An audience overlap is crucial. We need data that proves whatever path we choose aligns with corporate-wide entertainment targets.", time: "09:18 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Let's make sure we document all limitations too. If platform partners redact conversion metrics, we need to report that. Real analysis has gaps.", time: "09:22 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "Agreed. If we over-promise on a Life Sim Reboot and the engine buckles again, we will destroy team morale. We need data on past refund causes.", time: "09:25 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "I'll upload the competitor comparison and search trends summaries. Everyone please inspect these files.", time: "09:28 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "Heading to #dev-team to outline the technical limitations. Talk there.", time: "09:30 AM" }
  ],
  "dev-team": [
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "Guys, I need to voice some real concerns here. If we even talk about doing a Life Simulation game again, we need to completely overhaul our codebase.", time: "09:12 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "Remember the nightmare that was *LifeSpace*? Our custom state-tracking engine crashed constantly when handling NPC relationships, and the QA tooling was non-existent. Our engineers are still burnt out from that.", time: "09:15 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "Seconded. Our current physics systems are optimized for wheels and skateboards (Streetline Skate has incredibly solid mechanics). Moving to a complex AI agent system with hundreds of variables would require hiring at least 4 new senior systems programmers and extending pre-production by 9 months.", time: "09:18 AM" },
    { sender: "Dave", role: "Lead Game Designer", avatarClass: "avatar-des", text: "Understood, Marcus. But what about a hybrid option? We keep our physics and movement-based strength, but expand the social spaces and character customization. That way we target the lifestyle players without building a heavy NPC life sim from scratch.", time: "09:22 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "That is much more doable. We could reuse the customization modules from Streetline Skate, which our team knows inside out. It lowers the technical risk significantly.", time: "09:25 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "Let's review the LifeSpace crash dumps. 74% of our steam refunds were due to technical instability. If we attempt a full reboot, we must rewrite the serialization code. Our database save states lacked transaction rollbacks.", time: "09:28 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "Specifically, when players customized their houses and characters simultaneously, the memory buffer overflowed, corrupting the save games. It was a core architectural flaw.", time: "09:31 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "Correct. Whereas on Streetline Skate, the memory utilization was flat. Reusing the skating movement vectors is zero-risk. Our track editors on Apex Circuit also give us a solid foundation for player-built content.", time: "09:34 AM" },
    { sender: "Dave", role: "Lead Game Designer", avatarClass: "avatar-des", text: "Right, but the design demands for a pure simulation game are massive. You need system designers to write relationship algorithms, economy tuning, NPC scheduling logic, custom apparel shaders... the hiring list is massive.", time: "09:37 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "And if we hire 6 new systems guys, we need 3 months just to onboard them into our proprietary engine toolset. That pushes release from late 2028 into mid 2029.", time: "09:40 AM" },
    { sender: "Marcus", role: "Technical Director", avatarClass: "avatar-eng", text: "So a hybrid approach (Option 5) allows us to bridge the gaps. We utilize our proven physics nodes but implement stylized customization loops. Minimal hiring, maximum stability.", time: "09:43 AM" },
    { sender: "Elena", role: "Lead Programmer", avatarClass: "avatar-eng", text: "Yes, we can write a simple matchmaking server for customization lobbies. That is well within our current backend capacity.", time: "09:45 AM" }
  ],
  "marketing": [
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Just looked at the organic search query logs. The keyword 'life sim alternative' has grown by 38% month-over-month. People are desperate for something new in that space.", time: "09:30 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "On the other hand, traditional racing keywords are flat or declining. 'Realistic car handling mods' is down 5% this quarter. The market is saturated with photorealistic racing sims.", time: "09:33 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Great insights, Chloe. What about skateboarding?", time: "09:35 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Skateboarding keywords are growing slowly (+15%), but the engagement ratios on our gameplay clips are massive. Players love showing off their custom characters and custom parks. It's a very advocacy-driven genre.", time: "09:38 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "If we check the competitor pipeline, TownLife is dominating simulation but their user scores are dropping due to a major backlash against their latest £35 expansion pack. The community is looking for competitors.", time: "09:42 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Interesting. What about Cosy Valley? They have a 92% positive rating.", time: "09:45 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Yes, but they are Switch-only and cartoonish. There's a massive void on PC/Steam and PlayStation for a mod-friendly, lifestyle simulation alternative with expressive movement.", time: "09:48 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Also, influencer coverage reports highlight that simulation drives 6x more stream hours than racing. Creators generate tutorial loops and custom story builds. Racing streamers only stream competitive matches which lose heat fast.", time: "09:51 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "So from a pure brand visibility perspective, simulation has much higher organic marketing potential.", time: "09:54 AM" },
    { sender: "Chloe", role: "Marketing Director", avatarClass: "avatar-mkt", text: "Absolutely. But we must be careful. If the game crashes, influencers will stream the bugs and destroy our credibility (just like with LifeSpace). The engineering team must guarantee stability.", time: "09:57 AM" }
  ],
  "executive": [
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "Strategists, the parent company is looking for a project that maximizes long-term lifetime value. A standard racing game might be safe and front-loaded, but we want long-tail engagement.", time: "09:45 AM" },
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "The board will support a high-risk project (like a Life Sim reboot) ONLY if we can prove we've addressed the technical failures of the past. If not, they'll want us to stay in our lane or find a smart middle ground.", time: "09:48 AM" },
    { sender: "Sarah", role: "Executive Producer", avatarClass: "avatar-pm", text: "Understood, Victoria. The team is currently leaning toward a Hybrid Lifestyle Sports Game. It bridges skateboarding momentum with self-expression. Low technical risk, highly alignable with parent company demographics.", time: "09:52 AM" },
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "That sounds promising. Let's make sure the report outlines the ROI multipliers. Racing sales decay rapidly after Month 1, whereas simulation expansions hold value for years.", time: "09:55 AM" },
    { sender: "Victoria", role: "VP of Product Strategy", avatarClass: "avatar-exe", text: "Remember, the board wants evidence of capability fit. If we choose Option 4 (Reboot), we need to allocate at least £5M to new AI hiring and engine rebuilding, which restricts our marketing spend.", time: "10:00 AM" }
  ]
};

// Macro environment reports (Expanded content)
const MACRO_REPORTS = {
  "macro-general": `
    <h2>General Macroeconomic Report</h2>
    <p><strong>Published:</strong> Q1 2026 | <strong>Source:</strong> Global Media Strategy Group</p>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Executive Summary</h3>
    <p>The global entertainment market is navigating a period of shifting consumer wallets. Disposable income has plateaued due to general inflation, leading to higher price sensitivity among gaming audiences. Consumers are buying fewer games overall, but spending more time in the games they do buy. This has placed a high premium on games with high replayability, custom tools, and user-generated content (UGC).</p>
    <h3>Key Macro Forces</h3>
    <ul>
      <li><strong>Cost-of-Living Pressures:</strong> Consumers are consolidating their gaming hours into 1 or 2 core titles that serve as social hubs.</li>
      <li><strong>Subscription Service Plateau:</strong> Store subscription rates are flattening, making premium initial purchases with long-term expansions (e.g. cosy games model) highly attractive.</li>
      <li><strong>Hardware Lifecycle:</strong> Current console hardware (PS5, Xbox Series X/S) is mature, meaning developers can rely on optimization rather than building brand-new graphics pipelines.</li>
    </ul>
    <h3>Strategic Recommendations</h3>
    <p>We advise studios to transition away from traditional, single-use content cycles toward sandbox environments that allow players to invest their own creative labor. These sandbox loops generate long-term structural value and reduce the need for constant, expensive content updates.</p>
  `,
  "macro-trends": `
    <h2>Games Industry Trends</h2>
    <p><strong>Published:</strong> April 2026 | <strong>Source:</strong> IDG Research Partner Group</p>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>The Rise of 'Cosy' and Self-Expression Gaming</h3>
    <p>Over the past three years, the industry has seen a massive shift in player demographics and gaming preferences. The traditional market (focused heavily on competition and photorealism) is stable but crowded. In contrast, games themed around relaxation, self-expression, interior decoration, and social coordination are seeing exponential growth.</p>
    <h3>Key Industry Trends</h3>
    <ul>
      <li><strong>Advocacy & Social Sharing:</strong> Customization tools allow players to build unique identities which they share on TikTok, Instagram, and Discord, generating millions in free viral marketing.</li>
      <li><strong>Live Service Fatigue:</strong> Players are pushing back against predatory microtransactions and battle passes, preferring clear DLC updates, transparent roadmaps, and mod support.</li>
      <li><strong>The Creator Loop:</strong> Streamers are looking for games that allow high community interaction (e.g. customized builds, storytelling), which has driven the longevity of simulation and sandbox titles.</li>
    </ul>
  `,
  "macro-consumer": `
    <h2>Consumer Spending & Platforms</h2>
    <p><strong>Published:</strong> Q1 2026 | <strong>Source:</strong> Platform Distribution Report</p>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Platform Split & Monetization Mechanics</h3>
    <p>Analytical data indicates that different game genres exhibit highly distinct platform spreads and spending patterns:</p>
    <ul>
      <li><strong>Racing Games:</strong> Heavily concentrated on consoles (PlayStation/Xbox) with 75% of sales occurring in the first 30 days. High dependence on physical controller layouts and steering wheels. Very low expansion sale rates.</li>
      <li><strong>Lifestyle & Action Sports:</strong> High PC and console overlap. Revenue is driven by premium entry price + cosmetic DLC content packs. Highly driven by community events.</li>
      <li><strong>Simulation Games:</strong> Dominant on PC (Steam) due to modding support and mouse/keyboard interfaces. Long-tail monetization is exceptionally strong, with expansion packs and custom assets generating 60% of total lifetime product revenue.</li>
    </ul>
  `,
  "macro-production": `
    <h2>Technology & Production Costs</h2>
    <p><strong>Published:</strong> February 2026 | <strong>Source:</strong> internal Production Audit</p>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Development Economics by Project Category</h3>
    <p>Production analysis indicates high cost inflation across all major project scopes. Recruiting specialized software engineering talent is the single largest cost driver.</p>
    <ul>
      <li><strong>Racing Sequel (Scope: Moderate):</strong> High predictability. We can reuse our physical track builder tools and wheel physics engine. Estimated cost: £12M - £15M. Technical risk: Low.</li>
      <li><strong>Skateboarding Sequel (Scope: Low-Moderate):</strong> Maximum efficiency. We can reuse 80% of our Streetline Skate codebase. Estimated cost: £8M - £10M. Technical risk: Low.</li>
      <li><strong>Life Simulation Reboot (Scope: High):</strong> Maximum cost. We would need to build a new multi-threaded AI agent simulator and custom modding SDK. Requires hiring at least 6 new specialists. Estimated cost: £20M - £25M. Technical risk: Extreme.</li>
      <li><strong>Hybrid Lifestyle Sports (Scope: Moderate):</strong> Balanced. Combines skateboarding movement physics with custom social lobby servers. Reuses styling engines. Estimated cost: £12M - £14M. Technical risk: Moderate.</li>
    </ul>
  `,
  "macro-competitors": `
    <h2>Competitor Pipeline</h2>
    <p><strong>Published:</strong> May 2026 | <strong>Source:</strong> Competitive Intelligence Agency</p>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Major Competitor Release Calendar & Crowding</h3>
    <ul>
      <li><strong>Racing Genre:</strong> Extremely crowded. <em>Speedway Unlimited</em> and <em>Turbo Asphalt 9</em> hold a combined 80% of the racing market share, with another major racer scheduled for release in Q3 2027. High marketing budgets required to compete.</li>
      <li><strong>Skateboarding:</strong> Highly open. <em>Grind & Slide</em> is the only active competitor. It has strong scores but is a niche indie title. A premium sequel from Highland Studios would easily capture the mainstream skateboarding audience.</li>
      <li><strong>Life Simulation:</strong> Dominated by the giant title <em>TownLife</em>. However, <em>TownLife</em> has received heavy player backlash (+35% negative reviews) due to expensive DLCs and engine instability. The market is actively looking for a competitor. The indie developer title <em>Cosy Valley</em> is highly rated but restricted to Switch/casual players. A mod-friendly PC/Console competitor has a massive vacancy window.</li>
    </ul>
  `
};

// Simulated email responses for email requests (expanded to full strategic document write-ups)
const EMAIL_TEMPLATES = {
  "parent_company_overlap": {
    sender: "Corporate Analytics Office",
    subject: "Approved: Parent Company Audience Overlap Data",
    body: "Hi Strategy Task Force,\n\nWe have approved your request for the high-level audience overlap data. The full user-level database cannot be released due to GDPR compliance and internal governance rules. However, we have generated a detailed summary analysis document and attached it below.\n\nPlease inspect the attached report for our findings on consumer behavior, brand overlap indices, and strategic cross-marketing vectors across our corporate media holdings.\n\nBest regards,\nCorporate Data Governance Team Office",
    attachment: "parent_company_audience_overview.pdf"
  },
  "modding_ugc_approval": {
    sender: "Community Relations Operations",
    subject: "Approved: Modding & User Generated Content Data Summary",
    body: "Hey Team,\n\nHere is the data on modding and UGC engagement you requested. We scraped community databases and Steam Workshop logs for the top 5 games in the simulation and sports categories.\n\nPlease open the attached report for the full breakdown of player retention indices, active map sharing counts, and tool creation metrics.\n\nHope this helps with the strategic planning,\nCommunity Ops Team Office",
    attachment: "modding_ugc_report.pdf"
  },
  "refund_logs_approval": {
    sender: "Platform Partnerships Team",
    subject: "Approved: Confidential Refund Logs (LifeSpace & Streetline Skate)",
    body: "Strategy Group,\n\nWe have retrieved the confidential refund rate logs and primary complaint categories from Steam and PlayStation console partner portals.\n\nPlease download the attached raw CSV dataset containing the detailed ticket records and refund reason categorizations.\n\nBest,\nPlatform Partnerships Group",
    attachment: "refund_escalation_data.csv"
  }
};

// PDF style reports (Expanded into detailed multi-page strategic write-ups)
const PDF_REPORTS = {
  "parent_company_audience_overview_report": `
    <article class="strategic-document report-frame-document">
      <section class="doc-section report-frame-summary">
        <h3>Corporate Audience Overlap & Media Synergy Study</h3>
        <p><strong>Prepared by:</strong> Corporate Analytics Office | <strong>Security Classification:</strong> Confidential | <strong>Document ID:</strong> CAO-AUD-26-Q2-117</p>
        <p>This approved attachment has been expanded into a full corporate-style report with methodology notes, audience-universe findings, cross-category indices, embedded support graphics, option-level implications, governance caveats, and recommendations.</p>
        <p><strong>Key insight:</strong> customization-led concepts have materially stronger parent-company leverage than a traditional racing sequel. Lifestyle and cozy-media overlap reaches 82% among action-sports buyers, while only 24% of general corporate subscribers overlap with racing simulation buyers.</p>
      </section>
      <iframe
        class="embedded-report-frame"
        title="Corporate Audience Overlap and Media Synergy Study"
        src="reports/parent_company_audience_overview.html"
        loading="eager">
      </iframe>
    </article>
  `,
  "modding_ugc_report_report": `
    <article class="strategic-document report-frame-document">
      <section class="doc-section report-frame-summary">
        <h3>User Generated Content & Modding Longevity Audit</h3>
        <p><strong>Prepared by:</strong> Community Relations Operations | <strong>Security Classification:</strong> Internal Strategy</p>
        <p>This report opens as a full-form audit with retention curves, genre comparisons, UGC production metrics, production risks, and appendix methodology notes.</p>
      </section>
      <iframe
        class="embedded-report-frame"
        title="UGC and Modding Longevity Audit"
        src="reports/modding_ugc_report.html"
        loading="eager">
      </iframe>
    </article>
  `,
  "influencer_coverage_report": `
    <article class="strategic-document report-frame-document">
      <section class="doc-section report-frame-summary">
        <h3>Video Creator & Streamer Coverage Study</h3>
        <p><strong>Prepared by:</strong> Pulse Analytics Agency | <strong>Target Period:</strong> H1 2026</p>
        <p>This report opens as a full strategic brief with creator-segment economics, spectator decay curves, platform mix, and genre-level streaming leverage.</p>
      </section>
      <iframe
        class="embedded-report-frame"
        title="Video Creator and Streamer Coverage Study"
        src="reports/influencer_coverage_report.html"
        loading="eager">
      </iframe>
    </article>
  `,
  "creator_ecosystem_report": `
    <article class="strategic-document report-frame-document">
      <section class="doc-section report-frame-summary">
        <h3>Creator and Streaming Metrics Industry Snapshot</h3>
        <p><strong>Published:</strong> March 2026 | <strong>Source:</strong> StreamMetrics Platform</p>
        <p>This report opens as a full benchmark study with VPCI analysis, creator tiers, longevity curves, and recommendation tables.</p>
      </section>
      <iframe
        class="embedded-report-frame"
        title="Creator and Streaming Metrics Industry Snapshot"
        src="reports/creator_ecosystem_report.html"
        loading="eager">
      </iframe>
    </article>
  `
};

// --- 2. GLOBAL STATE CONTROLLER ---

let State = {
  activeTeam: "",
  passcode: "",
  budget: 10000, // Reduced from 20000 to 10000
  purchased: [],
  requests: {}, // dataSourceId -> { requestedAt: timestamp, delay: randomSeconds }
  viewed: [],
  emails: [
    {
      sender: "System Notification",
      subject: "Strategy Task Force Activated",
      body: "Welcome Strategy Task Force. Your secure portal is now active.\n\nYou have an analytics budget of £10,000.\n- Use this budget to purchase premium platform datasets. Note that the NPS & Player Survey Study (£7.5k) and Competitor Ad Spend (£5k) combined exceed your budget, forcing a trade-off.\n- Use the Consumer Journey map to request internal corporate data files. Data requests take randomized time to process (1 - 5 minutes).\n- Document your final project recommendation in the Decision Worksheet tab.",
      date: "09:00 AM",
      read: false,
      id: "initial_welcome"
    }
  ],
  worksheet: {
    projectChoice: "",
    evidence: "",
    analyticsType: [],
    journeyStages: [],
    limitations: "",
    risks: "",
    future: ""
  },
  activeTab: "tab-briefing",
  liveSentimentStats: {
    customisation: 0,
    bugs: 0,
    physics: 0,
    DLC: 0,
    modding: 0
  }
};

// --- 3. HELPER FUNCTIONS ---

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);
}

function saveState() {
  if (State.passcode) {
    localStorage.setItem(`highland_state_${State.passcode}`, JSON.stringify(State));
  }
}

function loadState(passcode) {
  const data = localStorage.getItem(`highland_state_${passcode}`);
  if (data) {
    State = JSON.parse(data);
  } else {
    // Reset to initial state
    State.activeTeam = Object.keys(TEAMS_CONFIG).find(key => TEAMS_CONFIG[key] === passcode);
    State.passcode = passcode;
    State.budget = 10000;
    State.purchased = [];
    State.requests = {};
    State.viewed = [];
    const isAdmin = passcode === "admin1991";
    State.emails = [
      {
        sender: "System Notification",
        subject: "Strategy Task Force Activated",
        body: isAdmin ?
`Welcome Admin Strategy Task Force. Your secure portal is now active.

You have Admin Level clearance:
- Budget limits are disabled (Unlimited Budget).
- Internal corporate data file requests complete instantly (No wait times).
- Document your final project recommendation in the Decision Worksheet tab.

Have fun!` :
`Welcome Strategy Task Force. Your secure portal is now active.

You have an analytics budget of £10,000. 
- Use this budget to purchase premium platform datasets. Note that the NPS & Player Survey Study (£7.5k) and Competitor Ad Spend (£5k) combined exceed your budget, forcing you to choose one evidence path.
- Use the Consumer Journey map to request internal corporate data files. Delays are randomized (1 - 5 minutes) based on corporate approval queues. No countdown timer is provided. Check your inbox periodically.
- Document your final project recommendation in the Decision Worksheet tab.

Good luck!`,
        date: "09:00 AM",
        read: false,
        id: "initial_welcome"
      }
    ];
    State.worksheet = {
      projectChoice: "",
      evidence: "",
      analyticsType: [],
      journeyStages: [],
      limitations: "",
      risks: "",
      future: ""
    };
    State.activeTab = "tab-briefing";
    State.liveSentimentStats = {
      customisation: 0,
      bugs: 0,
      physics: 0,
      DLC: 0,
      modding: 0
    };
  }
}

// --- 4. DATA PRESENTATION & DASHBOARD GENERATORS ---

// Chart 1: Market Trends Line Chart (using dynamic inline SVG)
function generateMarketTrendsChart() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Market Search Intelligence Console</h4>
          <p class="ed-subtitle">Aggregated search demand, keyword specificity, and intent quality across genre categories. Index baseline = 100 in Jun 2025.</p>
        </div>
        <div class="ed-stamp">SEARCH OPS · 7-DAY ROLLING</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>+51%</strong><span>growth for mod-support life-sim queries</span></div>
        <div class="ed-kpi info"><strong>3.8x</strong><span>higher specificity for life-sim searches vs racing searches</span></div>
        <div class="ed-kpi warn"><strong>64%</strong><span>of high-intent queries mention customization, AI, or UGC</span></div>
        <div class="ed-kpi bad"><strong>-4%</strong><span>growth for realistic handling mod queries</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Search Demand Index by Genre</h4>
          <p class="ed-panel-note">Life simulation demand is not just broad; it gets more specific over time, which is a stronger signal than generic awareness.</p>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 0%"></div>
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <div class="grid-line" style="bottom: 100%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 98 Q 130 94 260 101 T 600 108" fill="none" stroke="#64748b" stroke-width="3" />
              <path d="M 0 162 Q 150 146 290 111 T 600 72" fill="none" stroke="#06b6d4" stroke-width="3" />
              <path d="M 0 184 Q 120 165 235 112 T 600 25" fill="none" stroke="#7c3aed" stroke-width="4" />
              <path d="M 0 150 Q 160 139 330 122 T 600 112" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="8 6" />
            </svg>
          </div>
          <div class="chart-axis-labels">
            <span>Jun 25</span><span>Sep 25</span><span>Dec 25</span><span>Mar 26</span><span>May 26</span>
          </div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background-color: #7c3aed;"></span> Life Simulation</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #06b6d4;"></span> Action Sports / Skate</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #f59e0b;"></span> Motorsport Management</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #64748b;"></span> Racing</span>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Keyword Cluster Momentum</h4>
          <p class="ed-panel-note">Clusters with both volume growth and high specificity.</p>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Modding support</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:91%"></span></span><span class="ed-bar-value">+51%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Cozy customization</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:84%"></span></span><span class="ed-bar-value">+44%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">AI relationships</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:68%"></span></span><span class="ed-bar-value">+31%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Open-world sports</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:63%"></span></span><span class="ed-bar-value">+27%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Racing handling</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:22%"></span></span><span class="ed-bar-value">-4%</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Specificity Heatmap</h4>
          <p class="ed-panel-note">Higher scores indicate searches that include actionable feature intent, not only genre curiosity.</p>
          <div class="ed-heat">
            <div></div><div class="head">Volume</div><div class="head">Feature</div><div class="head">Brand</div><div class="head">Buy</div><div class="head">Risk</div>
            <div class="rowhead">Life Sim</div><div class="s5">5</div><div class="s5">5</div><div class="s3">3</div><div class="s4">4</div><div class="s3">3</div>
            <div class="rowhead">Hybrid Sports</div><div class="s4">4</div><div class="s5">5</div><div class="s3">3</div><div class="s3">3</div><div class="s2">2</div>
            <div class="rowhead">Skate Sequel</div><div class="s3">3</div><div class="s4">4</div><div class="s5">5</div><div class="s3">3</div><div class="s2">2</div>
            <div class="rowhead">Racing</div><div class="s3">3</div><div class="s2">2</div><div class="s4">4</div><div class="s2">2</div><div class="s1">1</div>
          </div>
        </div>

        <div class="ed-panel wide">
          <h4>Top Query Families From Raw Export</h4>
          <div class="ed-keyword-grid">
            <div class="ed-keyword-card"><strong>life sim alternative with better customization</strong><span>High-volume dissatisfaction with dominant competitors; good early signal for Option 4 if execution risk is solved.</span></div>
            <div class="ed-keyword-card"><strong>streetline skate multiplayer custom parks</strong><span>Direct evidence that Highland's sports audience already searches for UGC and social creation loops.</span></div>
            <div class="ed-keyword-card"><strong>open world skate bike parkour game</strong><span>Supports Option 3/5 adjacency; users describe activity mix and world structure rather than only franchise names.</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Chart 2: Web click paths & Landing Page traffic metrics
function generateWebClicksDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Owned Web Analytics Workspace</h4>
          <p class="ed-subtitle">Clickstream, landing-page quality, referral mix, and downstream intent across current Highland web properties.</p>
        </div>
        <div class="ed-stamp">WEB OPS · 30 DAYS</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi info"><strong>147K</strong><span>qualified visits across franchise and concept pages</span></div>
        <div class="ed-kpi good"><strong>6:12</strong><span>median session duration on customization pages</span></div>
        <div class="ed-kpi warn"><strong>38%</strong><span>LifeSpace visitors inspect bug or patch history before leaving</span></div>
        <div class="ed-kpi good"><strong>2.6x</strong><span>higher newsletter intent for UGC pages than racing pages</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel">
          <h4>Landing Page Engagement</h4>
          <p class="ed-panel-note">Views are less meaningful than depth and onward intent.</p>
          <table class="ed-table">
            <thead><tr><th>Page</th><th>Views</th><th>Time</th><th>Next Action</th></tr></thead>
            <tbody>
              <tr><td>Streetline custom parks</td><td>42K</td><td>6:12</td><td><span class="ed-status good">UGC</span></td></tr>
              <tr><td>LifeSpace patch log</td><td>51K</td><td>4:48</td><td><span class="ed-status warn">Risk Check</span></td></tr>
              <tr><td>Open-world concept page</td><td>29K</td><td>5:36</td><td><span class="ed-status good">Wishlist</span></td></tr>
              <tr><td>Apex Circuit forum</td><td>24K</td><td>2:14</td><td><span class="ed-status info">Spec Read</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel">
          <h4>Referral Mix by Intent</h4>
          <p class="ed-panel-note">Where high-quality traffic originates.</p>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Search: feature intent</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:82%"></span></span><span class="ed-bar-value">41%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Creator/social clips</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:64%"></span></span><span class="ed-bar-value">27%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Forums/community</span><span class="ed-bar-track"><span class="ed-bar-fill warn" style="--v:49%"></span></span><span class="ed-bar-value">18%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Paid campaigns</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:31%"></span></span><span class="ed-bar-value">9%</span></div>
          </div>
        </div>

        <div class="ed-panel wide">
          <h4>Navigation Path Diagnostics</h4>
          <table class="ed-table">
            <thead><tr><th>Entry Path</th><th>Most Common Next Step</th><th>Friction Signal</th><th>Strategic Interpretation</th></tr></thead>
            <tbody>
              <tr><td>life sim alternative search</td><td>LifeSpace patch log</td><td><span class="ed-status warn">Trust gap</span></td><td>Demand exists, but historical reliability concerns shape research behavior.</td></tr>
              <tr><td>Streetline Skate social clip</td><td>Park builder gallery</td><td><span class="ed-status good">Creation pull</span></td><td>Current audience already moves toward UGC, not just highlight viewing.</td></tr>
              <tr><td>racing career mode query</td><td>Apex Circuit spec page</td><td><span class="ed-status info">Feature compare</span></td><td>Users compare content depth; lower evidence of broader lifestyle spillover.</td></tr>
              <tr><td>open-world sports referral</td><td>Newsletter sign-up</td><td><span class="ed-status good">Concept lift</span></td><td>Hybrid concepts generate opt-in before franchise confirmation.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Chart 3: Video Retention curves
function generateVideoRetentionDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Trailer and Video Engagement Analytics</h4>
          <p class="ed-subtitle">Retention, replay, share, and comment-intent analysis by trailer format. Completion alone is not enough; we track what viewers talk about afterward.</p>
        </div>
        <div class="ed-stamp">MEDIA ANALYTICS · MULTI-PLATFORM</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>85%</strong><span>completion for customization reveal formats</span></div>
        <div class="ed-kpi warn"><strong>41%</strong><span>completion for cinematic racing reveal formats</span></div>
        <div class="ed-kpi info"><strong>2.9x</strong><span>share lift when UGC tools appear before 45 seconds</span></div>
        <div class="ed-kpi good"><strong>31%</strong><span>of comments request social or creation features</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Audience Retention Curve by Trailer Treatment</h4>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 18 Q 100 38 240 52 T 600 68" fill="none" stroke="#06b6d4" stroke-width="3" />
              <path d="M 0 20 Q 100 32 240 72 T 600 118" fill="none" stroke="#7c3aed" stroke-width="3" />
              <path d="M 0 20 Q 100 94 290 142 T 600 165" fill="none" stroke="#ef4444" stroke-width="2.5" />
            </svg>
          </div>
          <div class="chart-axis-labels"><span>Open</span><span>0:30</span><span>1:00</span><span>1:30</span><span>End</span></div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background-color:#06b6d4"></span> Skating customization reveal</span>
            <span class="legend-item"><span class="legend-dot" style="background-color:#7c3aed"></span> Life-sim systems prototype</span>
            <span class="legend-item"><span class="legend-dot" style="background-color:#ef4444"></span> Racing cinematic reveal</span>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Comment Topic Extraction</h4>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Character creation</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:86%"></span></span><span class="ed-bar-value">31%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Modding / tools</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:73%"></span></span><span class="ed-bar-value">24%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Physics feel</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:58%"></span></span><span class="ed-bar-value">18%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Graphics realism</span><span class="ed-bar-track"><span class="ed-bar-fill warn" style="--v:36%"></span></span><span class="ed-bar-value">11%</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Format Recommendation</h4>
          <table class="ed-table">
            <tbody>
              <tr><td>Lead with systems</td><td>Show creation, social spaces, and modding hooks before cinematic story beats.</td></tr>
              <tr><td>Avoid pure spectacle</td><td>Racing-style cinematics maintain polish but do not produce enough repeatable discussion.</td></tr>
              <tr><td>Use proof clips</td><td>For life-sim concepts, technical stability needs visible proof due to LifeSpace memory.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Chart 4: Wishlist Trends
function generateWishlistDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Wishlist and Follower Conversion Monitor</h4>
          <p class="ed-subtitle">Benchmark growth curves from pre-release pages across Steam, PlayStation Store, Xbox, and creator referral links.</p>
        </div>
        <div class="ed-stamp">PLATFORM OPS · WEEKLY</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>3.2x</strong><span>monthly wishlist growth in life-sim benchmarks</span></div>
        <div class="ed-kpi info"><strong>1.8x</strong><span>monthly growth for skate/action-sports concepts</span></div>
        <div class="ed-kpi warn"><strong>41%</strong><span>wishlist-to-follow conversion when modding is confirmed</span></div>
        <div class="ed-kpi bad"><strong>1.1x</strong><span>monthly growth in mature racing sequel benchmarks</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel">
          <h4>Growth Rate by Genre</h4>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Life Simulation</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:92%"></span></span><span class="ed-bar-value">3.2x</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Hybrid Lifestyle Sports</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:74%"></span></span><span class="ed-bar-value">2.4x</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Skateboarding</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:58%"></span></span><span class="ed-bar-value">1.8x</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Racing</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:33%"></span></span><span class="ed-bar-value">1.1x</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Wishlist Quality Segments</h4>
          <table class="ed-table">
            <thead><tr><th>Segment</th><th>Share</th><th>Behavior</th></tr></thead>
            <tbody>
              <tr><td>Feature-led</td><td>37%</td><td>Waits for modding, AI, customization confirmation.</td></tr>
              <tr><td>Creator-led</td><td>26%</td><td>Arrives from streamers, tutorial clips, and build showcases.</td></tr>
              <tr><td>Franchise-led</td><td>21%</td><td>Follows Highland titles and direct sequels.</td></tr>
              <tr><td>Discount-led</td><td>16%</td><td>Likely to wait for launch reviews or seasonal sale.</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel wide">
          <h4>Leading Indicators for Greenlight Discussion</h4>
          <table class="ed-table">
            <thead><tr><th>Signal</th><th>Option 1 Racing</th><th>Option 4 Life Sim</th><th>Option 5 Hybrid</th><th>Readout</th></tr></thead>
            <tbody>
              <tr><td>Wishlist growth</td><td><span class="ed-status bad">Low</span></td><td><span class="ed-status good">High</span></td><td><span class="ed-status good">High</span></td><td>High-upside categories are pulling early demand without paid spend.</td></tr>
              <tr><td>Proof required</td><td><span class="ed-status info">Medium</span></td><td><span class="ed-status bad">High</span></td><td><span class="ed-status warn">Medium</span></td><td>Life-sim interest must be paired with credible technical proof.</td></tr>
              <tr><td>Creator lift</td><td><span class="ed-status bad">Low</span></td><td><span class="ed-status good">High</span></td><td><span class="ed-status good">High</span></td><td>Customization loops create repeatable pre-launch content.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Chart 5: Sentiment Explorer (Interactive Dashboard)
function generateSentimentExplorerHTML() {
  return `
    <div class="sentiment-explorer-grid">
      <div class="explorer-header">
        <div class="form-group" style="margin-bottom: 0; min-width: 150px;">
          <label for="sentiment-genre-filter">Filter by Genre</label>
          <select id="sentiment-genre-filter" class="genre-filter-select">
            <option value="lifesim">Life Simulation</option>
            <option value="racing">Racing</option>
            <option value="skate">Skateboarding</option>
          </select>
        </div>
        
        <div class="slider-group">
          <label for="sentiment-threshold">
            <span>Relevance Threshold</span>
            <span id="threshold-val">Relevance >= 40%</span>
          </label>
          <input type="range" id="sentiment-threshold" class="range-slider" min="10" max="90" value="40">
        </div>
      </div>
      
      <div class="words-display-panel">
        <div class="word-column column-pos">
          <h4>Positive Keyword Associations</h4>
          <div class="words-cloud" id="cloud-pos">
            <!-- Dynamic tags -->
          </div>
        </div>
        
        <div class="word-column column-neg">
          <h4>Negative Keyword Associations</h4>
          <div class="words-cloud" id="cloud-neg">
            <!-- Dynamic tags -->
          </div>
        </div>
      </div>
    </div>
  `;
}

// Words configuration data for the explorer
const SENTIMENT_KEYWORDS = {
  lifesim: {
    pos: [
      { word: "customisation", score: 88 },
      { word: "creative freedom", score: 85 },
      { word: "active community", score: 79 },
      { word: "modding support", score: 75 },
      { word: "relaxing", score: 68 },
      { word: "diverse options", score: 62 },
      { word: "expressive play", score: 48 },
      { word: "cosy vibe", score: 42 }
    ],
    neg: [
      { word: "buggy engine", score: 92 },
      { word: "expensive DLC", score: 85 },
      { word: "crashes constant", score: 80 },
      { word: "shallow social", score: 72 },
      { word: "poor AI routing", score: 65 },
      { word: "corrupted save", score: 58 },
      { word: "empty maps", score: 45 },
      { word: "grindy cycles", score: 38 }
    ]
  },
  racing: {
    pos: [
      { word: "realistic handling", score: 90 },
      { word: "accurate track", score: 82 },
      { word: "career mode", score: 78 },
      { word: "smooth physics", score: 74 },
      { word: "wheel support", score: 60 },
      { word: "custom liveries", score: 45 }
    ],
    neg: [
      { word: "repetitive tracks", score: 80 },
      { word: "creative stale", score: 75 },
      { word: "pay-to-win DLC", score: 70 },
      { word: "lag on servers", score: 55 },
      { word: "rubberband AI", score: 48 }
    ]
  },
  skate: {
    pos: [
      { word: "fluid movement", score: 92 },
      { word: "expressive tricks", score: 88 },
      { word: "park editor", score: 82 },
      { word: "amazing music", score: 78 },
      { word: "clothing style", score: 65 },
      { word: "mod friendliness", score: 55 }
    ],
    neg: [
      { word: "small maps", score: 75 },
      { word: "short campaign", score: 70 },
      { word: "learning curve", score: 65 },
      { word: "clipping errors", score: 42 }
    ]
  }
};

function updateSentimentExplorer(genre, threshold) {
  const posCloud = document.getElementById("cloud-pos");
  const negCloud = document.getElementById("cloud-neg");
  if (!posCloud || !negCloud) return;

  posCloud.innerHTML = "";
  negCloud.innerHTML = "";

  const words = SENTIMENT_KEYWORDS[genre];
  if (!words) return;

  const filteredPos = words.pos.filter(w => w.score >= threshold);
  const filteredNeg = words.neg.filter(w => w.score >= threshold);

  if (filteredPos.length === 0) {
    posCloud.innerHTML = "<span class='text-muted' style='font-size:0.8rem;'>No terms match threshold</span>";
  } else {
    filteredPos.forEach(w => {
      posCloud.innerHTML += `<span class="word-tag pos">${w.word} (${w.score}%)</span>`;
    });
  }

  if (filteredNeg.length === 0) {
    negCloud.innerHTML = "<span class='text-muted' style='font-size:0.8rem;'>No terms match threshold</span>";
  } else {
    filteredNeg.forEach(w => {
      negCloud.innerHTML += `<span class="word-tag neg">${w.word} (${w.score}%)</span>`;
    });
  }
}

// Chart 6: Pricing and discount decay behavior
function generatePricingDecayDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Pricing and Discount Decay Control Room</h4>
          <p class="ed-subtitle">Post-launch price erosion, discount dependency, and expansion attach rates by genre benchmark.</p>
        </div>
        <div class="ed-stamp">STORE OPS · 24 MONTH MODEL</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>71%</strong><span>life-sim benchmark price retained at month 18</span></div>
        <div class="ed-kpi bad"><strong>38%</strong><span>racing benchmark price retained at month 18</span></div>
        <div class="ed-kpi info"><strong>2.7x</strong><span>higher expansion attach rate for simulation audiences</span></div>
        <div class="ed-kpi warn"><strong>44%</strong><span>skate/action-sports revenue from creator-led long tail</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Effective Average Selling Price After Launch</h4>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 24 L 90 28 L 180 42 L 300 54 L 600 72" fill="none" stroke="#7c3aed" stroke-width="3" />
              <path d="M 0 30 L 90 44 L 180 78 L 300 106 L 600 138" fill="none" stroke="#06b6d4" stroke-width="3" />
              <path d="M 0 30 L 90 62 L 180 114 L 300 145 L 600 168" fill="none" stroke="#64748b" stroke-width="3" />
            </svg>
          </div>
          <div class="chart-axis-labels"><span>Launch</span><span>3 mo</span><span>6 mo</span><span>12 mo</span><span>24 mo</span></div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background:#7c3aed"></span> Life Simulation</span>
            <span class="legend-item"><span class="legend-dot" style="background:#06b6d4"></span> Action Sports</span>
            <span class="legend-item"><span class="legend-dot" style="background:#64748b"></span> Racing</span>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Revenue Dependency</h4>
          <table class="ed-table">
            <thead><tr><th>Genre</th><th>Base Game</th><th>DLC/Exp.</th><th>Discount Risk</th></tr></thead>
            <tbody>
              <tr><td>Life Sim</td><td>46%</td><td>41%</td><td><span class="ed-status good">Low</span></td></tr>
              <tr><td>Hybrid Sports</td><td>61%</td><td>24%</td><td><span class="ed-status info">Medium</span></td></tr>
              <tr><td>Skateboarding</td><td>68%</td><td>18%</td><td><span class="ed-status info">Medium</span></td></tr>
              <tr><td>Racing</td><td>82%</td><td>9%</td><td><span class="ed-status bad">High</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel">
          <h4>Pricing Implication</h4>
          <p class="ed-panel-note">Racing can launch predictably but loses price power quickly. Simulation and hybrid concepts carry more support risk, but they can earn over a longer monetization window if content pipelines and tooling are reliable.</p>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Launch spike reliance</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:86%"></span></span><span class="ed-bar-value">Racing</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Expansion runway</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:78%"></span></span><span class="ed-bar-value">Life Sim</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">UGC retention</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:71%"></span></span><span class="ed-bar-value">Hybrid</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Chart 7: Gameplay telemetry distribution
function generateTelemetryDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Gameplay Telemetry and Session Composition</h4>
          <p class="ed-subtitle">Observed behavior from Highland's released titles, segmented by session mode, repeat behavior, and creation/social depth.</p>
        </div>
        <div class="ed-stamp">PRODUCT ANALYTICS · CLOSED TITLES</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>52%</strong><span>Streetline Skate time spent in free-roam creative play</span></div>
        <div class="ed-kpi good"><strong>33%</strong><span>Streetline sessions include avatar, park, or board customization</span></div>
        <div class="ed-kpi bad"><strong>82%</strong><span>racing sessions concentrated on standard tracks</span></div>
        <div class="ed-kpi warn"><strong>19m</strong><span>median LifeSpace crash-free session before final patch</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel">
          <h4>Session Time Allocation</h4>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Skate free-roam</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:52%"></span></span><span class="ed-bar-value">52%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Skate customize</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:33%"></span></span><span class="ed-bar-value">33%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Skate missions</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:15%"></span></span><span class="ed-bar-value">15%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Racing tracks</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:82%"></span></span><span class="ed-bar-value">82%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Racing garage</span><span class="ed-bar-track"><span class="ed-bar-fill warn" style="--v:12%"></span></span><span class="ed-bar-value">12%</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Behavioral Readout</h4>
          <table class="ed-table">
            <thead><tr><th>Signal</th><th>Evidence</th><th>Option Fit</th></tr></thead>
            <tbody>
              <tr><td>Self-expression</td><td>High customization dwell in Streetline Skate</td><td><span class="ed-status good">Option 5</span></td></tr>
              <tr><td>Pure simulation</td><td>LifeSpace concept had demand but poor crash-free play</td><td><span class="ed-status warn">Option 4</span></td></tr>
              <tr><td>Track mastery</td><td>Racing sessions are focused but narrow</td><td><span class="ed-status info">Option 1</span></td></tr>
              <tr><td>Social loop</td><td>Park sharing increases return sessions</td><td><span class="ed-status good">Option 3/5</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel wide">
          <h4>Telemetry Conclusion</h4>
          <p class="ed-panel-note">The useful evidence is not that Highland “makes skate games”. It is that Highland already has proven physics, expressive movement, and player creation behavior. That is a stronger bridge into a hybrid lifestyle-sports concept than into a full life-simulation reboot with unresolved AI and save-state risk.</p>
        </div>
      </div>
    </div>
  `;
}

// Chart 8: Community engagement longevity stats
function generateCommunityEngagementDashboard() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Community Longevity and Advocacy Dashboard</h4>
          <p class="ed-subtitle">Forum activity, creator prompts, UGC uploads, support burden, and repeat participation after launch.</p>
        </div>
        <div class="ed-stamp">COMMUNITY OPS · 12 MONTHS</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>40%</strong><span>Streetline Skate MAU retained 12 months post launch</span></div>
        <div class="ed-kpi good"><strong>450K</strong><span>custom park downloads from the Streetline community</span></div>
        <div class="ed-kpi warn"><strong>3.4x</strong><span>retention multiplier for titles with durable UGC tooling</span></div>
        <div class="ed-kpi bad"><strong>18%</strong><span>racing forum activity retained after launch quarter</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Community Activity Index</h4>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 86 L 100 78 L 220 70 L 420 58 L 600 50" fill="none" stroke="#7c3aed" stroke-width="3" />
              <path d="M 0 102 L 120 112 L 260 116 L 430 118 L 600 122" fill="none" stroke="#06b6d4" stroke-width="3" />
              <path d="M 0 78 L 90 142 L 210 164 L 600 184" fill="none" stroke="#64748b" stroke-width="3" />
            </svg>
          </div>
          <div class="chart-axis-labels"><span>Launch</span><span>3 mo</span><span>6 mo</span><span>9 mo</span><span>12 mo</span></div>
        </div>

        <div class="ed-panel">
          <h4>UGC Supply Indicators</h4>
          <table class="ed-table">
            <thead><tr><th>Metric</th><th>Streetline</th><th>Racing</th><th>Readout</th></tr></thead>
            <tbody>
              <tr><td>Creator uploads</td><td>84K</td><td>9K</td><td><span class="ed-status good">Strong</span></td></tr>
              <tr><td>Download/user ratio</td><td>3.7</td><td>0.4</td><td><span class="ed-status good">Strong</span></td></tr>
              <tr><td>Monthly challenge entries</td><td>118K</td><td>22K</td><td><span class="ed-status info">Medium</span></td></tr>
              <tr><td>Moderator load</td><td>Medium</td><td>Low</td><td><span class="ed-status warn">Cost</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel">
          <h4>Strategic Fit</h4>
          <div class="ed-heat">
            <div></div><div class="head">UGC</div><div class="head">Creator</div><div class="head">Support</div><div class="head">DLC</div><div class="head">Trust</div>
            <div class="rowhead">Option 5</div><div class="s5">5</div><div class="s5">5</div><div class="s3">3</div><div class="s4">4</div><div class="s4">4</div>
            <div class="rowhead">Option 4</div><div class="s5">5</div><div class="s5">5</div><div class="s1">1</div><div class="s5">5</div><div class="s2">2</div>
            <div class="rowhead">Option 1</div><div class="s2">2</div><div class="s2">2</div><div class="s5">5</div><div class="s2">2</div><div class="s4">4</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Platform Sales Benchmark details viewer
function generatePlatformSalesViewer() {
  return `
    <div class="enterprise-dashboard">
      <div class="ed-header">
        <div>
          <h4 class="ed-title">Platform Sales Benchmark Workspace</h4>
          <p class="ed-subtitle">Market volume, platform skew, revenue mix, and growth quality by comparable genre category.</p>
        </div>
        <div class="ed-stamp">MARKET METRICS · FY2025</div>
      </div>

      <div class="ed-kpi-grid">
        <div class="ed-kpi good"><strong>£1.12B</strong><span>gross annual revenue for life-simulation benchmarks</span></div>
        <div class="ed-kpi info"><strong>34.2M</strong><span>life-sim annual unit volume across PC and console stores</span></div>
        <div class="ed-kpi warn"><strong>81%</strong><span>life-sim category sales concentrated on PC</span></div>
        <div class="ed-kpi bad"><strong>-2%</strong><span>racing simulation category growth year over year</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Category Benchmark Table</h4>
          <table class="ed-table">
            <thead><tr><th>Genre Category</th><th>Units</th><th>Revenue</th><th>Primary Platform</th><th>YoY</th><th>Risk</th></tr></thead>
            <tbody>
              <tr><td>Life Simulation</td><td>34.2M</td><td>£1.12B</td><td>PC 81%</td><td><span class="ed-status good">+38%</span></td><td>High expectations for mods and stability</td></tr>
              <tr><td>Racing Simulation</td><td>12.4M</td><td>£560M</td><td>Console 72%</td><td><span class="ed-status bad">-2%</span></td><td>Front-loaded launch demand</td></tr>
              <tr><td>Action Sports</td><td>4.8M</td><td>£145M</td><td>Console/PC 50/50</td><td><span class="ed-status good">+14%</span></td><td>Smaller market but stronger creator leverage</td></tr>
              <tr><td>Motorsport Management</td><td>1.9M</td><td>£74M</td><td>PC 68%</td><td><span class="ed-status info">+6%</span></td><td>Niche, price-sensitive audience</td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel">
          <h4>Platform Mix</h4>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Life Sim PC</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:81%"></span></span><span class="ed-bar-value">81%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Racing Console</span><span class="ed-bar-track"><span class="ed-bar-fill warn" style="--v:72%"></span></span><span class="ed-bar-value">72%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Action Sports PC/Console</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:50%"></span></span><span class="ed-bar-value">50/50</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Portfolio Interpretation</h4>
          <p class="ed-panel-note">Life simulation has the largest addressable market but also the highest technical expectation. Hybrid lifestyle sports is smaller, but better aligned with Highland capability and parent-company media support. Racing is commercially real but less strategically leveraged.</p>
        </div>
      </div>
    </div>
  `;
}

// Premium NPS & Player Survey details viewer
function generateNpsSurveyViewer() {
  if (!State.purchased.includes("nps_unlocked")) {
    return `
      <div class="alert alert-warning" style="text-align: center; padding: 2rem;">
        <h3>🔒 PREMIUM NPS & SURVEY DATA LOCKED</h3>
        <p style="margin:1rem 0;">The Research Partner Agency's premium post-launch survey includes brand loyalty ratings, Net Promoter Scores, and detailed satisfaction breakdowns by game element.</p>
        <button type="button" class="btn btn-primary" id="buy-nps-btn">Purchase Survey Access (£7,500)</button>
      </div>
    `;
  }

  return `
    <div class="alert alert-info">
      <strong>✓ Dataset Unlocked:</strong> nps_survey_study has been registered to your strategy account.
    </div>
    <h4>Post-Launch Net Promoter Score (NPS) & Player Satisfaction Index</h4>
    
    <table class="sales-matrix">
      <thead>
        <tr>
          <th>Game Franchise / Genre</th>
          <th>Net Promoter Score (NPS)</th>
          <th>Customer Satisfaction (CSAT)</th>
          <th>Top Advocacy Reason</th>
          <th>Top Churn / Criticism Reason</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Streetline Skate (Skateboarding)</strong></td>
          <td><span class="badge badge-safe">+72 (Excellent)</span></td>
          <td>92%</td>
          <td>Highly expressive movement, responsive controls, creative modding tools</td>
          <td>Niche appeal, steep initial learning curve for casuals</td>
        </tr>
        <tr>
          <td><strong>Highland Velocity (Racing)</strong></td>
          <td><span class="badge badge-safe">+48 (Good)</span></td>
          <td>78%</td>
          <td>Satisfying physics, robust car customization options</td>
          <td>Lack of map variety, repetitiveness after 10 hours</td>
        </tr>
        <tr>
          <td><strong>LifeSpace (Life Simulation)</strong></td>
          <td><span class="badge badge-alert" style="background-color: var(--color-danger); color: white;">-32 (Poor)</span></td>
          <td>35%</td>
          <td>Creative sandbox concept, appealing art style</td>
          <td>Extreme gameplay bugs, AI routing breaks, lack of meaningful progression, aggressive paywalls/microtransactions</td>
        </tr>
      </tbody>
    </table>
    
    <p style="font-size: 0.85rem; margin-top: 1rem;">
      <strong>Strategic Insight:</strong> The life simulation market suffers from deep dissatisfaction. The negative NPS (-32) for our previous LifeSpace release was driven not by the theme, but by technical quality failures (pathfinding AI bugs, crash logs). Re-entering this genre requires bulletproof technical stability, which explains the high bug ticket resolution costs. Conversely, the skateboarding community shows stellar advocacy (+72 NPS) because they love the core physics sandbox and user-generated content.
    </p>
  `;
}

// Premium Ad Spend Analysis details viewer (New Premium Option)
function generateAdSpendViewer() {
  if (!State.purchased.includes("ad_spend_unlocked")) {
    return `
      <div class="alert alert-warning" style="text-align: center; padding: 2rem;">
        <h3>🔒 PREMIUM AD SPEND DATASET LOCKED</h3>
        <p style="margin:1rem 0;">Confidential acquisition audit from AdIntelligence Group mapping competitor paid user acquisition spends and Mobile App Install costs.</p>
        <button type="button" class="btn btn-primary" id="buy-adspend-btn">Purchase Dataset Access (£5,000)</button>
      </div>
    `;
  }

  return `
    <div class="alert alert-info">
      <strong>✓ Dataset Unlocked:</strong> competitor_ad_spend_audit has been registered to your strategy account.
    </div>
    <h4>Competitor Paid User Acquisition Spend & Install Bid Benchmarks</h4>
    <table class="sales-matrix">
      <thead>
        <tr>
          <th>Competitor Game Title</th>
          <th>Annual Paid Ad Spend</th>
          <th>Average Cost Per Install (CPI)</th>
          <th>Paid Acquisition Share</th>
          <th>CAC Trend</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Speedway Unlimited (Racing)</td>
          <td>£8.4M</td>
          <td>£4.20</td>
          <td>42% of total players</td>
          <td style="color:var(--color-danger);">Rising (+12%)</td>
        </tr>
        <tr>
          <td>Grind & Slide (Skating)</td>
          <td>£1.2M</td>
          <td>£1.80</td>
          <td>15% of total players</td>
          <td style="color:var(--color-success);">Flat</td>
        </tr>
        <tr>
          <td>TownLife (Life Sim)</td>
          <td>£22.5M</td>
          <td>£6.50</td>
          <td>55% of total players</td>
          <td style="color:var(--color-danger);">Rising (+24%)</td>
        </tr>
      </tbody>
    </table>
    <p style="font-size: 0.85rem; margin-top: 1rem;">
      <strong>Strategic Insight:</strong> Competitor customer acquisition costs (CAC) for the simulation market are extremely high (£6.50 CPI) due to bidding wars. If Highland reboots LifeSpace as a traditional paid-acquisition game, the marketing budget will be drained. We must depend on organic creator loops, modding advocacy, and community shares to offset these acquisition costs.
    </p>
  `;
}

// Function to download strategic reports as formatted text
async function downloadReport(reportKey, docTitle) {
  const htmlContent = PDF_REPORTS[reportKey];
  if (!htmlContent) return;
  
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const embeddedFrame = tempDiv.querySelector("iframe.embedded-report-frame");
  if (embeddedFrame) {
    try {
      const response = await fetch(embeddedFrame.getAttribute("src"));
      if (response.ok) {
        tempDiv.innerHTML = await response.text();
      }
    } catch (err) {
      // Keep the embedded summary as a fallback if the standalone report cannot be fetched.
    }
  }
  
  let text = `${docTitle}\n${"=".repeat(docTitle.length)}\n\n`;
  
  const reportSections = tempDiv.querySelectorAll("section, .section, .pcar-section, .appendix, .pcar-appendix");
  reportSections.forEach(sec => {
    const heading = sec.querySelector("h2, h3, h4");
    if (heading) {
      text += `\n${heading.textContent.trim()}\n${"-".repeat(heading.textContent.trim().length)}\n`;
    }
    sec.querySelectorAll("p, li, td").forEach(p => {
      text += `${p.textContent.trim()}\n`;
    });
  });
  
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${reportKey.replace("_report", "")}_document.txt`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// CSV generators that download mock data
function downloadCSV(filename) {
  let content = "";
  
  if (filename === "search_referrals.csv") {
    content = `SearchTerm,MonthlyClicks,ReferralRatePercent,PrimaryGenreIntent,TargetPlatform,TrendGrowthPercent
next highland skating game,8500,14.2,Skateboarding,Console/PC,15
racing game career mode,6200,9.5,Racing,Console,2
life sim alternative,14200,18.7,Life Simulation,PC/Steam,38
highland simulation game reboot,4500,6.1,Life Simulation,PC,5
Apex Circuit sequel,3800,8.2,Racing,Console,1
streetline skate multiplayer,7100,12.4,Skateboarding,Console/PC,24
cosy game customization,9500,11.8,Life Simulation,Switch/PC,42
realistic car handling mods,3100,4.3,Racing,PC,-5
expressive movement games,5800,7.9,Skateboarding/Sports,Console/PC,18
highland velocity track editor,2400,3.8,Racing,Console,-2`;
  } 
  else if (filename === "competitor_comparison.csv") {
    content = `CompetitorTitle,Genre,EstActiveUsersMAU,AverageReviewScore,LaunchPriceUSD,ModdingSupport,DLCFrequency,CrossPlaySupport,VisualStyle,CommunitySentiment
Speedway Unlimited,Racing,4500000,78,59.99,No,High (Monthly),Yes,Photorealistic,Neutral
Turbo Asphalt 9,Racing,3200000,81,59.99,No,Medium (Quarterly),Yes,Photorealistic,Positive
Grind & Slide,Skateboarding,1200000,88,29.99,Yes (Steam Workshop),Low,No,Stylized,Highly Positive
Skate Park Legends,Skateboarding,850000,74,19.99,Yes (Basic),Medium,No,Stylized,Neutral
TownLife,Life Simulation,18000000,68,0.00,Yes (Extensive),Very High (Expansions),Yes,Cartoonish,Mixed (Complaints on DLC pricing)
Cosy Valley,Life Simulation,5400000,92,24.99,No,Low,Yes,Stylized/Cosy,Highly Positive
Pixel Society,Life Simulation,2200000,84,14.99,Yes (Custom APIs),Low,No,Retro Pixel,Positive
Motorsport Direct,Motorsport Management,900000,83,39.99,No,Medium,No,Semi-realistic,Positive`;
  }
  else if (filename === "historical_sales.csv") {
    content = `GameTitle,Genre,ReleaseYear,LaunchPriceUSD,UnitsSold1Month,UnitsSold1Year,ReviewScore,RefundRatePercent,SupportTicketsOpen,DevelopmentCostUSD
Highland Velocity,Racing,2021,59.99,350000,850000,82,2.4,1200,12000000
Apex Circuit,Racing,2023,59.99,420000,980000,85,1.8,950,14500000
Streetline Skate,Skateboarding,2024,39.99,250000,1100000,91,1.1,450,8500000
LifeSpace,Life Simulation,2022,49.99,180000,320000,54,12.5,8400,16000000`;
  }
  else if (filename === "bug_reports.csv") {
    content = `BugID,GameTitle,Severity,Category,Description,Status,ResolutionTimeDays,Reporter
BUG-2022-001,LifeSpace,Critical,Simulation Engine,NPC state machine loops indefinitely causing game lock,Closed,42,QA Lead
BUG-2022-002,LifeSpace,Critical,Save System,Save file corrupts when closing game during autosave,Closed,35,QA Engine
BUG-2022-003,LifeSpace,Major,Social AI,Characters walk through walls during socialization events,Closed,18,Community Coordinator
BUG-2022-004,LifeSpace,Major,UI,Customization overlay freezes character mesh selection,Closed,22,QA Lead
BUG-2022-008,LifeSpace,Critical,Memory,Leak in custom asset loader leads to crash after 45 mins,Closed,60,Graphics Engineer
BUG-2022-014,LifeSpace,Minor,Audio,Ambient background music drops after leaving house,Closed,4,Sound Lead
BUG-2022-031,LifeSpace,Major,Simulation Engine,Relationship level resets randomly after post-party cleanup,Closed,29,QA Engine
BUG-2024-101,Streetline Skate,Minor,Physics,Skateboard clips slightly into high curbs on high-speed grind,Closed,5,Physics Dev
BUG-2024-102,Streetline Skate,Minor,Animation,Character foot positioning slightly off during manual kickflip,Closed,3,Lead Animator
BUG-2023-401,Apex Circuit,Minor,UI,Leaderboard fails to refresh on slow network connection,Closed,7,Server QA
BUG-2023-402,Apex Circuit,Major,Physics,Car collision with soft tyre barrier sends physics engine unstable,Closed,12,Physics Dev`;
  }
  
  // Prefer the full generated CSV served with the app. If the app is opened from a
  // context where relative fetches are unavailable, fall back to the embedded sample.
  const dataPath = `mock-data/${filename}`;
  fetch(dataPath)
    .then(res => {
      if (!res.ok) {
        throw new Error(`CSV fetch failed: ${res.status}`);
      }
      return res.text();
    })
    .then(text => {
      const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      // Fallback to embedded static templates if file fetch fails
      const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

// --- 5. INITIALIZATION & VIEW CONTROLLERS ---

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  tickTimers();
  setInterval(tickTimers, 1000);
});

function setupEventListeners() {
  // Login Form Submission
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const teamSelect = document.getElementById("team-select");
    const passcode = document.getElementById("passcode-input").value.trim();
    const loginError = document.getElementById("login-error");
    
    const selectedTeamName = teamSelect.value;
    const correctPasscode = TEAMS_CONFIG[selectedTeamName];
    
    if (passcode === "admin1991") {
      loginError.textContent = "";
      login("Admin", "admin1991");
    } else if (correctPasscode && correctPasscode === passcode) {
      loginError.textContent = "";
      login(selectedTeamName, passcode);
    } else {
      loginError.textContent = "Error: Invalid team passcode association. Verify passcode reference below.";
    }
  });

  // Logout Button
  document.getElementById("logout-btn").addEventListener("click", logout);

  // Tab Navigation Buttons
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const targetTab = e.currentTarget.getAttribute("data-target");
      switchTab(targetTab);
    });
  });

  // Consumer Journey Stage Click Nodes
  const journeyNodes = document.querySelectorAll(".journey-node");
  journeyNodes.forEach(node => {
    node.addEventListener("click", (e) => {
      journeyNodes.forEach(n => {
        n.classList.remove("active");
        n.setAttribute("aria-selected", "false");
      });
      const targetNode = e.currentTarget;
      targetNode.classList.add("active");
      targetNode.setAttribute("aria-selected", "true");
      
      const stageId = parseInt(targetNode.getAttribute("data-stage"), 10);
      renderJourneyStage(stageId);
    });
  });

  // Slack Channel selector
  const slackChannels = document.querySelectorAll(".slack-channel-btn");
  slackChannels.forEach(btn => {
    btn.addEventListener("click", (e) => {
      slackChannels.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const channel = e.currentTarget.getAttribute("data-channel");
      renderSlackMessages(channel);
    });
  });

  // Slack sentiment trigger
  document.getElementById("analyze-slack-btn").addEventListener("click", () => {
    document.getElementById("sentiment-analysis-dashboard").classList.remove("hidden");
  });

  document.getElementById("close-sentiment-btn").addEventListener("click", () => {
    document.getElementById("sentiment-analysis-dashboard").classList.add("hidden");
  });

  // Macro reports navigation
  const macroTabs = document.querySelectorAll(".macro-tab-btn");
  macroTabs.forEach(btn => {
    btn.addEventListener("click", (e) => {
      macroTabs.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const report = e.currentTarget.getAttribute("data-report");
      renderMacroReport(report);
    });
  });

  // Close Modal Button
  document.getElementById("modal-close-btn").addEventListener("click", () => {
    document.getElementById("data-modal").close();
  });

  // Worksheet form actions
  const worksheetForm = document.getElementById("worksheet-form");
  worksheetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveWorksheetData();
    alert("Strategic worksheet progress successfully saved to localized storage.");
  });

  document.getElementById("print-ws-btn").addEventListener("click", () => {
    saveWorksheetData();
    window.print();
  });

  // Forecast Scenario Explorer listeners
  const fcSelect = document.getElementById("forecast-project-select");
  const fcBtns = document.querySelectorAll("#forecast-explorer-panel .scenario-tab-btn");
  if (fcSelect) {
    fcSelect.addEventListener("change", updateForecastExplorer);
  }
  fcBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      fcBtns.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      updateForecastExplorer();
    });
  });
}

function login(teamName, passcode) {
  loadState(passcode);
  
  // UI Display synchronization
  document.getElementById("display-team-name").textContent = teamName;
  document.getElementById("display-budget").textContent = formatCurrency(State.budget);
  
  // Prepare Worksheet Display fields
  document.getElementById("ws-team-display").value = teamName;
  updateBudgetDisplay();
  
  // Unhide app frame
  document.getElementById("login-overlay").classList.add("hidden");
  document.getElementById("app-wrapper").classList.remove("hidden");
  
  // Navigate to initial active tab
  switchTab(State.activeTab);
  
  // Initial renders
  renderJourneyStage(1);
  renderSlackMessages("general");
  renderMacroReport("macro-general");
  renderEmailInbox();
  populateWorksheetForm();
  updateForecastExplorer();
}

function logout() {
  saveState();
  State.passcode = "";
  State.activeTeam = "";
  document.getElementById("login-overlay").classList.remove("hidden");
  document.getElementById("app-wrapper").classList.add("hidden");
  document.getElementById("passcode-input").value = "";
}

function switchTab(tabId) {
  // Update state
  State.activeTab = tabId;
  saveState();
  
  // Update Sidebar Active state
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-target") === tabId) {
      item.classList.add("active");
    }
  });

  // Update Main Panels Display
  const panes = document.querySelectorAll(".tab-pane");
  panes.forEach(pane => {
    pane.classList.remove("active-pane");
  });
  document.getElementById(tabId).classList.add("active-pane");

  // Sync Titles
  const tabTitles = {
    "tab-briefing": "Scenario Briefing",
    "tab-journey": "Consumer Journey Map",
    "tab-slack": "Internal Slack Board",
    "tab-macro": "Macro Environment & Industry Context",
    "tab-email": "Simulated Communications Inbox",
    "tab-worksheet": "Strategic Decision Worksheet"
  };
  document.getElementById("current-tab-title").textContent = tabTitles[tabId] || "Dashboard";

  // Clean email unread highlights if inbox active
  if (tabId === "tab-email") {
    State.emails.forEach(e => e.read = true);
    document.getElementById("email-badge").classList.add("hidden");
    renderEmailInbox();
    saveState();
  }
}

// --- 6. RENDER LOGIC FOR SUB-VIEWS ---

// Journey Stage Headers
const STAGE_METADATA = {
  1: {
    title: "Needs Recognition",
    desc: "Early signals that players are feeling an unmet interest, general genre category demand, or growing curiosity before they actively research a specific title."
  },
  2: {
    title: "Search for Information",
    desc: "Active research behavior. Consumers seek gameplay trailers, launch dates, developer blogs, and physical mechanic previews to evaluate studio credentials."
  },
  3: {
    title: "Pre-Purchase Evaluation of Alternatives",
    desc: "Comparative analysis. Players stack features of upcoming titles against competitor releases, wishlisting games, reading creator hype, and discussing custom feature expectations."
  },
  4: {
    title: "Purchase",
    desc: "Transactional phase. Evaluating store buy conversions, launch sales curves, category price decay models, and platform release budgets."
  },
  5: {
    title: "Consumption",
    desc: "Gameplay engagement. Analyzing physical playtime metrics, server retention curves, code stability log files, and community UGC download activity."
  },
  6: {
    title: "Post-Purchase Evaluation",
    desc: "Re-evaluation and sentiment review. Users write reviews on digital stores, request refunds due to stability issues, and post text critiques."
  },
  7: {
    title: "Advocacy and Community Continuation",
    desc: "Long-term engagement. Forum continuation index, content creator tutorial builds, maps sharing, and loyalty surveys."
  }
};

function renderJourneyStage(stageId) {
  const meta = STAGE_METADATA[stageId];
  document.getElementById("stage-title").textContent = `${stageId}. ${meta.title}`;
  document.getElementById("stage-description").textContent = meta.desc;

  const grid = document.getElementById("data-sources-grid");
  grid.innerHTML = "";

  const sources = Object.values(DATA_SOURCES).filter(s => s.stage === stageId);
  sources.forEach(src => {
    let statusText = "Unlocked";
    let statusClass = "unlocked";

    if (src.behaviour === "purchase" && !State.purchased.includes(src.purchasedKey)) {
      statusText = `Locked (Deduct £${src.cost.toLocaleString()})`;
      statusClass = "locked";
    } else if (src.behaviour === "email" && State.requests[src.id]) {
      const requestObj = State.requests[src.id];
      const elapsed = (Date.now() - requestObj.requestedAt) / 1000;
      if (elapsed < requestObj.delay) {
        statusText = "Pending Approval in Queue";
        statusClass = "pending";
      }
    } else if (src.behaviour === "email" && !State.requests[src.id]) {
      statusText = "Request Access (Delayed)";
      statusClass = "locked";
    }

    const card = document.createElement("button");
    card.type = "button";
    card.className = "data-source-card glass-panel";
    card.innerHTML = `
      <div class="ds-header">
        <h3>${src.name}</h3>
        <span class="badge ${statusClass === 'unlocked' ? 'badge-safe' : 'badge-alert'}">${src.format}</span>
      </div>
      <p class="ds-desc">${src.description}</p>
      <div class="ds-meta">
        <span class="ds-tag">${src.analyticalUse.split(" ")[0]}</span>
        <span class="ds-status ${statusClass}">${statusText}</span>
      </div>
    `;
    card.addEventListener("click", () => openDataSourceModal(src.id));
    grid.appendChild(card);
  });
}

// Dialog Detail Modal Controller
function openDataSourceModal(sourceId) {
  const src = DATA_SOURCES[sourceId];
  if (!src) return;
  const modal = document.getElementById("data-modal");
  modal.classList.remove("viewer-open");

  // Log viewed state
  if (!State.viewed.includes(sourceId)) {
    State.viewed.push(sourceId);
    saveState();
  }

  // Set modal metadata text
  document.getElementById("modal-data-name").textContent = src.name;
  document.getElementById("modal-meta-stage").textContent = STAGE_METADATA[src.stage].title;
  document.getElementById("modal-meta-format").textContent = src.format;
  document.getElementById("modal-meta-owner").textContent = src.owner;
  document.getElementById("modal-meta-refresh").textContent = src.refresh;
  document.getElementById("modal-meta-avail").textContent = src.availability;
  
  let costText = src.cost === 0 ? "Free" : formatCurrency(src.cost);
  let delayText = "Instant";
  if (src.behaviour === "email") {
    delayText = "Random delay (1 - 5 minutes)";
  } else if (src.behaviour === "commission") {
    costText = "£18,000";
    delayText = "4 Weeks (Unavailable)";
  }
  document.getElementById("modal-meta-cost").textContent = `${costText} / ${delayText}`;
  document.getElementById("modal-meta-use").textContent = src.analyticalUse;
  
  document.getElementById("modal-description").textContent = src.description;
  document.getElementById("modal-limitations").textContent = src.limitations;

  const actions = document.getElementById("modal-workspace-actions");
  const viewer = document.getElementById("modal-workspace-viewer");
  actions.innerHTML = "";
  viewer.innerHTML = "";
  viewer.classList.add("hidden");

  // Behavior mappings
  if (src.behaviour === "instant") {
    actions.innerHTML = `<button type="button" class="btn btn-primary" id="modal-view-dash-btn">View Enterprise Analytics Dashboard</button>`;
    document.getElementById("modal-view-dash-btn").addEventListener("click", () => {
      renderModalDashboard(src.id, viewer);
    });
  } 
  else if (src.behaviour === "csv") {
    actions.innerHTML = `
      <p style="font-size:0.85rem; margin-bottom:0.75rem;">This raw spreadsheet file has no automated design summary. You must export it to analyze raw columns.</p>
      <button type="button" class="btn btn-primary" id="modal-dl-csv-btn">Download Raw CSV Dataset</button>
    `;
    document.getElementById("modal-dl-csv-btn").addEventListener("click", () => {
      downloadCSV(src.csvFile);
    });
  } 
  else if (src.behaviour === "report") {
    actions.innerHTML = `
      <div style="display: flex; gap: 0.75rem;">
        <button type="button" class="btn btn-primary" id="modal-view-report-btn">Read Pre-Analyzed Report</button>
        <button type="button" class="btn btn-outline" id="modal-dl-report-btn">Download Report (.txt)</button>
      </div>
    `;
    document.getElementById("modal-view-report-btn").addEventListener("click", () => {
      document.getElementById("data-modal").classList.add("viewer-open");
      viewer.innerHTML = PDF_REPORTS[src.reportKey] || "<p>Report unavailable.</p>";
      viewer.classList.remove("hidden");
    });
    document.getElementById("modal-dl-report-btn").addEventListener("click", () => {
      downloadReport(src.reportKey, src.name);
    });
  } 
  else if (src.behaviour === "live") {
    actions.innerHTML = `<button type="button" class="btn btn-primary" id="modal-view-live-btn">Open Live Telemetry Terminal</button>`;
    document.getElementById("modal-view-live-btn").addEventListener("click", () => {
      document.getElementById("data-modal").classList.add("viewer-open");
      renderModalLiveFeed(src.id, viewer);
    });
  } 
  else if (src.behaviour === "email") {
    const requestObj = State.requests[src.id];
    if (requestObj) {
      const elapsed = (Date.now() - requestObj.requestedAt) / 1000;
      if (elapsed < requestObj.delay) {
        // Pending (Hidden timer to increase ambiguity)
        actions.innerHTML = `
          <div class="countdown-box pulse-warning">
            <span class="countdown-spinner"></span>
            <p>Access request is currently pending in corporate queue.</p>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Please monitor your Simulated Inbox periodically for a response. Delays average 1 to 5 minutes.</p>
          </div>
        `;
      } else {
        // Completed
        actions.innerHTML = `
          <div class="alert alert-info" style="margin: 0 0 1rem 0;">
            <strong>✓ Request Approved:</strong> File has been delivered to your simulated exchange inbox.
          </div>
          <button type="button" class="btn btn-outline" id="modal-go-inbox-btn">Go to Simulated Inbox</button>
        `;
        document.getElementById("modal-go-inbox-btn").addEventListener("click", () => {
          document.getElementById("data-modal").close();
          switchTab("tab-email");
        });
      }
    } else {
      // Unsent request
      actions.innerHTML = `
        <p style="font-size:0.85rem; margin-bottom:0.75rem;">Requires sending a formal information release request to <strong>${src.owner}</strong>. Approval delays vary randomly from 60s to 5 minutes.</p>
        <button type="button" class="btn btn-primary" id="modal-req-email-btn">Send Data Access Request</button>
      `;
      document.getElementById("modal-req-email-btn").addEventListener("click", () => {
        const isAdmin = State.passcode === "admin1991";
        const randomSeconds = isAdmin ? 0 : (Math.floor(Math.random() * (300 - 60 + 1)) + 60);
        State.requests[src.id] = {
          requestedAt: Date.now(),
          delay: randomSeconds
        };
        saveState();
        renderJourneyStage(src.stage);
        openDataSourceModal(src.id); // Refresh modal view
      });
    }
  } 
  else if (src.behaviour === "purchase") {
    if (State.purchased.includes(src.purchasedKey)) {
      renderModalDashboard(src.id, viewer);
      viewer.classList.remove("hidden");
    } else {
      actions.innerHTML = `
        <p style="font-size:0.85rem; margin-bottom:0.75rem;">Premium market datasets require commercial authorization budget. Cost: <strong>£${src.cost.toLocaleString()}</strong>.</p>
        <button type="button" class="btn btn-primary" id="modal-buy-btn">Purchase Access (Deduct £${src.cost.toLocaleString()})</button>
      `;
      document.getElementById("modal-buy-btn").addEventListener("click", () => {
        const isAdmin = State.passcode === "admin1991";
        if (isAdmin || State.budget >= src.cost) {
          if (!isAdmin) {
            State.budget -= src.cost;
          }
          State.purchased.push(src.purchasedKey);
          
          // Inject an email from vendor
          State.emails.push({
            sender: src.owner,
            subject: `Purchase Receipt: ${src.id}`,
            body: `Dear Strategy Strategy Team,

This email confirms your purchase of the ${src.id} dataset ${isAdmin ? 'under Admin Access (No Cost)' : `for £${src.cost.toLocaleString()}`}.

Your account balance has been successfully adjusted. You can now view the unlocked enterprise analytics dashboard inside the data modal on the Consumer Journey Map tab.

Sincerely,
${src.owner} Billing Support`,
            date: "Just Now",
            read: false,
            id: `purchase_${Date.now()}`
          });
          
          saveState();
          updateBudgetDisplay();
          renderJourneyStage(src.stage);
          openDataSourceModal(src.id); // Refresh modal
        } else {
          alert("Error: Insufficient localized budget remaining to complete this strategic purchase. Choose your dataset path wisely!");
        }
      });
    }
  } 
  else if (src.behaviour === "commission") {
    actions.innerHTML = `
      <div class="alert alert-warning" style="margin: 0; text-align: center;">
        <strong>Strategic Limitation:</strong> A survey study of this scope costs <strong>£18,000</strong> and takes <strong>4 weeks</strong>. 
        Because today's board proposal must occur inside today's session, this data is <strong>unavailable</strong> to support today's choice.
      </div>
    `;
  }

  // Open native modal dialog
  modal.showModal();
}

function renderModalDashboard(sourceId, viewerElement) {
  document.getElementById("data-modal").classList.add("viewer-open");
  viewerElement.classList.remove("hidden");
  
  if (sourceId === "s1_search_trends") {
    viewerElement.innerHTML = generateMarketTrendsChart();
  } 
  else if (sourceId === "s2_web_analytics") {
    viewerElement.innerHTML = generateWebClicksDashboard();
  }
  else if (sourceId === "s2_trailer_engagement") {
    viewerElement.innerHTML = generateVideoRetentionDashboard();
  }
  else if (sourceId === "s3_wishlist_data") {
    viewerElement.innerHTML = generateWishlistDashboard();
  }
  else if (sourceId === "s4_pricing_discount_behavior") {
    viewerElement.innerHTML = generatePricingDecayDashboard();
  }
  else if (sourceId === "s5_gameplay_telemetry") {
    viewerElement.innerHTML = generateTelemetryDashboard();
  }
  else if (sourceId === "s7_community_engagement") {
    viewerElement.innerHTML = generateCommunityEngagementDashboard();
  }
  else if (sourceId === "s4_platform_sales_benchmark") {
    viewerElement.innerHTML = generatePlatformSalesViewer();
  }
  else if (sourceId === "s4_ad_spend_analysis") {
    viewerElement.innerHTML = generateAdSpendViewer();
  }
  else if (sourceId === "s7_nps_survey") {
    viewerElement.innerHTML = generateNpsSurveyViewer();
  }
  else if (sourceId === "s3_community_expectations" || sourceId === "s6_sentiment_analytics") {
    // Interactive Sentiment Explorer Dashboard
    viewerElement.innerHTML = generateSentimentExplorerHTML();
    
    const filter = document.getElementById("sentiment-genre-filter");
    const slider = document.getElementById("sentiment-threshold");
    const valText = document.getElementById("threshold-val");
    
    // Initial display
    updateSentimentExplorer(filter.value, parseInt(slider.value, 10));
    
    // Live listeners
    filter.addEventListener("change", () => {
      updateSentimentExplorer(filter.value, parseInt(slider.value, 10));
    });
    
    slider.addEventListener("input", (e) => {
      valText.textContent = `Relevance >= ${e.target.value}%`;
      updateSentimentExplorer(filter.value, parseInt(e.target.value, 10));
    });
  } 
  else if (sourceId === "s6_review_ratings") {
    viewerElement.innerHTML = `
      <h4>Critic Metascores vs Store User Reviews (Summary Statistics)</h4>
      <table class="sales-matrix" style="margin-top: 1rem;">
        <thead>
          <tr>
            <th>Game Title</th>
            <th>Critic Metascore</th>
            <th>Steam User rating</th>
            <th>Refund Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Highland Velocity (Racing)</td>
            <td>82/100</td>
            <td>85% Positive</td>
            <td>2.4%</td>
          </tr>
          <tr>
            <td>Apex Circuit (Racing)</td>
            <td>85/100</td>
            <td>88% Positive</td>
            <td>1.8%</td>
          </tr>
          <tr>
            <td>Streetline Skate (Skating)</td>
            <td>91/100</td>
            <td>94% Positive</td>
            <td>1.1%</td>
          </tr>
          <tr>
            <td>LifeSpace (Life Simulation)</td>
            <td>54/100</td>
            <td>41% Positive</td>
            <td>12.5%</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

// 6.3 Live updating metrics dashboards & Sentiment Parser (significantly expanded)
let liveFeedInterval = null;
function renderModalLiveFeed(sourceId, viewerElement) {
  if (liveFeedInterval) clearInterval(liveFeedInterval);
  viewerElement.classList.remove("hidden");

  // Renders the new split panel container: scrolling feed on the left, live keyword tally counts + ratio bars on the right
  viewerElement.innerHTML = `
    <div class="live-feed-split-container">
      
      <!-- Left scrolling feed column -->
      <div class="live-feed-left">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h4 id="live-feed-title">Connecting to Live Terminal...</h4>
          <span class="badge badge-safe" style="animation: pulse-glow 2s infinite;">ONLINE FEED</span>
        </div>
        <div id="live-feed-logs" style="flex:1; font-family:var(--font-mono); font-size:0.8rem; background-color:#05070a; border:1px solid var(--border-glass); border-radius:var(--border-radius-md); padding:1rem; overflow-y:auto; color:var(--color-success); line-height:1.4;">
        </div>
      </div>
      
      <!-- Right analysis column -->
      <div class="live-feed-right">
        <div class="live-sentiment-title">Live Tally Index Analysis</div>
        <div class="sentiment-tally-list">
          <div class="tally-row">
            <span class="tally-word pos">customisation (+)</span>
            <span class="tally-value" id="tally-customisation">0</span>
          </div>
          <div class="tally-row">
            <span class="tally-word pos">physics (+)</span>
            <span class="tally-value" id="tally-physics">0</span>
          </div>
          <div class="tally-row">
            <span class="tally-word pos">modding (+)</span>
            <span class="tally-value" id="tally-modding">0</span>
          </div>
          <div class="tally-row">
            <span class="tally-word neg">bugs (-)</span>
            <span class="tally-value" id="tally-bugs">0</span>
          </div>
          <div class="tally-row">
            <span class="tally-word neg">DLC (-)</span>
            <span class="tally-value" id="tally-DLC">0</span>
          </div>
        </div>
        
        <div class="live-sentiment-ratio-card">
          <div class="live-ratio-title">Sentiment Ratio</div>
          <div class="live-ratio-bar-wrapper">
            <div class="live-ratio-bar-pos" id="ratio-bar-pos" style="width: 50%;"></div>
            <div class="live-ratio-bar-neg" id="ratio-bar-neg" style="width: 50%;"></div>
          </div>
          <div class="live-ratio-values">
            <span class="pos" id="ratio-val-pos">50% Pos</span>
            <span class="neg" id="ratio-val-neg">50% Neg</span>
          </div>
        </div>
        
        <button type="button" class="btn btn-outline btn-sm" id="reset-live-tally-btn" style="margin-top: 1rem;">Reset Analyzer Counters</button>
      </div>

    </div>
  `;

  const logBox = document.getElementById("live-feed-logs");
  const title = document.getElementById("live-feed-title");
  
  // Sync UI tally values
  updateTallyUI();

  // Handle reset button
  document.getElementById("reset-live-tally-btn").addEventListener("click", () => {
    State.liveSentimentStats = { customisation: 0, bugs: 0, physics: 0, DLC: 0, modding: 0 };
    saveState();
    updateTallyUI();
  });

  if (sourceId === "s1_social_listening") {
    title.textContent = "Social Listening Scraping Log";
    const keywords = [
      { text: "Steam User cozy_gamer: 'I really need a customization heavy alternative to TownLife. The clothing pricing is a joke.'", keys: ["customisation", "DLC"] },
      { text: "Twitter @mod_central: 'If Highland reboots their life sim with proper modding files, they'll win.'", keys: ["modding"] },
      { text: "Reddit /r/cozygames: 'I love customisation and creative sandbox tools, but I hate game bugs.'", keys: ["customisation", "bugs"] },
      { text: "YouTube Comment: 'Streetline Skate has the most fluid physics. I can play for hours just grinding.'", keys: ["physics"] },
      { text: "Forum poster: 'TownLife is full of pathfinding bugs. Standard AI routines keep breaking.'", keys: ["bugs"] },
      { text: "Discord user: 'I will buy cosmetic DLC packages only if the base game is fully stable.'", keys: ["DLC"] },
      { text: "Steam User: 'The modding API in Pixel Society is awesome. We need more modding platforms.'", keys: ["modding"] },
      { text: "Twitter @car_fanatic: 'Hope the next Apex racer supports advanced force feedback physics.'", keys: ["physics"] },
      { text: "Reddit: 'I'm tired of crashes and save bugs. Development speed shouldn't override quality!'", keys: ["bugs"] },
      { text: "YouTube: 'Highland should combine skate customization mechanics with social cosy lobbies!'", keys: ["customisation"] }
    ];
    
    let counter = 0;
    const addLog = () => {
      const item = keywords[counter % keywords.length];
      const time = new Date().toLocaleTimeString();
      
      // Parse keywords and increment state
      item.keys.forEach(k => {
        State.liveSentimentStats[k] = (State.liveSentimentStats[k] || 0) + 1;
      });
      saveState();
      updateTallyUI();

      // Color code log text
      let sentimentTag = "<span style='color:var(--text-muted);'>[Parsed]</span>";
      if (item.keys.includes("bugs") || item.keys.includes("DLC")) {
        sentimentTag = "<span style='color:var(--color-danger);'>[Parsed - Neg]</span>";
      } else {
        sentimentTag = "<span style='color:var(--color-success);'>[Parsed - Pos]</span>";
      }

      logBox.innerHTML = `<div>[${time}] ${item.text} ${sentimentTag}</div>` + logBox.innerHTML;
      counter++;
    };
    
    addLog();
    liveFeedInterval = setInterval(addLog, 1500);
  } 
  else if (sourceId === "s5_live_service_metrics") {
    title.textContent = "Highland Live Lobby Console";
    let dau = 62000;
    
    const updateMetrics = () => {
      const fluctuate = Math.floor((Math.random() - 0.5) * 60);
      dau += fluctuate;
      const time = new Date().toLocaleTimeString();
      
      // Live server events sometimes generate keywords
      let eventText = "Ping metrics: STABLE | Latency: 22ms";
      if (Math.random() < 0.3) {
        eventText = "Lobby customizable mesh successfully rendered on Switch Node.";
        State.liveSentimentStats["customisation"]++;
      } else if (Math.random() < 0.5) {
        eventText = "Physics grind vector matching triggered by client skate ID.";
        State.liveSentimentStats["physics"]++;
      } else if (Math.random() < 0.6) {
        eventText = "Unresolved crash reported on console server node (Save state conflict).";
        State.liveSentimentStats["bugs"]++;
      }
      saveState();
      updateTallyUI();

      logBox.innerHTML = `<div>[${time}] Active DAU: ${dau.toLocaleString()} | ${eventText}</div>` + logBox.innerHTML;
    };
    
    updateMetrics();
    liveFeedInterval = setInterval(updateMetrics, 1500);
  }
}

function updateTallyUI() {
  const stats = State.liveSentimentStats || { customisation: 0, bugs: 0, physics: 0, DLC: 0, modding: 0 };
  
  const words = ['customisation', 'bugs', 'physics', 'DLC', 'modding'];
  words.forEach(w => {
    const el = document.getElementById(`tally-${w}`);
    if (el) el.textContent = stats[w] || 0;
  });

  // Calculate ratio
  const posCount = (stats.customisation || 0) + (stats.physics || 0) + (stats.modding || 0);
  const negCount = (stats.bugs || 0) + (stats.DLC || 0);
  const total = posCount + negCount;

  const barPos = document.getElementById("ratio-bar-pos");
  const barNeg = document.getElementById("ratio-bar-neg");
  const valPos = document.getElementById("ratio-val-pos");
  const valNeg = document.getElementById("ratio-val-neg");

  if (total > 0) {
    const posPct = Math.round((posCount / total) * 100);
    const negPct = 100 - posPct;

    if (barPos) barPos.style.width = `${posPct}%`;
    if (barNeg) barNeg.style.width = `${negPct}%`;
    if (valPos) valPos.textContent = `${posPct}% Pos`;
    if (valNeg) valNeg.textContent = `${negPct}% Neg`;
  } else {
    if (barPos) barPos.style.width = `50%`;
    if (barNeg) barNeg.style.width = `50%`;
    if (valPos) valPos.textContent = `50% Pos`;
    if (valNeg) valNeg.textContent = `50% Neg`;
  }
}

// Clean up live updates if modal closes
document.getElementById("data-modal").addEventListener("close", () => {
  if (liveFeedInterval) {
    clearInterval(liveFeedInterval);
    liveFeedInterval = null;
  }
  document.getElementById("data-modal").classList.remove("viewer-open");
});

// Slack Message Renderer
function renderSlackMessages(channel) {
  const feed = document.getElementById("slack-message-feed");
  feed.innerHTML = "";

  const messages = SLACK_COMMUNICATIONS[channel] || [];
  messages.forEach(msg => {
    const el = document.createElement("div");
    el.className = "slack-msg";
    el.innerHTML = `
      <div class="msg-avatar ${msg.avatarClass}">${msg.sender.substring(0,2)}</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-sender">${msg.sender}</span>
          <span class="msg-role">${msg.role}</span>
          <span class="msg-time">${msg.time}</span>
        </div>
        <div class="msg-text">${msg.text}</div>
      </div>
    `;
    feed.appendChild(el);
  });
}

// Macro Report tab content renderer
function renderMacroReport(reportId) {
  const content = document.getElementById("macro-report-content");
  content.innerHTML = MACRO_REPORTS[reportId] || "<p>Report content not found.</p>";
}

// Simulated Email Client Renderer
function renderEmailInbox() {
  const listContainer = document.getElementById("email-list-container");
  const viewContainer = document.getElementById("email-view-container");
  listContainer.innerHTML = "";

  const emails = [...State.emails].reverse();

  if (emails.length === 0) {
    listContainer.innerHTML = `<li style="padding:1rem; text-align:center; color:var(--text-muted);">Inbox Empty</li>`;
    return;
  }

  emails.forEach(email => {
    const li = document.createElement("li");
    li.className = `email-list-item ${email.read ? '' : 'unread'}`;
    li.innerHTML = `
      <div class="email-item-header">
        <span class="email-item-sender">${email.sender}</span>
        <span class="email-item-date">${email.date}</span>
      </div>
      <div class="email-item-subject">${email.subject}</div>
      <div class="email-item-snippet">${email.body.substring(0, 50)}...</div>
    `;
    li.addEventListener("click", () => {
      document.querySelectorAll(".email-list-item").forEach(item => item.classList.remove("active"));
      li.classList.add("active");
      li.classList.remove("unread");
      email.read = true;
      saveState();
      updateEmailBadgeCount();
      renderEmailFullView(email, viewContainer);
    });
    listContainer.appendChild(li);
  });
}

function renderEmailFullView(email, container) {
  container.innerHTML = `
    <div class="email-full-view">
      <header class="email-meta-header">
        <h3 class="email-full-subject">${email.subject}</h3>
        <div class="email-meta-row">
          <span class="email-meta-sender-info">From: <strong>${email.sender}</strong></span>
          <span class="email-meta-date">${email.date}</span>
        </div>
      </header>
      <main class="email-body-text">${email.body}</main>
      ${email.attachment ? `
        <footer class="email-attachments">
          <h4>Attachments Received (Data Download Unlocked)</h4>
          <button type="button" class="attachment-badge" id="inbox-attachment-btn">
            📂 ${email.attachment}
          </button>
        </footer>
      ` : ''}
    </div>
  `;

  if (email.attachment) {
    document.getElementById("inbox-attachment-btn").addEventListener("click", () => {
      if (email.attachment.endsWith(".csv")) {
        downloadCSV(email.attachment);
      } else {
        // PDF Report modal display
        const reportKey = email.attachment.replace(".pdf", "_report");
        const modal = document.getElementById("data-modal");
        document.getElementById("modal-data-name").textContent = email.subject.replace("Approved: ", "");
        document.getElementById("modal-meta-stage").textContent = "Inbox Data release";
        document.getElementById("modal-meta-format").textContent = "Pre-analyzed Report Document";
        document.getElementById("modal-meta-owner").textContent = email.sender;
        document.getElementById("modal-meta-refresh").textContent = "Historical Snapshot";
        document.getElementById("modal-meta-avail").textContent = "Unlocked";
        document.getElementById("modal-meta-cost").textContent = "Delivered / Approved";
        document.getElementById("modal-meta-use").textContent = "Diagnostic & Predictive";
        
        document.getElementById("modal-description").textContent = "This analytical attachment was released by governance and processed into your inbox folder.";
        document.getElementById("modal-limitations").textContent = "Standard limitations apply to high-level corporate data samples.";
        modal.classList.add("viewer-open");
        
        const actions = document.getElementById("modal-workspace-actions");
        const viewer = document.getElementById("modal-workspace-viewer");
        actions.innerHTML = `
          <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
            <button type="button" class="btn btn-outline" id="modal-dl-report-btn">Download Attachment (.txt)</button>
          </div>
        `;
        document.getElementById("modal-dl-report-btn").addEventListener("click", () => {
          downloadReport(reportKey, email.subject);
        });
        viewer.innerHTML = PDF_REPORTS[reportKey] || `<p>${email.body}</p>`;
        viewer.classList.remove("hidden");
        
        modal.showModal();
      }
    });
  }
}

function updateBudgetDisplay() {
  const isAdmin = State.passcode === "admin1991";
  if (isAdmin) {
    document.getElementById("display-budget").textContent = "Unlimited";
    document.getElementById("ws-budget-display").value = "Admin Access - Unlimited Budget";
  } else {
    document.getElementById("display-budget").textContent = formatCurrency(State.budget);
    document.getElementById("ws-budget-display").value = `£${(10000 - State.budget).toLocaleString()} Spent / £${State.budget.toLocaleString()} Unused`;
  }
}

function updateEmailBadgeCount() {
  const badge = document.getElementById("email-badge");
  const count = State.emails.filter(e => !e.read).length;
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// Timer loops evaluating pending email requests
function tickTimers() {
  let stateChanged = false;
  const now = Date.now();
  
  Object.keys(State.requests).forEach(srcId => {
    const src = DATA_SOURCES[srcId];
    if (!src) return;

    const requestObj = State.requests[srcId];
    const elapsed = (now - requestObj.requestedAt) / 1000;
    
    if (elapsed >= requestObj.delay) {
      delete State.requests[srcId];
      
      const template = EMAIL_TEMPLATES[src.emailKey];
      if (template) {
        State.emails.push({
          sender: template.sender,
          subject: template.subject,
          body: template.body,
          date: new Date().toLocaleTimeString(),
          read: false,
          id: `req_${srcId}`,
          attachment: template.attachment
        });
      }
      
      stateChanged = true;
    }
  });

  if (stateChanged) {
    saveState();
    updateEmailBadgeCount();
    
    if (State.activeTab === "tab-journey") {
      const activeNode = document.querySelector(".journey-node.active");
      if (activeNode) {
        const stageId = parseInt(activeNode.getAttribute("data-stage"), 10);
        renderJourneyStage(stageId);
      }
    }
    
    const modal = document.getElementById("data-modal");
    if (modal.open) {
      const modalHeaderName = document.getElementById("modal-data-name").textContent;
      const matchingSource = Object.values(DATA_SOURCES).find(s => s.name === modalHeaderName);
      if (matchingSource && !State.requests[matchingSource.id]) {
        openDataSourceModal(matchingSource.id);
      }
    }
  }
}

// --- 7. Strategic WORKSHEET FORM CONTROLLERS ---

function populateWorksheetForm() {
  const ws = State.worksheet;
  if (!ws) return;

  document.getElementById("ws-project-choice").value = ws.projectChoice || "";
  document.getElementById("ws-evidence").value = ws.evidence || "";
  document.getElementById("ws-limitations").value = ws.limitations || "";
  document.getElementById("ws-risks").value = ws.risks || "";
  document.getElementById("ws-future").value = ws.future || "";

  const checkAnalytics = ["desc", "diag", "pred", "pres"];
  checkAnalytics.forEach(t => {
    const el = document.getElementById(`analytics-${t}`);
    if (el) el.checked = ws.analyticsType && ws.analyticsType.includes(el.value);
  });

  const checkStages = [1, 2, 3, 4, 5, 6, 7];
  checkStages.forEach(s => {
    const el = document.getElementById(`stage-${s}`);
    if (el) el.checked = ws.journeyStages && ws.journeyStages.includes(el.value);
  });
}

function saveWorksheetData() {
  const ws = State.worksheet;
  
  ws.projectChoice = document.getElementById("ws-project-choice").value;
  ws.evidence = document.getElementById("ws-evidence").value;
  ws.limitations = document.getElementById("ws-limitations").value;
  ws.risks = document.getElementById("ws-risks").value;
  ws.future = document.getElementById("ws-future").value;

  ws.analyticsType = [];
  const checkAnalytics = ["desc", "diag", "pred", "pres"];
  checkAnalytics.forEach(t => {
    const el = document.getElementById(`analytics-${t}`);
    if (el && el.checked) ws.analyticsType.push(el.value);
  });

  ws.journeyStages = [];
  const checkStages = [1, 2, 3, 4, 5, 6, 7];
  checkStages.forEach(s => {
    const el = document.getElementById(`stage-${s}`);
    if (el && el.checked) ws.journeyStages.push(el.value);
  });

  saveState();
}

// --- 8. FORECAST CALCULATOR ENGINE ---

const FORECAST_DATA = {
  racing: { cost: 13500000, time: "3 Years", sales: 45000000, tail: "Low", risk: "Low" },
  skate: { cost: 9000000, time: "2.5 Years", sales: 35000000, tail: "Medium", risk: "Low" },
  openworld: { cost: 18000000, time: "4 Years", sales: 55000000, tail: "High", risk: "Medium" },
  lifesim: { cost: 22000000, time: "5 Years", sales: 95000000, tail: "Extreme", risk: "High" },
  hybrid: { cost: 13000000, time: "3 Years", sales: 42000000, tail: "High", risk: "Medium" },
  motorsport: { cost: 7000000, time: "2 Years", sales: 22000000, tail: "Medium", risk: "Low" }
};

function updateForecastExplorer() {
  const projectSelect = document.getElementById("forecast-project-select");
  if (!projectSelect) return;
  const project = projectSelect.value;
  const activeTab = document.querySelector("#forecast-explorer-panel .scenario-tab-btn.active");
  const multiplier = activeTab ? activeTab.getAttribute("data-multiplier") : "moderate";
  
  const base = FORECAST_DATA[project];
  if (!base) return;
  
  let salesMult = 1.0;
  let riskText = base.risk;
  let tailText = base.tail;
  
  if (multiplier === "pessimistic") {
    salesMult = 0.6;
    riskText = base.risk === "Low" ? "Low-Medium" : (base.risk === "Medium" ? "High" : "Extreme");
    tailText = base.tail === "Extreme" ? "High" : (base.tail === "High" ? "Medium" : "Low");
  } else if (multiplier === "optimistic") {
    salesMult = 1.5;
    riskText = base.risk === "High" ? "Medium" : "Low";
    tailText = base.tail === "Low" ? "Medium" : (base.tail === "Medium" ? "High" : "Extreme");
  }
  
  const costVal = base.cost;
  const salesVal = base.sales * salesMult;
  
  const fcCost = document.getElementById("fc-cost");
  const fcTime = document.getElementById("fc-time");
  const fcSales = document.getElementById("fc-sales");
  const fcTail = document.getElementById("fc-tail");
  const fcRisk = document.getElementById("fc-risk");

  if (fcCost) fcCost.textContent = `£${(costVal / 1000000).toFixed(1)}M`;
  if (fcTime) fcTime.textContent = base.time;
  if (fcSales) fcSales.textContent = `£${(salesVal / 1000000).toFixed(1)}M`;
  if (fcTail) fcTail.textContent = tailText;
  if (fcRisk) fcRisk.textContent = riskText;
  
  // Reset classes on cards
  const cards = [fcCost, fcTime, fcSales, fcTail, fcRisk];
  cards.forEach(c => {
    if (c && c.parentElement) {
      c.parentElement.className = "forecast-metric-card";
    }
  });
  
  // Apply colors
  if (fcRisk && fcRisk.parentElement) {
    if (riskText.includes("High") || riskText.includes("Extreme")) {
      fcRisk.parentElement.classList.add("downside");
    } else if (riskText.includes("Low")) {
      fcRisk.parentElement.classList.add("upside");
    }
  }
  
  if (fcSales && fcSales.parentElement) {
    if (multiplier === "optimistic") {
      fcSales.parentElement.classList.add("upside");
    } else if (multiplier === "pessimistic") {
      fcSales.parentElement.classList.add("downside");
    }
  }
}
