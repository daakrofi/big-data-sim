/* app.js - Highland Studios Interactive Big Data Analytics Workspace */

// --- 1. CONFIGURATION & PORTAL DATA ---

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

const ADMIN_PASSCODE = "admin1991";
const REVOKED_ACCESS_MESSAGE = "Thanks for playing. Access has been revoked for this session.";

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
    name: "Open-World Street Sports",
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
    description: "Aggregated market-wide search index scores across game genres, gameplay mechanics, competitor titles, monetization concerns, and platform terms over the past 12 months.",
    format: "Structured time-series index",
    owner: "External marketing analytics vendor",
    availability: "Immediate",
    refresh: "Weekly",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Identifies current consumer category volume)",
    limitations: "Search volume reflects curiosity and hype but does not guarantee purchase conversion. Highly susceptible to short-term viral events and competitor announcement spikes.",
    questions: "What are consumers searching for across the wider games market, and which genre categories show specific feature intent?",
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
    name: "Market Search Query Dataset (1,500 Rows)",
    description: "Anonymized search-query sample covering wider game-market demand, competitor research, platform-specific discovery, and a smaller subset of queries that reached Highland-owned pages.",
    format: "Structured CSV",
    owner: "Search Intelligence Vendor",
    availability: "Immediate",
    refresh: "Daily",
    cost: 0,
    delay: 0,
    analyticalUse: "Descriptive (Captures exact user search intent)",
    limitations: "Search engines redact a large portion of organic query keywords due to privacy policies. Owned-site clickthrough is included but should not be mistaken for the full market.",
    questions: "Which broader genre, competitor, platform, and feature searches show actionable player intent?",
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

// Simulated Slack communications script (five-day archive)
const SLACK_USERS = {
  Sarah: { role: "Executive Producer", avatarClass: "avatar-pm" },
  Dave: { role: "Lead Game Designer", avatarClass: "avatar-des" },
  Marcus: { role: "Technical Director", avatarClass: "avatar-eng" },
  Elena: { role: "Lead Programmer", avatarClass: "avatar-eng" },
  Priya: { role: "Senior Simulation Engineer", avatarClass: "avatar-eng" },
  Tom: { role: "Backend Services Lead", avatarClass: "avatar-eng" },
  Ben: { role: "QA Automation Lead", avatarClass: "avatar-eng" },
  Aisha: { role: "Associate Producer", avatarClass: "avatar-pm" },
  Chloe: { role: "Marketing Director", avatarClass: "avatar-mkt" },
  Jamal: { role: "Market Data Analyst", avatarClass: "avatar-mkt" },
  Nina: { role: "User Acquisition Manager", avatarClass: "avatar-mkt" },
  Omar: { role: "Brand Partnerships Lead", avatarClass: "avatar-mkt" },
  Mia: { role: "Community Manager", avatarClass: "avatar-mkt" },
  Victoria: { role: "VP of Product Strategy", avatarClass: "avatar-exe" }
};

const slackMessage = (sender, time, text) => ({
  sender,
  role: SLACK_USERS[sender].role,
  avatarClass: SLACK_USERS[sender].avatarClass,
  time,
  text
});

