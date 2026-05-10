# Google Analytics setup

The site is wired to inject the GA4 snippet automatically when
`google_analytics:` in `_config.yml` is set to your measurement ID.

## One-time setup

1. Go to https://analytics.google.com → **Admin** → **Create Property**.
2. Property name: `claudioverdun.github.io`. Time zone: US/Eastern. Currency: USD.
3. **Data Streams** → **Add stream** → **Web** → URL `https://claudioverdun.github.io` → name `Website`. Save.
4. Copy the **Measurement ID** (`G-XXXXXXXXXX`) from the stream details page.
5. Paste it into `_config.yml`:

   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```

   Commit and push.

## What you get

Within ~30 minutes the dashboard at https://analytics.google.com begins
showing:

- City-level visitor location (no exact addresses)
- Page views, time on page, referrer source
- Device type, browser, language

The dashboard is visible only to the Google account that owns the property.
The measurement ID is the only thing that lands in the public repo, and is
designed to be public.
