/* ================================================
   Dummy Text Generator — app.js
   Digital BigHit Tools · digitalbighit.com
   ================================================ */

/* ── WORD BANK ── */
const WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","praesent","cursus","magna","vel","scelerisque","nisl","purus","semper","felis","bibendum","tristique","egestas","urna","nibh","cras","pulvinar","mattis","nunc","blandit","libero","volutpat","malesuada","arcu","vitae","elementum","curabitur","justo","fermentum","iaculis","eu","diam","phasellus","vestibulum","risus","ultricies","aliquet","tortor","auctor","eleifend","posuere","sollicitudin","ultrices","sagittis","orci","pellentesque","venenatis","sapien","finibus","lacus","rhoncus","porttitor","accumsan","tincidunt","suscipit","condimentum","imperdiet","rutrum","interdum","facilisis","gravida","eget","laoreet","maecenas","pretium","convallis","molestie","nascetur","ridiculus","mus","fames","odio","morbi","tellus","libero","placerat","viverra","lectus","vestibulum","fringilla","purus","blandit","aliquam","pharetra","diam","duis","porta","quam","hendrerit","neque","sodales","ut","etiam","sit","amet","nisl","purus","in","mollis","nunc","sed","id","semper","risus","in","hendrerit","gravida"];
const LOREM_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

/* ── HELPERS ── */
const rnd   = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick  = ()     => WORDS[Math.floor(Math.random() * WORDS.length)];
const cap   = s      => s.charAt(0).toUpperCase() + s.slice(1);

function makeSent() {
  const ws = [];
  for (let i = 0; i < rnd(7, 18); i++) ws.push(pick());
  return cap(ws.join(' ')) + '.';
}
function makePara(idx, startLorem) {
  const n = rnd(4, 8), ss = [];
  if (idx === 0 && startLorem) {
    ss.push(LOREM_START);
    for (let i = 1; i < n; i++) ss.push(makeSent());
  } else {
    for (let i = 0; i < n; i++) ss.push(makeSent());
  }
  return ss.join(' ');
}
function makeShort(n) {
  const ss = [];
  for (let i = 0; i < n; i++) ss.push(makeSent());
  return ss.join(' ');
}
function makeTitle(n) {
  const ws = [];
  for (let i = 0; i < n; i++) ws.push(pick());
  return cap(ws.join(' '));
}

/* ── CONTEXT HELPERS ── */
const brandOrFallback   = () => document.getElementById('w-brand').value.trim()    || cap(makeTitle(2));
const topicPhrase       = () => document.getElementById('w-topic').value.trim()    || makeTitle(3);
const audiencePhrase    = () => document.getElementById('w-audience').value.trim() || makeTitle(3);
const toneAdj           = () => ({ professional:'trusted', friendly:'caring', playful:'fun', luxury:'premium', bold:'powerful', minimal:'clean' })[document.getElementById('w-tone').value] || 'quality';

function makeProductName() {
  const t = document.getElementById('w-topic').value.trim();
  const base = t ? t.split(/\s+/).slice(-1)[0] : pick();
  return cap(base) + ' ' + cap(makeTitle(rnd(1,2)));
}
function makeTagline() {
  const tp = topicPhrase();
  return [`The ${toneAdj()} choice for ${tp}`, `${tp}, done right`, `Built for people who care about ${tp}`, `Where ${tp} meets quality`, `${tp} you can trust`][rnd(0,4)];
}
function makeContextHeadline() {
  const tp = topicPhrase(), b = brandOrFallback(), aud = audiencePhrase();
  return [`Discover ${toneAdj()} ${tp} for ${aud}`, `${b} — ${cap(toneAdj())} ${tp}`, `The best ${tp} experience, built for ${aud}`, `${b}: ${tp} that works`, `${cap(tp)} reimagined for ${aud}`][rnd(0,4)];
}

