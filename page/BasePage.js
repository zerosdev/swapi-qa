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

    async clickBySelector(selector) {
        let el = await driver.findElement(By.css(selector))
        await el.click()
    }

    async waitUntilExistsById(id, timeout) {
        await driver.wait(until.elementLocated(By.id(id)), timeout)
    }

    async waitUntilExistsByXpath(xpath, timeout) {
        await driver.wait(until.elementLocated(By.xpath(xpath)), timeout)
    }

    async waitUntilExistsBySelector(selector, timeout) {
        await driver.wait(until.elementLocated(By.css(selector)), timeout)
    }

    async waitUntilHiddenByXpath(xpath, timeout) {
        await driver.wait(until.elementIsNotVisible(await this.findElementByXpath(xpath)), timeout)
    }

    async waitUntillElementRemovedById(id, timeout) {
        await driver.wait(until.stalenessOf(await this.findElementById(id)), timeout)
    }

    async waitUntillElementRemovedByXpath(xpath, timeout) {
        await driver.wait(until.stalenessOf(await this.findElementByXpath(xpath)), timeout)
    }

    async waitUntillElementRemovedBySelector(selector, timeout) {
        await driver.wait(until.stalenessOf(await this.findElementBySelector(selector)), timeout)
    }

    async findElementById(id) {
        return await driver.findElement(By.id(id))
    }

    async findElementByXpath(xpath) {
        return await driver.findElement(By.xpath(xpath))
    }

    async findElementBySelector(selector) {
        return await driver.findElement(By.css(selector))
    }

    async findElementsById(id) {
        return await driver.findElements(By.id(id))
    }

    async findElementsByXpath(xpath) {
        return await driver.findElements(By.xpath(xpath))
    }

    async findElementsBySelector(selector) {
        return await driver.findElements(By.css(selector))
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

    async fillBySelector(selector, content) {
        let el = await this.findElementBySelector(selector)
        if (el) {
            await el.sendKeys(content)
        }
    }

    async closeBrowser() {
        await driver.closeBrowser()
    }
}

module.exports = BasePage