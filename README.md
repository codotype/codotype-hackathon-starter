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


# # # # # #
# # # # # #

TODOs
- [X] Tests Working
- [X] User List - remove dropdown, replace with show link
- [X] User Show - remove dropdown
- [X] Handle option groups in README.md
- [X] Handle option groups in .env.example
- [X] Handle option groups in config/passport.js
- [X] Handle option groups in views/account/profile.pug (linked accounts at the bottom)
- [X] Handle option groups in Status page middleware in app.js
- [ ] Handle option groups in package.json - dependencies - lower priority, make a github issue
- [ ] Add `Contributors Wanted!` notice to README.md, homepage
- [ ] Add tests for all models, controllers - make a github issue
- [ ] Add documentation options group to turn on/off parts of README.md

# # # # # #
# # # # # #


<%_ if (configuration.authorization.facebook) { _%>
<%_ } _%>
<%_ if (configuration.authorization.twitter) { _%>
<%_ } _%>
<%_ if (configuration.authorization.google) { _%>
<%_ } _%>
<%_ if (configuration.authorization.github) { _%>
<%_ } _%>
<%_ if (configuration.authorization.linkedin) { _%>
<%_ } _%>
<%_ if (configuration.authorization.instagram) { _%>
<%_ } _%>
<%_ if (configuration.authorization.snapchat) { _%>
<%_ } _%>

#############

<%_ if (configuration.api_examples.github) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.twitter) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.facebook) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.foursquare) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.instagram) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.last_fm) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.linkedin) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.new_york_times) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.steam) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.stripe) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.paypal) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.twilio) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.tumblr) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.web_scraping) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.clockwork_sms) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.aviary) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.lob) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.pinterest) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.google_maps) { _%>
<%_ } _%>
<%_ if (configuration.api_examples.chartjs) { _%>
<%_ } _%>
