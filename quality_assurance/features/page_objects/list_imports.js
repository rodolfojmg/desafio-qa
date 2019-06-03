'use strict'
var Helper = require('../../shared_libs/helper.js')

class ListImports {
  constructor () {
    this.helper = new Helper()
    this.header = element(by.css('h1'))
    this.table = $("[class='importer-purchases-table']")
    this.elementFalse = $("[class='elementFalse']")
  }

  openPage (link) {
    browser.get(link)
  }

  getName () {
    this.helper.elementIsVisible(this.table)
    return this.table
  }

  getElementFalse () {
    this.helper.elementIsNotPresentOfDom(this.elementFalse)
    return this.elementFalse
  }
}

module.exports = ListImports
