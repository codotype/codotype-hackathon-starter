# codotype-hackathon-starter

Codotype generator for React, React Router, & Bootstrap 4

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