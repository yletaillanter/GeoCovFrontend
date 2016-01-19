//TODO il doit y avoir une erreur dans le fichier de vérification des champs
//J'ai commenté afin d'enlever l'erreur je n'ai pas vraiment chercher ou elle était car ça doit être un fichier repris


// "use strict"
//
// (function() {
//
// 	var app = {
//
// 		initialize : function () {
// 			this.modules();
// 			this.setUpListeners();
// 		},
//
// 		modules: function () {
//
// 		},
//
// 		setUpListeners: function () {
// 			$('form').on('submit', app.submitForm);
// 			$('form').on('keydown', 'input', app.removeError);
// 		},
//
// 		submitForm: function (e) {
// 			e.preventDefault();
//
// 			var form = $(this),
// 				submitBtn = form.find('button[type="submit"]');
//
// 			if( app.validateForm(form) === false ) return false;
//
// 			submitBtn.attr('disabled', true);
//
// 			console.log('go to ajax');
//
// 			// Modify code below to connect with server
//
// 			var str = form.serialize();
//
// 			$.ajax({
// 				url: 'testfolder/ajax.php',
// 				type: 'POST',
// 				data: str
// 			})
// 			.done(function(msg) {
// 				if(msg === 'OK'){
// 					var result = "<div class='bg-success'>Thanks for signed in</div>"
// 					form.html(result);
// 				}else{
// 					form.html(msg);
// 				}
// 			})
// 			.always(function() {
// 				submitBtn.removeAttr('disabled');
// 			});
//
// 			// End of server response
//
// 		},
//
// 		validateForm: function (form) {
// 			var inputs = form.find('input[type="text"],input[type="password"],input[type="email"]'),
// 				valid = true;
//
// 			inputs.tooltip('destroy');
//
// 			$.each(inputs, function(index, val){
// 				var input = $(val),
// 					val = input.val(),
// 					formGroup = input.parents('.form-group'),
// 					label = formGroup.find('label').text().toLowerCase(),
// 					textError = 'Insert '+label;
//
// 				if(val.length === 0){
// 					formGroup.addClass('has-error').removeClass('has-success');
// 					input.tooltip({
// 						trigger: 'manual',
// 						placement: 'right',
// 						title: textError
// 					}).tooltip('show');
// 					valid = false;
// 				}else{
// 					// input.tooltip('hide');
// 					formGroup.addClass('has-success').removeClass('has-error');
// 				}
//
// 			});
//
// 			return valid;
// 		},
//
// 		removeError: function(){
// 			$(this).tooltip('destroy').parent('.form-group').removeClass('has-error');
// 		}
// 	}
//
// 	app.initialize();
//
// }());
