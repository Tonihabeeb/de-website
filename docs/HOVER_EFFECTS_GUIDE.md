# Hover Effects Guide

## Overview
This guide explains the improved hover effect system implemented across the website to ensure better visual feedback, depth, and user experience.

## Problem Solved
Previously, many buttons and links used `hover:text-blue-*` classes which caused white text to turn blue on hover, creating poor contrast and readability issues.

## New Hover Effect Options

### 1. Shadow-Based Effects (Recommended)
- **`.hover-effect`** - `hover:shadow-md` (medium shadow)
- **`.hover-effect-subtle`** - `hover:shadow-sm` (small shadow)

### 2. Transform Effects
- **`.hover-effect-scale`** - `hover:scale-105` (5% larger)
- **`.hover-effect-shadow`** - `hover:shadow-lg` (large shadow)

### 3. Button Component
The `Button` component now uses:
- Primary buttons: `hover:shadow-lg`
- Secondary buttons: `hover:shadow-lg`
- Outline buttons: `hover:shadow-md`

## Usage Examples

### For Buttons
```tsx
// Use the Button component (recommended)
<Button variant="primary">Click me</Button>

// Or use utility classes
<button className="bg-blue-600 text-white px-4 py-2 rounded hover-effect">
  Click me
</button>
```

### For Links
```tsx
// Simple shadow effect
<a href="#" className="text-blue-600 hover-effect">Link text</a>

// With scale effect
<a href="#" className="text-blue-600 hover-effect-scale">Link text</a>
```

### For Cards/Interactive Elements
```tsx
// Subtle hover effect
<div className="bg-white p-4 rounded shadow hover-effect-subtle">
  Card content
</div>

// Scale effect for interactive cards
<div className="bg-white p-4 rounded shadow hover-effect-scale cursor-pointer">
  Interactive card
</div>
```

## Best Practices

1. **Use shadow effects for buttons** - Provides clear visual feedback
2. **Use scale effects for interactive cards** - Creates engaging interactions
3. **Use shadow effects for elevated elements** - Creates depth and hierarchy
4. **Avoid color changes on hover** - Prevents contrast issues
5. **Keep transitions smooth** - Use `transition-all duration-200`

## Migration Notes

The following patterns have been automatically replaced:
- `hover:text-blue-600` → `hover:shadow-md`
- `hover:text-blue-700` → `hover:shadow-md`
- `hover:text-blue-800` → `hover:shadow-md`
- `hover:text-blue-900` → `hover:shadow-md`
- `hover:text-blue-500` → `hover:shadow-md`

## Accessibility Benefits

- **Better contrast** - No more white text turning blue
- **Clear visual feedback** - Shadows provide obvious hover states
- **Reduced cognitive load** - Users can predict hover behavior
- **WCAG compliant** - Maintains proper contrast ratios
- **Enhanced depth perception** - Shadows create visual hierarchy

## Future Development

When adding new interactive elements:
1. Use the provided utility classes
2. Test with different background colors
3. Ensure sufficient contrast ratios
4. Consider reduced motion preferences
5. Use shadows for depth and visual feedback 