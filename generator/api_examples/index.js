module.exports = {
  name: 'HackathonStarterApiExamples',
  async write ({ configuration }) {

    if (configuration.api_examples.github) {
      await this.renderComponent({ src: 'github.pug', dest: 'views/api/github.pug' })
    }

    if (configuration.api_examples.twitter) {
      await this.renderComponent({ src: 'twitter.pug', dest: 'views/api/twitter.pug' })
    }

    if (configuration.api_examples.facebook) {
      await this.renderComponent({ src: 'facebook.pug', dest: 'views/api/facebook.pug' })
    }

    if (configuration.api_examples.foursquare) {
      await this.renderComponent({ src: 'foursquare.pug', dest: 'views/api/foursquare.pug' })
    }

    if (configuration.api_examples.instagram) {
      await this.renderComponent({ src: 'instagram.pug', dest: 'views/api/instagram.pug' })
    }

    if (configuration.api_examples.last_fm) {
      await this.renderComponent({ src: 'lastfm.pug', dest: 'views/api/lastfm.pug' })
    }

    if (configuration.api_examples.linkedin) {
      await this.renderComponent({ src: 'linkedin.pug', dest: 'views/api/linkedin.pug' })
    }

    if (configuration.api_examples.new_york_times) {
      await this.renderComponent({ src: 'nyt.pug', dest: 'views/api/nyt.pug' })
    }

    if (configuration.api_examples.steam) {
      await this.renderComponent({ src: 'steam.pug', dest: 'views/api/steam.pug' })
    }

    if (configuration.api_examples.stripe) {
      await this.renderComponent({ src: 'stripe.pug', dest: 'views/api/stripe.pug' })
    }

    if (configuration.api_examples.paypal) {
      await this.renderComponent({ src: 'paypal.pug', dest: 'views/api/paypal.pug' })
    }

    if (configuration.api_examples.twilio) {
      await this.renderComponent({ src: 'twilio.pug', dest: 'views/api/twilio.pug' })
    }

    if (configuration.api_examples.tumblr) {
      await this.renderComponent({ src: 'tumblr.pug', dest: 'views/api/tumblr.pug' })
    }

    if (configuration.api_examples.web_scraping) {
      await this.renderComponent({ src: 'scraping.pug', dest: 'views/api/`scraping.pug' })
    }

    if (configuration.api_examples.clockwork_sms) {
      await this.renderComponent({ src: 'clockwork.pug', dest: 'views/api/clockwork.pug' })
    }

    if (configuration.api_examples.aviary) {
      await this.renderComponent({ src: 'aviary.pug', dest: 'views/api/aviary.pug' })
    }

    if (configuration.api_examples.lob) {
      await this.renderComponent({ src: 'lob.pug', dest: 'views/api/lob.pug' })
    }

    if (configuration.api_examples.pinterest) {
      await this.renderComponent({ src: 'pinterest.pug', dest: 'views/api/pinterest.pug' })
    }

    if (configuration.api_examples.google_maps) {
      await this.renderComponent({ src: 'google-maps.pug', dest: 'views/api/google-maps.pug' })
    }

    if (configuration.api_examples.chartjs) {
      await this.renderComponent({ src: 'chart.pug', dest: 'views/api/chart.pug' })
    }

  }
}
