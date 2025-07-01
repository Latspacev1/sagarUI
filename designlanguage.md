# LatSpace Design Language

## Overview

The LatSpace ESG Management System employs a distinctive industrial/brutalist design aesthetic that emphasizes functionality, data clarity, and professional presentation. The design language is characterized by sharp edges, geometric forms, and a sophisticated color palette centered around teal/green tones.

## Design Principles

1. **Industrial Clarity**: Clean lines, no rounded corners, geometric precision
2. **Data-First**: Typography and layout optimized for data readability
3. **Professional Sophistication**: Restrained color palette with purposeful accents
4. **Functional Minimalism**: Every element serves a clear purpose
5. **Consistent Hierarchy**: Clear visual hierarchy through spacing and typography

## Color System

### Brand Colors
- **Primary Dark** (`#074D47`): Deep teal/forest green - primary brand color, headers, CTAs
- **Primary Medium** (`#22867C`): Medium teal - interactive states, secondary elements
- **Primary Light** (`#89E4DA`): Light aqua - accents, highlights, success states

### Neutral Palette
- **White** (`#FFFFFF`): Primary backgrounds, cards
- **Gray Scale**: Tailwind defaults (gray-50 to gray-200) for borders, subtle backgrounds
- **Black** (`#000000`): Used sparingly for maximum contrast

### Semantic Colors
- Success: Primary light (`#89E4DA`)
- Warning: Standard yellow tones
- Error: Standard red tones
- Info: Primary medium (`#22867C`)

## Typography

### Font Stack
```css
font-sans: 'IBM Plex Sans', system-ui, -apple-system, sans-serif
font-mono: 'IBM Plex Mono', 'Courier New', monospace
```

### Type Scale
- **Display**: text-2xl (1.5rem)
- **Heading 1**: text-xl (1.25rem)
- **Heading 2**: text-lg (1.125rem)
- **Body**: text-base (1rem)
- **Small**: text-sm (0.875rem)
- **Caption**: text-xs (0.75rem)

### Font Weights
- **Regular** (400): Body text, descriptions
- **Semibold** (600): Headings, emphasis, buttons

### Text Treatments
- **Labels**: Uppercase, tracking-wider, text-xs
- **Data Values**: Monospace font, preserving numerical alignment
- **Headings**: Tight line-height (1.15)
- **Body**: Snug line-height (1.25)

## Spacing System

Grid-based 8px unit system:
- `grid` = 8px
- `grid-2` = 16px
- `grid-3` = 24px
- `grid-4` = 32px
- `grid-5` = 40px
- `grid-6` = 48px
- `grid-8` = 64px
- `grid-10` = 80px

## Component Patterns

### Buttons

**Primary Button**
```css
bg-latspace-dark text-white 
hover:bg-latspace-medium
px-grid-4 py-grid-2
uppercase tracking-wider font-semibold
transition-colors
```

**Secondary Button**
```css
border border-latspace-dark text-latspace-dark
hover:bg-latspace-dark hover:text-white
px-grid-4 py-grid-2
uppercase tracking-wider font-semibold
transition-colors
```

### Cards & Containers
- Background: White with gray-200 border
- No border radius (sharp corners)
- Padding: grid-3 or grid-4
- Optional grid pattern overlay for data sections

### Form Elements

**Input Fields**
```css
border border-gray-300
focus:border-latspace-dark focus:ring-0
font-mono (for data values)
px-grid-2 py-grid-1.5
```

**Labels**
```css
text-xs uppercase tracking-wider
text-latspace-dark
mb-grid
```

### Navigation

**Tab Navigation**
- Bottom border approach
- Active: `border-b-2 border-latspace-dark text-latspace-dark`
- Inactive: `border-b-2 border-transparent text-latspace-medium`
- Hover: `text-latspace-dark`

## Visual Elements

### Icons
- **Library**: Lucide React
- **Sizes**: 
  - Small: w-4 h-4 (16px)
  - Medium: w-5 h-5 (20px)
  - Large: w-6 h-6 (24px)
- **Styling**: Consistent stroke width, matching text color

### Grid Pattern
Background pattern for data sections:
```css
background-image: 
  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
background-size: 16px 16px;
```

## Interactive States

### Hover Effects
- Color transitions: 150ms ease
- Buttons: Background color change
- Links: Text color darkening
- Cards: Subtle shadow or border color change

### Focus States
- Outline: 2px solid primary-dark
- Offset: 2px
- No default browser outline

### Disabled States
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

## Data Visualization

### Chart Colors
1. Primary: `#074D47` (latspace-dark)
2. Secondary: `#22867C` (latspace-medium)
3. Tertiary: `#89E4DA` (latspace-light)
4. Extended palette for additional series

### Chart Styling
- Grid lines: `stroke-dasharray: 3 3`
- Axis text: Small, gray-600
- Tooltips: White background with shadow
- Responsive containers maintaining aspect ratios

## Layout Principles

### Grid System
- 12-column grid for complex layouts
- Responsive breakpoints:
  - Mobile: < 640px
  - Tablet: 768px
  - Desktop: 1024px
  - Wide: 1280px

### Spacing Hierarchy
- Between sections: grid-8 or grid-10
- Between related elements: grid-4
- Within components: grid-2 or grid-3
- Inline spacing: grid

## Motion & Animation

### Transitions
- Duration: 150ms (default)
- Easing: ease-in-out
- Properties: colors, opacity, transform

### Loading States
- Skeleton screens with subtle animation
- Progress indicators using brand colors
- Disabled state during async operations

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Primary dark on white: 11.5:1
- Interactive elements have clear focus states

### Typography
- Minimum font size: 14px (text-sm)
- Clear hierarchy through size and weight
- Adequate line height for readability

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover and focus states
- Keyboard navigation support

## Implementation Notes

### CSS Architecture
- Tailwind CSS via CDN
- Utility-first approach
- Minimal custom CSS
- Component-based class composition

### Responsive Design
- Mobile-first approach
- Breakpoint-specific utilities
- Flexible grid layouts
- Adaptive typography

### Performance
- Optimize for fast initial render
- Lazy load heavy components
- Minimize custom CSS
- Use system fonts as fallbacks