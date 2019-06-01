'use strict'
const { Given, When, Then, setDefaultTimeout } = require('cucumber')
const expect = require('chai').use(require('chai-as-promised')).expect
// const Helper = require('../../shared_libs/helper.js')
const ListImports = require('../page_objects/list_imports.js')


// const helper = new Helper()
const listImports = new ListImports()
setDefaultTimeout(60 * 1000);

Given('Que estou na tela de lista de importações', async function () {
	await listImports.openPage()
});


When('faço o calculo entre a coluna preço x qtde', function () {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});

Then('Visualizo que o valor total bruto das importações é {string}', function (string) {
// Write code here that turns the phrase above into concrete actions
return 'pending';
});
