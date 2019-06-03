'use strict'

const Data = require('./environments_parameters.json')

const TEST_ENV = process.env.TEST_ENV
let environmentParameters

switch (TEST_ENV) {
  case 'localDev':
    environmentParameters = Data[0].localDev
    break

  case 'localQA':
    environmentParameters = Data[0].localQA
    break
}

exports.config = {
  seleniumAddress: environmentParameters.seleniumAddress,
  baseUrl: environmentParameters.baseUrl,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  ignoreUncaughtExceptions: true,
  restartBrowserBetweenTests: false,
  getPageTimeout: 20000,
  allScriptsTimeout: 30000,
  rootElement: '*[ng-app]',

  cucumberOpts: {
    require: 'features/step_definitions/*.js',
    tags: ['~@notImplemented'],
    format: ['json:report.json'],
    profile: false,
    'no-source': true
  },

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: [
        // '--headless',
        // '--disable-infobars',
        // '--no-sandbox'
      ]
    }
  },

  specs: [
    'features/*.feature'
  ],

  // Caso não precise executar uma determinada feature
  exclude: [],

  beforeLaunch: function () {
    setTimeout(function () {
      browser.driver.manage().window().setSize(1280, 1024)
      // browser.driver.manage().window().maximize()
    })
  },

  onPrepare: function () {
    // Use only for angular applications
    // False: app Angular
    // True: app not Angular
    browser.ignoreSynchronization = false
  },

  afterLaunch: function () {
    var reporter = require('cucumber-html-reporter')

    var options = {
      theme: 'bootstrap',
      jsonFile: 'report.json',
      output: './report/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true,
      metadata: {
        'App Version': '1.0',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome 74.0.3729.169',
        'Platform': 'OSX',
        'Parallel': 'Scenarios',
        'Executed': 'Remote'
      }
    }

    reporter.generate(options)
  }
}
