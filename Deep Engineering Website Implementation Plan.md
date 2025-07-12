Deep Engineering Website Implementation Plan
 This implementation plan is structured into sequential phases, each building on the previous, to guide an
 internal development team in creating the Deep Engineering static website. The site will use Next.js with
 Tailwind CSS for frontend development, Sanity (headless CMS) for content management, and target a
 static deployment on a cPanel environment via Next.js static export. Each phase below outlines its
 objectives, tasks & deliverables, technologies involved, and prerequisites.
 Phase 1: Project Kickoff and Setup
 • 
• 
• 
• 
• 
• 
Objectives: Establish the project’s technical foundation and ensure all core tools and frameworks are
 in place. Prepare the development environment for Next.js + Tailwind and integrate Sanity for CMS
 content.
 Tasks & Deliverables:
 Initialize a new Next.js project (using the latest version, e.g. Next 13+). Set up the code repository
 and base project structure (choose TypeScript for reliability if the team is comfortable, otherwise
 JavaScript).
 Install and configure Tailwind CSS in the Next.js project (using 
postcss and 
autoprefixer ).
 Verify that Tailwind’s utility classes can be used in Next.js pages.
 Decide on Next.js routing strategy: either the traditional pages directory or the newer App Router
 (Next 13+). Given the need for static export, using the Pages router might be simpler, but the App
 router can also work with static generation. Document the choice for consistency in development.
 Set up the base project to be export-ready: ensure that dynamic data will be fetched via 
getStaticProps /
 • 
• 
• 
• 
• 
• 
• 
getStaticPaths (in Pages router) or the equivalent static data fetching in
 App router, since we intend to generate a fully static site.
 Deliverable: A “Hello World” Next.js application running locally, with Tailwind integrated (e.g.,
 background color or text style test to confirm), and version control repository initialized.
 Technologies/Libraries: Next.js (React framework), Tailwind CSS, Node.js (for development), Git (for
 version control). No content or CMS yet beyond placeholders.
 Prerequisites/Dependencies:
 Node.js and package manager (npm or yarn) installed on dev machines.
 A Git repository (e.g., on GitHub or internal server) created for the project.
 Access to the Deep Engineering UI/UX & Content Guide to inform subsequent phases.
 (If not already decided, obtaining the company logo and any brand assets to include in the project
 from the start would be helpful for later phases.)
 1
Phase 2: Visual Design and Theming
 • 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
Objectives: Define and implement the website’s visual design language (colors, typography, UI
 elements) to ensure a consistent and brand-aligned UI across all pages. This phase establishes the
 design system before heavy development begins.
 Tasks & Deliverables:
 Configure Tailwind’s theme with Deep Engineering’s brand colors and fonts. For example, add
 custom color entries for primary and secondary brand colors (the guide suggests a deep blue 
#18335a as primary and a bright blue 
#2150FE as secondary
 utility classes (e.g. 
text-primary , 
1
 ). These will be referenced via
 bg-primary ) throughout the site.
 Integrate brand typography: use Crimson Pro (serif) for headings and Heebo (sans-serif) for body
 text as specified in the design guidelines
 2
 mapped to "Crimson Pro" and 
