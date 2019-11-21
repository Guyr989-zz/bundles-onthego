function checkForm(form, element_name) {
  var errors = false;
  if (!$('#mycheckbox').is(':checked')) {
    $('#error-' + element_name).show().text('Please Agree to Terms and Conditions ');
    $('#' + element_name).find('#terms_checkbox_text').addClass('error-border-marker-custom');
    $('#' + element_name).find('#mycheckbox').focus();
    $('#' + element_name).find('#mycheckbox').click(function () {
      if ($('#mycheckbox').is(':checked')) {
        $('#' + element_name).find('#terms_checkbox_text').removeClass('error-border-marker-custom');
        $('#error-' + element_name).hide();
      }
    });
    errors = true;
  }
  ['first_name', 'last_name', 'email', 'area_code', 'phone', 'password'].forEach(function (key, index) {
    var value = form[key];
    if (!errors) {
      if (key === 'first_name') {
        if (value === undefined || value === '') {
          $('#error-' + element_name).show().text('Please enter valid first name (example: John)');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });
          errors = true;
        }
      }
      if (key === 'last_name') {
        if (value === undefined || value === '') {
          $('#error-' + element_name).show().text('Please enter valid last name (example: Smith)');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });
          errors = true;
        }
      }
      if (key === 'phone') {
        let phone = document.getElementsByName('phone')[0];
        if (!isNaN(Number(phone.value))) {
          $('#error-' + element_name).show().text('Phone must but numbers only');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });
          errors = true;
        }
        if (phone.value.length < 6) {
          $('#error-' + element_name).show().text('please enter a valid phone');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });

          errors = true;
        } else {
          errors = false;
        }
      }
      if (key === 'email') {
        if (!validateEmail(value)) {
          $('#error-' + element_name).show().text('Email not valid');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });
          errors = true;
        }
      }
      if (key === 'password') {
        var password = document.getElementsByName('password')[0];

        if (password.value.length < 5) {
          $('#error-' + element_name).show().text('Password must be more than 4 characters');
          $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
          $('#' + element_name).find('#' + key).focus();
          $('#' + element_name).find('#' + key).focusout(function () {
            $(this).removeClass('error-border-marker-custom');
            $('#error-' + element_name).hide();
          });
          errors = true;
        }
      }


      if (value === '' && ['first_name', 'last_name', 'email', 'area_code', 'phone', 'password'].includes(key)) {
        $('#error-' + element_name).show().text('Please fill in ' + key.replace('_', ' '));
        $('#' + element_name).find('#' + key).addClass('error-border-marker-custom');
        $('#' + element_name).find('#' + key).focus();
        $('#' + element_name).find('#' + key).focusout(function () {
          $(this).removeClass('error-border-marker-custom');
          $('#error-' + element_name).hide();
        });
        errors = true;
      }
    }

  });

  return !errors;
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


var currencies = {
  dollar: '$',
  euro: '€',
  gep: '£'
};

var euroCountries = [
  'Andorra',
  'Austria',
  'Belgium',
  'Cyprus',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Ireland',
  'Italy',
  'Kosovo',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Monaco',
  'Montenegro',
  'Netherlands',
  'Portugal',
  'San Marino',
  'Slovakia',
  'Slovenia',
  'Spain',
];

function getGeoData() {

  $.ajax({
    url: '//geol.startbundlingnow.com/geolocate',
    method: 'GET',
    contentType: 'application/json',
    data: sendData,
    beforeSend: function () {
      // $('.loader').show();
    }
    ,
    success: function (data, textStatus, jQxhr) {
      $('.state').text(data.result.country);
      $('.data-class-form').each(function (i, obj) {
        if (data.status !== undefined && data.status === 'success') {
          $(this).find('#ip').val(data.result.ip);
          $(this).find('#area_code').val(data.result.phone_prefix);
          $(this).find('#country').text(data.result.country);
          $(this).find('#iso').val(data.result.iso);
          var isEuropean = euroCountries.filter(country => country === data.result.country);
          if (isEuropean.length > 0) {
            $('.currency').text(currencies.euro);
          } else if (data.result.country === 'United Kingdom') {
            $('.currency').text(currencies.gep);

          } else {
            $('.currency').text(currencies.dollar);
          }


        } else {
          $('#error-' + $(this).attr('id')).removeAttr('hidden').text('Your Country is not supported!');
        }
      });
    }
    ,
    error: function (jqXhr, textStatus, errorThrown) {
//        console.log(errorThrown);
    }
  });
}


$(document).ready(function () {
  getGeoData();
});

var sendData = {};

function addFormToSendData(formName) {
  sendData['aff_id'] = getAffId();
  var form_data = getFormData(formName);
  if (checkForm(form_data, formName)) {
    sendData = Object.assign(sendData, form_data);
    return true;
  }
  return false;

}

function getAffId() {
  var url = new URL(window.location);
  affId = url.searchParams.get('aff_id');
  if (affId == null || affId === undefined) {
    affId = 1;
  }

  return affId;
}

function getFormData(formName) {
  var formElement = $('#' + formName);
  return {
    'offer_id': offer_id,
    'first_name': $(formElement).find('#first_name').val(),
    'last_name': $(formElement).find('#last_name').val(),
    'email': $(formElement).find('#email').val(),
    'password': $(formElement).find('#password').val(),
    'area_code': $(formElement).find('#area_code').val(),
    'phone': $(formElement).find('#phone').val(),
    'country': $(formElement).find('#country').val(),
    'iso': $(formElement).find('#iso').val(),
    'aff_sub': getQueryVariable('aff_sub'),
    'aff_sub2': getQueryVariable('aff_sub2'),
    'aff_sub3': getQueryVariable('aff_sub3'),
    'aff_sub4': getQueryVariable('aff_sub4'),
    'aff_sub5': getQueryVariable('aff_sub5'),
    'ip': $(formElement).find('#ip').val(),
    'broker': 'tradeocom'
  };
}


function send(formName) {
  var form_data_added = addFormToSendData(formName);
  if (!form_data_added) {
    return false;
  }
  sendData = JSON.stringify(sendData);
  $.ajax({
    url: '//trafficon-api.com/secured-registration',
    method: 'POST',
    contentType: 'application/json',
    data: sendData,
    beforeSend: function () {
      $('.loader').show();
    }

    ,
    success: function (data, textStatus, jQxhr) {
      sendData = {};
      if (data.status !== undefined && data.status === 'success') {
        firePixel();
        scrollTo('.register-btn', 'header', 1000);
        document.getElementsByClassName('form-wrap')[0].style.display = 'none';
        setTimeout(() => {
          if (data.ref_link.substr(-1) === '/') {
            window.location.href = data.ref_link + data.token;
          } else {
            window.location.href = data.ref_link + '/' + data.token;
          }
        }, 3 * 1000);
      } else if (data.status !== undefined && data.status !== 'success') {
        $('#error-' + formName).removeAttr('hidden').text(data.message);
        $('.loader').hide();
      }

    }
    ,
    error: function (jqXhr, textStatus, errorThrown) {
      $('.loader').hide();
    }
  })
  ;
}


function scrollTo(clickElem, goToElem, timeToScroll) {

  $([document.documentElement, document.body]).animate({
    scrollTop: $(goToElem).offset().top
  }, timeToScroll);
}