# Peptiful UI Development Guidelines

## Dark Theme Design System

### Button Styling
- **NEVER use shadcn Button component for dark themes** - it has default hover states that turn white
- Use native `<button>` elements with explicit Tailwind classes instead
- Standard dark button pattern:
  ```jsx
  <button className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/10">
    <Icon className="size-4" />
    Button Text
  </button>
  ```

### Color Guidelines
- Background: `bg-[#050510]` or `bg-[#0a0a14]`
- Text: `text-white` (explicit, not inherited)
- Muted text: `text-white/50`, `text-white/40`, `text-white/70`
- Borders: `border-white/[0.06]`, `border-white/[0.08]`, `border-white/10`
- Hover states: `hover:bg-white/[0.06]`, `hover:bg-white/10`, `hover:bg-white/20`
- Cards: `bg-white/[0.02]` or `bg-white/[0.03]`

### Typography
- Always explicitly set text color on headings (`text-white`)
- Don't rely on inherited foreground colors in dark theme
- Use `font-bricolage` for headings, `font-dm-sans` for body

### Status Badges Pattern
```jsx
<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
  Active
</span>
```

### Dropdown/Select Menus
- Use `bg-[#0a0a14] border-white/10` for dark dropdown backgrounds
- Menu items: `text-white/70 hover:text-white hover:bg-white/5`

### Common Pitfalls to Avoid
1. Using shadcn `<Button>` in dark contexts - hover states break
2. Not explicitly setting `text-white` on headings
3. Using `variant="outline"` buttons - they have problematic hover states
4. Forgetting to style dropdown/select content with dark theme
