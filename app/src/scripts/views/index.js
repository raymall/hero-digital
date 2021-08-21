import $ from 'jquery';
require('parsleyjs');

(function() {
  // $('#form').on('submit', (e) => {
  //   e.preventDefault()
  //   console.log('here')
  //   let formInstance = $('#form').parsley({
  //     uiEnabled: false,
  //     trigger: 'change',
  //     focus: 'first',
  //     successClass: "success",
  //     errorClass: "error"
  //   })
  //   if (formInstance.isValid()){
  //     alert('valid');
  //   } else {
  //     alert('is not valid');
  //   }
  // })

  // $('#form').on('submit', (e) => {
  //   console.log('here')
  //   let formInstance = $('#form').parsley({
  //     uiEnabled: false,
  //     trigger: 'change',
  //     focus: 'first',
  //     successClass: "success",
  //     errorClass: "error"
  //   })
  //   if (formInstance.isValid()){
  //     alert('valid');
  //   } else {
  //     alert('is not valid');
  //   }
  //   e.preventDefault()
  // })

  $('#form').parsley({
    successClass: "success",
    errorClass: "error"
  })
  .on('form:submit', () => {
    alert('valid');
    return false; // Don't submit form for this demo
  });

  $.listen('parsley:field:error', (fieldInstance) => {
    console.log(fieldInstance);
  });

  // $('#form').parsley({
  //   uiEnabled: false,
  //   focus: 'first',
  //   successClass: "success",
  //   errorClass: "error"
  // }).on('form:validate', function() {
  //   // var ok = $('.parsley-error').length === 0;
  //   // $('.bs-callout-info').toggleClass('hidden', !ok);
  //   // $('.bs-callout-warning').toggleClass('hidden', ok);
  // })
  // .on('form:submit', function() {
  //   return false; // Don't submit form for this demo
  // });
})();