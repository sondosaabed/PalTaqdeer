$(document).ready(function() {
    $('form').validate({
        messages: {
  
          age: {
            required: "Required",
            min: "Minimum 15 Years",
            max: "Maximum 22 Years",
        },
          medu: "Required",
          fedu: "Required",
          failures: {
            required: "Required",
            min: "Minimum 0 Failures",
            max: "Maximum 4 Failures",
        },
          higher: "Required",
          romantic: "Required",
          g1: {
            required: "Required",
            min: "Minimum Grade 0",
            max: "Maximum Grade 20",
        },
          g2: {
            required: "Required",
            min: "Minimum Grade 0",
            max: "Maximum Grade 20",
        },
          gouout: {
            required: "Required",
            min: "Minimum Hang Out 0",
            max: "Maximum Hang Out 5",
        },
  
        },
        rules: {
          age: "required",
          medu: "required",
          fedu: "required",
          failures: "required",
          higher: "required",
          romantic: "required",
          g1: "required",
          g2: "required",
          gouout: "required",
        },
  
      });
        
      $('form').on('submit', function(event) {
        $.ajax({
            data : {
                age : $('#age').val(),
                medu : $('#medu').val(),
                fedu : $('#fedu').val(),
                failures : $('#failures').val(),
                higher : $('#higher').val(),
                romantic : $('#romantic').val(),
                g1 : $('#g1').val(),
                g2 : $('#g2').val(),
                gouout : $('#gouout').val(),
            },
            type : 'POST',
            url : '/result',
            success: function(data) {
                if (data.error){
                    $('#scss').hide();
                    $('#fail').hide();
                    $('#score').hide();
                    $('#score').removeClass();
                    $('#rslt').removeClass();
                    $('#rslt').addClass('alert alert-danger text-center');
                    // $('#score').text(data.error);
                    $('#rslt').text(data.error);
                    trigger.addEventListener("click", toggleModal);
                    window.addEventListener("click", windowOnClick);          
                }
                else if (data.grade >= 10) {
                    $('#score').text(data.grade);
                    $('#rslt').text('Congrats !!');
                    $('#score').removeClass();
                    $('#rslt').removeClass();
                    $('#score').addClass('alert alert-success text-center');
                    $('#rslt').addClass('alert alert-success text-center');
                    $('#scss').show();
                    $('#score').show();
                    $('#fail').hide();
                    trigger.addEventListener("click", toggleModal);
                    window.addEventListener("click", windowOnClick);
                }
                else if (data.grade < 10) {
                    $('#score').text(data.grade);
                    $('#rslt').text('Hard Luck !!');
                    $('#score').removeClass();
                    $('#rslt').removeClass();
                    $('#score').addClass('alert alert-danger text-center');
                    $('#rslt').addClass('alert alert-danger text-center');
                    $('#scss').hide();
                    $('#score').show();
                    $('#fail').show();
                    trigger.addEventListener("click", toggleModal);
                    window.addEventListener("click", windowOnClick);
                }
            }
        });
        event.preventDefault();
    });
}); 