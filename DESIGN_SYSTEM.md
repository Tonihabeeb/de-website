# Deep Engineering Design System

This document outlines the design system for the Deep Engineering website, including colors, typography, components, and usage guidelines.

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Icons](#icons)
4. [Components](#components)
5. [Spacing & Layout](#spacing--layout)
6. [Accessibility](#accessibility)

## Color Palette

### Primary Colors
- **Primary**: `#18335A` - Deep blue, used for headings and primary actions
- **Primary Dark**: `#152D47` - Darker variant for hover states
- **Primary Light**: `#2150FE` - Bright blue for accents and links

### Accent Colors
- **Accent**: `#2150FE` - Bright blue for highlights
- **Accent Warm**: `#C84209` - Warm orange for important actions

### Gray Scale
- **Gray Text**: `#4C4C4D` - Main text color
- **Gray Light**: `#F0F0F1` - Background color for sections

### Usage Guidelines
- Use primary colors for headings and important UI elements
- Use accent colors sparingly for calls-to-action
- Maintain sufficient contrast ratios (minimum 4.5:1 for normal text)

## Typography

### Font Families
- **Serif**: Crimson Pro - Used for headings and display text
- **Sans**: Heebo - Used for body text and UI elements

### Font Sizes
- **Hero**: `4rem` (64px) - Main hero headings
- **Hero Large**: `6rem` (96px) - Large hero headings
- **H1**: `2.25rem` (36px) - Page headings
- **H2**: `1.875rem` (30px) - Section headings
- **H3**: `1.5rem` (24px) - Subsection headings
- **Body Large**: `1.125rem` (18px) - Large body text
- **Body**: `1rem` (16px) - Standard body text
- **Small**: `0.875rem` (14px) - Small text and captions

### Usage Guidelines
- Use serif fonts for all headings (h1, h2, h3, h4, h5, h6)
- Use sans-serif fonts for body text, buttons, and UI elements
- Maintain consistent line heights and spacing

## Icons

### Icon Library
We use [Heroicons](https://heroicons.com/) for consistent iconography throughout the site.

### Icon Sizes
- **Small**: `w-4 h-4` (16px) - For inline icons
- **Medium**: `w-6 h-6` (24px) - For buttons and navigation
- **Large**: `w-8 h-8` (32px) - For feature icons
- **Extra Large**: `w-12 h-12` (48px) - For hero sections

### Icon Colors
- **Primary**: `text-primary` - For main icons
- **Accent**: `text-accent` - For highlighted icons
- **Gray**: `text-gray-text` - For secondary icons
- **White**: `text-white` - For icons on colored backgrounds

### Common Icons
- **BoltIcon**: Power, energy, electricity
- **MapPinIcon**: Location, geography
- **ClockIcon**: Time, continuous operation
- **SparklesIcon**: Clean, green, environmental
- **CogIcon**: Technology, machinery
- **ChartBarIcon**: Performance, data
- **UserIcon**: Team, people
- **EnvelopeIcon**: Contact, email
- **PhoneIcon**: Communication
- **HomeIcon**: Navigation, home

## Components

### Buttons

#### Primary Button
```tsx
<Button variant="primary" size="md">Primary Action</Button>
```
- Background: Primary color
- Text: White
- Hover: Primary dark
- Focus: Ring with primary color

#### Secondary Button
```tsx
<Button variant="secondary" size="md">Secondary Action</Button>
```
- Background: Transparent
- Border: Primary color
- Text: Primary color
- Hover: Primary background with white text

#### Button Sizes
- **Small**: `size="sm"` - For compact spaces
- **Medium**: `size="md"` - Default size
- **Large**: `size="lg"` - For prominent actions

### Form Elements

#### Input Fields
```tsx
<input 
  type="text" 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
/>
```

#### Textarea
```tsx
<textarea 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
/>
```

#### Select Dropdown
```tsx
<select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
```

### Cards
```tsx
<div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
    <IconComponent className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl font-semibold text-primary mb-2">Card Title</h3>
  <p className="text-gray-text">Card description</p>
</div>
```

## Spacing & Layout

### Container
```css
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```
- Max width: 88rem (1408px)
- Centered with responsive padding
- Used for all page content

### Section Padding
```css
.section-padding {
  @apply py-16 lg:py-24;
}
```
- Mobile: 64px vertical padding
- Desktop: 96px vertical padding
- Used for all major sections

### Custom Spacing
- **spacing-18**: `4.5rem` (72px)
- **spacing-88**: `22rem` (352px)

### Grid System
- **1 column**: Mobile (default)
- **2 columns**: Tablet (md:grid-cols-2)
- **3 columns**: Desktop (lg:grid-cols-3)
- **4 columns**: Large desktop (xl:grid-cols-4)

## Accessibility

### Focus States
- All interactive elements have visible focus indicators
- Focus ring uses primary color with 2px width
- Focus offset of 2px for better visibility

### Color Contrast
- Text on white background: 4.5:1 minimum ratio
- Large text (18px+): 3:1 minimum ratio
- UI elements: 3:1 minimum ratio

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical document flow
- Skip links for main content areas

### Screen Reader Support
- Semantic HTML elements used throughout
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- ARIA labels where needed

## Usage Guidelines

### Do's
- ✅ Use the established color palette consistently
- ✅ Follow the typography hierarchy
- ✅ Use Heroicons for all iconography
- ✅ Maintain proper spacing between elements
- ✅ Ensure sufficient color contrast
- ✅ Test with keyboard navigation
- ✅ Respect reduced motion preferences

### Don'ts
- ❌ Don't use colors outside the defined palette
- ❌ Don't mix different icon libraries
- ❌ Don't skip heading levels
- ❌ Don't rely solely on color to convey information
- ❌ Don't use small text for important information
- ❌ Don't create custom components without following the design system

## Style Guide Page

Visit `/style-guide` to see a visual demonstration of all design system elements, including:
- Color swatches with hex codes
- Typography examples
- Button variants and states
- Icon library showcase
- Form element examples
- Card component variations
- Spacing and layout examples
- Accessibility features

This page serves as a reference for developers and designers working on the project. 