/* ── SECTION GENERATORS ── */
const SECTION_GEN = {
  hero:                () => ({ label: 'Hero section',          content: `Headline: ${makeContextHeadline()}\nSubheadline: ${makeShort(2)}\nTagline: ${makeTagline()}\nPrimary CTA: Get started\nSecondary CTA: Learn more` }),
  value_props:         () => ({ label: 'Value propositions',    content: [`Fast & reliable — ${makeShort(1)}`, `${cap(toneAdj())} quality — ${makeShort(1)}`, `Built for ${audiencePhrase()} — ${makeShort(1)}`].join('\n\n') }),
  featured_products:   () => ({ label: 'Featured products',     content: [1,2,3].map(() => `${makeProductName()} — $${rnd(9,299)}.99\n${makeShort(1)}\nCTA: Shop now`).join('\n\n') }),
  product_cards:       () => ({ label: 'Product cards',         content: [1,2,3,4].map(() => `${makeProductName()} — $${rnd(9,499)}.99\n${makeShort(1)}`).join('\n\n') }),
  filter_labels:       () => ({ label: 'Filter & sort labels',  content: `Categories: All, New arrivals, Best sellers, Sale\nSort: Price low–high · Price high–low · Newest · Best rated\nSearch placeholder: Search ${topicPhrase()}...` }),
  product_title:       () => ({ label: 'Product title & meta',  content: `${makeProductName()}\nPrice: $${rnd(29,599)}.99  |  SKU: PRD-${rnd(1000,9999)}  |  In stock\nTagline: ${makeTagline()}` }),
  product_description: () => ({ label: 'Product description',   content: `Introducing the latest from ${brandOrFallback()} — crafted for ${audiencePhrase()}.\n\n${makePara(0, false)}\n\n${makePara(1, false)}` }),
  product_specs:       () => ({ label: 'Specifications',        content: `Material: ${cap(pick())} blend\nDimensions: ${rnd(10,50)} x ${rnd(10,50)} x ${rnd(5,20)} cm\nWeight: ${rnd(1,10)}.${rnd(0,9)} kg\nColour: ${cap(pick())}, ${cap(pick())}, ${cap(pick())}\nWarranty: ${rnd(1,3)} year(s)` }),
  reviews:             () => ({ label: 'Customer reviews',      content: [`"${makeShort(2)}"\n— ${cap(pick())} ${cap(pick())}, verified buyer ★★★★★`, `"${makeShort(2)}"\n— ${cap(pick())} ${cap(pick())}, verified buyer ★★★★☆`].join('\n\n') }),
  testimonials:        () => ({ label: 'Testimonials',          content: [1,2,3].map(() => `"${makeShort(2)}"\n— ${cap(pick())} ${cap(pick())}, ${audiencePhrase()}`).join('\n\n') }),
  cart_empty:          () => ({ label: 'Empty cart message',    content: `Your cart is empty.\n${makeShort(1)}\nCTA: Continue shopping` }),
  cart_summary:        () => ({ label: 'Cart summary copy',     content: `Order summary\nFree shipping on orders over $${rnd(40,100)}\n30-day free returns\n${makeShort(1)}` }),
  checkout_cta:        () => ({ label: 'Checkout CTA',          content: `Proceed to checkout\nSecure checkout — powered by ${brandOrFallback()}\n${makeShort(1)}` }),
  trust_badges:        () => ({ label: 'Trust badges',          content: `Secure checkout · Free returns · ${rnd(1,3)}-year warranty · ${rnd(10,30)}-day money-back guarantee · Loved by ${rnd(1000,50000).toLocaleString()}+ customers` }),
  about_hero:          () => ({ label: 'About page hero',       content: `Headline: Our story\nSubheadline: ${makeShort(2)}\nFounded: ${rnd(2008,2023)}` }),
  our_story:           () => ({ label: 'Our story',             content: `${brandOrFallback()} was founded with a simple belief: ${topicPhrase()} should be accessible to ${audiencePhrase()}.\n\n${makePara(0, false)}\n\n${makePara(1, false)}` }),
  mission:             () => ({ label: 'Mission & values',      content: `Mission: To deliver ${toneAdj()} ${topicPhrase()} that makes a real difference for ${audiencePhrase()}.\n\nValues:\n- ${cap(toneAdj())} quality in everything we do\n- ${makeShort(1)}\n- ${makeShort(1)}` }),
  team_bios:           () => ({ label: 'Team bios',             content: [['Alex','CEO & Co-founder'],['Jordan','CTO'],['Morgan','Head of Design'],['Riley','Head of Marketing']].map(([n,r]) => `${n} — ${r}\n${makeShort(2)}`).join('\n\n') }),
  faq_intro:           () => ({ label: 'FAQ intro',             content: `Headline: Frequently asked questions\nSubheadline: Everything you need to know about ${topicPhrase()} at ${brandOrFallback()}.` }),
  faq_items:           () => ({ label: 'FAQ items',             content: [`Q: What makes ${brandOrFallback()} different?\nA: ${makeShort(2)}`, `Q: How does ${topicPhrase()} work?\nA: ${makeShort(2)}`, `Q: Is it right for ${audiencePhrase()}?\nA: ${makeShort(2)}`, `Q: What is your return policy?\nA: ${makeShort(2)}`, `Q: How can I contact support?\nA: ${makeShort(1)}`].join('\n\n') }),
  contact_intro:       () => ({ label: 'Contact intro',         content: `Headline: Get in touch\nSubheadline: We'd love to hear from the ${brandOrFallback()} team.` }),
  contact_details:     () => ({ label: 'Contact details',       content: `Email: hello@${brandOrFallback().toLowerCase().replace(/\s+/g,'')}.com\nPhone: +1 (555) ${rnd(100,999)}-${rnd(1000,9999)}\nAddress: ${rnd(10,999)} ${cap(makeTitle(2))} St\nHours: Mon–Fri 9am–6pm` }),
  support_text:        () => ({ label: 'Support copy',          content: `Our support team is here for ${audiencePhrase()}. ${makeShort(2)}` }),
  terms_intro:         () => ({ label: 'Terms intro',           content: `Terms of service — Last updated ${['January','February','March','April'][rnd(0,3)]} ${rnd(2023,2025)}\nThese terms govern your use of ${brandOrFallback()}.` }),
  privacy_policy:      () => ({ label: 'Privacy policy',        content: `${brandOrFallback()} is committed to protecting your privacy. ${makePara(0, false)}` }),
  cookie_notice:       () => ({ label: 'Cookie notice',         content: `${brandOrFallback()} uses cookies to improve your experience.\nAccept all · Manage preferences` }),
  newsletter_cta:      () => ({ label: 'Newsletter CTA',        content: `Headline: Stay in the loop\nJoin ${rnd(500,50000).toLocaleString()}+ ${audiencePhrase()} who get our weekly updates.\nCTA: Subscribe free` }),
  featured_post:       () => ({ label: 'Featured post',         content: `Title: ${makeContextHeadline()}\nExcerpt: ${makeShort(2)}\nAuthor: ${cap(pick())} ${cap(pick())} · ${rnd(3,12)} min read` }),
  recent_posts:        () => ({ label: 'Recent posts',          content: [1,2,3].map(() => `${makeContextHeadline()}\n${makeShort(1)} · ${rnd(3,12)} min read`).join('\n\n') }),
  author_bio:          () => ({ label: 'Author bio',            content: `${cap(pick())} ${cap(pick())} writes about ${topicPhrase()} for ${audiencePhrase()}. ${makeShort(2)}` }),
  editorial_mission:   () => ({ label: 'Editorial mission',     content: `${brandOrFallback()} covers ${topicPhrase()} for ${audiencePhrase()}. ${makeShort(2)}` }),
  article_title:       () => ({ label: 'Article title & meta',  content: `Title: ${makeContextHeadline()}\nBy ${cap(pick())} ${cap(pick())} · ${rnd(5,20)} min read · ${rnd(1000,9000).toLocaleString()} views` }),
  article_intro:       () => ({ label: 'Article intro',         content: makePara(0, false) }),
  article_body:        () => ({ label: 'Article body',          content: [0,1,2].map(i => makePara(i, false)).join('\n\n') }),
  author_box:          () => ({ label: 'Author box',            content: `${cap(pick())} ${cap(pick())} — ${topicPhrase()} writer\n${makeShort(2)}\nFollow: Twitter · LinkedIn` }),
  category_intro:      () => ({ label: 'Category intro',        content: `${cap(topicPhrase())}\n${makeShort(2)}` }),
  post_cards:          () => ({ label: 'Post cards',            content: [1,2,3,4].map(() => `${makeContextHeadline()}\n${makeShort(1)}`).join('\n\n') }),
  newsletter_hero:     () => ({ label: 'Newsletter hero',       content: `Headline: The ${topicPhrase()} newsletter\nWeekly insights for ${audiencePhrase()}. Free, always.` }),
  newsletter_benefits: () => ({ label: 'Newsletter benefits',   content: [`Weekly ${topicPhrase()} roundup`, `Expert tips for ${audiencePhrase()}`, `No spam, unsubscribe anytime`].map(b => `- ${b}`).join('\n') }),
  newsletter_form:     () => ({ label: 'Form copy',             content: `CTA: Join ${rnd(500,50000).toLocaleString()} readers · No spam · Unsubscribe anytime` }),
  features:            () => ({ label: 'Features overview',     content: [`${cap(toneAdj())} performance — ${makeShort(1)}`, `Built for ${audiencePhrase()} — ${makeShort(1)}`, `Seamless ${topicPhrase()} — ${makeShort(1)}`].join('\n\n') }),
  social_proof:        () => ({ label: 'Social proof',          content: `${rnd(500,50000).toLocaleString()}+ customers · ${(Math.random()*0.8+4.1).toFixed(1)}/5 rating · Trusted by ${cap(makeTitle(2))}, ${cap(makeTitle(2))}, ${cap(makeTitle(2))}` }),
  pricing_intro:       () => ({ label: 'Pricing intro',         content: `Headline: Simple, transparent pricing\nEverything ${audiencePhrase()} needs to get the most from ${topicPhrase()}.` }),
  cta_banner:          () => ({ label: 'CTA banner',            content: `Headline: Ready to experience ${topicPhrase()}?\nJoin ${rnd(1000,50000).toLocaleString()}+ ${audiencePhrase()} already using ${brandOrFallback()}.\nCTA: Get started free` }),
  features_hero:       () => ({ label: 'Features page hero',    content: `Headline: Everything you need for ${topicPhrase()}\n${makeShort(2)}` }),
  feature_blocks:      () => ({ label: 'Feature blocks',        content: [1,2,3,4].map(i => `Feature ${i}: ${cap(toneAdj())} ${topicPhrase()}\n${makeShort(2)}`).join('\n\n') }),
  pricing_hero:        () => ({ label: 'Pricing page hero',     content: `Headline: Plans for every ${audiencePhrase()}\nStart free. Upgrade when you're ready.` }),
  pricing_plans:       () => ({ label: 'Pricing plans',         content: [['Starter','$9/mo'],['Pro','$29/mo'],['Enterprise','Custom']].map(([n,p]) => `${n} — ${p}\nIncludes: ${cap(topicPhrase())}, priority support, ${rnd(3,20)} users`).join('\n\n') }),
  pricing_faq:         () => ({ label: 'Pricing FAQ',           content: [`Q: Can I try ${brandOrFallback()} for free?\nA: ${makeShort(2)}`, `Q: What happens when I upgrade?\nA: ${makeShort(2)}`, `Q: Do you offer refunds?\nA: ${makeShort(2)}`].join('\n\n') }),
  docs_intro:          () => ({ label: 'Docs intro',            content: `${brandOrFallback()} documentation\nEverything you need to get started with ${topicPhrase()}.` }),
  getting_started:     () => ({ label: 'Getting started',       content: `Step 1: Create your ${brandOrFallback()} account\nStep 2: Set up your ${topicPhrase()} workspace\nStep 3: ${makeShort(1)}` }),
  api_overview:        () => ({ label: 'API overview',          content: `The ${brandOrFallback()} API gives ${audiencePhrase()} programmatic access to ${topicPhrase()}. ${makeShort(2)}` }),
  blog_hero:           () => ({ label: 'Blog hero',             content: `${brandOrFallback()} Blog\nInsights, guides, and news about ${topicPhrase()} for ${audiencePhrase()}.` }),
  about_short:         () => ({ label: 'Short about',           content: `${brandOrFallback()} helps ${audiencePhrase()} with ${topicPhrase()}. ${makeShort(1)}` }),
  selected_work:       () => ({ label: 'Selected work',         content: [1,2,3].map(() => `${cap(topicPhrase())} — ${cap(makeTitle(3))}\n${makeShort(1)}`).join('\n\n') }),
  skills_list:         () => ({ label: 'Skills list',           content: `Skills: ${topicPhrase()}, ${cap(makeTitle(2))}, ${cap(makeTitle(2))}, ${cap(makeTitle(2))}, ${cap(makeTitle(2))}` }),
  work_intro:          () => ({ label: 'Work page intro',       content: `Selected work\nA collection of ${topicPhrase()} projects for ${audiencePhrase()}.` }),
  project_cards:       () => ({ label: 'Project cards',         content: [1,2,3].map(i => `${cap(topicPhrase())} project ${i}\n${makeShort(1)}\nCategory: ${cap(makeTitle(2))}`).join('\n\n') }),
  project_title:       () => ({ label: 'Project title & meta',  content: `${cap(topicPhrase())} — ${brandOrFallback()}\nClient: ${cap(makeTitle(2))} · Year: ${rnd(2021,2025)} · Role: ${cap(makeTitle(3))}` }),
  project_overview:    () => ({ label: 'Project overview',      content: makePara(0, false) }),
  project_process:     () => ({ label: 'Process',               content: makePara(1, false) }),
  project_outcome:     () => ({ label: 'Outcome',               content: `${makeShort(2)}\n\nResult: ${makeShort(1)}` }),
  welcome_text:        () => ({ label: 'Welcome text',          content: `Welcome to ${brandOrFallback()}. ${makeShort(2)}` }),
  highlights:          () => ({ label: 'Highlights',            content: [`${cap(topicPhrase())} speciality: ${makeShort(1)}`, `Perfect for ${audiencePhrase()}: ${makeShort(1)}`, `${cap(toneAdj())} experience: ${makeShort(1)}`].join('\n\n') }),
  hours_location:      () => ({ label: 'Hours & location',      content: `${rnd(10,999)} ${cap(makeTitle(2))} St · +1 (555) ${rnd(100,999)}-${rnd(1000,9999)}\nMon–Thu: 11am–10pm · Fri–Sat: 11am–11pm · Sun: 12pm–9pm` }),
  menu_intro:          () => ({ label: 'Menu intro',            content: `Our menu celebrates ${topicPhrase()} for ${audiencePhrase()}. ${makeShort(1)}` }),
  starters:            () => ({ label: 'Starters',              content: [1,2,3].map(() => `${makeProductName()} — $${rnd(8,18)}\n${makeShort(1)}`).join('\n\n') }),
  mains:               () => ({ label: 'Mains',                 content: [1,2,3,4].map(() => `${makeProductName()} — $${rnd(16,42)}\n${makeShort(1)}`).join('\n\n') }),
  desserts:            () => ({ label: 'Desserts',              content: [1,2].map(() => `${makeProductName()} — $${rnd(7,14)}\n${makeShort(1)}`).join('\n\n') }),
  drinks:              () => ({ label: 'Drinks',                content: `Soft drinks: $${rnd(3,5)} · Craft beers: $${rnd(6,9)} · Wine by glass: $${rnd(8,14)} · Cocktails: $${rnd(10,16)}` }),
  chef_bio:            () => ({ label: 'Chef bio',              content: `Head chef ${cap(pick())} ${cap(pick())} brings ${rnd(10,30)} years of expertise in ${topicPhrase()} to ${brandOrFallback()}. ${makeShort(2)}` }),
  reservation_intro:   () => ({ label: 'Reservations intro',   content: `Reserve your table at ${brandOrFallback()}\n${makeShort(2)}` }),
  reservation_notes:   () => ({ label: 'Reservation notes',    content: `We welcome ${audiencePhrase()} for lunch and dinner. ${makeShort(2)}` }),
  services_intro:      () => ({ label: 'Services intro',       content: `What we do\n${brandOrFallback()} delivers ${toneAdj()} ${topicPhrase()} services for ${audiencePhrase()}.` }),
  services_hero:       () => ({ label: 'Services page hero',   content: `${cap(toneAdj())} ${topicPhrase()} services\n${makeShort(2)}` }),
  service_blocks:      () => ({ label: 'Service blocks',       content: [1,2,3,4].map(i => `Service ${i}: ${cap(topicPhrase())}\n${makeShort(2)}\nCTA: Learn more`).join('\n\n') }),
  values:              () => ({ label: 'Values',               content: [`Quality: ${makeShort(1)}`, `Integrity: ${makeShort(1)}`, `Impact: ${makeShort(1)}`].join('\n\n') }),
  impact_stats:        () => ({ label: 'Impact stats',         content: `${rnd(1000,50000).toLocaleString()} people served · ${rnd(10,200)} programs · ${rnd(5,50)} countries · $${rnd(1,20)}M raised` }),
  cta_donate:          () => ({ label: 'Donate CTA',           content: `Support ${topicPhrase()} today\nYour donation helps ${audiencePhrase()}. Every contribution counts.\nCTA: Donate now` }),
  programs_intro:      () => ({ label: 'Programs intro',       content: `Our programs\n${brandOrFallback()} runs ${topicPhrase()} programs serving ${audiencePhrase()} worldwide.` }),
  program_blocks:      () => ({ label: 'Program blocks',       content: [1,2,3].map(i => `Program ${i}: ${cap(topicPhrase())}\n${makeShort(2)}`).join('\n\n') }),
  getinvolved_intro:   () => ({ label: 'Get involved intro',   content: `Get involved\nThere are many ways to support ${topicPhrase()} at ${brandOrFallback()}.` }),
  volunteer_text:      () => ({ label: 'Volunteer text',       content: `Volunteer with ${brandOrFallback()} and help ${audiencePhrase()}. ${makeShort(2)}` }),
  donate_text:         () => ({ label: 'Donate text',          content: `Your donation directly funds ${topicPhrase()} for ${audiencePhrase()}. ${makeShort(2)}` }),
  catalog_intro:       () => ({ label: 'Catalog intro',        content: `${cap(topicPhrase())} — all products\n${makeShort(2)}` }),
};