const SLACK_COMMUNICATIONS = {
  "general": [
    slackMessage("Sarah", "Mon 09:00", "Morning, strategy task force. This week is about narrowing the next Highland project direction into a defensible board recommendation, not just picking the idea we personally like most."),
    slackMessage("Victoria", "Mon 09:07", "Reminder from the parent-company side: external analytics spend is capped at £10k. Every dataset request needs a clear decision use. Please do not buy broad reports just because they look useful."),
    slackMessage("Dave", "Mon 09:14", "I am putting the candidate game types into a design comparison doc. The big question for me is whether we want a familiar production path or a project that changes what Highland can become."),
    slackMessage("Chloe", "Mon 09:22", "Marketing will map each concept against search demand, creator content, and parent-company audience overlap. Those are different questions, so one dashboard will not answer all of them."),
    slackMessage("Marcus", "Mon 09:31", "Engineering will keep a capability register in #dev-team. I want the board pack to distinguish market upside from build confidence. They are not the same thing."),
    slackMessage("Aisha", "Mon 09:52", "I am tracking ownership for each evidence request. If anyone needs raw CSV support, send me the file name and the exact decision question it is meant to answer."),
    slackMessage("Sarah", "Mon 10:18", "Good framing. Please flag assumptions in plain language. The board reviewers should be able to see what each team believes, what we know, and where we are still estimating."),
    slackMessage("Chloe", "Mon 11:04", "I will also tag every marketing claim as volume, intent, channel fit, or conversion risk. Otherwise the evidence gets blended into one vague 'market says yes' paragraph."),
    slackMessage("Dave", "Mon 13:25", "Design will do the same for player fantasy, content pipeline, progression, social loop, and cuttable features. If the idea cannot survive feature cuts, it is not defined enough."),
    slackMessage("Victoria", "Mon 15:40", "The board will challenge any recommendation that relies only on a trend report. They will ask: does Highland have the systems, people, brand permission, and channel support to execute?"),

    slackMessage("Sarah", "Tue 08:55", "Day two priority: request only the reports that let us test conflicting claims. We already know every candidate direction has a sales story. We need evidence that separates them."),
    slackMessage("Chloe", "Tue 09:10", "Search and wishlist data should arrive by lunch if approved. I am especially interested in keyword specificity, not just volume. 'life sim' by itself is not a strategy."),
    slackMessage("Dave", "Tue 09:24", "Design note: the street-sports concept should not be treated as 'a bigger skate game'. If it works, it is a wider street sports platform with movement, identity, and social space."),
    slackMessage("Marcus", "Tue 09:41", "Agree, but the word 'platform' raises support expectations. Larger social worlds need moderation, server uptime, seasonal tools, and production support after launch."),
    slackMessage("Victoria", "Tue 11:05", "Parent-company stakeholders are already asking which concepts can travel through streaming, fashion, short-form creator clips, and licensed talent. Racing is not impossible, but it is narrower."),
    slackMessage("Marcus", "Tue 12:34", "Please do not let channel fit become a proxy for build readiness. A concept can be easy to market and still be hard to ship."),
    slackMessage("Sarah", "Tue 14:20", "Please keep discussion civil around the LifeSpace history. It matters, but we need to treat it as evidence, not folklore."),
    slackMessage("Elena", "Tue 16:12", "Worth noting for the full group: past technical incidents were not just 'bugs'. Some were architectural constraints. That distinction matters for any reboot proposal."),

    slackMessage("Sarah", "Wed 09:02", "Midweek checkpoint. We now have enough preliminary evidence to avoid ranking purely by expected revenue. Please start noting what data you still need before Friday."),
    slackMessage("Chloe", "Wed 09:17", "Marketing readout so far: customization and self-expression are showing up repeatedly across search, community, and parent-company overlap. That supports more than one candidate direction, so we need specificity."),
    slackMessage("Dave", "Wed 09:33", "From design, the difference is player fantasy. Life sim is about everyday agency and systems depth. Open-world street sports is about identity, movement, and public performance."),
    slackMessage("Marcus", "Wed 10:04", "From engineering, the difference is state complexity. Movement and customization are manageable extensions. Persistent NPC life simulation is a different order of system risk."),
    slackMessage("Chloe", "Wed 10:42", "From marketing, the difference is proof. Street sports proof can be visual in a ten-second clip. Life sim proof depends on trust in the invisible systems behind the clip."),
    slackMessage("Victoria", "Wed 11:20", "I want the pack to show that strong evidence can point in different directions depending on the decision criterion. Do not flatten this into a single obvious answer."),
    slackMessage("Sarah", "Wed 15:35", "Agreed. The final board pack should reward trade-off analysis, not whichever department can point to the biggest chart number."),

    slackMessage("Sarah", "Thu 08:48", "Thursday focus: convert evidence into board language. Each candidate direction needs a short case for, a short case against, and the unresolved question that would decide it."),
    slackMessage("Chloe", "Thu 09:13", "For a racing follow-up, the case for is predictable launch conversion. The case against is weak lifestyle amplification and shallow long-tail marketing."),
    slackMessage("Dave", "Thu 09:26", "For a straight skateboarding sequel, the case for is morale and production efficiency. The case against is whether it is ambitious enough for the parent-company brief."),
    slackMessage("Marcus", "Thu 09:44", "For the street-sports concept, the case for is reuse of proven movement tech plus a bigger social/customization opportunity. The case against is scope control."),
    slackMessage("Elena", "Thu 10:02", "For a life-simulation reboot, the case for is genre upside and capacity-building. The case against is whether the required systems foundation can be made credible before greenlight."),
    slackMessage("Dave", "Thu 10:44", "For the board language, I would avoid saying 'safe' or 'risky' as shorthand. We need to say safe against what, risky in which system, and recoverable by which milestone."),
    slackMessage("Victoria", "Thu 14:10", "For the motorsport management concept, the case for is an efficient niche strategy. The case against is whether it is too small for the corporate-wide growth objective."),
    slackMessage("Sarah", "Thu 16:55", "This is the structure I want in the briefing. Do not include the internal shorthand labels that make the answer feel pre-solved."),

    slackMessage("Sarah", "Fri 08:45", "Final day. Before the board dry run, please check that every department's evidence is represented fairly. No cherry-picking."),
    slackMessage("Chloe", "Fri 09:04", "I have tightened the marketing appendix. It now separates volume, specificity, creator behavior, and parent-company channel fit."),
    slackMessage("Marcus", "Fri 09:18", "Engineering appendix is updated. It separates code reuse, team familiarity, new systems complexity, and live operations burden."),
    slackMessage("Dave", "Fri 09:33", "Design appendix now has player fantasy, content pipeline, social loop, and progression model notes for each candidate direction."),
    slackMessage("Elena", "Fri 09:47", "I added a dependency note for backend staffing. Even the concepts that reuse gameplay systems may need new operations support if the community layer expands."),
    slackMessage("Victoria", "Fri 10:05", "Good. In the board dry run, I expect real disagreement. The reports should provide enough evidence for a reasoned recommendation without one department simply announcing the correct answer."),
    slackMessage("Chloe", "Fri 10:52", "Marketing will mark assumptions separately from evidence in the final pack. I do not want a confident tone hiding weak inference."),
    slackMessage("Sarah", "Fri 11:30", "Thanks, everyone. Final board pack is not a vote tally. It is a decision argument. Reviewers should be able to see what matters most and why.")
  ],
  "dev-team": [
    slackMessage("Marcus", "Mon 09:12", "Starting the technical thread here. I want a sober capability map for the candidate game types: engine fit, content tooling, live operations, QA risk, and team familiarity."),
    slackMessage("Elena", "Mon 09:18", "Current engine strengths: movement physics, replay capture, custom park tools, input feel, collision tuning, and deterministic challenge scoring. Weaknesses: large-scale autonomous agents and persistent world-state rollback."),
    slackMessage("Dave", "Mon 09:22", "Useful. For the design side, street sports can keep the movement foundation but add social hubs, character expression, and mixed traversal. It is expansion, not total reinvention."),
    slackMessage("Elena", "Mon 09:26", "I am separating 'can reuse code' from 'can reuse confidence'. The code can compile and still need new testing because the surrounding product loop changes."),
    slackMessage("Marcus", "Mon 09:30", "A racing follow-up is the cleanest technically. The racing stack already exists through Apex Circuit. Risk is mostly content volume and market differentiation, not engine feasibility."),
    slackMessage("Elena", "Mon 09:41", "A straight skateboarding sequel is also clean. Streetline Skate has the strongest tooling health in the studio. We could improve animation blending, park sharing, and console performance without rewriting core systems."),
    slackMessage("Tom", "Mon 09:58", "Server-side note: skate sequel traffic is familiar. Street sports adds social presence, inventory, matchmaking, and creator moderation. Same neighborhood, bigger house."),
    slackMessage("Marcus", "Mon 10:05", "Motorsport management is efficient but still needs management-sim UI, data tables, and season logic. It is not technically scary, but it may not use our strongest technology in a visible way."),
    slackMessage("Priya", "Mon 10:22", "I want to push back slightly on the life-sim framing. Since LifeSpace we have rebuilt save validation, added deterministic replay capture, and improved telemetry on long sessions. That does not erase the old failure, but it means we are not the same team."),
    slackMessage("Ben", "Mon 10:47", "QA agrees the tooling is better. It is still a different testing problem. Movement games fail quickly and visibly. Life sims fail after nine hours when a relationship state, schedule, and inventory migration collide."),
    slackMessage("Dave", "Mon 16:20", "Design risk for a straight skate sequel is ambition. It is buildable, but does it give the board enough growth story? Street sports is where the ambition starts to show."),
    slackMessage("Tom", "Mon 17:03", "Also, who ate my meatball sandwich from the breakroom??? It had my name on the paper bag."),

    slackMessage("Marcus", "Tue 09:05", "Looking at old LifeSpace engineering notes this morning. We should not describe the past issue as a single failure. It was a cluster: save serialization, NPC scheduling, memory pressure, and incomplete QA instrumentation."),
    slackMessage("Elena", "Tue 09:17", "The save-state issue was especially damaging because it appeared late in long sessions. Standard smoke tests did not catch it. Any reboot would need long-run automated simulation tests from the start."),
    slackMessage("Dave", "Tue 09:34", "Would a smaller Life Sim slice avoid that? Fewer NPCs, smaller neighborhoods, more focus on decorating and relationships?"),
    slackMessage("Marcus", "Tue 09:45", "Maybe, but then the design promise changes. A life sim with shallow simulation will be compared harshly with the market leader. The product expectation is already high."),
    slackMessage("Priya", "Tue 09:56", "The rebuttal is that a modern life sim does not need to simulate every citizen at all times. We can use scoped autonomy, event budgets, and visible relationship beats. We have learned how to instrument the hidden systems."),
    slackMessage("Elena", "Tue 10:02", "Also mod support multiplies edge cases. If players can add items, routines, relationships, and rooms, our validation tools need to be much stronger than last time."),
    slackMessage("Ben", "Tue 10:24", "If we go near life simulation, I want a test farm running synthetic households every night. Not a token soak test. Thousands of seed states, mod fixtures, save/load loops, and crash triage before anyone says alpha."),
    slackMessage("Tom", "Tue 10:51", "Backend capacity is also not theoretical. A life sim with sharing, galleries, households, mods, and screenshots needs content moderation queues and storage policies from day one."),
    slackMessage("Marcus", "Tue 11:18", "I want a proof milestone for save integrity that runs longer than normal QA sessions. Long-session bugs are exactly the kind that look invisible until public launch."),
    slackMessage("Priya", "Tue 12:07", "I am not saying greenlight a full life sim tomorrow. I am saying a reboot could be how Highland builds capacity into a genre that is bigger and more durable than our current lane."),
    slackMessage("Marcus", "Tue 12:33", "That is the best argument for it. My hesitation is whether the capacity build should happen inside the flagship decision, where failure would be expensive and public."),
    slackMessage("Marcus", "Tue 13:25", "For street sports, the risk is different. Server capacity, moderation, city streaming, and activity variety. Hard, but closer to problems we have solved before."),
    slackMessage("Dave", "Tue 15:48", "That helps the board discussion. Life Sim risk is systems depth. Street Sports risk is scope and service design. Racing risk is strategic, not build feasibility."),

    slackMessage("Elena", "Wed 08:52", "I ran a quick dependency sketch. Street sports could reuse character customization, replay capture, park object placement, controller feel, and challenge scoring from Streetline Skate."),
    slackMessage("Marcus", "Wed 09:11", "What would be new for street sports?"),
    slackMessage("Elena", "Wed 09:14", "Larger streaming city zones, multiplayer social hub rules, mixed traversal animation, event matchmaking, creator moderation queue, and a more robust avatar inventory service."),
    slackMessage("Dave", "Wed 09:36", "Those new systems support the fantasy directly, though. If players can show style, move through the city, and share clips, the tech becomes visible."),
    slackMessage("Marcus", "Wed 09:48", "Visible tech is good when it works. It is also visible when it fails. The first vertical slice needs ugly internal telemetry, not just a polished demo route."),
    slackMessage("Marcus", "Wed 10:02", "That is why I am more comfortable with street sports than a pure life-simulation reboot. The technical extensions map to things Highland already understands."),
    slackMessage("Priya", "Wed 10:28", "I hear that. But if we only choose what maps neatly to current tooling, we keep proving the same capability. The life-sim case is not nostalgia for LifeSpace. It is a deliberate capacity bet."),
    slackMessage("Ben", "Wed 10:39", "Capacity bet is fine if the plan includes boring guardrails: data migrations, fixture libraries, crash dashboards, memory budgets, rollback tests, and a kill switch for broken custom assets."),
    slackMessage("Elena", "Wed 11:40", "Still not cheap. Larger world plus social tools means more QA permutations. We should not call it low risk."),
    slackMessage("Tom", "Wed 14:16", "Minor interruption: facilities says the sandwich situation is not an IT ticket. Please stop assigning it to backend."),
    slackMessage("Marcus", "Wed 15:05", "Agreed. Street sports is moderate-high risk with controllable scope. Life simulation is high risk unless the studio commits to a multi-year capacity plan."),

    slackMessage("Marcus", "Thu 09:08", "Draft technical scoring: straight skate sequel highest confidence, racing close behind, street sports feasible with scope discipline, motorsport management feasible but less strategic, life simulation highest capability gap."),
    slackMessage("Sarah", "Thu 09:20", "Can you make sure that does not read like engineering vetoing ambition? The board needs to understand upside and risk together."),
    slackMessage("Marcus", "Thu 09:31", "Fair. I will phrase it as 'investment required for credible execution', not 'do not do this'."),
    slackMessage("Priya", "Thu 09:44", "Please include that life simulation also creates new reusable capacity: agent scheduling, relationship-state tooling, household persistence, creator-object validation, and long-session telemetry. Those could serve more than one future product."),
    slackMessage("Elena", "Thu 10:14", "For life simulation, credible execution means prototype milestones before full greenlight: relationship scheduler, save integrity under load, mod validation, and long-session stability."),
    slackMessage("Marcus", "Thu 10:38", "Add hiring lead time to that. Senior simulation engineers are not sitting around waiting for us, and contractors will not solve architecture ownership."),
    slackMessage("Dave", "Thu 11:02", "For street sports, credible execution means a vertical slice with one dense city district, two movement types, avatar styling, and one social challenge loop."),
    slackMessage("Ben", "Thu 13:22", "For life simulation, I would not accept a pretty slice without data. Show me a household that survives 300 in-game days, multiple save migrations, and mod conflicts."),
    slackMessage("Marcus", "Thu 14:35", "Good distinction. Street sports can be proven with a gameplay slice. Life simulation needs a systems reliability slice."),
    slackMessage("Elena", "Thu 16:18", "Please also note team morale. People are excited by ambitious ideas, but they get nervous when plans ignore past tooling pain."),

    slackMessage("Marcus", "Fri 08:50", "Final engineering appendix is uploaded. It includes a capability matrix, required proof milestones, and hidden dependencies for each candidate direction."),
    slackMessage("Elena", "Fri 09:07", "I added a note that previous LifeSpace lessons can be assets if treated seriously. The studio did learn, but the tooling has to change."),
    slackMessage("Dave", "Fri 09:29", "That is a useful nuance. Reviewers should not read the history as 'never attempt the genre'. It is a capacity-building question."),
    slackMessage("Priya", "Fri 09:36", "I will say it plainly in the appendix: a life-simulation reboot is a stretch, but it is not fantasy. The technical path is expensive, staged, and measurable."),
    slackMessage("Elena", "Fri 09:51", "I also added the uncomfortable part: capacity-building is not free just because it is strategically attractive. It changes hiring, QA, support, and schedule assumptions."),
    slackMessage("Marcus", "Fri 10:11", "Exactly. The wrong answer is pretending the issue is only market demand. The right debate is whether upside justifies the investment and risk controls."),
    slackMessage("Tom", "Fri 10:28", "Backend appendix now separates launch services from long-tail services. That should stop people assuming a social feature is just a menu button."),
    slackMessage("Ben", "Fri 10:36", "QA appendix includes failure modes by genre. I made the life-sim row long on purpose. It is not a veto, it is a reminder that invisible systems need visible gates."),
    slackMessage("Sarah", "Fri 10:44", "This channel now has the strongest evidence for capability fit. Thank you. It will force decision-makers to compare production reality with market temptation.")
  ],
  "marketing": [
    slackMessage("Chloe", "Mon 09:30", "Marketing thread starts here. I am separating demand signals into four buckets: search trend, wishlist behavior, creator ecosystem, and parent-company channel fit."),
    slackMessage("Sarah", "Mon 09:35", "Please keep the distinction visible. In previous review cycles, teams treated search volume as if it automatically meant sales."),
    slackMessage("Chloe", "Mon 09:44", "Exactly. Search volume tells us curiosity. Keyword specificity tells us intent. Wishlist growth tells us pre-purchase pull. Creator behavior tells us whether the game can keep producing conversation."),
    slackMessage("Dave", "Mon 10:12", "From design, I would expect Life Sim to win on tutorial/story content, Street Sports to win on clips and identity, Racing to win on specialist comparison videos."),
    slackMessage("Chloe", "Mon 10:18", "I am also tracking negative search modifiers. 'broken', 'DLC', 'cash grab', and 'no mods' are useful because they tell us where a promise could collapse."),
    slackMessage("Chloe", "Mon 10:25", "That matches my hypothesis. The risk is that Racing has clean buyers but poor broader amplification. It sells to a known audience but may not activate the parent-company ecosystem."),
    slackMessage("Jamal", "Mon 11:06", "Search dashboard now includes survival crafting, RPG adventure, strategy management, and shooter/live-service fatigue terms. We should not make the market view only about Highland's current lanes."),
    slackMessage("Nina", "Mon 11:32", "Paid acquisition benchmarks are messy by genre. Shooters buy installs like a subscription business, cozy sims often rely on community trust, and racing depends heavily on storefront featuring plus specialist media."),
    slackMessage("Mia", "Mon 12:10", "Community note: modding questions are coming up across life sim, survival crafting, strategy, and skate. It is not just a sim audience demand anymore."),
    slackMessage("Victoria", "Mon 14:10", "Parent-company channels are most useful when a game gives them lifestyle hooks. Fashion, music, rooms, social identity, and creator moments travel better than technical handling claims."),
    slackMessage("Omar", "Mon 15:04", "Brand partnership fit is strongest when partners can see themselves in the player fantasy. Apparel can understand avatars and street culture. Automotive can understand racing, but the audience is narrower."),

    slackMessage("Chloe", "Tue 09:08", "First search export is in. 'life sim alternative', 'mod friendly life game', and 'custom home social sim' are all rising. But the queries also show distrust around stability and DLC pricing."),
    slackMessage("Sarah", "Tue 09:21", "So Life Sim demand is real but not clean."),
    slackMessage("Chloe", "Tue 09:24", "Yes. Players want a competitor, but they are alert to quality. A weak launch would be punished quickly because the audience has recent examples of disappointment."),
    slackMessage("Dave", "Tue 09:50", "What about street-sports terms?"),
    slackMessage("Chloe", "Tue 10:02", "'open world skate bike parkour game', 'custom street sports avatar', and 'multiplayer trick city' are smaller than life sim terms, but much more feature-specific than I expected."),
    slackMessage("Jamal", "Tue 10:24", "The surprise is survival crafting. 'base automation multiplayer' and 'private server co-op' are not directly Highland, but they are useful benchmarks for persistent community demand."),
    slackMessage("Nina", "Tue 10:39", "Install bids are also calmer in strategy/management than in shooter/live service. Lower reach, but less auction pressure and more efficient retargeting."),
    slackMessage("Victoria", "Tue 11:18", "Feature-specific language is useful. It means players can describe what they want, not just a genre label."),
    slackMessage("Dave", "Tue 13:05", "That wording also gives design a constraint. If players say avatar, city, movement, and multiplayer, then the pitch has to make those pieces feel connected."),
    slackMessage("Mia", "Tue 14:16", "Creator DMs keep using the phrase 'I want to make a place'. That applies to houses, parks, servers, and custom scenarios. Worth noting as a broader UGC pattern."),
    slackMessage("Chloe", "Tue 15:42", "Racing is comparatively stable. Strong terms around 'career mode', 'licensed cars', and 'wheel support', but low growth and lower lifestyle crossover."),
    slackMessage("Omar", "Tue 16:08", "Small practical thing: if we brief partners on street sports, call it movement and identity first, not 'multi-sport'. Multi-sport sounds like a licensed sports bundle."),

    slackMessage("Chloe", "Wed 08:58", "Creator ecosystem report is interesting. Racing videos spike around launch, reviews, and competitive events. Simulation and customization videos keep producing after launch because players generate examples."),
    slackMessage("Sarah", "Wed 09:06", "Is that why stream hours look so different from units sold?"),
    slackMessage("Chloe", "Wed 09:14", "Exactly. A game can sell well but produce limited repeatable content. The parent company cares about repeatable cultural presence, not only launch week."),
    slackMessage("Jamal", "Wed 09:29", "Pricing curves show the same pattern. Annual sports and racing discount earlier. Simulation, strategy, and survival titles hold price longer when expansions or community content keep the funnel warm."),
    slackMessage("Dave", "Wed 09:47", "Open-world street sports could produce trick clips, outfit reveals, city challenges, and creator route competitions. That sounds closer to repeatable content than a fixed track racer."),
    slackMessage("Chloe", "Wed 10:15", "Yes, but it needs clarity. If the pitch sounds like every youth-culture feature at once, marketing cannot explain it. One strong fantasy beats five vague hooks."),
    slackMessage("Nina", "Wed 11:02", "Paid user acquisition report is being rewritten into genre bands. The first draft was too thin. We need CPI, channel mix, paid share, and payback logic, not a few headline numbers."),
    slackMessage("Victoria", "Wed 13:32", "Good line. Add that to the board notes: 'channel fit requires product clarity'."),
    slackMessage("Chloe", "Wed 14:08", "I am adding a channel matrix that separates paid media, owned editorial, creator outreach, commerce tie-ins, and community programming. They should not be treated as interchangeable."),
    slackMessage("Chloe", "Wed 16:05", "Parent-company overlap report also favors customization-led concepts. It does not automatically pick a project, but it weakens a pure racing recommendation."),
    slackMessage("Mia", "Wed 16:42", "Also someone left six empty cold brew cans in the creator room and no one is confessing. This is not a data point, just annoying."),

    slackMessage("Chloe", "Thu 09:03", "Building the marketing scorecard now. Life simulation wins addressable audience and long-tail content if execution is strong. Street sports wins cross-channel clarity with lower explanation cost."),
    slackMessage("Sarah", "Thu 09:19", "What does 'lower explanation cost' mean for the board?"),
    slackMessage("Chloe", "Thu 09:28", "It means owned media can show the value quickly: avatar, movement, social space, trick, outfit, clip. Life Sim can also show value, but the promise depends heavily on invisible systems depth."),
    slackMessage("Jamal", "Thu 09:44", "For completeness: RPG adventure has strong audience pull but crowded launch competition. Strategy/management has excellent retention but lower broad cultural reach. Shooter/live service has spend intensity and sentiment headwinds."),
    slackMessage("Dave", "Thu 10:00", "That is helpful. The board should not just ask 'which genre is bigger?' It should ask which concept can be communicated credibly."),
    slackMessage("Victoria", "Thu 10:42", "Please include the inverse risk too: a concept that is easy to explain may still be too small, and a large category may still be worth pursuing if proof gates are credible."),
    slackMessage("Chloe", "Thu 11:22", "The straight skate sequel has very high advocacy among existing fans. The question is whether that advocacy is enough for the corporate growth target."),
    slackMessage("Nina", "Thu 12:05", "I would not call racing cheap to market. The audience is known, but auction competition around motorsport launch windows gets expensive fast."),
    slackMessage("Omar", "Thu 13:18", "Streetwear partners are more curious about street sports than skate sequel because it sounds less like a single discipline. But they also asked what the actual game loop is. That is the product clarity issue."),
    slackMessage("Victoria", "Thu 14:48", "And motorsport management?"),
    slackMessage("Chloe", "Thu 15:02", "Efficient but narrow. Motorsport management creates thoughtful content, but not much broad lifestyle energy. It is probably a disciplined smaller bet rather than a flagship answer."),
    slackMessage("Mia", "Thu 16:11", "Community risk note: if we mention modding publicly, players will hear it as a promise. We need exact wording before any creator brief leaves the building."),

    slackMessage("Chloe", "Fri 08:55", "Final marketing readout uploaded. I avoided ranking by one metric. The appendix now shows demand volume, intent specificity, creator repeatability, channel fit, and conversion risk."),
    slackMessage("Sarah", "Fri 09:12", "Good. Which evidence do you think the room is most likely to overuse?"),
    slackMessage("Chloe", "Fri 09:18", "The biggest market chart. It is tempting, but the market chart alone ignores production credibility and launch trust."),
    slackMessage("Victoria", "Fri 09:40", "That is exactly why the Slack archive matters. Internal stakeholders should complicate the neat external reports."),
    slackMessage("Chloe", "Fri 09:58", "I added three separate rows for market size, market access, and market credibility. They point in different directions, which is the real issue."),
    slackMessage("Jamal", "Fri 10:02", "Dashboard labels are updated so search, pricing, paid acquisition, and UGC are visibly market-wide. Highland examples are included, but they are not the whole market."),
    slackMessage("Dave", "Fri 10:05", "Marketing makes the street-sports and life-simulation cases both plausible, for different reasons. That is a stronger decision environment than a single obvious winner."),
    slackMessage("Nina", "Fri 10:21", "Paid acquisition note: if the recommendation depends on buying the market, it is weak. The better story is where paid media supports a product truth that owned channels and creators can repeat."),
    slackMessage("Omar", "Fri 10:29", "Partnership appendix is done. I removed anything that sounded like guaranteed synergy. Partners amplify evidence; they do not manufacture it."),
    slackMessage("Mia", "Fri 10:34", "Community appendix is done too. It separates creator enthusiasm from player support load. Those are both community signals, but they mean different things operationally."),
    slackMessage("Chloe", "Fri 10:37", "Agreed. My recommendation to the task force would be: show which metric you prioritize, then justify why that metric matters for Highland now.")
  ],
  "executive": [
    slackMessage("Victoria", "Mon 09:45", "Executive thread. The parent company wants a recommendation that balances growth, brand leverage, production credibility, and long-term portfolio value."),
    slackMessage("Sarah", "Mon 09:52", "The team understands. I am trying to prevent the board pack from becoming 'safe direction versus exciting direction'. The reality is more complex."),
    slackMessage("Victoria", "Mon 10:05", "Correct. A safe project can be strategically weak. An ambitious project can be commercially right but operationally reckless. The recommendation needs to name that trade-off."),
    slackMessage("Chloe", "Mon 11:12", "Do you want parent-company synergy treated as a hard requirement or a multiplier?"),
    slackMessage("Sarah", "Mon 11:18", "I would also treat timing as a multiplier. The best idea on paper can still be wrong if it collides with hiring lead time or a crowded launch window."),
    slackMessage("Victoria", "Mon 11:25", "A multiplier. The board will not greenlight a bad game because it fits a fashion campaign. But if two candidate directions are close, corporate reach can matter."),
    slackMessage("Marcus", "Mon 15:18", "Engineering asks that capability fit also be treated as a multiplier, not a veto. We can grow capacity, but the board should price that growth honestly."),

    slackMessage("Victoria", "Tue 08:58", "Board concern this morning: if Highland chooses a racing sequel, what makes it more than a predictable but declining revenue event?"),
    slackMessage("Sarah", "Tue 09:16", "The answer would be production certainty, known audience, and less organizational disruption. The weakness is long-tail engagement."),
    slackMessage("Victoria", "Tue 09:40", "Good. If Highland chooses a skateboarding sequel, what makes it more than operational comfort?"),
    slackMessage("Dave", "Tue 10:05", "Existing fan love, team morale, strong mechanics, and clear quality bar. Weakness is whether it meaningfully expands Highland's strategic position."),
    slackMessage("Victoria", "Tue 10:38", "If Highland chooses open-world street sports, what is the board challenge?"),
    slackMessage("Sarah", "Tue 10:55", "Scope discipline. It has a strong bridge from current capability to a broader audience, but it needs a precise product definition."),
    slackMessage("Marcus", "Tue 11:20", "And it needs operational humility. Social features sound like audience upside, but they create moderation, support, uptime, and abuse-prevention responsibilities."),
    slackMessage("Victoria", "Tue 14:30", "If Highland chooses Life Sim, the challenge is proof of capability-building. The board will want to know what must be true before full production begins."),

    slackMessage("Victoria", "Wed 09:05", "I reviewed the first analytics packet. Biggest issue: some evidence favors market size, some favors studio capability, some favors corporate amplification. This is useful for the board discussion."),
    slackMessage("Sarah", "Wed 09:18", "Agreed. I am making the decision worksheet ask teams to identify which evidence they weighted most heavily."),
    slackMessage("Chloe", "Wed 09:46", "Parent-company overlap is not neutral. It clearly benefits customization-led concepts. That should create pressure against a default racing sequel."),
    slackMessage("Marcus", "Wed 10:11", "Technical history is also not neutral. It clearly pressures the Life Sim reboot. That should create friction against simply following the biggest market."),
    slackMessage("Victoria", "Wed 11:02", "Exactly. The best recommendations will explain how that conflict was resolved."),
    slackMessage("Chloe", "Wed 11:34", "I can support a recommendation that names uncertainty honestly. I cannot support a recommendation that hides uncertainty behind one composite score."),
    slackMessage("Dave", "Wed 15:15", "Design is somewhere between those poles. Street sports may be the compromise, but only if it avoids becoming vague."),

    slackMessage("Victoria", "Thu 09:00", "Dry-run prompt: 'Which direction gives Highland the best chance to grow without losing operational control?' That may be more useful than 'which direction has the largest opportunity?'"),
    slackMessage("Sarah", "Thu 09:28", "That phrasing should make reviewers compare ambition and feasibility."),
    slackMessage("Marcus", "Thu 10:02", "It also makes them define operational control. For engineering, that means scope, milestones, testability, and support commitments."),
    slackMessage("Chloe", "Thu 10:35", "For marketing, it means a concept that can be explained repeatedly through channels we actually have, not just a large theoretical audience."),
    slackMessage("Dave", "Thu 11:04", "For design, it means a player fantasy that is sharp enough to guide feature cuts."),
    slackMessage("Sarah", "Thu 11:31", "For production, it means milestones that prove the hardest assumption before spending accelerates. I want that sentence in the final readout."),
    slackMessage("Victoria", "Thu 14:12", "Please include those definitions in the internal conversation. They make the evidence read like a real company thinking through a decision."),

    slackMessage("Victoria", "Fri 08:40", "Final executive position: we are not asking for unanimity. We are asking for a defensible recommendation with acknowledged uncertainty."),
    slackMessage("Sarah", "Fri 09:02", "The board pack now has enough disagreement to support that. The reports provide evidence; the Slack channels provide organizational interpretation."),
    slackMessage("Chloe", "Fri 09:24", "Marketing will not claim any direction is risk-free. Even street sports needs sharper messaging and proof that its audience is not just a bundle of adjacent trends."),
    slackMessage("Marcus", "Fri 09:45", "Engineering will not claim ambitious directions are impossible. We will state the proof gates and capacity needs."),
    slackMessage("Sarah", "Fri 09:58", "I will write the final recommendation section so dissent is visible. The board needs to see why a rejected path was still plausible."),
    slackMessage("Dave", "Fri 10:15", "Design will emphasize concept coherence. Bigger is not automatically better."),
    slackMessage("Victoria", "Fri 11:00", "Good. This is exactly the kind of ambiguity the recommendation needs to work through: data is essential, but judgment still decides how it is weighted.")
  ]
};

