module.exports = {
  name: 'HackathonStarterContactForm',
  async write ({ configuration }) {
    if (configuration.features.contact_form) {
      this.renderComponent({ src: 'contact.js', dest: 'controllers/contact.js' })
      this.renderComponent({ src: 'contact.pug', dest: 'views/contact.pug' })
    }
  }
}
