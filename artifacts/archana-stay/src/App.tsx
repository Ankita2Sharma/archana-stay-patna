import { type FormEvent, type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Droplets,
  Eye,
  Heart,
  Home as HomeIcon,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Utensils,
  Wifi,
  X,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@workspace/archana-stay-design-system/components/ui/toaster';
import { TooltipProvider } from '@workspace/archana-stay-design-system/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const phone = '7991144192';
const ownerAlternatePhone = '9504622099';
const rajuPhone = '7654009789';
const propertyImage = '/assets/d6e31053-42d1-48bf-a0f5-46f13277269b.png';
const whatsappIcon = '/favicon icon whatsapp.jpg';

type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  propertyTypes: string[];
  roomTypes: string[];
  suitableFor: string[];
  note: string;
  description: string;
  features: string[];
};

const property: Property = {
  id: 'sk-nagar',
  name: 'S.K. Nagar PG & Rooms',
  location: 'S.K. Nagar, Patna',
  type: 'PG & private rooms',
  propertyTypes: ['Shared Room'],
  roomTypes: ['Single', 'Double Sharing'],
  suitableFor: ['Students', 'Bachelor', 'Working Professionals', 'Special preference for employees'],
  note: 'Pricing shared by contact',
  description:
    'Generously spacious, air-conditioned accommodations featuring private attached balconies with breezy open ventilation — a rare comfort in Patna. Thoughtfully managed with dedicated everyday care.',
  features: [
    'WiFi',
    'AC',
    'Attached Bathroom',
    'Individual Fresh air window',
    'Individual Balcony',
    'Hygenic Food',
    'Washing Machine (if available)',
    'Surveillance under CCTV',
    'Security',
    'Parking',
    '24h water and drinking RO Water',
    'Geyser (if available)',
    'Refrigerator (if available)',
    'Study Table',
    'Chair',
  ],
};

function Brand() {
  return (
    <Link href="/" className="brand" data-testid="link-brand-home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-copy">
        <span className="brand-name">Archana Stay</span>
        <span className="brand-sub">A place to settle in</span>
      </span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Find a stay' },
    { href: '/about', label: 'Our approach' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className={`nav ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container nav-inner">
        <Brand />
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={location === item.href ? 'active' : ''}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="button button-primary button-small" href={`tel:${phone}`} data-testid="link-header-call">
            <Phone size={14} /> Talk to us
          </a>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function MobileContactBar() {
  return (
    <div className="mobile-contact" data-testid="mobile-contact-bar">
      <a className="button button-ghost" href={`tel:${phone}`} data-testid="link-mobile-call">
        <Phone size={15} /> Call us
      </a>
      <a
        className="button button-gold"
        href={`https://wa.me/91${phone}?text=Hello%20Archana%20Stay%2C%20I%20would%20like%20to%20know%20more%20about%20S.K.%20Nagar%20PG%20%26%20Rooms.`}
        target="_blank"
        rel="noreferrer"
        data-testid="link-mobile-whatsapp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" style={{ width: 16, height: 16 }} /> WhatsApp
      </a>
    </div>
  );
}

function SearchForm({ compact = false }: { compact?: boolean }) {
  const [location, setLocation] = useLocation();
  const initialParams = useMemo(
    () => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : location.split('?')[1] ?? ''),
    [location],
  );
  const [query, setQuery] = useState(() => initialParams.get('search') ?? '');
  const [propertyType, setPropertyType] = useState(() => initialParams.get('propertyType') ?? 'Any property type');
  const [roomType, setRoomType] = useState(() => initialParams.get('roomType') ?? 'Any room type');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (propertyType !== 'Any property type') params.set('propertyType', propertyType);
    if (roomType !== 'Any room type') params.set('roomType', roomType);
    setLocation(`/listings${params.toString() ? `?${params.toString()}` : ''}`);
  };
  return (
    <div className={`search-panel ${compact ? 'compact' : ''}`} data-testid="search-panel">
      <form className="search-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="search-location">Where are you headed?</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'hsl(var(--accent-foreground))' }} />
            <input
              id="search-location"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search a neighbourhood or property"
              style={{ paddingLeft: 35 }}
              data-testid="input-search-location"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="search-property-type">Property type</label>
          <div style={{ position: 'relative' }}>
            <select id="search-property-type" value={propertyType} onChange={(event) => setPropertyType(event.target.value)} data-testid="select-property-type">
              <option>Any property type</option>
              <option>Shared Room</option>
              <option>Hostel</option>
            </select>
            <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: 14, pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="search-room-type">Room type</label>
          <div style={{ position: 'relative' }}>
            <select id="search-room-type" value={roomType} onChange={(event) => setRoomType(event.target.value)} data-testid="select-room-type">
              <option>Any room type</option>
              <option>Single</option>
              <option>Double Sharing</option>
            </select>
            <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: 14, pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="search-timing">When?</label>
          <div style={{ position: 'relative' }}>
            <Clock3 size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'hsl(var(--accent-foreground))' }} />
            <select id="search-timing" defaultValue="I am flexible" style={{ paddingLeft: 35, paddingRight: 36 }} data-testid="select-timing">
              <option>I am flexible</option>
              <option>Moving soon</option>
              <option>Planning ahead</option>
            </select>
            <ChevronDown size={15} style={{ position: 'absolute', right: 12, top: 14, pointerEvents: 'none', color: 'hsl(var(--muted-foreground))' }} />
          </div>
        </div>
        <button className="button button-primary" type="submit" data-testid="button-search-stays">
          <Search size={16} /> Find my stay
        </button>
      </form>
    </div>
  );
}

