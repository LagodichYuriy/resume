function int(number)
{
	return parseInt(number) || 0; // NaN -> 0
}

function float(number, precision)
{
	var float = parseFloat(number) || 0.; // NaN -> 0.

	if (typeof precision !== 'undefined')
	{
		return float.toFixed(precision);
	}

	return float;
}

function round(number, precision)
{
	if (typeof precision === 'undefined')
	{
		precision = 2;
	}

	if (is_zero(number))
	{
		return float(0.);
	}

	return float(number, precision);
}

function is_zero(number)
{
	return number > -0.00001 && number < 0.00001;
}

var portfolio =
{
	cache:
	{
		id: 0,

		portfolios: {},
		currencies: {},

		capital: 0.,
		created: '',

		cash:
		{
			percent: 0.,
			volume: 0.,
			value: 0.
		}
	},

	selectors:
	{
		capital: null,
		created: null,
		comment: null,

		table: null,
		thead: null,
		tbody: null,

		currencies: null,

		modal: null,

		cash:
		{
			row: null,

			percent: null,
			volume: null,
			value: null
		}
	},

	init: function()
	{
		jQuery.fn.extend
		({
			currency_id: function()
			{
				return int(this.attr('data-currency-id'));
			}
		});


		portfolio.update.selectors();

		portfolio.index();

		portfolio.selectors.capital.bind('input', function ()
		{
			portfolio.update.capital();
		});

		portfolio.selectors.tbody.find('.portfolio-percent').bind('input', function ()
		{
			portfolio.update.portfolio.percent(this);
		})
		.bind('change', function ()
		{
			var input = $(this);

			input.val(round(input.val()));

			portfolio.update.portfolio.percent(this);
		});

		portfolio.selectors.tbody.find('.portfolio-volume').bind('input', function ()
		{
			portfolio.update.portfolio.volume(this);
		})
		.bind('change', function ()
		{
			var input = $(this);

			var currency_id = input.currency_id();
			var currency = portfolio.cache.currencies[currency_id];

			     if (is_zero(currency.currency_index)) { input.val('');                 }
			else                                       { input.val(round(input.val())); }

			portfolio.update.portfolio.volume(this);
		});

		portfolio.selectors.tbody.find('.portfolio-value').bind('input', function ()
		{
			portfolio.update.portfolio.value(this);
		})
		.bind('change', function ()
		{
			var input = $(this);

			input.val(round(input.val()));

			portfolio.update.portfolio.value(this);
		});

		// portfolio.selectors.tbody.find('.portfolio-value').bind('input', function ()
		// {
		// 	portfolio.update.portfolio.value(this);
		// });

		portfolio.selectors.created.bind('input', function ()
		{
			portfolio.update.created();
		});

		portfolio.update.capital();
		portfolio.update.created();
	},

	index: function ()
	{
		portfolio.cache.currencies = {};

		portfolio.selectors.currencies.each(function ()
		{
			var tr = $(this);

			var currency_id = int(tr.attr('data-currency-id'));

			portfolio.cache.currencies[currency_id] =
			{
				id: currency_id,

				currency_index:    0.,

				portfolio_percent: 0.,
				portfolio_volume:  0.,
				portfolio_value:   0.
			};
		});
	},

	bind: function (portfolios)
	{
		portfolio.cache.portfolios = {};

		for (var index in portfolios)
		{
			var data = portfolios[index];

			portfolio.cache.portfolios[data.id] = data;
		}
	},

	reset: function ()
	{
		portfolio.cache.id = 0;

		portfolio.selectors.created.val('');
		portfolio.selectors.capital.val(10000);

		portfolio.update.capital();

		portfolio.index();

		portfolio.cache.cash.percent = 0.;
		portfolio.cache.cash.volume = 0.;
		portfolio.cache.cash.value = 0.;

		portfolio.selectors.name.val('Portfolio #' + portfolio.selectors.name.attr('data-default'));
		portfolio.selectors.comment.val('');

		var date  = new Date();
		var year  = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;
		var day   = date.getUTCDate();

		var string = year + "-" + month + "-" + day;

		portfolio.selectors.created.val(string);

		portfolio.selectors.tbody.find('.portfolio-percent, .portfolio-volume, .portfolio-value').val('');

		portfolio.update.cash.percent();
		portfolio.update.created();
		portfolio.redraw.lines();
	},

	load: function (portfolio_id)
	{
		portfolio.reset();

		if (typeof portfolio.cache.portfolios[portfolio_id] === 'undefined')
		{
			portfolio.update.indexes();

			portfolio.selectors.modal.modal('show');

			return;
		}


		var data = portfolio.cache.portfolios[portfolio_id];

		portfolio.cache.id = data.id;

		portfolio.selectors.capital.val(int(data.capital));
		portfolio.selectors.created.val(data.created);

		portfolio.update.capital();
		portfolio.update.created();
		portfolio.update.indexes();


		portfolio.selectors.name.val(data.name);
		portfolio.selectors.comment.val(data.comment);

		for (var currency_id in data.currencies)
		{
			var percent = float(data.currencies[currency_id].percent);

			// debug(data.currencies);
			// debug(portfolio.cache.currencies);

			// portfolio.cache.currencies[currency_id].portfolio_percent = percent;

			var input = $('#portfolio-percent-' + currency_id);

			input.val(round(percent));

			portfolio.update.portfolio.percent(input);
		}

		portfolio.redraw.lines();

		portfolio.selectors.modal.modal('show');
	},

	save: function ()
	{
		rude.dimmer.body.show();

		var data =
		{
			action: 'save',

			id: portfolio.cache.id,

			capital: portfolio.cache.capital,
			created: portfolio.cache.created,

			name:    portfolio.selectors.name.val(),
			comment: portfolio.selectors.comment.val(),

			currencies: {}
		};

		for (var index in portfolio.cache.currencies)
		{
			var currency = portfolio.cache.currencies[index];

			if (!is_zero(currency.portfolio_percent))
			{
				data.currencies[currency.id] =
				{
					currency_id: currency.id,

					percent: currency.portfolio_percent,
					volume:  currency.portfolio_volume
				};
			}
		}

		portfolio.ajax(data, function(answer)
		{
			debug(answer);

			rude.url.reload();
		});
	},

	remove: function (portfolio_id)
	{
		if (confirm('Are you sure to delete this item?'))
		{
			portfolio.ajax
			({
				action: 'remove',

				id: portfolio_id,

				date: portfolio.cache.created
			},

			function (answer)
			{
				debug(answer);

				rude.url.reload();
			});
		}
	},

	view: function(date)
	{
		rude.url.param.add('date_a', date);
	},

	redraw:
	{
		cash: function()
		{
			portfolio.selectors.cash.percent.html(round(portfolio.cache.cash.percent));
			portfolio.selectors.cash.volume .html(round(portfolio.cache.cash.volume ));
			portfolio.selectors.cash.value  .html(round(portfolio.cache.cash.value  ));
		},

		lines: function ()
		{
			for (var currency_id in portfolio.cache.currencies)
			{
				portfolio.redraw.line(currency_id);
			}
		},

		line: function (currency_id)
		{
			portfolio.redraw.currency.index(currency_id);

			portfolio.redraw.poftfolio.percent(currency_id);
			portfolio.redraw.poftfolio.volume(currency_id);
			portfolio.redraw.poftfolio.value(currency_id);
		},

		field: function (currency_id, field, prefix, html, value_default)
		{
			if (typeof value_default === 'undefined')
			{
				value_default = '';
			}


			var selector = $('#' + prefix + '-' + currency_id);

			if (selector.is('input'))
			{
				// portfolio.highlight(selector);
			}

			var value = portfolio.cache.currencies[currency_id][field];

			if (is_zero(value))
			{
				     if (html) { selector.html(value_default); }
				else           { selector .val(value_default); }
			}
			else
			{
				     if (html) { selector.html(round(value)); }
				else           { selector.val (round(value)); }
			}
		},

		currency:
		{
			index: function (currency_id)
			{
				portfolio.redraw.field(currency_id, 'currency_index', 'currency-index', true, '<a class="ui label red basic fluid">no data</a>');
			}
		},

		poftfolio:
		{
			percent: function (currency_id) { portfolio.redraw.field(currency_id, 'portfolio_percent', 'portfolio-percent'); },
			volume:  function (currency_id) { portfolio.redraw.field(currency_id, 'portfolio_volume',  'portfolio-volume'); },
			value:   function (currency_id) { portfolio.redraw.field(currency_id, 'portfolio_value',   'portfolio-value'); }
		}
	},

	update:
	{
		selectors: function()
		{
			portfolio.selectors.table = $('#portfolio');
			portfolio.selectors.thead = portfolio.selectors.table.find('thead');
			portfolio.selectors.tbody = portfolio.selectors.table.find('tbody');

			portfolio.selectors.capital = $('#portfolio-capital');
			portfolio.selectors.created = $('#portfolio-created');

			portfolio.selectors.currencies = portfolio.selectors.tbody.find('tr');

			portfolio.selectors.cash.row = portfolio.selectors.thead.find('tr.static');

			portfolio.selectors.cash.percent = $('#portfolio-cash-percent');
			portfolio.selectors.cash.volume  = $('#portfolio-cash-volume');
			portfolio.selectors.cash.value   = $('#portfolio-cash-value');

			portfolio.selectors.name    = $('#portfolio-name');
			portfolio.selectors.comment = $('#portfolio-comment');

			portfolio.selectors.modal = $('#portfolio-update');
		},

		capital: function ()
		{
			portfolio.cache.capital = int(portfolio.selectors.capital.val());

			for (var currency_id in portfolio.cache.currencies)
			{
				var currency = portfolio.cache.currencies[currency_id];

				currency.portfolio_value  = portfolio.cache.capital * (currency.portfolio_percent / 100.);

				     if (currency.currency_index) { currency.portfolio_volume = currency.portfolio_value / currency.currency_index; }
				else                              { currency.portfolio_volume = 0; }

				portfolio.cache.currencies[currency_id] = currency;

				portfolio.redraw.line(currency_id);
			}

			portfolio.update.cash.percent();
			portfolio.redraw.lines();
		},

		created: function ()
		{
			portfolio.cache.created = portfolio.selectors.created.val();

			portfolio.update.indexes();
		},

		cash:
		{
			percent: function ()
			{
				portfolio.cache.cash.percent = 100.;

				for (var currency_id in portfolio.cache.currencies)
				{
					var currency = portfolio.cache.currencies[currency_id];

					portfolio.cache.cash.percent -= currency.portfolio_percent;
				}

				portfolio.cache.cash.value  = portfolio.cache.capital * (portfolio.cache.cash.percent / 100.);
				portfolio.cache.cash.volume = portfolio.cache.capital * (portfolio.cache.cash.percent / 100.);

				portfolio.redraw.cash();
			}
		},

		portfolio:
		{
			percent: function (object)
			{
				// portfolio.highlight(object);

				var input = $(object);

				var percent = float(input.val());

				var currency_id = input.currency_id();

				var currency = portfolio.cache.currencies[currency_id];

				currency.portfolio_percent = percent;
				currency.portfolio_value   = portfolio.cache.capital * (currency.portfolio_percent / 100.);

				     if (currency.currency_index) { currency.portfolio_volume = currency.portfolio_value / currency.currency_index; }
				else                              { currency.portfolio_volume = 0; }

				portfolio.cache.currencies[currency_id] = currency;

				portfolio.update.cash.percent();

				if (portfolio.cache.cash.percent < -0.01)
				{
					var portfolio_percent = float(input.val()) + portfolio.cache.cash.percent;

					portfolio.cache.currencies[currency_id].portfolio_percent = portfolio_percent;

					input.val(round(portfolio_percent));

					portfolio.selectors.cash.percent.val(0);

					return portfolio.update.portfolio.percent(object);
				}


				portfolio.redraw.currency.index(currency_id);
				// portfolio.redraw.poftfolio.percent(currency_id);
				portfolio.redraw.poftfolio.value(currency_id);
				portfolio.redraw.poftfolio.volume(currency_id);
				portfolio.redraw.cash();
			},

			volume: function (object)
			{
				// portfolio.highlight(object);

				var input = $(object);

				var volume = float(input.val());

				var currency_id = input.currency_id();
				var currency = portfolio.cache.currencies[currency_id];

				currency.portfolio_volume  = volume;
				currency.portfolio_value   = currency.currency_index * volume;
				currency.portfolio_percent = currency.portfolio_value * 100 / portfolio.cache.capital;

				portfolio.cache.currencies[currency_id] = currency;

				portfolio.update.cash.percent();

				if (portfolio.cache.cash.percent < -0.01)
				{
					portfolio.selectors.cash.percent.val(0);

					var object_percent = input.closest('tr').find('.portfolio-percent');

					object_percent.val(100);

					return portfolio.update.portfolio.percent(object_percent);
				}


				portfolio.redraw.currency.index(currency_id);
				portfolio.redraw.poftfolio.percent(currency_id);
				portfolio.redraw.poftfolio.value(currency_id);
				// portfolio.redraw.poftfolio.volume(currency_id);
				portfolio.redraw.cash();
			},

			value: function (object)
			{
				// portfolio.highlight(object);

				var input = $(object);

				var value = float(input.val());

				var currency_id = input.currency_id();
				var currency = portfolio.cache.currencies[currency_id];

				currency.portfolio_value = value;

				     if (currency.currency_index) { currency.portfolio_volume = currency.portfolio_value / currency.currency_index; }
				else                              { currency.portfolio_volume = 0; }

				currency.portfolio_percent = currency.portfolio_value * 100 / portfolio.cache.capital;

				portfolio.cache.currencies[currency_id] = currency;

				portfolio.update.cash.percent();

				if (portfolio.cache.cash.value < -0.01)
				{
					var portfolio_value = float(input.val()) + portfolio.cache.cash.value;

					portfolio.cache.currencies[currency_id].portfolio_value = portfolio_value;

					input.val(round(portfolio_value));

					portfolio.selectors.cash.value.val(0);

					return portfolio.update.portfolio.value(object);
				}


				portfolio.redraw.currency.index(currency_id);
				portfolio.redraw.poftfolio.percent(currency_id);
				// portfolio.redraw.poftfolio.value(currency_id);
				portfolio.redraw.poftfolio.volume(currency_id);
				portfolio.redraw.cash();
			}
		},

		indexes: function()
		{
			portfolio.ajax
			({
				action: 'indexes',

				date: portfolio.cache.created
			},

			function (answer)
			{
				var indexes = rude.json.decode(answer);

				for (var currency_id in portfolio.cache.currencies)
				{
					if (!portfolio.cache.currencies.hasOwnProperty(currency_id))
					{
						continue;
					}


					var currency = portfolio.cache.currencies[currency_id];

					// currency.portfolio_percent = float($('#portfolio-percent-' + currency_id).val());

					if (typeof indexes[currency_id] === 'undefined')
					{
						currency.currency_index   = 0.;
						currency.portfolio_volume = 0.;
					}
					else
					{
						currency.currency_index   = indexes[currency_id].close;
						currency.portfolio_volume = currency.portfolio_value / currency.currency_index;
					}

					currency.portfolio_value  = portfolio.cache.capital * (currency.portfolio_percent / 100.);

					portfolio.cache.currencies[currency_id] = currency;
				}

				portfolio.redraw.lines();
			});
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