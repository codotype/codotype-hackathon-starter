module.exports = {
  name: 'HackathonStarterApiExamples',
  async write ({ configuration }) {

    if (configuration.options.enable_github_api) {
      await this.renderComponent({ src: 'github.pug', dest: 'views/api/github.pug' })
    }

    if (configuration.options.enable_twitter_api) {
      await this.renderComponent({ src: 'twitter.pug', dest: 'views/api/twitter.pug' })
    }

    if (configuration.options.enable_facebook_api) {
      await this.renderComponent({ src: 'facebook.pug', dest: 'views/api/facebook.pug' })
    }

    if (configuration.options.enable_foursquare_api) {
      await this.renderComponent({ src: 'foursquare.pug', dest: 'views/api/foursquare.pug' })
    }

    if (configuration.options.enable_instagram_api) {
      await this.renderComponent({ src: 'instagram.pug', dest: 'views/api/instagram.pug' })
    }

    if (configuration.options.enable_last_fm_api) {
      await this.renderComponent({ src: 'lastfm.pug', dest: 'views/api/lastfm.pug' })
    }

    if (configuration.options.enable_linkedin_api) {
      await this.renderComponent({ src: 'linkedin.pug', dest: 'views/api/linkedin.pug' })
    }

    if (configuration.options.enable_new_york_times_api) {
      await this.renderComponent({ src: 'nyt.pug', dest: 'views/api/nyt.pug' })
    }

    if (configuration.options.enable_steam_api) {
      await this.renderComponent({ src: 'steam.pug', dest: 'views/api/steam.pug' })
    }

    if (configuration.options.enable_stripe_api) {
      await this.renderComponent({ src: 'stripe.pug', dest: 'views/api/stripe.pug' })
    }

    if (configuration.options.enable_paypal_api) {
      await this.renderComponent({ src: 'paypal.pug', dest: 'views/api/paypal.pug' })
    }

    if (configuration.options.enable_twilio_api) {
      await this.renderComponent({ src: 'twilio.pug', dest: 'views/api/twilio.pug' })
    }

    if (configuration.options.enable_tumblr_api) {
      await this.renderComponent({ src: 'tumblr.pug', dest: 'views/api/tumblr.pug' })
    }

    if (configuration.options.enable_web_scraping_api) {
      await this.renderComponent({ src: 'scraping.pug', dest: 'views/api/`scraping.pug' })
    }

    if (configuration.options.enable_clockwork_sms_api) {
      await this.renderComponent({ src: 'clockwork.pug', dest: 'views/api/clockwork.pug' })
    }

    if (configuration.options.enable_aviary_api) {
      await this.renderComponent({ src: 'aviary.pug', dest: 'views/api/aviary.pug' })
    }

    if (configuration.options.enable_lob_api) {
      await this.renderComponent({ src: 'lob.pug', dest: 'views/api/lob.pug' })
    }

    if (configuration.options.enable_pinterest_api) {
      await this.renderComponent({ src: 'pinterest.pug', dest: 'views/api/pinterest.pug' })
    }

    if (configuration.options.enable_google_maps_api) {
      await this.renderComponent({ src: 'google-maps.pug', dest: 'views/api/google-maps.pug' })
    }

  }
}