function FavoriteButton({ propertyId }: { propertyId: string }) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(`archana-favorite-${propertyId}`) === 'true';
  });
  const toggle = () => {
    const next = !saved;
    setSaved(next);
    window.localStorage.setItem(`archana-favorite-${propertyId}`, String(next));
  };
  return (
    <button
      className={`favorite ${saved ? 'saved' : ''}`}
      onClick={toggle}
      aria-label={saved ? 'Remove from saved stays' : 'Save this stay'}
      data-testid={`button-favorite-${propertyId}`}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
    </button>
  );
}

function PropertyCard({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`property-card ${compact ? 'compact-card' : ''}`} data-testid={`card-property-${property.id}`}>
      <div className="property-card-image">
        <img src={propertyImage} alt="S.K. Nagar PG and Rooms property poster" data-testid="img-property-poster" />
        <div className="card-topline">
          <span className="pill">Human-verified listing</span>
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>
      <div className="property-content">
        <h3 data-testid="text-property-name">{property.name}</h3>
        <div className="property-location" data-testid="text-property-location">
          <MapPin size={14} /> {property.location}
        </div>
        <div className="property-meta">
          <span className="meta-chip">WiFi</span>
          <span className="meta-chip">AC</span>
          <span className="meta-chip">Attached Bathroom</span>
          <span className="meta-chip">Hygenic Food</span>
          <span className="meta-chip">Single</span>
          <span className="meta-chip">Double Sharing</span>
          {property.suitableFor.map((audience) => <span className="meta-chip" key={audience}>{audience}</span>)}
        </div>
        <div className="property-bottom">
          <div className="price-note" data-testid="text-contact-pricing">
            <strong>Pricing by conversation</strong>
            Ask the owner for the right room
          </div>
          <Link className="button button-primary button-small" href="/property/sk-nagar-pg" data-testid="link-view-property">
            View stay <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Home() {
  return (
    <PageShell>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal">
              <div className="eyebrow">A Rare Standard of Living in Patna</div>
              <h1 data-testid="text-home-headline">Spacious rooms, attached balconies & cool AC <em>comfort.</em></h1>
              <p className="hero-intro" data-testid="text-home-intro">
                Step into generously spacious, air-conditioned accommodations designed for peaceful living. Enjoy your own private attached balcony with breezy open ventilation — a rare luxury in Patna — paired with attentive everyday care and the freedom to truly settle in.
              </p>
              <div className="hero-cta">
                <Link className="button button-primary" href="/listings" data-testid="link-hero-find-stay">
                  Explore stays <ArrowRight size={16} />
                </Link>
                <Link className="button button-ghost" href="/about" data-testid="link-hero-our-approach">
                  Why Archana Stay
                </Link>
              </div>
            </div>
            <div className="hero-aside reveal delay-1">
              <div className="hero-note">
                <span>Rare in Patna</span>
                <strong>Balcony & AC Rooms</strong>
              </div>
              <div className="image-frame">
                <img src={propertyImage} alt="Archana Stay property in Patna" data-testid="img-home-property" />
                <div className="image-wash" />
                <div className="image-caption">
                  <div>
                    <strong>S.K. Nagar, Patna</strong>
                    <small>Spacious AC rooms · Attached balcony & open ventilation</small>
                  </div>
                  <span className="image-badge">Rare Patna Living</span>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <SearchForm />
          </div>
        </section>

        <section className="section section-tint" id="featured-property">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow" data-testid="eyebrow-featured-property">FEATURED PROPERTY</div>
                <h2>Clear enough to<br />choose with confidence.</h2>
              </div>
              <p className="section-lede">You should not have to decode a listing from a distance. Start with the details, then speak directly to the people who care for the place.</p>
            </div>
            <div className="property-layout">
              <PropertyCard compact />
              <div className="property-story">
                <div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>FEATURED INFORMATION</div>
                <h3>Good mornings begin with the right room.</h3>
                <div className="featured-info-card">
                  <img
                    src={propertyImage}
                    alt="Featured Information - S.K. Nagar PG & Rooms"
                    className="featured-info-image"
                    data-testid="img-featured-info"
                  />
                  <div className="featured-info-suitability">
                    <strong>Suitable for Student, bachelor, working professional, Special preference for employees</strong>
                  </div>
                </div>
                <p>{property.description}</p>
                <ul className="story-list">
                  <li><BadgeCheck size={16} /> Attached private balcony & open ventilation</li>
                  <li><BadgeCheck size={16} /> Spacious air-conditioned accommodations</li>
                  <li><Phone size={16} /> Direct contact without middleman fees</li>
                  <li><ShieldCheck size={16} /> High hygiene standards & 24/7 security</li>
                </ul>
                <Link className="button button-gold" href="/property/sk-nagar-pg" style={{ marginTop: 28 }} data-testid="link-featured-property">
                  See the full property <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">The Archana standard</div>
                <h2>Small signals.<br />A steadier start.</h2>
              </div>
              <p className="section-lede">We keep the experience simple: show you the truth of a place, make introductions easy, and let you decide at your own pace.</p>
            </div>
            <div className="principles">
              <div className="principle">
                <div className="principle-icon"><Eye size={18} /></div>
                <h3>See the whole picture.</h3>
                <p>Useful property details are upfront, from water and Wi-Fi to the kind of room you can expect.</p>
              </div>
              <div className="principle">
                <div className="principle-icon"><MessageCircle size={18} /></div>
                <h3>Talk to a real person.</h3>
                <p>Questions about food, rooms, or arrival are best answered by someone who knows the building.</p>
              </div>
              <div className="principle">
                <div className="principle-icon"><Sparkles size={18} /></div>
                <h3>Feel looked after.</h3>
                <p>Clean, safe, practical: the everyday things that turn four walls into somewhere you can settle.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="quote-band">
          <div className="container quote-grid">
            <div className="quote-mark" aria-hidden="true">“</div>
            <div>
              <blockquote>“Before you arrive, you should already know who will open the door.”</blockquote>
              <div className="quote-by">The Archana Stay promise · Patna</div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function Listings() {
  const [location, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(location.split('?')[1] ?? ''), [location]);
  const [sort, setSort] = useState('Recommended');
  const search = params.get('search') ?? '';
  const propertyType = params.get('propertyType') ?? '';
  const roomType = params.get('roomType') ?? '';
  const matches = property.name.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase()) ||
    'patna'.includes(search.toLowerCase());
  const matchesPropertyType = !propertyType || property.propertyTypes.includes(propertyType);
  const matchesRoomType = !roomType || property.roomTypes.includes(roomType);
  const filtered = matches && matchesPropertyType && matchesRoomType ? [property] : [];
  if (sort === 'Alphabetical') filtered.sort((a, b) => a.name.localeCompare(b.name));
  const clearFilters = () => setLocation('/listings');
  return (
    <PageShell>
      <main>
        <section className="page-header">
          <div className="container">
            <div className="eyebrow">Find your Patna base</div>
            <h1 data-testid="text-listings-title">Stays with room<br />for your life.</h1>
            <p>Browse clear, contact-first listings for people moving to Patna. No guesswork around pricing or availability — just a direct conversation when you are ready.</p>
          </div>
        </section>
        <div className="container">
          <SearchForm compact />
          <div className="listing-toolbar">
            <div className="result-count" data-testid="text-results-count">
              {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'} matching your search
            </div>
            <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
              <SlidersHorizontal size={15} className="muted" />
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="button button-ghost button-small" style={{ cursor: 'pointer' }} data-testid="select-sort-listings">
                <option>Recommended</option>
                <option>Alphabetical</option>
              </select>
            </div>
          </div>
          <div className="listing-grid">
            {filtered.length > 0 ? <PropertyCard /> : (
              <div className="empty-state" data-testid="empty-listings">
                <RotateCcw size={29} />
                <h3>Let us look again.</h3>
                <p>Nothing matched “{search || propertyType || roomType}” yet. Try a broader search, or speak with us — we may know a room before it is listed.</p>
                <button className="button button-primary" onClick={clearFilters} data-testid="button-clear-filters">
                  Show all stays <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function PropertyDetail() {
  return (
    <PageShell>
      <main className="detail-wrap">
        <div className="container">
          <Link className="back-link" href="/listings" data-testid="link-back-listings"><ArrowLeft size={14} /> All stays</Link>
          <div className="detail-layout">
            <div className="detail-photo">
              <img src={propertyImage} alt="S.K. Nagar PG & Rooms, Patna property poster" data-testid="img-detail-property" />
            </div>
            <div className="detail-info">
              <div className="eyebrow">Owner-managed in Patna</div>
              <h1 data-testid="text-detail-title">{property.name}</h1>
              <div className="property-location" data-testid="text-detail-location"><MapPin size={16} /> {property.location}</div>
              <p className="section-lede">{property.description}</p>
              <div className="status-note" data-testid="status-contact-pricing">
                <BadgeCheck size={18} />
                <span><strong>Pricing and availability are shared by contact.</strong><br />Every room is different. Ask the owner what fits your move-in plans.</span>
              </div>
              <div className="suitable-for" data-testid="list-suitable-for">
                <strong>Suitable for</strong>
                <div className="suitable-chips">
                  {property.suitableFor.map((audience) => <span className="meta-chip" key={audience}>{audience}</span>)}
                </div>
              </div>
              <div className="feature-grid" data-testid="list-property-features">
                {property.features.map((feature, index) => {
                  const icons = [Wifi, Sparkles, HomeIcon, Eye, Building2, Utensils, RotateCcw, Eye, ShieldCheck, CheckCircle2, Droplets, RotateCcw, Building2, BookOpen, CheckCircle2];
                  const Icon = icons[index] ?? CheckCircle2;
                  return <div className="feature" key={feature} data-testid={`feature-property-${index}`}><Icon size={15} /> {feature}</div>;
                })}
              </div>
              <div className="contact-card">
                <h3>Speak with us directly.</h3>
                <div className="contact-person" data-testid="contact-primary-phone">
                  <div className="person-initial"><Phone size={16} /></div>
                  <div><strong>Primary Contact</strong><span>7991144192 / 9504622099 · Room & pricing enquiries</span></div>
                  <div className="person-actions">
                    <a className="icon-action" href={`tel:${phone}`} aria-label="Call primary contact" data-testid="link-call-primary"><Phone size={15} /></a>
                    <a className="icon-action" href={`tel:${ownerAlternatePhone}`} aria-label="Call alternate contact" data-testid="link-call-alternate"><Phone size={15} /></a>
                    <a className="icon-action" href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" aria-label="WhatsApp enquiries" data-testid="link-whatsapp-enquiry">
                      <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" />
                    </a>
                  </div>
                </div>
                <div className="contact-person" data-testid="contact-additional-phone">
                  <div className="person-initial"><Phone size={16} /></div>
                  <div><strong>Helpdesk & Enquiries</strong><span>Additional contact · 7654009789</span></div>
                  <div className="person-actions">
                    <a className="icon-action" href={`tel:${rajuPhone}`} aria-label="Call helpdesk" data-testid="link-call-helpdesk"><Phone size={15} /></a>
                  </div>
                </div>
                <Link className="button button-primary" href="/contact" style={{ width: '100%', marginTop: 13 }} data-testid="link-detail-enquiry">
                  Send an enquiry <Send size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function About() {
  return (
    <PageShell>
      <main>
        <section className="section">
          <div className="container split-section">
            <div>
              <div className="eyebrow">About Archana Stay</div>
              <h1 data-testid="text-about-title">A softer landing in a new city.</h1>
              <p>Moving for college or work is a big enough step. Finding a room should not feel like another leap of faith.</p>
              <p>Archana Stay connects you to practical, cared-for homes in Patna. We believe a listing earns trust through specificity — and a good stay begins with a straightforward conversation.</p>
              <div className="stat-row">
                <div className="stat"><strong>01</strong><span>carefully presented stay</span></div>
                <div className="stat"><strong>02</strong><span>real people to call</span></div>
              </div>
            </div>
            <div className="about-panel">
              <div className="eyebrow" style={{ color: 'hsl(var(--accent))' }}>How it works</div>
              <h2>Less scrolling.<br />More certainty.</h2>
              <p>We keep the path from “maybe” to “I can see myself here” short and human.</p>
              <ol className="numbered">
                <li><b>01</b><div><strong>Start with the details</strong><span>See the room, amenities, neighbourhood, and what is still best answered by phone.</span></div></li>
                <li><b>02</b><div><strong>Ask what matters to you</strong><span>Message or call directly. No anonymous forms disappearing into a queue.</span></div></li>
                <li><b>03</b><div><strong>Arrive with a little less unknown</strong><span>Make a decision that feels right for your life and your next chapter.</span></div></li>
              </ol>
            </div>
          </div>
        </section>
        <section className="section section-tint">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">What we will never do</div><h2>Make you hunt<br />for the truth.</h2></div>
              <p className="section-lede">We do not invent rent, availability, or a picture of a place that is not there. When something needs a conversation, we say so.</p>
            </div>
            <div className="principles">
              <div className="principle"><div className="principle-icon"><BookOpen size={18} /></div><h3>Specific over shiny.</h3><p>Useful information beats a long list of vague promises.</p></div>
              <div className="principle"><div className="principle-icon"><Phone size={18} /></div><h3>Human over hidden.</h3><p>You know who to call and what they can help you with.</p></div>
              <div className="principle"><div className="principle-icon"><ShieldCheck size={18} /></div><h3>Steady over rushed.</h3><p>Take the time you need to choose a place you can settle into.</p></div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <PageShell>
      <main className="section">
        <div className="container contact-layout">
          <div>
            <div className="eyebrow">Come say hello</div>
            <h1 data-testid="text-contact-title">One good question can change the search.</h1>
            <p className="section-lede">Tell us a little about your move. We will help you figure out the next useful step — whether that is a visit, a call, or a better question to ask.</p>
            <div className="contact-links">
              <a className="contact-link" href={`tel:${phone}`} data-testid="link-contact-primary"><span className="link-icon"><Phone size={16} /></span><span><strong>Primary Phone</strong><br /><span className="muted">7991144192 · Calls & enquiries</span></span></a>
              <a className="contact-link" href={`tel:${ownerAlternatePhone}`} data-testid="link-contact-alternate"><span className="link-icon"><Phone size={16} /></span><span><strong>Alternate Phone</strong><br /><span className="muted">9504622099 · Direct line</span></span></a>
              <a className="contact-link" href={`tel:${rajuPhone}`} data-testid="link-contact-helpdesk"><span className="link-icon"><Phone size={16} /></span><span><strong>Helpdesk / Support</strong><br /><span className="muted">7654009789 · Additional contact</span></span></a>
              <a className="contact-link" href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" data-testid="link-contact-whatsapp"><span className="link-icon"><img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" /></span><span><strong>WhatsApp</strong><br /><span className="muted">A quick way to ask about a room</span></span></a>
            </div>
          </div>
          <div className="enquiry-card">
            <h2>Send an enquiry</h2>
            <p>We will use your details only to reply to this enquiry.</p>
            {sent ? (
              <div className="form-success" data-testid="status-enquiry-success"><CheckCircle2 size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Thanks — your enquiry is noted. Please call 7991144192 if your move is time-sensitive.</div>
            ) : (
              <form onSubmit={submit} className="form-grid">
                <div className="field"><label htmlFor="name">Your name</label><input id="name" required placeholder="How should we call you?" data-testid="input-enquiry-name" /></div>
                <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" required type="tel" placeholder="A number we can reach" data-testid="input-enquiry-phone" /></div>
                <div className="field form-full"><label htmlFor="move">Tell us about your move</label><textarea id="move" required placeholder="When are you moving, and what kind of room are you looking for?" data-testid="input-enquiry-message" /></div>
                <div className="form-full"><button className="button button-primary" type="submit" data-testid="button-submit-enquiry">Send my enquiry <Send size={15} /></button></div>
              </form>
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}

function AdminPreview() {
  return (
    <PageShell>
      <main className="section">
        <div className="container">
          <div className="admin-head">
            <div><div className="eyebrow">Private preview</div><h1 style={{ margin: '12px 0 0', font: '500 clamp(2.5rem, 5vw, 4.3rem)/.95 var(--app-font-serif)', color: 'hsl(var(--primary))', letterSpacing: '-.06em' }} data-testid="text-admin-title">A clear view<br />of your stay.</h1></div>
            <Link className="button button-ghost button-small" href="/property/sk-nagar-pg" data-testid="link-admin-view-live"><Eye size={15} /> View live listing</Link>
          </div>
          <div className="admin-kpis">
            <div className="kpi" data-testid="kpi-enquiries"><span>Enquiries this week</span><strong>06</strong></div>
            <div className="kpi" data-testid="kpi-saves"><span>Saved by visitors</span><strong>14</strong></div>
            <div className="kpi" data-testid="kpi-response"><span>Response focus</span><strong>Today</strong></div>
          </div>
          <div className="admin-table" data-testid="admin-enquiry-table">
            <div className="admin-row header"><span>Property</span><span>Signal</span><span>Next step</span><span>Open</span></div>
            <div className="admin-row"><strong>S.K. Nagar PG & Rooms</strong><span><span className="tag">New enquiry</span></span><span className="muted">Reply by phone</span><Link href="/contact" data-testid="link-admin-enquiry-1"><ArrowRight size={15} /></Link></div>
            <div className="admin-row"><strong>S.K. Nagar PG & Rooms</strong><span><span className="tag">Saved stay</span></span><span className="muted">Keep details fresh</span><Link href="/property/sk-nagar-pg" data-testid="link-admin-enquiry-2"><ArrowRight size={15} /></Link></div>
            <div className="admin-row"><strong>Contact line</strong><span><span className="tag">Contact ready</span></span><span className="muted">7991144192</span><Link href="/contact" data-testid="link-admin-enquiry-3"><ArrowRight size={15} /></Link></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 18, color: 'hsl(var(--muted-foreground))', fontSize: '.76rem' }} data-testid="text-admin-note"><BarChart3 size={15} /> Preview mode: connect your enquiry inbox when the backend is ready.</div>
        </div>
      </main>
    </PageShell>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      {children}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p>A calm, clear way to find your room in Patna — and the people who will help you settle in.</p>
            </div>
            <div><h4>Explore</h4><div className="footer-links"><Link href="/" data-testid="link-footer-home">Home</Link><Link href="/listings" data-testid="link-footer-listings">Find a stay</Link><Link href="/about" data-testid="link-footer-about">Our approach</Link></div></div>
            <div><h4>Talk to us</h4><div className="footer-links"><a href={`tel:${phone}`} data-testid="link-footer-call">7991144192</a><a href={`tel:${ownerAlternatePhone}`} data-testid="link-footer-owner-alternate">9504622099</a><Link href="/contact" data-testid="link-footer-contact">Send an enquiry</Link><Link href="/admin" data-testid="link-footer-admin">Admin preview</Link></div></div>
          </div>
          <div className="footer-bottom"><span>© 2025 Archana Stay · Patna</span><span>Details first. Human always.</span></div>
        </div>
      </footer>
      <MobileContactBar />
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/listings" component={Listings} />
        <Route path="/property/sk-nagar-pg" component={PropertyDetail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={AdminPreview} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;