const MACRO_REPORT_META = {
  "macro-general": {
    title: "General Macroeconomic Report",
    pdf: "reports/macro/general_macroeconomic_report.pdf"
  },
  "macro-trends": {
    title: "Games Industry Trends",
    pdf: "reports/macro/games_industry_trends.pdf"
  },
  "macro-consumer": {
    title: "Consumer Spending & Platforms",
    pdf: "reports/macro/consumer_spending_platforms.pdf"
  },
  "macro-production": {
    title: "Technology & Production Costs",
    pdf: "reports/macro/technology_production_costs.pdf"
  },
  "macro-competitors": {
    title: "Competitor Pipeline",
    pdf: "reports/macro/competitor_pipeline.pdf"
  }
};

// Macro environment reports
const MACRO_REPORTS = {
  "macro-general": `
    <h2>General Macroeconomic Report</h2>
    <div class="macro-report-meta"><span>Published: Q1 2026</span><span>Source: Global Media Strategy Group</span><span>Data window: Jan 2024-Mar 2026</span><span>Regions: UK, US, EU5</span></div>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Executive Summary</h3>
    <p>The global entertainment market is navigating a period of selective consumer spending rather than outright demand decline. Disposable income remains pressured by food, rent, transport, and energy costs, and players are becoming more deliberate about premium purchases. Consumers are buying fewer full-price games overall, but they are spending more hours inside the titles that earn trust quickly and continue to offer social, creative, or mastery-based reasons to return.</p>
    <p>This is creating a split market. Premium titles with short campaign loops and limited community extension face higher launch-week pressure. By contrast, genres with durable player expression, moddable systems, creator content, competitive mastery, or cooperative identity loops are better positioned to convert one purchase into months of engagement. The macro environment therefore favors games that can justify price through repeatable use rather than spectacle alone.</p>
    <div class="macro-kpi-grid">
      <div class="macro-kpi"><strong>7.8%</strong><span>average decline in full-price launch purchases among price-sensitive console households</span></div>
      <div class="macro-kpi"><strong>+21%</strong><span>growth in average hours spent in players' top two games year over year</span></div>
      <div class="macro-kpi"><strong>64%</strong><span>surveyed players waiting for reviews before buying unfamiliar premium games</span></div>
      <div class="macro-kpi"><strong>3.4x</strong><span>retention advantage for games with robust user-generated content ecosystems</span></div>
    </div>
    <h3>Key Macro Forces</h3>
    <ul>
      <li><strong>Cost-of-living pressure:</strong> Players are consolidating leisure spend into fewer trusted games. This benefits titles that can become social or creative routines, and it weakens projects that depend on a single campaign completion cycle.</li>
      <li><strong>Subscription service plateau:</strong> Subscription growth is flattening across major platforms. Day-one inclusion can still drive reach, but it is less effective as a substitute for product-market fit, community trust, and post-launch engagement.</li>
      <li><strong>Hardware lifecycle maturity:</strong> Current console hardware is now mature. Developers can win through optimization, polish, input feel, and content cadence rather than large graphics pipeline reinvention.</li>
      <li><strong>Creator-led discovery:</strong> Short-form video and community creators are becoming a mainstream discovery path. Genres that generate visible, player-authored moments receive more repeatable unpaid promotion.</li>
    </ul>
    <h3>Genre Exposure</h3>
    <div class="macro-bars">
      <div class="macro-bar"><span>Life / cozy simulation</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:86%"></span></span><strong>86</strong></div>
      <div class="macro-bar"><span>Survival crafting</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:78%"></span></span><strong>78</strong></div>
      <div class="macro-bar"><span>Action sports</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:71%"></span></span><strong>71</strong></div>
      <div class="macro-bar"><span>RPG / adventure</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:69%"></span></span><strong>69</strong></div>
      <div class="macro-bar"><span>Racing / driving</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:48%"></span></span><strong>48</strong></div>
      <div class="macro-bar"><span>Strategy / management</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:44%"></span></span><strong>44</strong></div>
    </div>
    <h3>Audience Quotes</h3>
    <div class="macro-quote-grid">
      <div class="macro-quote"><p>"I buy fewer new games now, but if one becomes my main hangout I will keep spending time in it."</p><span>UK player, 24, console and PC</span></div>
      <div class="macro-quote"><p>"I need to know a premium game has depth before paying full price. Reviews and creator clips matter."</p><span>US player, 31, PC</span></div>
      <div class="macro-quote"><p>"Cosmetics are fine if the base game is generous and the tools are good. I do not want another empty store page."</p><span>EU player, 19, console</span></div>
      <div class="macro-quote"><p>"A good community can make a game feel cheaper because I keep coming back to see what people made."</p><span>UK player, 27, PC</span></div>
    </div>
    <h3>Strategic Recommendation</h3>
    <p>Studios should avoid judging opportunities by total addressable market alone. The more useful macro question is whether a genre can create trusted long-term participation under household spending pressure. Concepts with player-authored content, strong identity expression, repeatable mastery, or mod-friendly ecosystems are structurally advantaged, provided the production plan is disciplined enough to deliver those loops reliably.</p>
  `,
  "macro-trends": `
    <h2>Games Industry Trends</h2>
    <div class="macro-report-meta"><span>Published: April 2026</span><span>Source: IDG Research Partner Group</span><span>Sample: 38 publishers, 214 launches</span><span>Scope: Premium and live-service PC/console</span></div>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Market Direction</h3>
    <p>The industry is moving away from a simple premium-versus-live-service split. The strongest performers increasingly combine clear upfront value with a credible long tail: modding, creator challenges, expansions, social systems, seasonal events, ranked mastery, or build-sharing communities. This creates pressure on studios to design launch products as durable ecosystems without adopting the most disliked live-service monetization patterns.</p>
    <p>Self-expression and cozy systems remain major growth areas, but they are not the only trend. Survival crafting, RPG sandboxes, sports management, tactical strategy, and extraction-style multiplayer are also showing durable engagement when their systems generate player stories. Competitive racing and traditional sports remain commercially viable but show lower organic cultural spread unless connected to esports, creator challenges, licensed talent, or unusually strong authenticity.</p>
    <h3>Key Industry Trends</h3>
    <ul>
      <li><strong>Self-expression as retention:</strong> Character tools, room building, vehicle styling, neighborhood design, team identity, and avatar fashion are functioning as retention systems rather than cosmetic side features.</li>
      <li><strong>Live-service fatigue:</strong> Players are increasingly hostile to aggressive battle passes, confusing currencies, and launch products that feel designed around storefronts. Transparent DLC, generous base content, and mod support are receiving stronger trust signals.</li>
      <li><strong>Creator loops:</strong> Streamers and short-form creators prefer games that allow high community interaction: custom builds, challenge routes, emergent failures, fashion reveals, tactical choices, and personal stories.</li>
      <li><strong>Genre hybridization:</strong> Publishers are blending sports, RPG progression, social hubs, management systems, and sandbox tools. Hybrid projects can expand audience reach, but they fail quickly when the player fantasy is unclear.</li>
    </ul>
    <h3>Momentum Index by Genre Cluster</h3>
    <table class="macro-table">
      <thead><tr><th>Genre Cluster</th><th>Momentum</th><th>Primary Driver</th><th>Main Risk</th></tr></thead>
      <tbody>
        <tr><td>Life / cozy simulation</td><td>Very high</td><td>Customization, decorating, community storytelling</td><td>Players punish instability and shallow systems</td></tr>
        <tr><td>Survival crafting</td><td>High</td><td>Co-op creativity and emergent progression</td><td>Market crowding and content cadence expectations</td></tr>
        <tr><td>Action sports / movement</td><td>High</td><td>Clip culture, identity, mastery, style</td><td>Audience size must be expanded beyond franchise fans</td></tr>
        <tr><td>RPG / adventure</td><td>High</td><td>Character attachment and long playtime</td><td>Production cost and narrative scope</td></tr>
        <tr><td>Racing / driving</td><td>Stable</td><td>Handling authenticity and known brands</td><td>Launch spike dependence and limited lifestyle reach</td></tr>
        <tr><td>Strategy / management</td><td>Stable niche</td><td>Depth, replayability, expert community</td><td>Lower mass-market visibility</td></tr>
      </tbody>
    </table>
    <h3>Audience Quotes</h3>
    <div class="macro-quote-grid">
      <div class="macro-quote"><p>"I want games where I can make something that is mine, not just unlock what everyone else gets."</p><span>UK player, 22</span></div>
      <div class="macro-quote"><p>"Battle passes make me feel late before I even start. I prefer expansions I can understand."</p><span>US player, 29</span></div>
      <div class="macro-quote"><p>"The games I watch most are the ones where every creator's playthrough looks different."</p><span>EU viewer, 20</span></div>
      <div class="macro-quote"><p>"Hybrid games are exciting, but I need to understand what I actually do minute to minute."</p><span>UK player, 34</span></div>
    </div>
  `,
  "macro-consumer": `
    <h2>Consumer Spending & Platforms</h2>
    <div class="macro-report-meta"><span>Published: Q1 2026</span><span>Source: Platform Distribution Report</span><span>Panel: 72,000 active players</span><span>Platforms: Steam, PlayStation, Xbox, Switch</span></div>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Platform Split & Monetization Mechanics</h3>
    <p>Platform behavior remains highly genre-specific. Console audiences still over-index for racing, sports, action adventure, and licensed brand experiences where controller comfort and living-room play matter. PC audiences over-index for simulation, strategy, management, modding, creator tools, and long-session customization. Switch remains relevant for cozy, family, and portable-friendly releases, but its technical constraints shape content scope.</p>
    <p>Consumer spending is also diverging by trust model. Players are more comfortable paying premium prices for polished, complete launches and more willing to buy expansions when the base game feels generous. The strongest resistance appears around paid cosmetics that arrive before meaningful content, unstable launches with premium editions, and opaque recurring monetization.</p>
    <div class="macro-kpi-grid">
      <div class="macro-kpi"><strong>81%</strong><span>PC skew for mod-heavy simulation and management titles</span></div>
      <div class="macro-kpi"><strong>72%</strong><span>console skew for racing and licensed sports releases</span></div>
      <div class="macro-kpi"><strong>58%</strong><span>players reporting review wait-and-see behavior for £50+ games</span></div>
      <div class="macro-kpi"><strong>46%</strong><span>higher DLC attach in titles with active creator or mod communities</span></div>
    </div>
    <table class="macro-table">
      <thead><tr><th>Genre</th><th>Platform Shape</th><th>Spend Pattern</th><th>Commercial Note</th></tr></thead>
      <tbody>
        <tr><td>Racing / driving</td><td>Console-heavy, wheel-support enthusiast pocket on PC</td><td>Launch-weighted premium sales, modest expansion attach</td><td>Strong known buyers, less organic broadening without licenses or esports</td></tr>
        <tr><td>Action sports</td><td>Balanced PC/console</td><td>Premium plus cosmetic packs, event-driven engagement</td><td>Benefits from clips, customization, and challenge communities</td></tr>
        <tr><td>Life / cozy simulation</td><td>PC-led with meaningful console growth</td><td>Long-tail expansions, mod-friendly sales, décor and identity packs</td><td>High upside if tooling and stability are credible</td></tr>
        <tr><td>Strategy / management</td><td>PC-heavy</td><td>Premium plus expansions, lower cosmetic tolerance</td><td>Smaller audience but reliable depth-driven retention</td></tr>
        <tr><td>Survival crafting</td><td>PC-led, console viable with strong UX</td><td>Premium or early-access, high co-op retention</td><td>Very competitive; differentiation depends on systems and world identity</td></tr>
      </tbody>
    </table>
    <h3>Target Audience Quotes</h3>
    <div class="macro-quote-grid">
      <div class="macro-quote"><p>"I buy simulations on PC because mods are half the point."</p><span>PC player, 30</span></div>
      <div class="macro-quote"><p>"Racing is a console game for me. I want it smooth, quick, and reliable."</p><span>Console player, 26</span></div>
      <div class="macro-quote"><p>"I do not mind DLC when I can see the studio is adding real systems, not just selling outfits."</p><span>Multi-platform player, 33</span></div>
      <div class="macro-quote"><p>"If a game has good creator tools, I will watch it before I buy it."</p><span>UK player, 21</span></div>
    </div>
  `,
  "macro-production": `
    <h2>Technology & Production Costs</h2>
    <div class="macro-report-meta"><span>Published: February 2026</span><span>Source: Production Economics Consortium</span><span>Benchmark: 41 comparable projects</span><span>Scope: AA/AAA PC-console studios</span></div>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Development Economics by Genre Category</h3>
    <p>Production cost inflation is now most visible in specialized engineering, content tooling, QA automation, and live operations staffing. The most expensive projects are not always those with the largest maps or highest visual fidelity. Systemic complexity, persistent state, multiplayer operations, moderation, mod validation, and emergent AI behavior can create cost burdens that are less visible in early pitch materials.</p>
    <p>Reusable technology remains a major advantage, but reuse should be evaluated by system fit, not label similarity. A studio with strong movement physics may still face new risk when adding city streaming or social hubs. A studio with strong UI and data systems may still struggle with autonomous character simulation. Production planning should therefore separate art/content scale, gameplay system novelty, backend complexity, and QA observability.</p>
    <table class="macro-table">
      <thead><tr><th>Genre Category</th><th>Typical Budget Range</th><th>Cost Drivers</th><th>Hidden Risk</th></tr></thead>
      <tbody>
        <tr><td>Racing / driving</td><td>£12M-£18M</td><td>Vehicle handling, licensed content, tracks, platform optimization</td><td>Market differentiation can be harder than build execution</td></tr>
        <tr><td>Skateboarding / action sports</td><td>£9M-£16M</td><td>Animation blending, physics feel, UGC tools, replay systems</td><td>Content variety and creator moderation can grow late</td></tr>
        <tr><td>Life / cozy simulation</td><td>£18M-£30M</td><td>Persistent state, AI schedules, mod validation, object interactions</td><td>Small instability issues can become reputation-defining</td></tr>
        <tr><td>Open-world social sports</td><td>£16M-£24M</td><td>World streaming, traversal systems, social hubs, live events</td><td>Scope can blur unless the core fantasy is tightly governed</td></tr>
        <tr><td>Strategy / management</td><td>£8M-£14M</td><td>Data simulation, UI, balancing, scenario generation</td><td>Lower visual spectacle can reduce mainstream visibility</td></tr>
        <tr><td>Survival crafting</td><td>£15M-£26M</td><td>World systems, co-op networking, crafting depth, AI ecology</td><td>Competitive saturation raises content and polish bar</td></tr>
      </tbody>
    </table>
    <h3>Production Cost Pressure Index</h3>
    <div class="macro-bars">
      <div class="macro-bar"><span>Specialized engineering</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:92%"></span></span><strong>92</strong></div>
      <div class="macro-bar"><span>QA automation</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:84%"></span></span><strong>84</strong></div>
      <div class="macro-bar"><span>Backend/live operations</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:78%"></span></span><strong>78</strong></div>
      <div class="macro-bar"><span>Content tooling</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:74%"></span></span><strong>74</strong></div>
      <div class="macro-bar"><span>Licensed content</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:57%"></span></span><strong>57</strong></div>
    </div>
    <h3>Operational Guidance</h3>
    <p>Studios should require proof gates that match the highest-risk system in the genre: long-session stability for simulation, network reliability for social worlds, feel and animation quality for movement games, balance integrity for strategy and management, and content cadence for survival crafting. A greenlight case is more credible when the milestone plan proves the central risk before full production spending accelerates.</p>
  `,
  "macro-competitors": `
    <h2>Competitor Pipeline</h2>
    <div class="macro-report-meta"><span>Published: May 2026</span><span>Source: Competitive Intelligence Agency</span><span>Coverage: announced and inferred 2026-2028 releases</span><span>Confidence: medium</span></div>
    <hr style="border-color:var(--border-glass); margin:1rem 0;">
    <h3>Major Competitor Release Calendar & Crowding</h3>
    <p>The competitor environment is uneven. Racing and licensed sports remain crowded and marketing-intensive. Life and cozy simulation remain dominated by incumbents but show unusual audience dissatisfaction. Action sports is less crowded, but it is also a smaller category unless broadened with social, creator, or lifestyle loops. Survival crafting, RPG/adventure, and shooter/live-service categories remain commercially large but congested, with high player expectations and steep content burdens.</p>
    <table class="macro-table">
      <thead><tr><th>Genre</th><th>Current Leaders</th><th>Pipeline Signal</th><th>Opportunity Window</th></tr></thead>
      <tbody>
        <tr><td>Racing / driving</td><td><em>Speedway Unlimited</em>, <em>Turbo Asphalt 9</em></td><td>Major premium racer expected Q3 2027; several annualized updates</td><td>Narrow unless differentiated by handling, licensing, or creator events</td></tr>
        <tr><td>Skateboarding / action sports</td><td><em>Grind & Slide</em>, legacy catalog titles</td><td>Few premium competitors; indie activity mostly niche</td><td>Open, though category expansion requires broader social hooks</td></tr>
        <tr><td>Life / cozy simulation</td><td><em>TownLife</em>, <em>Cosy Valley</em></td><td>Community demand for alternatives; incumbent backlash around DLC and stability</td><td>Large if technical credibility and mod support are clear</td></tr>
        <tr><td>Survival crafting</td><td><em>Frontier Ash</em>, <em>Hearthwild</em></td><td>Several early-access launches tracking well</td><td>Attractive but heavily saturated</td></tr>
        <tr><td>RPG / adventure</td><td><em>Mythward</em>, <em>Chronicle Vale</em></td><td>High budgets and long development cycles</td><td>Strong demand, high capital requirement</td></tr>
        <tr><td>Strategy / management</td><td><em>Club Director Pro</em>, <em>Empire Desk</em></td><td>Stable specialist audience; limited mainstream campaigns</td><td>Efficient niche with lower brand spectacle</td></tr>
        <tr><td>Shooter / live service</td><td><em>Strikefront</em>, <em>Zero Hour Arena</em></td><td>Retention war intensifying around ranked seasons and creators</td><td>Large but expensive and risky for new entrants</td></tr>
      </tbody>
    </table>
    <h3>Competitive Crowding Index</h3>
    <div class="macro-bars">
      <div class="macro-bar"><span>Shooter / live service</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:94%"></span></span><strong>94</strong></div>
      <div class="macro-bar"><span>Racing / driving</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:82%"></span></span><strong>82</strong></div>
      <div class="macro-bar"><span>Survival crafting</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:76%"></span></span><strong>76</strong></div>
      <div class="macro-bar"><span>Life / cozy simulation</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:58%"></span></span><strong>58</strong></div>
      <div class="macro-bar"><span>Action sports</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:41%"></span></span><strong>41</strong></div>
      <div class="macro-bar"><span>Strategy / management</span><span class="macro-bar-track"><span class="macro-bar-fill" style="--v:39%"></span></span><strong>39</strong></div>
    </div>
    <h3>Target Audience Quotes</h3>
    <div class="macro-quote-grid">
      <div class="macro-quote"><p>"Racing games all blur together unless one feels amazing or has a license I care about."</p><span>Console player, 28</span></div>
      <div class="macro-quote"><p>"There is room for a bigger action sports game if it gives people a place to hang out, not just levels."</p><span>PC/console player, 23</span></div>
      <div class="macro-quote"><p>"I would try a new life sim, but only if the studio proves it will not be broken or overpriced."</p><span>PC player, 35</span></div>
      <div class="macro-quote"><p>"Management games do not need to be flashy. They need to be deep and honest about the numbers."</p><span>Strategy player, 41</span></div>
    </div>
    <h3>Interpretation</h3>
    <p>Competitive whitespace is not the same as a strong business case. Some categories are open because they are difficult to build or historically smaller. The strongest opportunities are those where competitor weakness aligns with credible studio capability, clear audience dissatisfaction, and a launch plan that can be communicated without relying on vague trend language.</p>
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
    body: "Hey Team,\n\nHere is the data on modding and UGC engagement you requested. We scraped community databases, Steam Workshop logs, creator galleries, and public mod hubs across simulation, action-sports, racing, survival crafting, strategy/management, and RPG benchmarks.\n\nPlease open the attached report for the full breakdown of player retention indices, active map and asset sharing counts, tool creation metrics, support implications, and genre-level UGC adoption patterns.\n\nHope this helps with the strategic planning,\nCommunity Ops Team Office",
    attachment: "modding_ugc_report.pdf"
  },
  "refund_logs_approval": {
    sender: "Platform Partnerships Team",
    subject: "Approved: Confidential Refund Logs & Escalations",
    body: "Strategy Group,\n\nWe have retrieved the confidential refund rate logs, escalation flags, platform outcomes, and primary complaint categories from Steam, PlayStation, Xbox, Nintendo, and Epic partner portals.\n\nPlease download the attached raw CSV dataset containing detailed ticket records and refund reason categorizations across Highland releases and comparable market genres including life simulation, skateboarding, racing, survival crafting, RPG adventure, strategy/management, and live-service shooters.\n\nBest,\nPlatform Partnerships Group",
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
        <p>This approved attachment has been expanded into a full corporate-style report with methodology notes, audience-universe findings, cross-category indices, embedded support graphics, genre-level implications, governance caveats, and recommendations.</p>
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

const REPORT_PDF_PATHS = {
  parent_company_audience_overview_report: "reports/parent_company_audience_overview.pdf",
  modding_ugc_report_report: "reports/modding_ugc_report.pdf",
  influencer_coverage_report: "reports/influencer_coverage_report.pdf",
  creator_ecosystem_report: "reports/creator_ecosystem_report.pdf"
};

// --- 2. GLOBAL STATE CONTROLLER ---

let State = {
  activeTeam: "",
  passcode: "",
  budget: 10000, // Reduced from 20000 to 10000
  purchased: [],
  requests: {}, // dataSourceId -> { requestedAt: timestamp, delay: randomSeconds }
  slackPermissionRequest: null,
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
    if (typeof State.slackPermissionRequest === "undefined") {
      State.slackPermissionRequest = null;
    }
  } else {
    // Reset to initial state
    State.activeTeam = Object.keys(TEAMS_CONFIG).find(key => TEAMS_CONFIG[key] === passcode);
    State.passcode = passcode;
    State.budget = 10000;
    State.purchased = [];
    State.requests = {};
    State.slackPermissionRequest = null;
    State.viewed = [];
    const isAdmin = passcode === ADMIN_PASSCODE;
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
        <div class="ed-kpi good"><strong>+51%</strong><span>growth for mod-support life/cozy simulation queries</span></div>
        <div class="ed-kpi info"><strong>+43%</strong><span>survival-crafting searches mentioning co-op servers or base automation</span></div>
        <div class="ed-kpi warn"><strong>64%</strong><span>of high-intent queries mention systems, customization, UGC, or community tooling</span></div>
        <div class="ed-kpi bad"><strong>-9%</strong><span>generic live-service shooter queries after battle-pass backlash spikes</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Search Demand Index by Genre</h4>
          <p class="ed-panel-note">This view tracks market-wide genre and mechanic searches, including competitor-title research. Owned Highland terms are only a small subset of the raw export.</p>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 0%"></div>
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <div class="grid-line" style="bottom: 100%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 98 Q 130 94 260 101 T 600 108" fill="none" stroke="#4d463e" stroke-width="3" />
              <path d="M 0 162 Q 150 146 290 111 T 600 72" fill="none" stroke="#8a5a2b" stroke-width="3" />
              <path d="M 0 184 Q 120 165 235 112 T 600 25" fill="none" stroke="#c41c25" stroke-width="4" />
              <path d="M 0 150 Q 160 139 330 122 T 600 112" fill="none" stroke="#b7791f" stroke-width="2.5" stroke-dasharray="8 6" />
              <path d="M 0 132 Q 120 128 240 84 T 600 54" fill="none" stroke="#2f7d6d" stroke-width="2.5" />
              <path d="M 0 76 Q 160 92 320 116 T 600 156" fill="none" stroke="#6f6477" stroke-width="2.5" />
            </svg>
          </div>
          <div class="chart-axis-labels">
            <span>Jun 25</span><span>Sep 25</span><span>Dec 25</span><span>Mar 26</span><span>May 26</span>
          </div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background-color: #c41c25;"></span> Life Simulation</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #8a5a2b;"></span> Action Sports / Skate</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #b7791f;"></span> Motorsport Management</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #4d463e;"></span> Racing</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #2f7d6d;"></span> Survival Crafting</span>
            <span class="legend-item"><span class="legend-dot" style="background-color: #6f6477;"></span> Shooter / Live Service</span>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Keyword Cluster Momentum</h4>
          <p class="ed-panel-note">Clusters with both volume growth and high specificity.</p>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Modding support</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:91%"></span></span><span class="ed-bar-value">+51%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Co-op base building</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:82%"></span></span><span class="ed-bar-value">+43%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Character creator</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:78%"></span></span><span class="ed-bar-value">+37%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Open-world sports</span><span class="ed-bar-track"><span class="ed-bar-fill" style="--v:63%"></span></span><span class="ed-bar-value">+27%</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Battle pass shooter</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:24%"></span></span><span class="ed-bar-value">-9%</span></div>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Specificity Heatmap</h4>
          <p class="ed-panel-note">Higher scores indicate searches that include actionable feature intent, not only genre curiosity.</p>
          <div class="ed-heat">
            <div></div><div class="head">Volume</div><div class="head">Feature</div><div class="head">Brand</div><div class="head">Buy</div><div class="head">Risk</div>
            <div class="rowhead">Life Sim</div><div class="s5">5</div><div class="s5">5</div><div class="s3">3</div><div class="s4">4</div><div class="s3">3</div>
            <div class="rowhead">Street Sports</div><div class="s4">4</div><div class="s5">5</div><div class="s3">3</div><div class="s3">3</div><div class="s2">2</div>
            <div class="rowhead">Survival Craft</div><div class="s4">4</div><div class="s5">5</div><div class="s2">2</div><div class="s4">4</div><div class="s3">3</div>
            <div class="rowhead">RPG Adventure</div><div class="s4">4</div><div class="s3">3</div><div class="s4">4</div><div class="s3">3</div><div class="s4">4</div>
            <div class="rowhead">Racing</div><div class="s3">3</div><div class="s2">2</div><div class="s4">4</div><div class="s2">2</div><div class="s1">1</div>
          </div>
        </div>

        <div class="ed-panel wide">
          <h4>Top Query Families From Raw Export</h4>
          <div class="ed-keyword-grid">
            <div class="ed-keyword-card"><strong>life sim alternative with better customization</strong><span>High-volume dissatisfaction with dominant competitors; good early signal for a life-simulation category entry if execution risk is solved.</span></div>
            <div class="ed-keyword-card"><strong>co-op survival crafting with private servers</strong><span>Strong broader-market demand for durable group play, base persistence, and server ownership.</span></div>
            <div class="ed-keyword-card"><strong>single player RPG no battle pass</strong><span>Growing backlash against mandatory live-service structures; high purchase intent but high content-scope expectations.</span></div>
            <div class="ed-keyword-card"><strong>open world skate bike parkour game</strong><span>Supports a broader street-sports concept; users describe activity mix and world structure rather than only franchise names.</span></div>
            <div class="ed-keyword-card"><strong>management game deep career mode</strong><span>Lower volume but high specificity; queries over-index on systems depth, UI clarity, and replay scenarios.</span></div>
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
              <tr><td>open-world sports referral</td><td>Newsletter sign-up</td><td><span class="ed-status good">Concept lift</span></td><td>Street-sports concepts generate opt-in before franchise confirmation.</td></tr>
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
              <path d="M 0 18 Q 100 38 240 52 T 600 68" fill="none" stroke="#8a5a2b" stroke-width="3" />
              <path d="M 0 20 Q 100 32 240 72 T 600 118" fill="none" stroke="#c41c25" stroke-width="3" />
              <path d="M 0 20 Q 100 94 290 142 T 600 165" fill="none" stroke="#4d463e" stroke-width="2.5" />
            </svg>
          </div>
          <div class="chart-axis-labels"><span>Open</span><span>0:30</span><span>1:00</span><span>1:30</span><span>End</span></div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background-color:#8a5a2b"></span> Skating customization reveal</span>
            <span class="legend-item"><span class="legend-dot" style="background-color:#c41c25"></span> Life-sim systems prototype</span>
            <span class="legend-item"><span class="legend-dot" style="background-color:#4d463e"></span> Racing cinematic reveal</span>
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
            <div class="ed-bar-row"><span class="ed-bar-label">Open-World Street Sports</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:74%"></span></span><span class="ed-bar-value">2.4x</span></div>
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
            <thead><tr><th>Signal</th><th>Racing Sequel</th><th>Street-Sports Concept</th><th>Life-Simulation Entry</th><th>Readout</th></tr></thead>
            <tbody>
              <tr><td>Wishlist growth</td><td><span class="ed-status bad">Low</span></td><td><span class="ed-status good">High</span></td><td><span class="ed-status good">High</span></td><td>High-upside categories are pulling early demand without paid spend.</td></tr>
              <tr><td>Proof required</td><td><span class="ed-status info">Medium</span></td><td><span class="ed-status warn">Medium</span></td><td><span class="ed-status bad">High</span></td><td>Life-sim interest must be paired with credible product proof.</td></tr>
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
      { word: "broad customization", score: 62 },
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
        <div class="ed-kpi good"><strong>74%</strong><span>strategy/management benchmark price retained at month 18</span></div>
        <div class="ed-kpi info"><strong>71%</strong><span>life-sim benchmark price retained at month 18</span></div>
        <div class="ed-kpi warn"><strong>54%</strong><span>survival-crafting price retained after early-access exit</span></div>
        <div class="ed-kpi bad"><strong>31%</strong><span>annual sports/racing sequel price retained during holiday discount cycle</span></div>
      </div>

      <div class="ed-grid">
        <div class="ed-panel wide">
          <h4>Effective Average Selling Price After Launch</h4>
          <div class="chart-container-market">
            <div class="grid-line" style="bottom: 25%"></div>
            <div class="grid-line" style="bottom: 50%"></div>
            <div class="grid-line" style="bottom: 75%"></div>
            <svg class="trend-lines-svg" viewBox="0 0 600 220" preserveAspectRatio="none">
              <path d="M 0 24 L 90 28 L 180 42 L 300 54 L 600 72" fill="none" stroke="#c41c25" stroke-width="3" />
              <path d="M 0 30 L 90 44 L 180 78 L 300 106 L 600 138" fill="none" stroke="#8a5a2b" stroke-width="3" />
              <path d="M 0 30 L 90 62 L 180 114 L 300 145 L 600 168" fill="none" stroke="#4d463e" stroke-width="3" />
              <path d="M 0 20 L 90 24 L 180 36 L 300 48 L 600 62" fill="none" stroke="#2f7d6d" stroke-width="3" />
              <path d="M 0 28 L 90 38 L 180 55 L 300 91 L 600 130" fill="none" stroke="#6f6477" stroke-width="2.5" />
            </svg>
          </div>
          <div class="chart-axis-labels"><span>Launch</span><span>3 mo</span><span>6 mo</span><span>12 mo</span><span>24 mo</span></div>
          <div class="chart-legend" style="margin-top: 1rem; justify-content: center;">
            <span class="legend-item"><span class="legend-dot" style="background:#c41c25"></span> Life Simulation</span>
            <span class="legend-item"><span class="legend-dot" style="background:#8a5a2b"></span> Action Sports</span>
            <span class="legend-item"><span class="legend-dot" style="background:#4d463e"></span> Racing</span>
            <span class="legend-item"><span class="legend-dot" style="background:#2f7d6d"></span> Strategy / Management</span>
            <span class="legend-item"><span class="legend-dot" style="background:#6f6477"></span> Survival Crafting</span>
          </div>
        </div>

        <div class="ed-panel">
          <h4>Revenue Dependency</h4>
          <table class="ed-table">
            <thead><tr><th>Genre</th><th>Base Game</th><th>DLC/Exp.</th><th>Discount Risk</th></tr></thead>
            <tbody>
              <tr><td>Strategy / Management</td><td>52%</td><td>36%</td><td><span class="ed-status good">Low</span></td></tr>
              <tr><td>Life Sim</td><td>46%</td><td>41%</td><td><span class="ed-status good">Low</span></td></tr>
              <tr><td>Survival Crafting</td><td>58%</td><td>27%</td><td><span class="ed-status warn">Medium</span></td></tr>
              <tr><td>Street Sports</td><td>61%</td><td>24%</td><td><span class="ed-status info">Medium</span></td></tr>
              <tr><td>RPG Adventure</td><td>74%</td><td>14%</td><td><span class="ed-status warn">Medium</span></td></tr>
              <tr><td>Racing / Annual Sports</td><td>82%</td><td>9%</td><td><span class="ed-status bad">High</span></td></tr>
              <tr><td>Shooter / Live Service</td><td>39%</td><td>44%</td><td><span class="ed-status bad">High</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel">
          <h4>Pricing Implication</h4>
          <p class="ed-panel-note">Genres with durable systems, expansions, or creator ecosystems retain price power longer. Annualized sports/racing and live-service shooters discount earlier because the market expects recurring content resets, heavy competition, or aggressive storefront events.</p>
          <div class="ed-bars">
            <div class="ed-bar-row"><span class="ed-bar-label">Launch spike reliance</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:86%"></span></span><span class="ed-bar-value">Racing</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">Expansion runway</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:78%"></span></span><span class="ed-bar-value">Life Sim</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">DLC depth runway</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:82%"></span></span><span class="ed-bar-value">Strategy</span></div>
            <div class="ed-bar-row"><span class="ed-bar-label">UGC retention</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:71%"></span></span><span class="ed-bar-value">Street</span></div>
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
            <thead><tr><th>Signal</th><th>Evidence</th><th>Genre Fit</th></tr></thead>
            <tbody>
              <tr><td>Self-expression</td><td>High customization dwell in Streetline Skate</td><td><span class="ed-status good">Street sports</span></td></tr>
              <tr><td>Pure simulation</td><td>LifeSpace concept had demand but poor crash-free play</td><td><span class="ed-status warn">Life sim</span></td></tr>
              <tr><td>Track mastery</td><td>Racing sessions are focused but narrow</td><td><span class="ed-status info">Racing</span></td></tr>
              <tr><td>Social loop</td><td>Park sharing increases return sessions</td><td><span class="ed-status good">Street sports</span></td></tr>
            </tbody>
          </table>
        </div>

        <div class="ed-panel wide">
          <h4>Telemetry Conclusion</h4>
          <p class="ed-panel-note">The useful evidence is not that Highland “makes skate games”. It is that Highland already has proven physics, expressive movement, and player creation behavior. That is a stronger bridge into an open-world street sports concept than into a full life-simulation reboot.</p>
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
              <path d="M 0 86 L 100 78 L 220 70 L 420 58 L 600 50" fill="none" stroke="#c41c25" stroke-width="3" />
              <path d="M 0 102 L 120 112 L 260 116 L 430 118 L 600 122" fill="none" stroke="#8a5a2b" stroke-width="3" />
              <path d="M 0 78 L 90 142 L 210 164 L 600 184" fill="none" stroke="#4d463e" stroke-width="3" />
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
            <div class="rowhead">Street sports</div><div class="s5">5</div><div class="s5">5</div><div class="s3">3</div><div class="s4">4</div><div class="s4">4</div>
            <div class="rowhead">Life sim</div><div class="s5">5</div><div class="s5">5</div><div class="s1">1</div><div class="s5">5</div><div class="s2">2</div>
            <div class="rowhead">Racing</div><div class="s2">2</div><div class="s2">2</div><div class="s5">5</div><div class="s2">2</div><div class="s4">4</div>
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
          <p class="ed-panel-note">Life simulation has the largest addressable market but also the highest technical expectation. Open-world street sports is smaller, but better aligned with Highland capability and parent-company media support. Racing is commercially real but less strategically leveraged.</p>
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
    <p style="font-size: 0.9rem; margin: 0.75rem 0 1rem;">AdIntelligence modeled paid media activity across search, paid social, creator whitelisting, video pre-roll, storefront featuring, and mobile app-install exchanges. Values represent observed bid ranges and inferred spend, not publisher-disclosed actuals.</p>
    <div class="ed-kpi-grid">
      <div class="ed-kpi bad"><strong>£22.5M</strong><span>highest inferred annual spend: dominant life-sim incumbent</span></div>
      <div class="ed-kpi warn"><strong>£6.50</strong><span>upper CPI band for crowded life/cozy simulation campaigns</span></div>
      <div class="ed-kpi good"><strong>£1.40</strong><span>lowest CPI band for UGC-led action-sports creator campaigns</span></div>
      <div class="ed-kpi info"><strong>38%</strong><span>median paid share of launch installs across premium PC/console titles</span></div>
    </div>
    <table class="sales-matrix">
      <thead>
        <tr>
          <th>Competitor Game Title</th>
          <th>Genre</th>
          <th>Annual Paid Ad Spend</th>
          <th>Avg CPI</th>
          <th>Paid Acquisition Share</th>
          <th>Dominant Channel</th>
          <th>Payback Readout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Speedway Unlimited</td>
          <td>Racing</td>
          <td>£8.4M</td>
          <td>£4.20</td>
          <td>42% of total players</td>
          <td>Search + video pre-roll</td>
          <td><span class="ed-status warn">Thin after discounts</span></td>
        </tr>
        <tr>
          <td>Grind & Slide</td>
          <td>Skateboarding / Action Sports</td>
          <td>£1.2M</td>
          <td>£1.80</td>
          <td>15% of total players</td>
          <td>Creator whitelisting</td>
          <td><span class="ed-status good">Efficient</span></td>
        </tr>
        <tr>
          <td>TownLife</td>
          <td>Life / Cozy Simulation</td>
          <td>£22.5M</td>
          <td>£6.50</td>
          <td>55% of total players</td>
          <td>Paid social + search conquesting</td>
          <td><span class="ed-status bad">Expensive but defensible at scale</span></td>
        </tr>
        <tr>
          <td>Hearthwild</td>
          <td>Survival Crafting</td>
          <td>£9.8M</td>
          <td>£3.75</td>
          <td>34% of total players</td>
          <td>Influencer co-op series</td>
          <td><span class="ed-status info">Improves with server retention</span></td>
        </tr>
        <tr>
          <td>Chronicle Vale</td>
          <td>RPG / Adventure</td>
          <td>£14.2M</td>
          <td>£5.10</td>
          <td>47% of total players</td>
          <td>Cinematic video + creator embargo</td>
          <td><span class="ed-status warn">Dependent on critic scores</span></td>
        </tr>
        <tr>
          <td>Club Director Pro</td>
          <td>Strategy / Management</td>
          <td>£2.6M</td>
          <td>£2.25</td>
          <td>22% of total players</td>
          <td>Search + specialist newsletters</td>
          <td><span class="ed-status good">Slow but durable</span></td>
        </tr>
        <tr>
          <td>Zero Hour Arena</td>
          <td>Shooter / Live Service</td>
          <td>£31.0M</td>
          <td>£7.80</td>
          <td>61% of total players</td>
          <td>Paid social + esports sponsorship</td>
          <td><span class="ed-status bad">High churn risk</span></td>
        </tr>
      </tbody>
    </table>
    <div class="ed-grid" style="margin-top: 1rem;">
      <div class="ed-panel">
        <h4>Channel Mix by Genre</h4>
        <div class="ed-bars">
          <div class="ed-bar-row"><span class="ed-bar-label">Life/cozy paid social</span><span class="ed-bar-track"><span class="ed-bar-fill bad" style="--v:78%"></span></span><span class="ed-bar-value">78</span></div>
          <div class="ed-bar-row"><span class="ed-bar-label">Racing search bids</span><span class="ed-bar-track"><span class="ed-bar-fill warn" style="--v:66%"></span></span><span class="ed-bar-value">66</span></div>
          <div class="ed-bar-row"><span class="ed-bar-label">Action-sports creators</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:84%"></span></span><span class="ed-bar-value">84</span></div>
          <div class="ed-bar-row"><span class="ed-bar-label">Strategy newsletters</span><span class="ed-bar-track"><span class="ed-bar-fill good" style="--v:58%"></span></span><span class="ed-bar-value">58</span></div>
        </div>
      </div>
      <div class="ed-panel">
        <h4>Strategic Insight</h4>
        <p class="ed-panel-note">Paid acquisition is most dangerous when a genre has high CPI and weak organic proof. Life/cozy simulation has high bid pressure but can offset it with creator trust and modding advocacy. Action-sports has lower CPI because creator clips carry more discovery work. Racing needs higher paid support because intent is clear but culturally narrower.</p>
      </div>
    </div>
  `;
}