function callSec(sid) {
  const g = SECTION_GEN[sid];
  if (!g) return { label: sid, content: makeShort(2) };
  try { return g(); } catch(e) { return { label: sid, content: makeShort(2) }; }
}

/* ── SITE PAGES ── */
const SITE_PAGES = {
  ecommerce: [
    { id:'home',            name:'Home',           desc:'Hero, CTA, products',  sections:['hero','value_props','featured_products','testimonials','cta_banner'] },
    { id:'about',           name:'About us',        desc:'Story, mission, team', sections:['about_hero','our_story','mission','team_bios'] },
    { id:'products',        name:'Products',        desc:'Catalog listing',      sections:['catalog_intro','product_cards','filter_labels'] },
    { id:'product_detail',  name:'Product detail',  desc:'Single product page',  sections:['product_title','product_description','product_specs','reviews'] },
    { id:'cart',            name:'Cart / Checkout', desc:'Cart page copy',       sections:['cart_empty','cart_summary','checkout_cta','trust_badges'] },
    { id:'faq',             name:'FAQ',             desc:'Common questions',     sections:['faq_intro','faq_items'] },
    { id:'contact',         name:'Contact',         desc:'Contact & support',    sections:['contact_intro','contact_details','support_text'] },
    { id:'terms',           name:'Terms & Privacy', desc:'Legal pages',          sections:['terms_intro','privacy_policy','cookie_notice'] },
  ],
  blog: [
    { id:'home',       name:'Home',          desc:'Hero, posts, CTA',    sections:['hero','featured_post','recent_posts','newsletter_cta'] },
    { id:'about',      name:'About',         desc:'Author / publication', sections:['about_hero','author_bio','editorial_mission'] },
    { id:'article',    name:'Article page',  desc:'Blog post layout',    sections:['article_title','article_intro','article_body','author_box'] },
    { id:'category',   name:'Category page', desc:'Filtered posts',      sections:['category_intro','post_cards'] },
    { id:'contact',    name:'Contact',       desc:'Get in touch',        sections:['contact_intro','contact_details'] },
    { id:'newsletter', name:'Newsletter',    desc:'Subscription page',   sections:['newsletter_hero','newsletter_benefits','newsletter_form'] },
  ],
  saas: [
    { id:'home',     name:'Home',           desc:'Hero, features, CTA', sections:['hero','features','social_proof','pricing_intro','cta_banner'] },
    { id:'about',    name:'About',          desc:'Company & mission',   sections:['about_hero','our_story','mission','team_bios'] },
    { id:'features', name:'Features',       desc:'Detailed features',   sections:['features_hero','feature_blocks'] },
    { id:'pricing',  name:'Pricing',        desc:'Plans & FAQ',         sections:['pricing_hero','pricing_plans','pricing_faq'] },
    { id:'docs',     name:'Docs / Help',    desc:'Documentation',       sections:['docs_intro','getting_started','api_overview'] },
    { id:'blog',     name:'Blog',           desc:'Updates & articles',  sections:['blog_hero','featured_post','recent_posts'] },
    { id:'contact',  name:'Contact',        desc:'Sales & support',     sections:['contact_intro','contact_details','support_text'] },
    { id:'terms',    name:'Terms & Privacy',desc:'Legal pages',         sections:['terms_intro','privacy_policy','cookie_notice'] },
  ],
  portfolio: [
    { id:'home',    name:'Home',           desc:'Hero & intro',   sections:['hero','about_short','selected_work','cta_banner'] },
    { id:'about',   name:'About',          desc:'Bio & skills',   sections:['about_hero','author_bio','skills_list'] },
    { id:'work',    name:'Work',           desc:'Projects list',  sections:['work_intro','project_cards'] },
    { id:'project', name:'Project detail', desc:'Case study',     sections:['project_title','project_overview','project_process','project_outcome'] },
    { id:'contact', name:'Contact',        desc:'Hire me',        sections:['contact_intro','contact_details'] },
  ],
  restaurant: [
    { id:'home',         name:'Home',        desc:'Hero & welcome', sections:['hero','welcome_text','highlights','hours_location'] },
    { id:'menu',         name:'Menu',         desc:'Food & drinks',  sections:['menu_intro','starters','mains','desserts','drinks'] },
    { id:'about',        name:'About',        desc:'Story & chef',   sections:['about_hero','our_story','chef_bio'] },
    { id:'reservations', name:'Reservations', desc:'Booking page',   sections:['reservation_intro','reservation_notes','contact_details'] },
    { id:'contact',      name:'Contact',      desc:'Find us',        sections:['contact_intro','contact_details','hours_location'] },
  ],
  agency: [
    { id:'home',     name:'Home',     desc:'Hero & services', sections:['hero','services_intro','selected_work','testimonials','cta_banner'] },
    { id:'about',    name:'About',    desc:'Team & values',   sections:['about_hero','our_story','values','team_bios'] },
    { id:'services', name:'Services', desc:'What we offer',   sections:['services_hero','service_blocks'] },
    { id:'work',     name:'Work',     desc:'Case studies',    sections:['work_intro','project_cards'] },
    { id:'contact',  name:'Contact',  desc:'Get a quote',     sections:['contact_intro','contact_details'] },
  ],
  nonprofit: [
    { id:'home',         name:'Home',        desc:'Mission & impact',   sections:['hero','mission','impact_stats','cta_donate'] },
    { id:'about',        name:'About',        desc:'Story & team',       sections:['about_hero','our_story','mission','team_bios'] },
    { id:'programs',     name:'Programs',     desc:'What we do',         sections:['programs_intro','program_blocks'] },
    { id:'get_involved', name:'Get involved', desc:'Volunteer & donate', sections:['getinvolved_intro','volunteer_text','donate_text'] },
    { id:'contact',      name:'Contact',      desc:'Reach out',          sections:['contact_intro','contact_details'] },
  ],
};