. Set up Tailwind font families (e.g., 
font-serif
 font-sans to "Heebo"
 3
 Fonts or a local hosting) in the global CSS or 
). Include the fonts via import (Google
 _document head.
 Establish a typographic scale and styles: define heading sizes (e.g., H1, H2, H3) and body text sizes in
 CSS/Tailwind. Ensure large, legible fonts for hero sections (the hero title might be ~4rem on desktop
 as per guide suggestions
 4
 ) and a clear hierarchy of headings vs. body text.
 Define reusable UI component styles consistent with the brand: e.g., a primary button style (filled
 with primary color) and secondary button style (outline or ghost) for CTAs
 5
 , form input styles
 (light gray backgrounds, small border-radius, focus outline in brand color ), card styles (with
 maybe a subtle shadow).
 Incorporate iconography: set up an icon library such as Heroicons (as recommended in the guide)
 for a consistent icon style
 5
 6
 7
 . E.g., import Heroicons React package or use SVGs for icons like a leaf,
 lightning bolt, etc., which will be used later in features and benefits.
 Ensure visual consistency checks: verify color contrast (the deep blue on white for text is good; avoid
 low-contrast gray on white ) and overall accessibility (legible font sizes, alt text usage plans). This
 may involve setting some global CSS or Tailwind config for link hover styles, focus states, etc.
 Create a simple style guide page or component preview (for internal use) to demonstrate the above:
 e.g., show headings, paragraphs, a button, an icon, etc., to ensure the theme is correctly applied.
 Deliverable: The project’s design theme is implemented – this includes the Tailwind configuration
 for colors & fonts, base global styles, and sample styled components – providing a ready-to-use
 design foundation for all upcoming pages.
 Technologies/Libraries: Tailwind CSS (with customized 
similar) 
for 
tailwind.config.js ), Google Fonts (or
 custom fonts, Heroicons (for icons), possibly Tailwind plugins like
 @tailwindcss/forms for better form styling consistency. No new runtime libraries beyond styling
 at this stage.
 Prerequisites/Dependencies:
 Brand style guide details (color hex codes, font files or references) – much of which is provided by the
 UI/UX guide.
 Decision on any design framework or just Tailwind (here we opt for Tailwind only, as planned).
 2
• 
The design/UX guide document to ensure implementation matches the intended style (“Blues, grays,
 bright, professional, modern” aesthetic ).
 8
 Phase 3: Content Architecture and CMS Setup (Sanity)
 • 
• 
• 
Objectives: Design the content structure and establish a headless CMS (Sanity) to manage all site
 content. This phase creates the schemas and connections so that developers and content editors can
 work in parallel. The goal is to store all textual content, images, and data (projects, team profiles,
 etc.) in Sanity, enabling Next.js to fetch it at build time for static generation .
 Tasks & Deliverables:
 9
 Set up a new Sanity Studio project (if not already done) for Deep Engineering. Define the dataset
 (probably "production" dataset) and obtain API credentials (project ID, dataset name, read token if
 private).
 • 
• 
• 
• 
◦ 
Design content schemas in Sanity corresponding to the site’s content architecture:
 Page Schemas: e.g., a schema for Homepage content (fields for hero tagline, subtagline,
 featured highlights like technology overview snippet, projects highlight, about snippet, etc.),
 an About page schema (fields for company description, focus areas, etc.), and a Contact page
 schema (fields for addresses, contact intro text, etc.). For multi-section pages, consider
 structuring these with either multiple field groups or referencing sub-schemas (like an array
 of team references for an “Our Team” section on About if needed).
 ◦ 
◦ 
◦ 
◦ 
Technology Section Schemas: Create documents for each subpage in Technology: KPP
 Overview, How KPP Works, KPP Components, Performance & Specs. Each should have
 f
 ields as per the content guide (e.g., Overview with a rich text for description and a list of key
 benefits; How KPP Works with rich text or structured content for each step and maybe an
 array of media for diagrams; Components with an array of component items (name,
 description, image/icon, spec highlights); Performance & Specs with fields for various
 technical metrics and environmental info).
 Projects Schema: define a Project document type with fields like name, location, capacity
 (MW), status, description, and an image. This will allow listing multiple projects. Each project
 may also have a slug if individual project pages are planned.
 Team Schema: define a TeamMember document with fields: name, title/role, photo, short
 bio, and perhaps a category or team group if needed. These will feed the Team page.
 Global/Settings Schema: for items like company addresses, contact email/phone, social
 media links, etc., which appear in Contact page or footer. Alternatively, these can be part of
 the Contact page schema.
 Implement the schemas in the Sanity Studio project (coding the schema definitions in JavaScript/
 TypeScript as per Sanity conventions). Deploy or host the Sanity Studio for content editors to use
 (could be local for dev or deployed as Sanity’s managed studio).
 Populate some initial content in Sanity for development/testing: e.g., enter one example project, one
 team member, some placeholder text for pages (based on the content guide’s copy suggestions).
 Integrate Sanity into the Next.js app:
 ◦ 
◦ 
Install Sanity’s client library (
 @sanity/client for Sanity v2 or 
@sanity/client /
 @sanity/image-url for v3) in the Next project.
 Create a configuration for the Sanity client with the project ID and dataset (and read token if
 needed).
 3
◦ 
◦ 
• 
Write sample GROQ queries to fetch content for, say, the homepage or a test query for one
 project to ensure connectivity.
 Ensure that Next.js can fetch data at build-time: plan to use 
9
 getStaticProps on each page
 to retrieve the needed content from Sanity. (This is how we will generate static pages with
 fresh content .)
 Deliverable: A fully configured Sanity CMS with all necessary schemas and some seed content, plus
 a working integration where Next.js can successfully fetch data from Sanity. The content architecture
 (what content is stored where) should be documented for the team.
 • 
• 
• 
• 
• 
• 
Technologies/Libraries: Sanity (CMS, including Sanity Studio and GROQ query language), Sanity
 JavaScript client, possibly Sanity’s image URL builder for handling images. Next.js data fetching
 methods for static props. 
Prerequisites/Dependencies:
 A Sanity account and project set up for the organization.
 Decision on content structure based on the provided content guide (already defined in this phase’s
 tasks).
 Content from stakeholders to input (the guide provides a lot of copy and structure
 10
 11
 , which can
 be used as initial content in the CMS).
 Access to any existing images or media (e.g., KPP diagrams, project photos, team headshots) to
 upload to the CMS library.
 Phase 4: Global Layout and Navigation Structure
 • 
• 
• 
• 
Objectives: Implement the site-wide layout components – primarily the header (navigation menu)
 and footer – to enable user navigation through all main pages. This phase focuses on the structural
 shell of the site, ensuring every page has the necessary navigation and consistent layout.
 Tasks & Deliverables:
 Develop a Header component that includes the company logo and the primary navigation menu.
 The menu should list: Home, About, Technology, Projects, Team, Contact
 12
 . For the "Technology"
 menu item, implement a dropdown sub-menu showing the subpages (Overview, How It Works,
 Components, Performance & Specs) – as suggested, this can either be a true dropdown menu or
 simply make "Technology" a link to the Overview page and have links within that page. A dropdown
 provides direct access; plan for keyboard accessibility in the dropdown.
 Implement responsive navigation: on mobile view, use a hamburger menu that toggles the menu
 items. This can be done with a small React state to show/hide the 
• 
<ul> of links. (Optionally use a
 library like Headless UI for a prebuilt accessible menu, or implement a custom solution ensuring
 proper focus trapping and aria attributes for accessibility.)
 Make the header sticky so that it remains at the top of the viewport on scroll
 classes (
 13
 . Use Tailwind
 sticky top-0 ) and ensure it has appropriate background (e.g., white or semi-transparent
 with backdrop blur if design calls for it) so that it remains visible.
 4
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
• 
Style the nav links according to the theme: e.g., normal state, hover state (the guide suggests a
 hover underline or color change using the primary color
 14
 highlights (
 ). Use the brand colors for hover
 15
 hover:text-primary as seen in code examples ).
 Include the logo: place the company logo (likely provided as an SVG/PNG) in the header, linked to the
 homepage. Ensure it scales nicely on mobile vs desktop.
 Develop a Footer component to appear on all pages. The footer can repeat the main navigation
 links for convenience, and list contact info (address, phone, email) and any social media icons/links if
 applicable
 12
 . Use a simpler style in the footer (smaller text) and perhaps the primary color as
 background with white or muted text for contrast.
 Make sure the header and footer are included on every page. In Next.js, this can be done by adding
 them in a custom 
_app.js (for Pages router) or as part of a shared layout in App router.
 Alternatively, create a Layout component that wraps page content.
 Test navigation: clicking links should navigate without full page reload (Next.js Link component). The
 Technology dropdown links should go to the correct anchor or page. The mobile menu should open/
 close correctly.
 Deliverable: A functioning global navigation system (header + footer) present on all pages, styled
 consistently with the design. This will serve as the template into which page content is inserted in
 subsequent phases.
 Technologies/Libraries: Next.js (layout or 
_app for persistent components), Tailwind CSS for
 styling, Heroicons for any icons (e.g., menu icon, social icons), optionally Headless UI for menu if
 desired, React state/hooks for menu toggle.
 Prerequisites/Dependencies:
 12
 Finalized list of navigation links (confirm if "Team" is a separate page as decided, which the guide
 indicates it is ).
 Company logo asset.
 Social media links or confirmation if none (to include in footer).
 Basic pages or placeholders for each target page (so navigation links won’t be broken – e.g., create
 blank pages for About, Contact, etc., if not done yet).
 Phase 5: Homepage Development
 • 
• 
• 
Objectives: Create the Homepage with all its key sections as the front door to the site. It should
 provide a high-level overview and guide users to detailed pages for technology, projects, and about.
 The homepage needs to be visually engaging and informative.
 Tasks & Deliverables:
 Implement the Hero section at the top of the homepage. This is a full-screen (above the fold) section
 with a powerful tagline and background visual
 10
 . Use the content from CMS for the hero text: a
 concise tagline like “Continuous Clean Energy, Anywhere.” and a sub-tagline that briefly explains KPP
 (e.g., “Delivering 24/7 renewable power through revolutionary Kinetic Power Plant technology – no fuel, no
 emissions.” as suggested
 16
 ). Overlay this text on a background image or subtle animated
 background. For example, consider using a short looping video or animation with abstract elements
 5
. Ensure text
 17
 • 
• 
◦ 
like water bubbles or kinetic motion, as long as it’s subtle and does not obscure text
 remains highly readable (use an overlay or gradient if needed for contrast).
 Add a clear Call-to-Action (CTA) button on the hero, such as “Contact Us” or “Learn More”. If
 “Contact Us”, link it to the Contact page or anchor; if a generic “Learn More”, it might scroll down to
 the next section or link to the About page. Style this button with the primary color and a hover effect
 (e.g., slight lift or ripple on hover) to draw attention .
 Below the hero, implement key highlight sections (as content “teasers” for deeper pages) :
 KPP Technology Overview Teaser: A brief summary of what KPP is and why it’s important, in
 a few sentences
 18
 19
 ◦ 
10
 . Include a small graphic or icon if available (perhaps a power icon or
 similar). End this section with a link or button “Learn about our Technology” that navigates to
 the KPP Overview page.
 Projects Snapshot: Highlight the scale of projects in development. For example, show a
 statistic like "300 MW in Kurdistan Region planned" as mentioned in the guide
 20
 ◦ 
• 
• 
, along with a
 short text about Deep Engineering’s projects. Provide a link “View Projects” leading to the
 Projects page. This could be presented as a nice infobox or card.
 About Us Summary: A concise introduction to Deep Engineering — e.g., “An Iraqi renewable
 energy project developer founded in 2019 in Erbil, focused on renewable generation, smart-grid
 retrofits, and project planning.”
 11
 . Include a small image (like the company or project photo)
 or icon, and a link “About Us” to the full About page. Emphasize the key achievements briefly
 (like “90 MW project in Samawah, 300 MW in development”
 21
 ) to build credibility.
 Ensure each of these sections uses consistent styling (perhaps alternating background colors or
 images for contrast between sections, while keeping within the brand palette).
 Make the homepage responsive: on mobile, the hero text should be centered and scaled down
 appropriately; sections should stack vertically, using carousels or scrollable sections if needed for
 any horizontal content.
 • 
• 
• 
• 
• 
• 
Content fetching: Use 
getStaticProps to pull all homepage content from Sanity – this likely
 comes from one “Homepage” document containing fields for each section. This allows editors to
 tweak the tagline or stats in the CMS and regenerate the site.
 Add basic animations for interactivity: e.g., fade in or slide up each section as it enters the viewport
 (using a library like Framer Motion to animate on scroll). These should be subtle and consistent in
 timing/easing
 22
 23
 so as to feel cohesive. If there are any important numbers (like the MW figure),
 consider an animated count-up effect when that element is visible .
 Deliverable: A fully implemented, content-rich homepage that presents an overview of Deep
 Engineering’s value proposition and links to all major sections. It should be polished in design and
 pulling live content from the CMS.
 Technologies/Libraries: Next.js page (index.js or similar), Tailwind CSS for layout and styling, Framer
 Motion for scroll animations (e.g., using 
whileInView or intersection observers), perhaps Next.js
 Image component for any inline images (configured for static export). Content from Sanity via GROQ
 query in getStaticProps.
 Prerequisites/Dependencies:
 Finalized homepage copy and media in CMS (tagline, intro texts, any image or video for hero/
 background).
 6
• 
• 
10
 Confirmation of which highlights to include (the guide outlines Technology, Projects, About as key
 sections
 – ensure corresponding content exists).
 Any graphic or video assets for the hero section prepared (or to use a stock abstract video if provided
 by design).
 Phase 6: About Page Implementation
 • 
• 
• 
Objectives: Build the About page to convey Deep Engineering’s background, mission, focus areas,
 team intro, and partnerships. This page should establish credibility and vision, aligning with the
 professional tone described.
 Tasks & Deliverables:
 ◦ 
Create the About page layout divided into logical sections (as suggested by the guide):
 Who We Are: A section describing the company’s background and mission. Include the
 founding info (e.g., founded in 2019 in Erbil with a branch in Basra) and the identity as an
 “Iraqi Renewable Energy Project Developer”
 ◦ 
11
 . This can be a couple of paragraphs drawn
 from CMS (rich text field).
 Our Focus: Highlight core focus areas such as renewable power generation, smart-grid
 retrofits, and project planning
 24
 ◦ 
◦ 
◦ 
• 
. This could be presented as a list of focus areas with icons
 (e.g., a solar panel icon for renewable generation, a network icon for smart-grid, etc.) and
 short descriptions for each.
 Our Team (Overview): Since there is a dedicated Team page, this section can either be a very
 brief introduction to the team or leadership (e.g., a group photo or a statement about having
 35 staff across various disciplines
 25
 26
 ). Optionally, include 2-3 key team members’ photos and
 names as a teaser, with a link/button to “Meet the Team” (leading to the Team page). If the
 decision is to include a grid of team profiles on the About page itself (as the guide initially
 suggests ), ensure those are pulled from the Team CMS data. However, to avoid
 duplication, likely we keep the full profiles on the Team page.
 Our Partners: Showcase the exclusive partnership with Rosch Innovations (the technology
 provider for KPP)
 27
 , and any other partners or affiliates. This might include logos of partner
 companies and a brief description of the partnership. E.g., Rosch’s logo and one-liner about
 providing KPP technology from Germany.
 Achievements/Milestones: (If not already covered in Who We Are) include key company
 achievements like “90 MW KPP project in Samawah delivered” and “300 MW in KRG in
 development”
 21
 , possibly formatted as a timeline or list of milestones. This demonstrates
 credibility and experience.
 Style each section consistently with the theme: use the brand colors for headings, perhaps a slight
 variation in background for alternate sections (white vs. gray background) to delineate sections. Use
 images if available – for example, a photograph of a project site or team at work for "Who We Are",
 and partner logos for "Partners".
 • 
Fetch content from Sanity: the About page can be driven by a single About document with multiple
 f
 ields (or references). Ensure all text (mission statement, focus area descriptions, etc.) is editable via
 CMS. For lists like focus areas or milestones, consider using Sanity arrays of objects (so editors can
 add focus items or milestones easily).
 7
• 
• 
• 
• 
• 
• 
• 
Ensure responsiveness and accessibility: long text sections should have adequate line length and
 font size for readability. Use semantic HTML for sections and headings (important for screen readers
 and SEO).
 Deliverable: The About page completed with all subsections, filled with content from CMS, and
 properly linked (including link to the Team page or any other relevant internal links). The page
 should effectively communicate the company’s mission and credentials in a visually engaging
 manner.
 Technologies/Libraries: Next.js page for About, Tailwind CSS, Next/Image for any images (like
 partner logos or photos), possibly a small carousel or lightbox if showcasing images (not explicitly
 required, only if needed for partner logos, etc.), and content from Sanity (About document, plus
 possibly pulling team or partner references).
 Prerequisites/Dependencies:
 Final content for company background, focus areas, partner details available in the CMS (or at least
 draft text from the guide to use initially).
 Logos or images for partners (Rosch Innovations, etc.) provided by the design/marketing team to
 include on the page.
 Decision on whether team profiles are shown here or exclusively on Team page (align with Phase 9
 plan to avoid duplication).
 Phase 7: Technology Section Pages Implementation
 • 
• 
• 
Objectives: Develop the multi-page Technology (KPP) section to educate visitors on the Kinetic
 Power Plant technology in depth. This includes four subpages: KPP Overview, How KPP Works, KPP
 Components, and Performance & Specs. These pages should be rich with information, diagrams,
 and interactive elements to convey technical concepts clearly.
 Tasks & Deliverables:
 Technology Overview page:
 ◦ 
◦ 
Create a page (
 /technology/overview or similar route) that explains what the Kinetic
 Power Plant (KPP) is and why it’s innovative. Use an approachable tone as if introducing the
 concept to a broad audience. For example, state that “The Kinetic Power Plant (KPP) is an
 innovative power generation system that uses buoyancy and gravity instead of fuel, producing
 electricity 24/7 with no combustion and zero emissions.”
 19
 to clearly communicate its unique
 value. Mention key points: it provides continuous clean power anywhere without reliance on
 weather or fuel, and it was developed by Rosch in Germany with global demos .
 List the key benefits of KPP on this page, perhaps as bullet points with icons: e.g., Clean (zero
 emissions), Continuous (24/7 operation), Decentralized (can be sited anywhere), Scalable (modular
 design) as noted in the content guide
 29
 28
 . Use the icons set up earlier (leaf, lightning bolt,
 6
 ◦ 
map marker, etc.) for visual cues .
 Include a call-to-action or link at the end of the overview inviting readers to dive into the
 technical details (link to the "How It Works" page).
 8
◦ 
• 
Content from CMS: this page corresponds to a "KPP Overview" document containing at least
 a couple of rich text fields (intro paragraph, maybe a secondary paragraph about Rosch
 partnership, and an array for benefits).
 “How KPP Works” page:
 ◦ 
◦ 
◦ 
◦ 
Develop a detailed page (
 /technology/how-it-works ) describing the science and
 mechanics behind KPP. Structure the content into steps or sections with clear subheadings as
 recommended
 30
 (e.g., "Buoyancy-Driven Motion", "Energy Conversion Cycle"). Each section
 should have a concise explanation.
 Use visuals heavily here: diagrams or illustrations for each step. If available, incorporate the
 step-by-step visuals from the KPP technical presentation (e.g., an “Air Driven Engine” diagram
 or similar)
 31
 . If a short explanatory video exists (perhaps provided by Rosch), embed it at an
 appropriate spot – Next.js can statically include a video file or embed YouTube. Ensure the
 video or animation has a fallback (like a poster image) for static export and is lazy-loaded.
 Implement an interactive or animated illustration if possible: for example, as the user
 scrolls, animate a floating buoy or moving chain to demonstrate the buoyancy principle. This
 could be achieved with Framer Motion or GSAP for scroll-triggered animations . For
 instance, using GSAP’s ScrollTrigger to tie an animation timeline to scroll position would
 create an engaging experience (note: this requires including GSAP library and is more
 advanced; ensure performance is tested).
 32
 33
 Keep text segments bite-sized near visuals to avoid overwhelming readers. Possibly use an
 accordion or tab interface for detailed technical explainer sections if content is very long, so
 the page remains navigable.
 ◦ 
• 
CMS content: this page would come from a "How KPP Works" document with structured
 content – maybe an array of steps, each having a title, text, and reference to an image or
 animation asset.
 KPP Components page:
 ◦ 
◦ 
◦ 
Create a page (
 /technology/components ) focusing on the system’s major components
 and design. It should list out each primary component of the KPP system: e.g., Floaters, 
Water Tank, Chain System, Generator, Air Compressor, Control System, etc. .
 For each component, present a brief description and a key technical highlight. For example: 
“500 kW Low-Speed Permanent Magnet Generator – runs at 375 RPM with ~95% efficiency, enabling
 direct grid connection without gearboxes.”
 34
 35
 . Use images or icons alongside text: perhaps a
 small schematic icon of the component or a representative graphic (e.g., a water drop icon for
 the water tank, a bolt or gear icon for mechanical parts, etc. as suggested ).
 Layout idea: You could use a two-column grid or cards for each component, or group them by
 category. If the content for each is short, one page is fine; if each component has lengthy
 info, consider splitting into multiple pages or an accordion UI where each component
 expands to show details
 36
 34
 . The content guide suggests splitting into part 1 and 2 if needed
 ◦ 
◦ 
• 
for too much content.
 Ensure consistency in how each component is presented (same structure for title, image,
 description).
 CMS: use a "Components" document that contains an array of component items (each with
 f
 ields for name, description, image, spec highlight). This allows editors to add/edit
 components easily. The Next.js page can then loop through this array to render the list.
 Performance & Specs page:
 ◦ 
Implement a page (
 /technology/performance ) that provides technical performance data
 and environmental impact information to build credibility. This should include stats like
 9
37
 ◦ 
◦ 
◦ 
◦ 
• 
◦ 
◦ 
module output options (e.g., 1 MW, 5 MW units), uptime (e.g., 100% availability), load profile
 characteristics, etc., as well as environmental stats (zero emissions, minimal water usage, e.g.,
 “<5% water recirculation needs periodic top-up”) .
 Present this information in a clear format. Possibly use infographics or big numbers with
 labels. For instance, a section could show "100% – KPP Availability (continuous operation)" or
 "0 – Fuel required (zero combustion)". Another section could detail environmental impacts in
 text.
 If there is a lot of technical data, break it into subsections: Performance and Environmental
 Impact, as the guide hints
 37
 . Use icons or simple charts if available (though for static
 export, charts can be images or pre-made SVGs).
 Consider including a downloadable spec sheet PDF if provided (not mentioned in content, but
 a possibility for users who want more).
 CMS: content for this can be part of a "PerformanceSpecs" document, with fields for each key
 data point or a rich text to format as needed. Alternatively, hardcode static text if these
 numbers are not expected to change often (though better to keep in CMS for consistency).
 12
 Navigation for Technology section: Implement an easy way to navigate between these pages:
 In the main navigation bar, if using a dropdown under Technology, ensure all four subpages
 are listed there for direct access .
 Also, on each technology page, consider adding a sub-menu or list of links to the other three
 pages (for example, a secondary nav bar or a sidebar menu for the technology section). This
 way, a user reading "How KPP Works" can quickly jump to "Components" or "Performance"
 without going back to main menu.
 ◦ 
• 
Possibly include a breadcrumb or at least a "Back to Overview" link on subpages.
 Maintain visual and interaction consistency:
 ◦ 
◦ 
38
 Use the same header style, fonts, and icon style across these pages. Lots of white space and
 clear typography will help convey a modern, clean design even with technical content.
 Use animations to enhance understanding: for example, animate a number counter for a key
 metric (like MW output) when it scrolls into view
 39
 , or use a small looping animation (maybe
 an SVG of a buoy moving) to keep pages lively. Keep these animations subtle and optimized
 (avoid large files, and respect 
prefers-reduced-motion for users who disable
 ◦ 
• 
40
 animations).
 Ensure performance: heavy animations or videos should be lazy-loaded and not block initial
 page load .
 Deliverable: The Technology section fully implemented as four interconnected pages, populated
 with content from the CMS and enriched with diagrams/animations. Each subpage should be
 accessible via the main nav dropdown and cross-links, providing a comprehensive overview and
 deep-dive into KPP technology.
 • 
• 
Technologies/Libraries: Next.js pages for each subpage (with appropriate routes or file structure),
 Tailwind for layout, Framer Motion for simple animations and reveal effects; possibly GSAP
 (GreenSock) with ScrollTrigger for complex scroll-bound animations (if needed for the How It Works
 41
 33
 page) , Lottie (with 
lottie-react ) if any Lottie animation files are provided (for example,
 an animated diagram or logo) . Next.js Image for images (with careful handling for static export). 
42
 Prerequisites/Dependencies:
 10
• 
• 
• 
• 
Detailed content for each page prepared or reviewed by subject matter experts (the UI/UX guide
 provides a strong outline to start
 19
 43
 34
 37
 , but actual copy and diagrams need to be finalized
 and added to CMS).
 Visual assets: diagrams of KPP, possibly an explanatory video or animation from Rosch, icons for
 each benefit and component. These should be gathered in advance.
 Familiarity of the dev team with animation libraries chosen (if GSAP is used, ensure someone can
 handle its integration; if not, stick to Framer Motion for simpler interactions).
 The navigation structure for these pages agreed (using either dropdown or overview page links, as
 implemented in Phase 4).
 Phase 8: Projects Page Implementation
 • 
• 
• 
• 
Objectives: Develop the Projects page to showcase Deep Engineering’s current and planned
 projects. This page should be dynamic, pulling project data from the CMS, and present each project
 in a visually appealing, informative manner.
 Tasks & Deliverables:
 Create the Projects page (
 44
 /projects ) to list all projects in a portfolio-like grid or list. Each Project
 card should feature key information: an image (project site photo or a representative image), project
 name, location, capacity (e.g., "100 MW"), status (e.g., Planned, In Progress, Completed with year),
 and a brief description . For example, a card might show “Zakho 100 MW – Planned (2025). Four KPP
 units of 25 MW each, providing continuous power to the region.” .
 Layout the project cards in a responsive grid using Tailwind (e.g., 1 column on mobile, 2 or 3 columns
 on larger screens with some gap between). Implement a hover effect on the cards to indicate
 45
 interactivity – such as a slight raise or shadow increase (
 hover:shadow-lg ) consistent with the
 design style .
 46
 • 
• 
Make the project data fully driven by CMS content. Use 
getStaticProps to fetch all entries of the
 Project document from Sanity. Loop through the data to render the cards. This way, adding a new
 project in Sanity will automatically show up on the next site rebuild .
 If required by design, implement project detail pages: The guide doesn’t explicitly say each project
 needs its own page, but if the brief descriptions on the cards are too short, consider that clicking a
 project could go to 
47
 /projects/[slug] for a dedicated page with more details (like a full
 description, multiple images, etc.). If so, implement 
getStaticPaths and 
getStaticProps for
 Project by slug and design a Project Detail template page. If not, ensure the Projects page itself
 contains sufficient info (maybe an expand-on-click for each card could be an alternative to separate
 pages).
 • 
• 
Provide a short intro section at the top of the Projects page. For example, a paragraph like: “Deep
 Engineering is currently developing 390 MW of KPP projects across Iraq to deliver clean energy where it’s
 needed most. Our projects range from large utility-scale plants to regional power solutions.”
 48
 . This sets
 context and can be a CMS-managed text field.
 Visual enhancements: If there are notable stats (like total MW under development), consider an
 animated counter or infographic at the top of the page for emphasis (e.g., "390 MW under
 development" counting up) . Ensure this is done in a performance-friendly way (possibly using
 23
 the intersection observer or Framer Motion’s 
• 
useAnimation to trigger when visible).
 Ensure images are optimized: use Next.js Image component for project images with appropriate 
fill or fixed sizes. Since we’ll export statically, configure Next to allow the Sanity image CDN
 11
domain or use the Sanity image builder URL. Alternatively, images can be downloaded and stored
 locally if easier for static export.
 • 
• 
• 
• 
• 
• 
• 
Deliverable: A Projects page displaying all projects from CMS in a grid with consistent styling,
 including project details at a glance. If detail pages are implemented, those should be fully
 functional and linked. The page should effectively communicate Deep Engineering’s project portfolio
 and scale.
 Technologies/Libraries: Next.js page for projects (and possibly dynamic [slug] page if needed),
 Tailwind CSS, Next/Image (configured for static use), Framer Motion for any animation on scroll (like
 counters or fade-ins), Sanity CMS for content.
 Prerequisites/Dependencies:
 Project content in CMS (each project’s data entered, along with images uploaded to Sanity or
 available).
 Any design assets like a map of Iraq with project locations, if such visual is desired (optional
 enhancement).
 Clarity on whether project detail pages are needed (if yes, require additional content per project such
 as a longer description or gallery of images).
 Ensure from Phase 4 that the navigation link to Projects is in place and tested.
 Phase 9: Team Page Implementation
 • 
• 
• 
• 
• 
• 
Objectives: Create the Team page to profile the leadership and key members of Deep Engineering,
 highlighting the team’s expertise and breadth. The page should be easy to update via CMS as
 personnel or roles change.
 Tasks & Deliverables:
 Develop the Team page (
 25
 /team ) to display team member profiles. Use a clean grid layout of cards
 or list items, each showing a headshot, the member’s name, title, and possibly a one-liner
 summary or area of expertise .
 For the layout, a grid of cards works well: for example, 3 or 4 columns on desktop, 1 or 2 on mobile.
 Each card includes the member’s photo (circular or rounded image using Tailwind classes like 
rounded-full or 
rounded-lg ), with their name and title underneath.
 Implement an interaction to show the member’s bio or more info. The guide suggests an
 expandable detail on click
 49
 ◦ 
◦ 
◦ 
 – this could be accomplished in two ways:
 Accordion style: Clicking a member card expands it (or reveals below it) a short bio
 paragraph for that person. Only one open at a time for simplicity.
 Modal popup: Clicking a card opens a modal with the full bio and perhaps additional details
 (allows showing more without affecting page layout).
 Choose the approach that best fits the content length. For a short bio, an accordion
 expansion might suffice. If using accordion, ensure smooth animation (Framer Motion can
 animate height changes, or use CSS transitions).
 Fetch the team members from the CMS. Use 
getStaticProps to retrieve all TeamMember
 documents. Each has the fields needed (name, title, bio, image URL). Then map over this data to
 12
create the profile entries. This way, adding a new team member in Sanity will reflect on the page on
 next build.
 • 
• 
• 
• 
• 
• 
• 
• 
• 
• 
50
 Emphasize diversity of expertise: potentially group team members by department or seniority if
 provided (not strictly needed, but if the list is long, grouping might improve clarity; since about ~35
 staff exist
 , but likely only key members will be shown).
 Maintain a minimalistic design for the cards: e.g., white background, subtle shadow, and on hover
 maybe lift a bit or show a slight outline – but keep it professional and clean.
 If relevant, include a section at the top of the Team page about the company culture or a statement
 from leadership, as the guide hints that the Team page can also emphasize company culture .
 This could be a short intro paragraph drawn from CMS.
 49
 Test the page for performance (lots of images can slow it down). Use appropriate image sizing for
 headshots (e.g., don’t load a huge image for a small thumbnail – Sanity’s image API can be used to
 get a sized image URL, or manually ensure uploaded images are not enormous). Also test the
 expand/collapse if using it, for any layout jumps or overflow issues.
 Deliverable: The Team page complete with all key team profiles displayed, with an interactive
 mechanism to view bios. Content fully managed via CMS (so updating a title or adding a member is
 straightforward through Sanity).
 Technologies/Libraries: Next.js page for Team, Tailwind CSS, possibly Framer Motion for animating
 card expansions or modals (could also use simple React state toggling), Next/Image for photos,
 Sanity for team content. If using a modal, a library like Headless UI’s Dialog could ensure
 accessibility, or implement with proper ARIA labels.
 Prerequisites/Dependencies:
 Team members’ information available in the CMS (names, roles, bios, photos). Photos should be
 prepared (cropped to a consistent aspect ratio, e.g., all square or same dimensions for uniform look).
 Decision on interaction pattern (expand vs modal) and ensure the team is okay with the approach for
 user experience.
 The navigation link to Team (from Phase 4) in place.
 Phase 10: Contact Page Implementation
 • 
• 
• 
• 
Objectives: Implement the Contact page to allow visitors to reach out to Deep Engineering and to
 provide necessary contact information. It should be straightforward and user-friendly, containing a
 form and contact details.
 Tasks & Deliverables:
 Create the Contact page (
 /contact ) with a clear header and introduction text (e.g., “Have questions
 or project inquiries? We’d love to hear from you.”
 51
 52
 , which can be managed via CMS for easy editing).
 Implement a contact form with fields: Name, Email, Message . Use proper form elements and
 labels. Leverage Tailwind’s forms plugin or styling to make the fields visually consistent (e.g., full
width fields with padding, a slight border radius, and focus state outline in the brand color as set in
 Phase 2).
 13
• 
53
 • 
• 
• 
◦ 
Add a Submit button for the form, styled as a primary CTA (brand colored background, white text,
 hover state) and clearly labeled (e.g., "Send Message" ).
 Handle form submission: Since the site will be static, a direct form post to a server is not built-in.
 Plan for one of these approaches:
 Use a third-party form service like Formspree, Getform, Netlify Forms (if static hosting
 allowed, but on cPanel perhaps not) or an email API (if the team can set up an endpoint). For
 simplicity, Formspree can be used by making the form post to their endpoint and they email
 the results.
 ◦ 
◦ 
◦ 
Alternatively, use a mailto link (less professional and can be spam-prone, so better to use an
 API).
 If cPanel allows server-side scripting (PHP), one could create a simple mail handler script and
 post the form via AJAX to that script.
 Document the chosen method and implement accordingly. Ensure that after submission, the
 user gets feedback: either a thank-you message on the page (you can display a success state
 by catching the response in client-side JS) or redirect to a thank-you page.
 Display the company’s contact information prominently on the Contact page, for those who prefer
 not to use the form:
 ◦ 
◦ 
◦ 
◦ 
54
 54
 Addresses: List the headquarters in Erbil and the branch office in Basra .
 Phone number: and Email address for direct contact .
 Possibly include office hours or a note if needed.
 These details should be stored in the CMS (maybe a “Contact Info” singleton document or
 part of the Contact page schema), so they can be updated easily (the guide explicitly says the
 content like addresses/emails should be CMS-editable ).
 Add an interactive element like an embedded Google Map showing the HQ location (optional but
 user-friendly). This could be an iframe embed. If not desired, a static map image or icon could be
 used.
 55
 • 
• 
• 
• 
• 
• 
Validate the form fields: ensure basic client-side validation (e.g., required fields, proper email
 format). You can use simple HTML5 validation or lightweight libraries. Also, implement spam
 protection measures like a hidden honeypot field or a CAPTCHA if spam is a concern (maybe not
 needed initially).
 Style everything to match the site: form elements using the same rounded corners and color focus
 as elsewhere, section spacing consistent with other pages, and perhaps an icon or image (like a
 contact illustration or just the map).
 Test the form thoroughly by sending test submissions and verifying they are received (if using an
 email service).
 Deliverable: A functional Contact page with a working contact form and up-to-date contact
 information displayed. The form submissions should reach the intended recipient (or be stored,
 depending on solution), and the page content should be fully editable via CMS for future updates to
 addresses or intro text.
 Technologies/Libraries: Next.js page for Contact, Tailwind CSS (forms plugin), possibly a form
 handling service (Formspree or similar) or a custom integration. If using a little client-side JS for form
 submission, that would be plain fetch/AJAX. Sanity for contact info content. Possibly Google Maps
 embed code for the map.
 Prerequisites/Dependencies:
 14
• 
• 
• 
• 
Decision on form backend: an account with Formspree or similar if chosen, or ability to create a
 server script on cPanel. Obtain any necessary API endpoint or email addresses to direct the form to.
 Contact info (addresses, phone, etc.) confirmed and entered in CMS.
 Ensure the site’s email (like info@deepengineering...) is set up if needed for receiving form emails.
 The navigation link to Contact (from Phase 4) should be in place.
 Phase 11: Testing, Optimization, and Static Deployment
 • 
• 
• 
• 
• 
• 
• 
Objectives: Rigorously test all aspects of the site, optimize performance and accessibility, and then
 generate the static build and deploy it to the cPanel hosting environment. This final phase ensures
 the site is launch-ready and maintainable.
 Tasks & Deliverables:
 Comprehensive Testing: Go through each page (Home, About, each Technology subpage, Projects,
 Team, Contact) on multiple devices and browsers. Verify layout is responsive (no broken sections on
 mobile or large screens). Test all links and navigation flows (including the Technology submenu links
 and any internal links like from homepage sections to deeper pages).
 Test interactive components: dropdown menus, modals/accordions for team bios, form submission
 on Contact (simulate or perform actual submissions), and any animations (make sure they trigger
 correctly and don’t cause jank).
 Perform an accessibility audit: Check that images have alt text (CMS should provide alt text fields
 for any images, or set default alt appropriately). Ensure keyboard navigation works (e.g., you can tab
 through the menu and form fields, and open the mobile menu via keyboard). Use tools or
 Lighthouse to catch contrast issues or missing labels.
 Performance Optimization: Optimize images and media. Since the site is static, ensure images are
 either properly sized in advance or use the Next/Image with 
◦ 
export-friendly configuration.
 Remove any unused Tailwind CSS (by default Tailwind will purge unused classes in production
 builds). Minify JS/CSS (Next does this in production mode).
 If any video is used in the hero, ensure it’s compressed and short, and consider lazy-loading it
 or providing a poster image.
 ◦ 
◦ 
Evaluate third-party scripts or heavy libraries: e.g., if GSAP is included but not heavily used,
 ensure tree-shaking is effective or consider only including parts of it. Framer Motion is
 generally lightweight, but double-check bundle size impact.
 Use Next.js’s 
<Link> prefetching and 
<Image> optimizations where possible to improve
 loading.
 Static Generation & Export: In Next.js config (
 next.config.js ), ensure the 
'export' (if using Next 13+) or simply run 
output: 
next build && next export . This will generate an 
out directory containing static HTML, CSS, JS, and assets for all pages. Make sure dynamic routes
 (e.g., project detail pages) are included in the export by properly using 
◦ 
◦ 
getStaticPaths .
 Before exporting, set any necessary environment variables or config for production (like
 Sanity read token if needed). The export will use the build-time content from Sanity. If content
 is updated later, a new export/build will be required to reflect changes.
 Verify the 
out folder structure: it should contain an 
index.html for home and folders for
 each page route (e.g., 
about/index.html , 
technology/overview/index.html , etc.).
 Next.js handles this automatically.
 15
• 
Local Static Verification: Serve the 
out folder locally (you can use a simple 
npx serve out or
 similar) to simulate the static host. Click through the site to ensure all links work when served from
 static files. Pay special attention to any client-side routing or asset loading issues. For example, check
 that the Contact form still works in this static context (if using Formspree, it will; if you had a Next
 API route for form, that wouldn’t work in static).
 ◦ 
• 
Also verify that the paths are correct (Next’s static export might produce client-side routing
 that requires a fallback in some cases – but since each page is exported as its own HTML,
 directly accessing any page should load fine. If any 404 arises on refresh of a subpage, an
 .htaccess tweak on cPanel might be needed to handle routing, though usually not with
 pure static files).
 Deploy to cPanel: Take the contents of the 
out folder and upload to the cPanel hosting
 environment. This usually means putting the files into the 
◦ 
public_html directory of the cPanel file
 system (via FTP, cPanel’s file manager, or an automated deployment script if set up).
 If the site is going to be a subdirectory or if there's an existing site, ensure paths don’t
 conflict. If deploying to root domain, ensure any old files are removed or moved.
 ◦ 
• 
If using an .htaccess (for example, to enforce HTTPS or handle a form script), update or
 include it as needed.
 After deployment, do a final smoke test on the live site’s URL. Check every page, and test the form
 (maybe use a test message and see if it comes through).
 • 
• 
• 
• 
• 
• 
• 
• 
• 
Set up a plan for maintenance: Document how content editors can update the site (they update in
 Sanity, then a developer must re-run the build and export, then deploy the updated static files to
 cPanel). If possible, consider automating this build/deploy process (for example, a CI pipeline
 triggered by content changes or a schedule). However, automation may be outside scope; at
 minimum, document the manual process clearly for the team.
 Deliverable: The Deep Engineering website is live on the production cPanel host, fully tested, with
 performance optimized (fast load times, lightweight) and all features functioning. A testing report or
 checklist can be delivered as part of this phase, along with deployment instructions for future
 updates.
 Technologies/Tools: Jest/React Testing Library (if doing any automated tests, optional), Chrome
 DevTools and Lighthouse for audits, cPanel/FTP for deployment, Next.js build and export tools,
 possibly CI/CD pipeline if used (GitHub Actions or similar, optional). 
Prerequisites/Dependencies:
 cPanel hosting access (credentials, etc.) and an empty or prepared directory for the site. Ensure any
 domain DNS is pointing to this hosting.
 All previous phases completed and content finalized.
 Team members available for a final review (including content accuracy, any last-minute changes).
 If analytics or any tracking is needed (not mentioned, but if so, adding in this final phase via a script).
 Agreement on the ongoing update process (who will trigger site rebuilds when content changes,
 etc.).
 16
Deep Engineering
 Website UI_UX & Content Guide.pdf
 file://file-8t7NUVpwmQtHrz5P3ucaUw
 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55
 17