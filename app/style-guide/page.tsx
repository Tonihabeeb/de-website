import { 
  Zap, 
  MapPin, 
  Clock, 
  Sparkles, 
  Settings, 
  BarChart3,
  User,
  Mail,
  Phone,
  Home,
  Info
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function StyleGuidePage() {
  const colors = [
    { name: 'Primary', class: 'bg-primary', text: 'text-white', hex: '#18335A' },
    { name: 'Primary Dark', class: 'bg-primary-dark', text: 'text-white', hex: '#152D47' },
    { name: 'Primary Light', class: 'bg-primary-light', text: 'text-white', hex: '#2150FE' },
    { name: 'Accent', class: 'bg-accent', text: 'text-white', hex: '#2150FE' },
    { name: 'Accent Warm', class: 'bg-accent-warm', text: 'text-white', hex: '#C84209' },
    { name: 'Gray Text', class: 'bg-gray-text', text: 'text-white', hex: '#4C4C4D' },
    { name: 'Gray Light', class: 'bg-gray-light', text: 'text-gray-text', hex: '#F0F0F1' },
  ];

  const typography = [
    { name: 'Hero (Desktop)', class: 'text-hero', text: 'Hero Heading' },
    { name: 'Hero Large', class: 'text-hero-lg', text: 'Hero Large Heading' },
    { name: 'H1', class: 'text-4xl', text: 'Heading 1' },
    { name: 'H2', class: 'text-3xl', text: 'Heading 2' },
    { name: 'H3', class: 'text-2xl', text: 'Heading 3' },
    { name: 'Body Large', class: 'text-lg', text: 'Body Large Text' },
    { name: 'Body', class: 'text-base', text: 'Body Text' },
    { name: 'Small', class: 'text-sm', text: 'Small Text' },
  ];

  const icons = [
    { name: 'Bolt', icon: Zap, description: 'Power/Energy' },
    { name: 'Map Pin', icon: MapPin, description: 'Location' },
    { name: 'Clock', icon: Clock, description: 'Time/Continuous' },
    { name: 'Sparkles', icon: Sparkles, description: 'Clean/Green' },
    { name: 'Cog', icon: Settings, description: 'Technology' },
    { name: 'Chart Bar', icon: BarChart3, description: 'Performance' },
    { name: 'User', icon: User, description: 'Team/People' },
    { name: 'Envelope', icon: Mail, description: 'Contact' },
    { name: 'Phone', icon: Phone, description: 'Communication' },
    { name: 'Home', icon: Home, description: 'Navigation' },
    { name: 'Information', icon: Info, description: 'Info' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-8">
          <h1 className="text-4xl font-serif text-primary mb-2">Deep Engineering Style Guide</h1>
          <p className="text-lg text-gray-text">Design system and component library for the Deep Engineering website</p>
        </div>
      </section>

      <div className="container py-12">
        {/* Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colors.map((color) => (
              <div key={color.name} className="bg-white rounded-lg p-6 shadow-sm">
                <div className={`w-full h-20 rounded-lg mb-4 ${color.class} flex items-center justify-center`}>
                  <span className={`font-semibold ${color.text}`}>{color.hex}</span>
                </div>
                <h3 className="font-semibold text-primary mb-1">{color.name}</h3>
                <p className="text-sm text-gray-text">Class: {color.class}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Typography</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="space-y-6">
              {typography.map((type) => (
                <div key={type.name} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-medium text-gray-text">{type.name}</span>
                    <span className="text-xs text-gray-text">Class: {type.class}</span>
                  </div>
                  <div className={`${type.class} font-serif text-primary`}>{type.text}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-serif text-primary mb-4">Font Families</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-serif text-lg text-primary mb-2">Serif (Crimson Pro)</h4>
                  <p className="font-serif text-gray-text">Used for headings and display text</p>
                </div>
                <div>
                  <h4 className="font-sans text-lg text-primary mb-2">Sans (Heebo)</h4>
                  <p className="font-sans text-gray-text">Used for body text and UI elements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Buttons</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" size="sm" className="min-w-[44px] min-h-[44px]">Small Primary</Button>
                  <Button variant="primary" size="md" className="min-w-[44px] min-h-[44px]">Medium Primary</Button>
                  <Button variant="primary" size="lg" className="min-w-[44px] min-h-[44px]">Large Primary</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="sm" className="min-w-[44px] min-h-[44px]">Small Secondary</Button>
                  <Button variant="secondary" size="md" className="min-w-[44px] min-h-[44px]">Medium Secondary</Button>
                  <Button variant="secondary" size="lg" className="min-w-[44px] min-h-[44px]">Large Secondary</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Disabled States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled className="min-w-[44px] min-h-[44px]">Disabled Primary</Button>
                  <Button variant="secondary" disabled className="min-w-[44px] min-h-[44px]">Disabled Secondary</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">CSS Classes</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-primary min-w-[44px] min-h-[44px]">CSS Primary</button>
                  <button className="btn-secondary min-w-[44px] min-h-[44px]">CSS Secondary</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Iconography</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {icons.map((iconItem) => (
                <div key={iconItem.name} className="text-center p-4 border border-gray-100 rounded-lg hover:border-primary transition-colors">
                  <iconItem.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-primary text-sm mb-1">{iconItem.name}</h4>
                  <p className="text-xs text-gray-text">{iconItem.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-serif text-primary mb-4">Icon Usage Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Sizes</h4>
                  <div className="flex items-center gap-4">
                    <Zap className="w-4 h-4 text-primary" />
                    <Zap className="w-6 h-6 text-primary" />
                    <Zap className="w-8 h-8 text-primary" />
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Colors</h4>
                  <div className="flex items-center gap-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <Zap className="w-6 h-6 text-accent" />
                    <Zap className="w-6 h-6 text-gray-text" />
                    <Zap className="w-6 h-6 text-white bg-primary p-1 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Form Elements</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Input Fields</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">Text Input</label>
                    <input 
                      type="text" 
                      placeholder="Enter text here"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">Email Input</label>
                    <input 
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">Textarea</label>
                    <textarea 
                      placeholder="Enter your message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Select Dropdown</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-text mb-2">Select Option</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option>Choose an option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Checkboxes</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <span className="ml-2 text-gray-text">Checkbox option 1</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <span className="ml-2 text-gray-text">Checkbox option 2</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Radio Buttons</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="radio" className="border-gray-300 text-primary focus:ring-primary" />
                        <span className="ml-2 text-gray-text">Radio option 1</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="radio" className="border-gray-300 text-primary focus:ring-primary" />
                        <span className="ml-2 text-gray-text">Radio option 2</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Feature Card</h3>
              <p className="text-gray-text">This is an example of a feature card with an icon, title, and description.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Location Card</h3>
              <p className="text-gray-text">Another example card showing different styling and content.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent-warm rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Time Card</h3>
              <p className="text-gray-text">A third example demonstrating the card component system.</p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Spacing & Layout</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Container</h3>
                <div className="bg-gray-light p-4 rounded">
                  <p className="text-sm text-gray-text">Class: <code>.container</code></p>
                  <p className="text-sm text-gray-text">Max width: 7xl (88rem), centered with responsive padding</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Section Padding</h3>
                <div className="bg-gray-light p-4 rounded">
                  <p className="text-sm text-gray-text">Class: <code>.section-padding</code></p>
                  <p className="text-sm text-gray-text">Padding: py-16 lg:py-24 (64px/96px vertical padding)</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Custom Spacing</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-primary text-white p-4 rounded text-center">
                    <p className="text-sm">spacing-18</p>
                    <p className="text-xs">4.5rem</p>
                  </div>
                  <div className="bg-primary text-white p-4 rounded text-center">
                    <p className="text-sm">spacing-88</p>
                    <p className="text-xs">22rem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif text-primary mb-8">Accessibility</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Focus States</h3>
                <div className="space-y-4">
                  <button className="btn-primary min-w-[44px] min-h-[44px]">Primary Button (Tab to focus)</button>
                  <button className="btn-secondary min-w-[44px] min-h-[44px]">Secondary Button (Tab to focus)</button>
                  <input 
                    type="text" 
                    placeholder="Input field (Tab to focus)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-[44px]"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-primary mb-4">Reduced Motion</h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-text">The site respects <code>prefers-reduced-motion</code> media query</p>
                  <div className="bg-gray-light p-4 rounded">
                    <p className="text-sm text-gray-text">Animations are disabled for users who prefer reduced motion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 