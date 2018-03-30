<?

namespace rude;

class page_resume extends template_page
{
	/** @var database */
	protected $database;

	public function __construct()
	{
		$this->database = database();
	}

	public function head()
	{
		echo static::js('./js/jquery/3.2.0/jquery-3.2.0.min.js');

		echo static::js ('./js/semantic-ui/2.3.0/semantic.min.js');
		echo static::css('./js/semantic-ui/2.3.0/semantic.min.css');

		echo static::js ('./js/rude/rude.js');
		echo static::css('./js/rude/rude.css');
	}
}