// Function to download strategic reports as pre-rendered PDFs
async function downloadReport(reportKey, docTitle) {
  const pdfPath = REPORT_PDF_PATHS[reportKey];
  if (pdfPath) {
    const link = document.createElement("a");
    link.setAttribute("href", pdfPath);
    link.setAttribute("download", pdfPath.split("/").pop());
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

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
  
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const fallbackHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${docTitle}</title></head><body><pre>${escapedText}</pre></body></html>`;
  const blob = new Blob([fallbackHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${reportKey.replace("_report", "")}_document.html`);
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
life simulation game with mod support,16800,16.4,Life Simulation,PC/Steam,51
co-op survival crafting with private servers,15400,13.8,Survival Crafting,PC/Console,43
single player RPG no battle pass,13200,11.6,RPG Adventure,PC/Console,34
open world skate bike parkour game,11800,12.9,Action Sports,Console/PC,27
management game deep career mode,9300,8.1,Strategy Management,PC,18
streetline skate multiplayer custom parks,8500,14.2,Skateboarding,Console/PC,28
racing game career mode realistic handling,6200,9.5,Racing,Console,4
new extraction shooter fair monetization,7400,6.3,Shooter Live Service,PC/Console,11
games like TownLife but not paywall dlc,14200,18.7,Life Simulation,PC/Steam,39
realistic car handling mods,3100,4.3,Racing,PC,-4`;
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
  else if (filename === "refund_escalation_data.csv") {
    content = `RefundID,Date,GameTitle,Genre,PlatformStorefront,Region,PurchasePriceGBP,HoursPlayed,RefundRequested,RefundReason,ComplaintCategory,Escalated,EscalationTier,ResolutionStatus,ResolutionDays,SupportNotes
RF-500001,2026-01-11,LifeSpace,Life Simulation,Steam,UK,49.99,14.2,TRUE,"Save corruption","Save / support",TRUE,"Platform escalation","Approved",12,"Escalated because player supplied corrupted save files"
RF-500002,2026-03-31,Streetline Skate,Skateboarding,Xbox Store,AU,39.99,7.3,TRUE,"Online park desync","Online / support",FALSE,"Storefront auto-approved","Partial credit issued",3,"Standard storefront review"
RF-500003,2026-04-06,Hearthwild,Survival Crafting,Steam,US,34.99,9.1,TRUE,"Server rollback","Server / support",TRUE,"Publisher review","Pending evidence",8,"Escalated because co-op rollback logs were supplied"`;
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
    const passcode = document.getElementById("passcode-input").value.trim();
    const loginError = document.getElementById("login-error");
    
    if (passcode === ADMIN_PASSCODE) {
      loginError.textContent = "";
      login("Admin", ADMIN_PASSCODE);
    } else {
      loginError.textContent = REVOKED_ACCESS_MESSAGE;
    }
  });

  // Logout Button
  document.getElementById("logout-btn").addEventListener("click", logout);
  document.getElementById("admin-reset-team-btn")?.addEventListener("click", resetSelectedTeamState);

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
  document.getElementById("download-slack-btn").addEventListener("click", openSlackDownloadModal);

  document.getElementById("analyze-slack-btn").addEventListener("click", () => {
    document.getElementById("sentiment-analysis-dashboard").classList.remove("hidden");
  });

  document.getElementById("close-sentiment-btn").addEventListener("click", () => {
    document.getElementById("sentiment-analysis-dashboard").classList.add("hidden");
  });

  document.getElementById("slack-permission-close-btn").addEventListener("click", () => {
    document.getElementById("slack-permission-modal").close();
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

  document.getElementById("macro-download-pdf-btn")?.addEventListener("click", () => {
    const activeReport = document.querySelector(".macro-tab-btn.active")?.getAttribute("data-report") || "macro-general";
    downloadMacroReportPdf(activeReport);
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
  updateAdminStateControls();
  
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
  updateAdminStateControls();
  document.getElementById("login-overlay").classList.remove("hidden");
  document.getElementById("app-wrapper").classList.add("hidden");
  document.getElementById("passcode-input").value = "";
}

function updateAdminStateControls() {
  const panel = document.getElementById("admin-state-panel");
  const select = document.getElementById("admin-reset-team-select");
  const status = document.getElementById("admin-reset-status");
  if (!panel || !select) return;

  const isAdmin = State.passcode === ADMIN_PASSCODE;
  panel.classList.toggle("hidden", !isAdmin);
  if (!isAdmin) {
    select.innerHTML = `<option value="">Select team</option>`;
    if (status) status.textContent = "";
    return;
  }

  select.innerHTML = `<option value="">Select team</option>` + Object.keys(TEAMS_CONFIG)
    .filter(teamName => teamName !== "Admin")
    .map(teamName => `<option value="${teamName}">${teamName}</option>`)
    .join("");
  if (status) status.textContent = "";
}

function resetSelectedTeamState() {
  if (State.passcode !== ADMIN_PASSCODE) return;

  const select = document.getElementById("admin-reset-team-select");
  const status = document.getElementById("admin-reset-status");
  const teamName = select?.value;
  if (!teamName || teamName === "Admin" || !TEAMS_CONFIG[teamName]) {
    if (status) status.textContent = "Select a team to reset.";
    return;
  }

  localStorage.removeItem(`highland_state_${TEAMS_CONFIG[teamName]}`);
  if (status) status.textContent = `${teamName} workspace has been reset to default.`;
  if (select) select.value = "";
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
        <button type="button" class="btn btn-outline" id="modal-dl-report-btn">Download Report PDF</button>
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
        const isAdmin = State.passcode === ADMIN_PASSCODE;
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
        const isAdmin = State.passcode === ADMIN_PASSCODE;
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
  if (!modal.open) {
    modal.showModal();
  }
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

function openSlackDownloadModal() {
  const modal = document.getElementById("slack-permission-modal");
  const body = document.getElementById("slack-permission-body");
  const request = State.slackPermissionRequest;

  if (request?.status === "pending") {
    body.innerHTML = `
      <div class="permission-alert">
        <h3>Permission Request Sent</h3>
        <p>Your request has been sent to Privacy Governance. Estimated response time is five minutes.</p>
      </div>
      <div class="permission-actions">
        <button type="button" class="btn btn-outline" id="slack-permission-ok-btn">Close</button>
      </div>
    `;
  } else if (request?.status === "denied") {
    body.innerHTML = `
      <div class="permission-alert">
        <h3>Download Still Blocked</h3>
        <p>The Slack archive export remains unavailable while Privacy Governance reviews the escalation status.</p>
      </div>
      <div class="permission-actions">
        <button type="button" class="btn btn-outline" id="slack-permission-ok-btn">Close</button>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div class="permission-alert">
        <h3>Download Blocked</h3>
        <p>Slack conversation archive downloads are blocked due to privacy permissions. You may request permission from Privacy Governance.</p>
      </div>
      <div class="permission-actions">
        <button type="button" class="btn btn-outline" id="slack-permission-cancel-btn">Cancel</button>
        <button type="button" class="btn btn-primary" id="slack-permission-request-btn">Request Permission</button>
      </div>
    `;
  }

  document.getElementById("slack-permission-ok-btn")?.addEventListener("click", () => modal.close());
  document.getElementById("slack-permission-cancel-btn")?.addEventListener("click", () => modal.close());
  document.getElementById("slack-permission-request-btn")?.addEventListener("click", requestSlackArchivePermission);

  if (!modal.open) {
    modal.showModal();
  }
}

function requestSlackArchivePermission() {
  State.slackPermissionRequest = {
    requestedAt: Date.now(),
    delay: getRandomSlackPermissionDelaySeconds(),
    status: "pending"
  };
  saveState();
  openSlackDownloadModal();
}

function getRandomSlackPermissionDelaySeconds() {
  return Math.floor(Math.random() * 181) + 180;
}

// Macro Report tab content renderer
function renderMacroReport(reportId) {
  const content = document.getElementById("macro-report-content");
  const meta = MACRO_REPORT_META[reportId] || MACRO_REPORT_META["macro-general"];
  content.innerHTML = MACRO_REPORTS[reportId] || "<p>Report content not found.</p>";
  const actionTitle = document.getElementById("macro-report-action-title");
  if (actionTitle) actionTitle.textContent = meta.title;
}

function downloadMacroReportPdf(reportId) {
  const meta = MACRO_REPORT_META[reportId] || MACRO_REPORT_META["macro-general"];
  const link = document.createElement("a");
  link.href = meta.pdf;
  link.download = meta.pdf.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
            <button type="button" class="btn btn-outline" id="modal-dl-report-btn">Download Attachment PDF</button>
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
  const isAdmin = State.passcode === ADMIN_PASSCODE;
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

  const slackRequest = State.slackPermissionRequest;
  if (slackRequest?.status === "pending") {
    const elapsed = (now - slackRequest.requestedAt) / 1000;
    if (elapsed >= slackRequest.delay) {
      State.slackPermissionRequest = {
        ...slackRequest,
        status: "denied",
        deniedAt: now
      };

      State.emails.push({
        sender: "Privacy Governance Office",
        subject: "Denied: Slack Conversation Archive Export",
        body: "Strategy Task Force,\n\nYour request to download the full Slack conversation archive has been reviewed and denied.\n\nThe archive contains identifiable employee communications and internal workplace discussion data. Under UK privacy requirements, including UK GDPR and the Data Protection Act 2018, the raw export cannot be released outside approved privacy-cleared review channels in its current form.\n\nThis decision has been escalated for senior review. If permission is granted from above, the earliest likely response window is approximately 2-3 weeks.\n\nRegards,\nPrivacy Governance Office",
        date: new Date().toLocaleTimeString(),
        read: false,
        id: "slack_archive_permission_denied"
      });

      stateChanged = true;
    }
  }

  if (stateChanged) {
    saveState();
    updateEmailBadgeCount();
    if (State.activeTab === "tab-email") {
      renderEmailInbox();
    }
    
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

    const slackModal = document.getElementById("slack-permission-modal");
    if (slackModal?.open) {
      openSlackDownloadModal();
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
