var until = protractor.ExpectedConditions
var fs = require('fs')
var Buffer = require('safe-buffer').Buffer
const Promise = require('bluebird')
const moment = require('moment')

var Helper = function() {}

// Wait to see if element is on DOM
Helper.prototype.elementIsPresenceDom = function(element) {
  browser.wait(until.presenceOf(element), 25000, 'Element ' + element.getText() + ' taking too long to appear in the DOM')
  browser.executeScript("arguments[0].scrollIntoView();", element.getWebElement())
}

// Wait to see if element is on DOM
Helper.prototype.elementIsClickable = function(element) {
  browser.wait(until.elementToBeClickable(element), 50000, 'Element taking too long to appear in the DOM and stay clickable')
}

// Wait to see if element is on DOM
Helper.prototype.elementIsVisible = function(element) {
  browser.wait(until.visibilityOf(element), 10000, 'Element taking too long to appear in the DOM')
}

// Wait to see if element is not attache to the DOM
Helper.prototype.elementIsNotAttachedOnDom = function(element) {
  browser.wait(until.stalenessOf(element), 10000, 'Element taking too long to appear in the DOM')
}

// Wait to see if element is not present of DOM
Helper.prototype.elementIsNotPresentOfDom = function(element) {
  return browser.wait(until.not(until.presenceOf(element)))
}

// Force the browser to stop
Helper.prototype.stopBrowser = function(time) {
  browser.sleep(time)
}

// Wait for dropdown list elements load
Helper.prototype.waitForCount = function(elementArrayFinder, expectedCount) {
  return function() {
    return elementArrayFinder.count().then(function(actualCount) {
      return expectedCount === actualCount // or <= instead of ===, depending on the use case
    })
  }
}

// Wait for all elements the array of webelements
Helper.prototype.presenceOfAll = function(elementArrayFinder) {
  return function() {
    return elementArrayFinder.count(function(count) {
      return count > 0
    })
  }
}

// This function take a screenshot and save in directory screenshots_atual
Helper.prototype.getScreenshot = function(nomeArquivo) {
  function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename)
    stream.write(Buffer.from(data, 'base64'))
    stream.end()
  }
  return browser.takeScreenshot().then((png) => {
    writeScreenShot(png, './features/screenshots_atual/' + nomeArquivo + '.png')
  })
}

// This function make scrool to down on page
Helper.prototype.scrollPageDown = function(valuePixels) {
  browser.executeScript('window.scrollBy(0,' + valuePixels + ');')
}

// Check if an array is ascending ordered - V2
Helper.prototype.stringArrayIsAscendingOrdered = function(data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].localeCompare(data[i + 1]) > 0) {
      return false
    }
  }
  return true
}

// Check if an array is descending ordered - V2
Helper.prototype.stringArrayIsDescendingOrdered = function(data) {
  for (let i = 0; i < data.length - 1; i++) {
    if (data[i].localeCompare(data[i + 1]) < 0) {
      return false
    }
  }
  return true
}

// Get an array of dates and a parameter date, verify if the array of date is greater then parameter date
Helper.prototype.dateArrayIsGreaterThenParameter = function(arrayDates, DateParam){
  let resultado = true
  let convertParamToDate = moment(DateParam, 'DD/MM/YYYY').format()
  for (let i = 0; i < arrayDates.length; i++) {
    if (resultado === false) {
      return false
    }

    let convertDate = moment(arrayDates[i], 'DD/MM/YYYY').format()
    if (convertDate >= convertParamToDate) {
      resultado = true
    } else {
      resultado = false
    }
  }
  return resultado
}

// Get an array of dates and a parameter date, verify if the array of date is less then parameter date
Helper.prototype.dateArrayIsLessThenParameter = function(arrayDates, DateParam){
  let resultado = true
  let convertParamToDate = moment(DateParam, 'DD/MM/YYYY').format()
  for (let i = 0; i < arrayDates.length; i++) {
    if (resultado === false) {
      return false
    }

    let convertDate = moment(arrayDates[i], 'DD/MM/YYYY').format()
    if (convertDate <= convertParamToDate) {
      resultado = true
    } else {
      resultado = false
    }
  }
  return resultado
}

Helper.prototype.numberArrayIsOrdered = function(a, b) {
  'use strict' // optional.
  // --------------------------------------------
  // a is the array input to be tested.
  // --------------------------------------------
  // b is optional.
  // Undefined b (or other value besides 1) for ascending sequence.
  // b === 1 for descending sequence test.
  // --------------------------------------------
  var m = 0 // counter for loop.
  var currentNum
  var nextNum
  var result = a
  var test

  if (a !== undefined) {
    if (a.constructor === Array) { // check if input a is array object.
      result = true
      while (m < a.length) { // loop through array elements.
        currentNum = a[m]
        nextNum = a[m + 1]
        if (typeof currentNum === 'number' &&
          typeof nextNum === 'number') {
          if (b === 1) {
            test = currentNum <= nextNum // descending.
          } else {
            test = currentNum >= nextNum // ascending.
          }
          if (test) { // found unordered/same elements.
            result = false
            break
          }
        }
        m += 1
      }
    }
  }
  return result
}

// Set token in browser
Helper.prototype.setToken = function(jwt) {
  return Promise.coroutine(function*() {
    yield browser.executeScript(`localStorage.setItem('ls.jwt-token','${jwt}')`, jwt)
  })()
}

// Get token
Helper.prototype.getToken = function() {
  return browser.executeScript("return window.localStorage.getItem('ls.jwt-token');")
}

Helper.prototype.hasClass = function(element, cls) {
  return element.getAttribute('class').then(function(classes) {
    return classes.split(' ').indexOf(cls) !== -1
  })
}

// Check if a date array is ascending ordered - using momentjs
// Parameter: date array 'YYYY-MM-DD hh:mm'
// should return true
Helper.prototype.arrayDateIsAscendingOrdered = function (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let result = moment(arr[i]).isSameOrBefore(arr[i+1])
    if(result === false) {
      return false
    }
  }
  return true
}

// Check if a date array is descending ordered - using momentjs
// Parameter: date array 'YYYY-MM-DD hh:mm'
// should return true
Helper.prototype.arrayDateIsDescendingOrdered = function (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let result = moment(arr[i]).isSameOrAfter(arr[i+1])
    if(result === false) {
      return false
    }
  }
  return true
}

module.exports = Helper
