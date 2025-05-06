# Google News-Style UI Enhancements

This document provides instructions on how to implement the Google News-style layout improvements to your existing light theme news website.

## Overview of Enhancements

1. **"Picks for You" Sidebar**
   - Appears on the right side on desktop view
   - Contains smaller news cards with thumbnail images, headlines, and source information
   - Collapses below main content on mobile view

2. **"Your Topics" Section**
   - Horizontally scrollable category blocks
   - Categories include: India, World, Tech, Business, Sports, Entertainment, Health
   - Each category has an icon, name, and latest headlines

## Implementation Guide

### 1. CSS Styles

The necessary CSS styles have been added to `globals.css`. These styles include:
- Variables for consistent colors, shadows, and spacing
- Responsive grid layout for the main container
- Styles for the sidebar cards and topic cards
- Horizontal scrolling for the topics section
- Responsive adjustments for mobile devices

### 2. New Components

Three new components have been created:

- **PicksForYou.jsx**: Sidebar component with personalized news recommendations
- **YourTopics.jsx**: Horizontally scrollable category blocks
- **HomeLayout.jsx**: Layout component that integrates both new UI elements

### 3. Integration Steps

1. **Wrap your main page content with the HomeLayout component:**

```jsx
// In your index.js or home page component
import HomeLayout from '../components/HomeLayout';

export default function HomePage() {
  return (
    <HomeLayout>
      {/* Your existing main content */}
      <YourExistingContent />
    </HomeLayout>
  );
}
```

2. **Customize the data sources:**

The components currently use mock data. Replace these with your actual data sources:

- In `PicksForYou.jsx`: Replace the `recommendedArticles` array with your API data
- In `YourTopics.jsx`: Replace the `topics` array with your categories data

### 4. Example Implementation

An example implementation is provided in `pages/index-example.jsx`. You can use this as a reference for integrating the new components with your existing content.

## Responsive Behavior

- On desktop (1024px and above): Main content on the left, sidebar on the right
- On mobile: Components stack vertically (main content, topics section, then sidebar)
- Topics section remains horizontally scrollable on all screen sizes

## Customization

You can customize the appearance by modifying the CSS variables in `globals.css`:

```css
:root {
  --primary-color: #1a73e8; /* Change to match your brand color */
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
  --card-radius: 0.5rem;
  /* Other variables */
}
```

## Notes

- The implementation maintains your existing light theme with blue highlights
- Google fonts are recommended for the best visual match
- All components are built with accessibility in mind
- The layout is fully responsive and adapts to different screen sizes