function debug(data)
{
	console.log(data);
}

$.fn.serializeAndEncode = function ()
{
	return $.map(this.serializeArray(), function (val) // hotfix: http://stackoverflow.com/a/29922330/1597430
	{
		return [val.name, encodeURIComponent(val.value)].join('=');
	}).join('&');
};

function int(data)
{
	return parseInt(data);
}

function float(data)
{
	return parseFloat(data);
}

if (!Object.keys)
{
	Object.keys = function (obj)
	{
		var keys = [], k;

		for (k in obj)
		{
			if (Object.prototype.hasOwnProperty.call(obj, k))
			{
				keys.push(k);
			}
		}

		return keys;
	};
}

var rude =
{
	semantic:
	{
		init:
		{
			dropdown: function()
			{
				$(function() {
					$('.ui.dropdown').dropdown({ showOnFocus: false });
				});
			},

			checkbox: function()
			{
				$(function() {
					$('.ui.checkbox').checkbox();
				});
			},

			rating: function()
			{
				$(function() {
					$('.ui.rating').rating();
				});
			},

			embed: function()
			{
				$(function() {
					$('.ui.embed').embed();
				});
			}
		}
	},

	object:
	{
		properties:
		{
			count: function(object)
			{
				return Object.keys(object).length;
			}
		},

		to:
		{
			array: function(object)
			{
				return Object.keys(object).map(function (key) {return object[key]});
			}
		}
	},

	json:
	{
		is_valid: function(string)
		{
			try
			{
				JSON.parse(string);
			}
			catch (e)
			{
				return false;
			}

			return true;
		},

		encode: function(data)
		{
			return JSON.stringify(data);
		},

		decode: function(data)
		{
			return JSON.parse(data);
		}
	},

	base64:
	{
		decode: function(data)
		{
			return atob(data);
		},

		encode: function(data)
		{
			return btoa(data);
		}
	},

	url:
	{
		reload: function()
		{
			location.reload();
		},

		redirect: function(url)
		{
			window.location.replace(url);
		},

		host: function()
		{
			return window.location.host;
		},

		current: function()
		{
			return window.location.href;
		},

		param:
		{
			add: function(key, value)
			{
				key   = encodeURIComponent(key);
				value = encodeURIComponent(value);

				var kvp = document.location.search.substr(1).split('&');

				if (kvp == '')
				{
					document.location.search = '?' + key + '=' + value;
				}
				else
				{
					var i = kvp.length;
					var x;

					while (i--)
					{
						x = kvp[i].split('=');

						if (x[0] == key)
						{
							x[1] = value;
							kvp[i] = x.join('=');

							break;
						}
					}

					if (i < 0) { kvp[kvp.length] = [key, value].join('='); }

					// this will reload the page, it's likely better to store this until finished

					document.location.search = kvp.join('&');
				}
			}
		}
	},

	alert: function(message)
	{
		$('#modal-alert-message').html(message);
		$('#modal-alert').modal('show');

		return false;
	},

	form:
	{
		data: function(selector)
		{
			var query = $(selector).serializeAndEncode();

			var pairs = query.split('&');


			var result = {};

			for (var i = 0; i < pairs.length; i++)
			{
				var pair = pairs[i].split('=');

				result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
			}

			return result;
		},

		serialize: function(selector)
		{
			return $.map(selector.serializeArray(), function (val)
			{
				return [val.name, encodeURIComponent(val.value)].join('=');
			}).join('&');
		}
	},

	html:
	{
		escape: function(string)
		{
			var entityMap =
			{
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
				'/': '&#x2F;',
				'`': '&#x60;',
				'=': '&#x3D;'
			};

			return String(string).replace(/[&<>"'`=\/]/g, function (s)
			{
				return entityMap[s];
			});
		}
	},

	ajax: function(action, data, no_reload, url_redirect)
	{
		var url = rude.url.current() + '&action=' + action;

		if (url.indexOf('?') === -1)
		{
			url = url.replace(/&/g, '?')
		}

		$.ajax
		({
			type: 'POST',
			cache: false,
			url: url,
			data: data,

			success: function(answer)
			{
				debug(answer);

				if (url_redirect)
				{
					window.location.href = url_redirect;
				}
				else if (!no_reload)
				{
					rude.url.reload();
				}
			},

			error: function(answer)
			{
				debug(answer)
			}
		});
	},

	char:
	{
		remove_last: function(string)
		{
			return string.substring(0, string.length - 1);
		}
	},

	string:
	{
		to:
		{
			titlecase: function(string)
			{
				return string.replace(/\w\S*/g, function (txt)
				{
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			}
		},

		excerpt: function(string, max_length, ending)
		{
			if (string.length > max_length)
			{
				if (!ending)
				{
					ending = '...';
				}

				return string.slice(0, max_length - ending.length) + ending;
			}

			return string;
		},

		replace: function (string, search, replace)
		{
			var regexp = new RegExp(search, 'ig');

			return string.replace(regexp, replace);
		},

		insert:
		{
			at: function(string, substring, index)
			{
				return string.substr(0, index) + substring + string.substr(index);
			}
		}
	},

	cookie:
	{
		set: function(key, value, days)
		{
			var expires;

			if (days)
			{
				var date = new Date();

				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

				expires = '; expires=' + date.toGMTString();
			}
			else
			{
				expires = '';
			}

			document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + '; path=/';
		},

		get: function(key)
		{
			var nameEQ = encodeURIComponent(key) + '=';

			var ca = document.cookie.split(';');

			for (var i = 0; i < ca.length; i++)
			{
				var c = ca[i];

				while (c.charAt(0) === ' ')
				{
					c = c.substring(1, c.length);
				}
				if (c.indexOf(nameEQ) === 0)
				{
					return decodeURIComponent(c.substring(nameEQ.length, c.length));
				}
			}

			return null;
		},

		is_exists: function(key)
		{
			return rude.cookie.get(key) !== null;
		},

		remove: function(key)
		{
			rude.cookie.create(key, '', -1);
		}
	},

	browser:
	{
		is:
		{
			ie: function()
			{
				return !!rude.browser.version.ie();
			}
		},

		version:
		{
			ie: function()
			{
				if (typeof navigator === 'undefined' || typeof navigator.userAgent === 'undefined')
				{
					return false;
				}

				var navigator = navigator.userAgent.toLowerCase();

				return (navigator.indexOf('msie') !== -1) ? parseInt(navigator.split('msie')[1]) : false;
			}
		}
	},

	dimmer:
	{
		body:
		{
			exist: false,

			prepend: function(selector, inverted, title)
			{
				     if (!inverted) { inverted = ''; }
				else                { inverted = 'inverted'; }

				if (!title)
				{
					title = 'Preparing Files';
				}

				$(selector).prepend('<div id="body-dimmer" class="ui dimmer ' + inverted + '"><div class="ui indeterminate text loader">' + title + '</div></div>');
			},

			prepare: function(title)
			{
				if (!rude.dimmer.body.exist)
				{
					rude.dimmer.body.prepend('body', null, title);
					rude.dimmer.body.exist = true;
				}
			},

			show: function(duration_show, duration_hide, title)
			{
				if (!duration_show) { duration_show = 500; }
				if (!duration_hide) { duration_hide = 500; }


				rude.dimmer.body.prepare(title);

				$('#body-dimmer').dimmer({ duration: { show : duration_show, hide : duration_hide } }).dimmer('show');
			},

			hide: function()
			{
				$('#body-dimmer').dimmer('hide');
			},

			on:
			{
				hide: function(callback)
				{
					$('#body-dimmer').dimmer({ onHide: function() { callback() } }).dimmer('hide').dimmer({ onHide: function() { } });
				}
			}
		}
	},

	timer:
	{
		timestamp: null,

		time: function ()
		{
			return performance.now();
		},

		start: function ()
		{
			rude.timer.timestamp = rude.timer.time();
		},

		finish: function (text)
		{
			if (!text)
			{
				text = 'timer'
			}

			var diff = parseInt(rude.timer.time() - rude.timer.timestamp);

			debug('[' + text + ']: ' + diff + 'ms');
		}
	}
};