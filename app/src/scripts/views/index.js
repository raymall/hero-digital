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

  formInstance.on('field:error', (fieldInstance) => {
    FORM_ERRORS.push(`<span>${ $(fieldInstance.$element).attr('name').replace('[]', '') } is required</span>`)
  })

  formInstance.on('form:error', (formInstance) => {
    $('.js-form-errors').empty()
    console.log('error', formInstance)
    
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
    
    fetch('/api/submission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: $('#form').serialize()
    })
    .then(response => {
      if (!response.ok) throw Error(response.statusText)
      return response.json()
    })
    .then((json) => {
      // buildList(json)
      console.log(json)
    }).catch((errors) => {
      console.log(errors)
    })

    return false;
  })
})();