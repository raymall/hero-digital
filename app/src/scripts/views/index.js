import $ from 'jquery';
import forEach from 'lodash/forEach';
import { createServer } from "miragejs"
require('parsleyjs');

(function() {
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
  let formInstance = $('#form').parsley({
    focus: 'none',
    trigger: false,
    triggerAfterFailure: false,
    successClass: "success",
    errorClass: "error"
  })
  let handleResponse = (response) => {
    console.log('Response', response)
  }

  formInstance.on('field:error', (fieldInstance) => {
    FORM_ERRORS.push(`<span>${ $(fieldInstance.$element).attr('name') } is required</span>`)
  })

  formInstance.on('form:error', () => {
    $('.js-form-errors').empty()
    
    forEach(FORM_ERRORS, function(value) {
      $('.js-form-errors')
      .removeClass('visually-hidden')
      .append(value)
    })
  })

  formInstance.on('form:validate', () => {
    $('.js-form-errors').empty()
    FORM_ERRORS = []
  })

  formInstance.on('form:submit', () => {
    $('.js-form-errors')
    .empty()
    .addClass('visually-hidden')
    .append(`<p>No errors</p>`)

    console.log($('#form').serialize())
    
    fetch('/api/submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: $('#form').serialize()
    })
    .then(response => {
      return response.json()
    })
    .then((json) => {
      handleResponse(json)
    }).catch((error) => {
      handleResponse(error)
      throw Error(error)
    })

    return false;
  })
})();