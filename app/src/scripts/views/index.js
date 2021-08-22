import $ from 'jquery';
import forEach from 'lodash/forEach';
import { createServer } from "miragejs"
require('parsleyjs');

(function() {
  // Fake API
  createServer({
    routes() {
      this.post("/api/submission", () => {
        return { 
          "status": "success", 
          "message": "Thank you. You are now subscribed." 
         }
      })
    },
  })

  let FORM_ERRORS = []
  let formErrorsElem = $('.js-form-errors')
  let formResponseElem = $('.js-form-response')

  let formInstance = $('#form').parsley({
    focus: 'none',
    trigger: false,
    triggerAfterFailure: false,
    successClass: "success",
    errorClass: "error"
  })

  // Handle API response
  let handleResponse = (response, status) => {
    if (!status) {
      formResponseElem.addClass('--error')
    } else {
      formResponseElem.removeClass('--error')
    }
    $('.js-message').text(response.message)
    formResponseElem.removeClass('visually-hidden')
  }

  // Handle field errors
  formInstance.on('field:error', (fieldInstance) => {
    FORM_ERRORS.push(`<span>${ $(fieldInstance.$element).attr('name') } is required</span>`)
  })

  // Handle form errors
  formInstance.on('form:error', () => {
    formErrorsElem.empty()
    
    forEach(FORM_ERRORS, function(value) {
      formErrorsElem
      .removeClass('visually-hidden')
      .append(value)
    })
  })

  formInstance.on('form:validate', () => {
    formErrorsElem.empty()
    FORM_ERRORS = []
  })

  // Handle form submission
  formInstance.on('form:submit', () => {
    formErrorsElem
    .empty()
    .addClass('visually-hidden')
    .append(`<p>No errors</p>`)

    console.log(decodeURI($('#form').serialize()).replaceAll(' ', ''))
    
    // API call
    fetch('/api/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: decodeURI($('#form').serialize()).replaceAll(' ', '')
    })
    .then(response => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      handleResponse(json, true)
    }).catch((error) => {
      handleResponse({ 
        "status": "error", 
        "message": "Invalid Subscription request." 
      }, false)
      throw Error(error)
    })

    return false;
  })
})();