# Button Color System - Spectra Vision

## Konsisten Color Palette untuk Buttons

### Primary Colors (Brand Identity)
- **Primary Button**: `bg-black hover:bg-gray-800` - Main CTAs, checkout, purchase
- **Secondary Button**: `border-2 border-black text-black hover:bg-black hover:text-white` - Less important actions
- **Accent Button**: `bg-gradient-to-r from-blue-600 to-purple-600` - Special features, product highlights

### Functional Colors
- **Success**: `bg-green-600 hover:bg-green-700` - Confirmations, success states
- **Warning**: `bg-yellow-500 hover:bg-yellow-600` - Alerts, notifications
- **Danger**: `bg-red-500 hover:bg-red-600` - Delete, remove actions
- **Info**: `bg-blue-500 hover:bg-blue-600` - Information, help

### Neutral States
- **Disabled**: `bg-gray-400 text-white cursor-not-allowed` - Inactive buttons
- **Ghost**: `text-gray-600 hover:bg-gray-100` - Subtle actions
- **Light**: `bg-gray-100 hover:bg-gray-200` - Quantity controls, minor interactions

## Implementation Plan

1. **Keep black as primary** - sudah established sebagai brand color
2. **Use blue-purple gradient sparingly** - hanya untuk special features
3. **Standardize all secondary buttons** - border style dengan hover fill
4. **Consistent functional colors** - merah untuk danger, hijau untuk success

## Files to Update
- All button components in pages/ and components/
- Focus on: Cart.jsx, ProductDetail.jsx, Checkout.jsx, Shop.jsx