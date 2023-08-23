const BasePage = require("./BasePage")

class IndexPage extends BasePage {
    async open() {
        await this.openUrl("https://zerosdev-swapi-starship.netlify.app")
    }
}

module.exports = IndexPage