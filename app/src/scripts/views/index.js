import $ from 'jquery';
import forEach from 'lodash/forEach';
require('parsleyjs');

(function() {
  let FORM_ERRORS = []
  let formInstance = $('#form').parsley({
    focus: 'none',
    trigger: false,
    triggerAfterFailure: false,
    successClass: "success",
    errorClass: "error"
  })

  formInstance.on('form:submit', () => {
    alert('valid')
    $('.js-form-errors')
    .empty()
    .addClass('visually-hidden')
    .append(`<p>No errors</p>`)
    return false;
  })

  formInstance.on('field:error', (fieldInstance) => {
    console.log(`<span>${ $(fieldInstance.$element).attr('name') } is required</span>`)
    FORM_ERRORS.push(`<span>${ $(fieldInstance.$element).attr('name').replace('[]', '') } is required</span>`)
  })

  formInstance.on('form:validate', (formInstance) => {
    $('.js-form-errors').empty()
    FORM_ERRORS = []
    console.log('validate', formInstance)
  })

  formInstance.on('form:error', (formInstance) => {
    $('.js-form-errors').empty()
    console.log('error', formInstance)
    
    forEach(FORM_ERRORS, function(value) {
      $('.js-form-errors')
      .removeClass('visually-hidden')
      .append(value)
      console.log(value)
    })

    FORM_ERRORS = []
  })
})();