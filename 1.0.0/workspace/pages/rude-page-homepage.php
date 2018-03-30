<?

namespace rude;

class page_homepage extends page_resume
{
	public function __construct()
	{
		parent::__construct();

		$this->title = 'Yuriy Lagodich';
	}

	public function content()
	{
		?>
		<div id="top">
			<div class="face">
				<img src="img/face.jpg" onmouseover="$(this).transition('tada');" alt="It's me :)">
			</div>

			<div class="name">
				<h1 class="ui header">Yuriy Lagodich</h1>
				<b>Full Stack PHP Developer.</b>
				<p>Looking for a job in Canada. Main requirements: full-time and non-seasonal, for at least one year, salary $75000+/year. My main strong sides: great stress-resistant, rapid learnability, love to Linux operation systems and low-level languages. Open for job offers. Will proceed immediately. Ready to pass any tests.</p>
			</div>
		</div>

		<div class="ui divider"></div>

		<div id="skills">
			<div class="ui grid">
				<div class="eight wide mobile four wide tablet four wide computer column">
					<div class="ui statistic">
						<div class="value">
							PHP
						</div>
						<div class="label">
							5 years
						</div>
					</div>
				</div>

				<div class="eight wide mobile four wide tablet four wide computer column">
					<div class="ui statistic">
						<div class="value">
							MySQL
						</div>
						<div class="label">
							5 years
						</div>
					</div>
				</div>

				<div class="eight wide mobile four wide tablet four wide computer column">
					<div class="ui statistic">
						<div class="value">
							HTML/CSS
						</div>
						<div class="label">
							5 years
						</div>
					</div>
				</div>

				<div class="eight wide mobile four wide tablet four wide computer column">
					<div class="ui statistic">
						<div class="value">
							JS
						</div>
						<div class="label">
							4 years
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="ui divider"></div>

		<div id="info">
			<div class="ui grid">
				<div class="sixteen wide mobile six wide tablet six wide computer column">
					<div class="ui segment">
						<a class="ui ribbon label">Contact Information</a>

						<div class="ui relaxed divided list">
							<div class="item">
								<i class="large middle aligned icon phone"></i>
								<div class="content">
									<div class="header">Phone Number</div>
									<a class="description" href="tel:+375293770494">+375 (29) 3770494</a>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon mail"></i>
								<div class="content">
									<div class="header">Email</div>
									<a class="description" href="mailto:lagodichyuriy@gmail.com">LagodichYuriy@gmail.com</a>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon skype"></i>
								<div class="content">
									<div class="header">Skype</div>
									<a class="description" href="skype:theycallmerude">TheyCallMeRude</a>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon telegram"></i>
								<div class="content">
									<div class="header">Telegram</div>
									<a class="description" href="tg://resolve?domain=theycallmerude">TheyCallMeRude</a>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon github"></i>
								<div class="content">
									<div class="header">Github</div>
									<a class="description" target="_blank" href="https://github.com/ThisNameWasFree">ThisNameWasFree</a>
								</div>
							</div>
						</div>


						<a class="ui ribbon label">Reviews</a>

						<div class="ui items">
							<div class="item">
								<div class="content">
									<a class="header" href="https://www.upwork.com/freelancers/~01270ddbd36445be0d?viewMode=1" target="_blank">Theodoros S.</a>
									<div class="description">
										<p>We worked for nearly a year with Yuriy and we had been more than pleased with his work and ethics. He is a very skilled developer, very responsible that puts priority in his work. During that year Yuriy worked in various cryptocurrencies projects, analytics tools, large DBs and e-commerce platforms. We are looking forward to continue working again in the near future. Thank you Yuriy!</p>
									</div>
									<div class="extra">
										<div class="ui star rating" data-rating="5" data-max-rating="5"></div>

										<span class="date">Mar 2017 - Mar 2018</span>
									</div>
								</div>
							</div>

							<div class="ui divider"></div>

							<div class="item">
								<div class="content">
									<a class="header" href="https://www.upwork.com/freelancers/~01270ddbd36445be0d?viewMode=1" target="_blank">Diego C.</a>

									<div class="description">
										<p>Yuriy helped me out with a very big project which completely changed in the middle, he was able to find a totally new solution for my problem and successfully finished it. I won't hesitate to hire him again, you either shouldn't.</p>
									</div>

									<div class="extra">
										<div class="ui star rating" data-rating="5" data-max-rating="5"></div>

										<span class="date">Dec 2016 - Mar 2017</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="sixteen wide mobile ten wide tablet ten wide computer column">
					<div class="ui segment">
						<a class="ui ribbon label">Education</a>

						<div class="ui relaxed divided list">
							<div class="item">
								<i class="icon graduation cap large middle aligned"></i>

								<div class="content">
									<p class="header">Belarusian State University of Informatics and Radioelectronics (2016 - 2018)</p>
									<div class="description">Master's degree, Computer Science</div>
								</div>
							</div>

							<div class="item">
								<i class="icon graduation cap large middle aligned"></i>

								<div class="content">
									<p class="header">Belarusian State University of Informatics and Radioelectronics (2011 - 2016)</p>
									<div class="description">Bachelor's degree, Computer Science</div>
								</div>
							</div>
						</div>


						<a class="ui ribbon label">Experience</a>

						<div class="ui relaxed divided list">
							<div class="item">
								<i class="icon building outline large middle aligned"></i>

								<div class="content">
									<p class="header">Globetech Media LLC (2013 - present days)</p>
									<div class="description">Full Stack PHP Developer</div>
								</div>
							</div>

							<div class="item">
								<i class="icon user large middle aligned"></i>

								<div class="content">
									<p class="header">Upwork (2016 - present days)</p>
									<div class="description">Freelancer</div>
								</div>
							</div>
						</div>


						<a class="ui ribbon label">Skills and Tools</a>

						<div class="ui relaxed divided list">
							<div class="item">
								<i class="large middle aligned icon language"></i>

								<div class="content">
									<p class="header">Languages</p>
									<div class="description">English (upper intermediate, B2, IELTS 6.5)</div>
									<div class="description">Russian (native)</div>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon code"></i>

								<div class="content">
									<p class="header">APIs and Services</p>
									<div class="description">Amazon Web Services, IBM Bluemix, Mailgun, BenchmarkEmail, reCAPTCHA, Anticaptcha, Bittrex, Bitfinex, Bravenewcoin, Coinmarketcap, Binance</div>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon wordpress"></i>

								<div class="content">
									<p class="header">CMS</p>
									<div class="description">Wordpress, Joomla</div>
								</div>
							</div>

							<div class="item">
								<i class="large middle aligned icon pencil"></i>

								<div class="content">
									<p class="header">IDE</p>
									<div class="description">PhpStorm</div>
								</div>
							</div>
						</div>


						<a class="ui ribbon label">Project Samples</a>

						<div class="ui relaxed divided list">
							<div class="item">
								<i class="large github middle aligned icon"></i>
								<div class="content">
									<a class="header" href="https://github.com/ThisNameWasFree/rude-php" target="_blank">ThisNameWasFree/rude-php</a>
									<div class="description">Standalone framework written by me. Supports UTF-8 strings, custom ORM with ActiveRecord and QueryBuilder patterns, HTTP(S) multithread scrapper, console library with color support, stream reader and etc.</div>
								</div>
							</div>

							<div class="item">
								<i class="large github middle aligned icon"></i>
								<div class="content">
									<a class="header" href="https://github.com/ThisNameWasFree/code-128" target="_blank">ThisNameWasFree/code-128</a>
									<div class="description">Barcode generator. Only 140 lines of code with PHPDoc documentation. That's how I write things from the scratch.</div>
								</div>
							</div>

							<div class="item">
								<i class="large github middle aligned icon"></i>
								<div class="content">
									<a class="header" href="https://github.com/ThisNameWasFree/resume" target="_blank">ThisNameWasFree/resume</a>
									<div class="description">Source code of the site that you see now. Based on my own rude-php framework.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script>
			$(function() {
				$('.ui.rating').rating('disable');
			});
		</script>
		<?
	}
}