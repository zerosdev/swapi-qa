const chai = require("chai")
const assert = chai.assert
const IndexPage = require("../page/IndexPage")

describe("QA for Index page", () => {
    var page = new IndexPage()

    it("Open page", async () => {
        await page.open()
    })
    
    it("Have content loading placeholder", async () => {
        try {
            await page.findElementByXpath(`//*[contains(@class, "vue-content-placeholders")]`)
        } catch (e) {
            assert.fail(e.message)
        }
    })

    it("Auto-submit search form", async () => {
        await page.fillById("search-keyword", "CR90 corvette")
        await page.wait(5000)
        let results = await page.findElementsBySelector('.starship-col')
        assert.equal(results.length, 1)
    })

    it("Search with button", async () => {
        await page.fillById("search-keyword", "CR90 corvette")
        await page.wait(5000)
        await page.clickById("search")
        await page.wait(5000)
        let results = await page.findElementsBySelector('.starship-col')
        assert.equal(results.length, 1)
    })
})