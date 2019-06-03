'use strict'
const { Given, When, Then, setDefaultTimeout } = require('cucumber')
const expect = require('chai').use(require('chai-as-promised')).expect
// const Helper = require('../../shared_libs/helper.js')
const ListImports = require('../page_objects/list_imports.js')

// const helper = new Helper()
const listImports = new ListImports()
setDefaultTimeout(60 * 1000)

Given('que estou na tela de lista de importações', async function () {
  browser.waitForAngularEnabled(false)
  await listImports.openPage('/')
})

Then('visualizo que estou na página de importações', async function () {
  await listImports.header.getText().then(function (text) {
    expect(text).to.equal('Lista de importações da sua loja')
  })
})

Then('visualizo que o {string} realizou uma importação', async function (string) {
  await listImports.getName().getText().then(function (namesTable) {
    expect(namesTable).to.contain(string)
  })
})

Then('não visualizo a tabla de importações', async function () {
  await listImports.getElementFalse().isPresent().then(function (isPresent) {
    expect(isPresent).to.equal(true)
  })
})
