# codotype-hackathon-starter

A Codotype generator build around Sahat's Hackathon Starter

## Development Instructions

1. Install dependencies:

```
npm install
```

2. Run generator:

```
npm test
```

## Notes
- Modify the configuration in `index.js` to test different features and blueprints


## Generator Snippets

The following snippets may be helpful while writing generators around Hackathon Starter:

```
<%_ if (configuration.options.enable_instagram_auth) { _%>
<%_ } _%>

<%_ if (configuration.options.enable_facebook_auth) { _%>
<%_ } _%>

<%_ if (configuration.options.enable_twitter_auth) { _%>
<%_ } _%>

<%_ if (configuration.options.enable_github_auth) { _%>
<%_ } _%>

<%_ if (configuration.options.enable_google_auth) { _%>
<%_ } _%>

<%_ if (configuration.options.enable_linkedin_auth) { _%>
<%_ } _%>
```

```
<%_ if (configuration.options.enable_github_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_twitter_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_facebook_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_foursquare_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_instagram_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_last_fm_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_linkedin_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_new_york_times_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_steam_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_stripe_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_paypal_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_twilio_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_tumblr_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_web_scraping_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_clockwork_sms_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_aviary_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_lob_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_pinterest_api) { _%>
<%_ } _%>


<%_ if (configuration.options.enable_google_maps_api) { _%>
<%_ } _%>
```