var table =
{
	node: null,
	head: null,
	body: null,

	data: [],
	rows: [],

	size: 0,

	field:
	{
		name: '',
		type: '',

		direction: ''
	},

	init: function (selector, data)
	{
		$(function()
		{
			// data have to be an array of array, not an array of objects
			// https://stackoverflow.com/questions/5525795

			table.node = $(selector);
			table.head = table.node.find('thead');
			table.body = table.node.find('tbody');

			table.head.find('th').bind('click', function()
			{
				if (!$(this).hasClass('unsortable'))
				{
					table.sort(this);
				}
			});

			table.rows = table.body.find('tr').get();
			table.size = table.rows.length;
			table.data = data;

			for (var i = 0; i < table.size; i++)
			{
				table.data[i].index = i;
			}
		});
	},

	sort: function (selector)
	{
		if (table.data === null)
		{
			return setTimeout(table.sort, 100, selector);
		}


		selector = $(selector);

		table.field.asc  = selector.hasClass('descending');
		table.field.name = selector.attr('data-value');
		table.field.type = selector.attr('data-type');

		table.head.find('th').removeClass('sorted ascending descending');

		     if (table.field.asc) { selector.addClass('sorted ascending');  }
		else                      { selector.addClass('sorted descending'); }

		table.data.sort(table.compare());


		var html = '';

		for (var i = 0; i < table.size; i++)
		{
			var index = table.data[i].index;

			html += '<tr>';
			html += table.rows[index].innerHTML;
			html += '</tr>';
		}

		table.body.html(html);
	},

	compare: function ()
	{
		if (table.field.type === 'string')
		{
			     if (table.field.asc) { return function (a, b) { return a[table.field.name].localeCompare(b[table.field.name]); } }
			else                      { return function (a, b) { return b[table.field.name].localeCompare(a[table.field.name]); } }
		}

			 if (table.field.asc) { return function(a, b) { return parseFloat(a[table.field.name]) - parseFloat(b[table.field.name]); } }
		else                      { return function(a, b) { return parseFloat(b[table.field.name]) - parseFloat(a[table.field.name]); } }
	}
};