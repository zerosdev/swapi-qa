require('dotenv').config()
const { By, Builder, until } = require("selenium-webdriver")
const browser = process.env.BROWSER || "chrome"

class BasePage {
    constructor() {
        global.driver = new Builder().forBrowser(browser).build()
    }

    async wait(wait) {
        await driver.sleep(wait)
    }

    async openUrl(url) {
        await driver.get(url)
    }

    async clickById(id) {
        let el = await driver.findElement(By.id(id))
        await el.click()
    }

    async clickByXpath(xpath) {
        let el = await driver.findElement(By.xpath(xpath))
        await el.click()
    }

    async clickByCSS(css) {
        let el = await driver.findElement(By.css(css))
        await el.click()
    }

    async waitUntilExistsById(id, timeout) {
        await driver.wait(until.elementLocated(By.id(id)), timeout)
    }

    async waitUntilExistsByXpath(xpath, timeout) {
        await driver.wait(until.elementLocated(By.xpath(xpath)), timeout)
    }

    async waitUntilExistsByCSS(css, timeout) {
        await driver.wait(until.elementLocated(By.css(css)), timeout)
    }

    async waitUntilHiddenByXpath(xpath, timeout) {
        await driver.wait(until.elementIsNotVisible(await this.findElementByXpath(xpath)), timeout)
    }

    async findElementById(id) {
        return await driver.findElement(By.id(id))
    }

    async findElementByXpath(xpath) {
        return await driver.findElement(By.xpath(xpath))
    }

    async findElementByCSS(css) {
        return await driver.findElement(By.css(css))
    }

    async findElementsById(id) {
        return await driver.findElements(By.id(id))
    }

    async findElementsByXpath(xpath) {
        return await driver.findElements(By.xpath(xpath))
    }

    async findElementsByCSS(css) {
        return await driver.findElements(By.css(css))
    }

    async fillById(id, content) {
        let el = await this.findElementById(id)
        if (el) {
            await el.sendKeys(content)
        }
    }

    async fillByXpath(xpath, content) {
        let el = await this.findElementByXpath(xpath)
        if (el) {
            await el.sendKeys(content)
        }
    }

    async fillByCSS(css, content) {
        let el = await this.findElementByCSS(css)
        if (el) {
            await el.sendKeys(content)
        }
    }

    async closeBrowser() {
        await driver.closeBrowser()
    }
}

module.exports = BasePage