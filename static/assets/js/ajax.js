$(document).ready(function() {
        
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
            url : '/result'
        })
        .done(function(data) {
            if (data.grade >= 10) {
                $('#score').text(data.grade);
                $('#rslt').text('Congrats !!');
                $('#score').removeClass();
                $('#rslt').removeClass();
                $('#score').addClass('alert alert-success text-center');
                $('#rslt').addClass('alert alert-success text-center');
                $('#scss').show()
                $('#fail').hide()
            }
            else {
                $('#score').text(data.grade);
                $('#rslt').text('Hard Luck !!');
                $('#score').removeClass();
                $('#rslt').removeClass();
                $('#score').addClass('alert alert-danger text-center');
                $('#rslt').addClass('alert alert-danger text-center');
                $('#scss').hide()
                $('#fail').show()

            }
        });
        event.preventDefault();
    });
}); 