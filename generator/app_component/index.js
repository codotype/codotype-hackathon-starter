module.exports = {
  async write({ blueprint }) {
    await this.renderComponent({ src: 'app.js', dest: 'src/app.js' })
  }
}