/* ── PAGE SELECTION STATE ── */
let selectedPages = new Set();

/* ── TAB SWITCHER ── */
window.switchTab = function(t) {
  ['lorem','website'].forEach(name => {
    document.getElementById('tab-' + name).classList.toggle('active', name === t);
    document.getElementById('tbtn-' + name).classList.toggle('active', name === t);
  });
};

/* ── LOREM TAB ── */
window.updateLoremLabel = function() {
  const t = document.getElementById('l-type').value;
  document.getElementById('l-count-lbl').textContent = { paragraphs:'Count', sentences:'Count', words:'Word count', bytes:'Bytes' }[t];
  document.getElementById('l-count').value           = { paragraphs:3, sentences:10, words:50, bytes:500 }[t];
};

window.genLorem = function() {
  const type  = document.getElementById('l-type').value;
  const count = Math.max(1, Math.min(200, parseInt(document.getElementById('l-count').value) || 3));
  const sl    = document.getElementById('l-start').checked;
  const ht    = document.getElementById('l-html').checked;
  const ac    = document.getElementById('l-caps').checked;
  let paras   = [];

  if (type === 'paragraphs') {
    for (let i = 0; i < count; i++) paras.push(makePara(i, sl));
  } else if (type === 'sentences') {
    let ss = sl ? [LOREM_START] : [];
    while (ss.length < count) ss.push(makeSent());
    ss = ss.slice(0, count);
    for (let i = 0; i < ss.length; i += 5) paras.push(ss.slice(i, i+5).join(' '));
  } else if (type === 'words') {
    let ws = sl ? LOREM_START.replace(/[.,]/g,'').split(' ') : [];
    while (ws.length < count) ws.push(pick());
    paras = [cap(ws.slice(0, count).join(' ')) + '.'];
  } else {
    let t2 = sl ? LOREM_START + ' ' : '';
    while (t2.length < count) t2 += makeSent() + ' ';
    paras = [t2.slice(0, count).trim()];
  }

  if (ac) paras = paras.map(p => p.toUpperCase());
  const result = ht ? paras.map(p => `<p>${p}</p>`).join('\n') : paras.join('\n\n');

  const el = document.getElementById('l-out');
  el.textContent = result;
  el.classList.remove('placeholder');

  const plain = result.replace(/<[^>]*>/g, '');
  document.getElementById('l-sw').textContent = plain.trim().split(/\s+/).filter(Boolean).length.toLocaleString();
  document.getElementById('l-sc').textContent = plain.length.toLocaleString();
  document.getElementById('l-ss').textContent = (plain.match(/[.!?]+/g) || []).length.toLocaleString();
  document.getElementById('l-sp').textContent = paras.length.toLocaleString();

  const cb = document.getElementById('l-copy');
  cb.textContent = 'Copy'; cb.className = 'btn-sec';
};

