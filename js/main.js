jQuery(function ($) {

	$(function () {
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		$.post($(this).attr('action'), function (data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		}, 'json');
		return false;
	});

	// Detectar si la página actual es index.html
	function esIndex() {
		return window.location.pathname.endsWith("index.html") || window.location.pathname === "/web/" || window.location.pathname === "/web/index.html";
	}

	// Smooth scroll (solo en index.html)
	$('.navbar-nav > li').click(function (event) {
		var target = $(this).find('>a').prop('hash'); // Obtiene el hash (#services, #portfolio, etc.)

		if (esIndex() && target && $(target).length) {
			event.preventDefault(); // SOLO bloquea la navegación en index.html
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 500);
		} else {
			window.location.href = "/web/index.html" + target; // Redirige a index.html si no está en él
		}
	});

	//cerrar navar
	$(document).ready(function () {
		$(".navbar-nav li a").click(function () {
			if ($(".navbar-toggle").is(":visible")) {
				$(".navbar-collapse").collapse("hide");
			}
		});
	});

	//scrollspy
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh')
	})

	//PrettyPhoto
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	//Isotope
	$(window).load(function () {
		$portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector: 'li',
			layoutMode: 'fitRows'
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function () {
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});
});