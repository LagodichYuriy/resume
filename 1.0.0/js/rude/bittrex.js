var bittrex =
{
	menu:
	{
		activate: function (selector)
		{
			$('#time-frame').find('.ui.button').removeClass('active');

			$(selector).addClass('active');
		}
	},

	ajax: function (data, success, error)
	{
		if (typeof success === 'undefined') { success = function (answer) { debug(answer); } }
		if (typeof error   === 'undefined') { error   = function (answer) { debug(answer); } }

		data['ajax'] = true;

		$.ajax
		({
			type: 'POST',
			cache: false,

			data: data,

			success: success,
			error: error
		});
	}
};