/* ── WEBSITE TAB ── */
window.updatePages = function() {
  const type  = document.getElementById('w-type').value;
  const pages = SITE_PAGES[type];
  const grid  = document.getElementById('pages-grid');
  grid.innerHTML = '';
  selectedPages  = new Set(pages.map(p => p.id));
  pages.forEach(page => {
    const card = document.createElement('div');
    card.className = 'page-card sel'; card.dataset.id = page.id;
    card.innerHTML = `<div class="pc-check"></div><div class="pc-name">${page.name}</div><div class="pc-desc">${page.desc}</div>`;
    card.onclick = () => {
      if (selectedPages.has(page.id)) { selectedPages.delete(page.id); card.classList.remove('sel'); }
      else { selectedPages.add(page.id); card.classList.add('sel'); }
    };
    grid.appendChild(card);
  });
  document.getElementById('w-output').innerHTML = '';
};

window.selectAll  = () => { const t = document.getElementById('w-type').value; SITE_PAGES[t].forEach(p => { selectedPages.add(p.id); document.querySelector(`.page-card[data-id="${p.id}"]`)?.classList.add('sel'); }); };
window.selectNone = () => { selectedPages.clear(); document.querySelectorAll('.page-card').forEach(c => c.classList.remove('sel')); };

window.genWebsite = function() {
  const type  = document.getElementById('w-type').value;
  const pages = SITE_PAGES[type].filter(p => selectedPages.has(p.id));
  const out   = document.getElementById('w-output');
  out.innerHTML = '';

  if (!pages.length) {
    out.innerHTML = '<p style="color:var(--muted2);font-size:13px;padding:1rem 0;">Select at least one page above.</p>';
    return;
  }

  const b   = brandOrFallback(), tp = topicPhrase(), aud = audiencePhrase();
  const parts = [];
  if (document.getElementById('w-brand').value.trim())    parts.push(`Brand: ${b}`);
  if (document.getElementById('w-topic').value.trim())    parts.push(`Topic: ${tp}`);
  if (document.getElementById('w-audience').value.trim()) parts.push(`Audience: ${aud}`);
  if (parts.length) {
    const info = document.createElement('div');
    info.className = 'info-box';
    info.textContent = 'Generating for — ' + parts.join(' · ');
    out.appendChild(info);
  }

  pages.forEach(page => {
    const div = document.createElement('div'); div.className = 'page-output';
    const sections = page.sections.map(sid => callSec(sid));
    div.innerHTML = `
      <div class="page-output-header">
        <h3>${page.name}</h3>
        <span class="page-badge">${page.sections.length} section${page.sections.length > 1 ? 's' : ''}</span>
      </div>
      ${sections.map((s, i) => `
        <div class="section-block">
          <div class="section-block-top">
            <div class="section-block-title">${s.label}</div>
            <button class="copy-small" onclick="copySection(this,'${page.id}-${i}')">Copy</button>
          </div>
          <div class="section-block-content" id="sec-${page.id}-${i}">${s.content}</div>
        </div>
      `).join('')}`;
    out.appendChild(div);
    const d = document.createElement('div'); d.className = 'divider'; out.appendChild(d);
  });
  out.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ── COPY HELPERS ── */
window.copySection = function(btn, id) {
  const el = document.getElementById('sec-' + id); if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    btn.textContent = 'Copied!'; btn.className = 'copy-small ok';
    setTimeout(() => { btn.textContent = 'Copy'; btn.className = 'copy-small'; }, 2000);
  });
};

