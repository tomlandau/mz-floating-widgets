# Mizrahnik Floating Widgets

A WordPress plugin that adds floating UI widgets shared across WP and Next.js sites.

## Widgets

- **Coupon Button** — A fixed-position ticket-style button linking to the coupons page. Includes a shine animation, responsive layout (side-anchored on desktop, bottom-centered on mobile), and a toggle to hide/show on desktop. Automatically hidden on checkout, cart, account, and club pages.
- **Scroll to Top** — A circular button that appears after scrolling down 100px and smoothly scrolls back to the top.

## Installation

1. Copy the plugin folder into `wp-content/plugins/`.
2. Activate **Mizrahnik Floating Widgets** in the WordPress admin.

## Standalone / Next.js Usage

Include `assets/css/miz-floating-widgets.css` and `assets/js/miz-floating-widgets.js` in your page. The script is a self-contained IIFE with a load guard (`window.__MIZ_FW_LOADED`), so it's safe to include multiple times.

## File Structure

```
mz-floating-widgets/
├── mz-floating-widgets.php          # WP plugin bootstrap (enqueues assets)
├── assets/
│   ├── css/miz-floating-widgets.css  # Shared styles
│   └── js/miz-floating-widgets.js    # Shared logic (IIFE)
└── README.md
```

## License

GPL-2.0-or-later