window.copyAllPages = function() {
  const blocks = document.querySelectorAll('.page-output'); if (!blocks.length) return;
  let text = '';
  blocks.forEach(po => {
    const h = po.querySelector('h3'); if (h) text += '\n\n=== ' + h.textContent + ' ===\n';
    po.querySelectorAll('.section-block').forEach(sb => {
      const t = sb.querySelector('.section-block-title'), c = sb.querySelector('.section-block-content');
      if (t && c) text += '\n-- ' + t.textContent + ' --\n' + c.textContent + '\n';
    });
  });
  if (!text.trim()) return;
  navigator.clipboard.writeText(text.trim()).then(() => {
    const b = document.getElementById('w-copy-all'); b.textContent = 'Copied!'; b.className = 'btn-sec ok';
    setTimeout(() => { b.textContent = 'Copy all'; b.className = 'btn-sec'; }, 2500);
  });
};

window.copyEl = function(srcId, btnId) {
  const el = document.getElementById(srcId); const text = el.textContent;
  if (!text || el.classList.contains('placeholder')) return;
  navigator.clipboard.writeText(text).then(() => {
    const b = document.getElementById(btnId); b.textContent = 'Copied!'; b.className = 'btn-sec ok';
    setTimeout(() => { b.textContent = 'Copy text'; b.className = 'btn-sec'; }, 2000);
  });
};

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  updatePages();
  genLorem();
});
