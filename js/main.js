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
			layoutMode: 'fitRows',
			filter: '.nova' // Establece el filtro por defecto
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function () {
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });

			// Espera a que termine la reorganización antes de refrescar ScrollSpy
			$portfolio.on('arrangeComplete', function () {
				$('body').scrollspy('refresh');
			});

			return false;
		});
	});

	$(window).on('scroll', function () {
		var scrollPos = $(document).scrollTop();
		var offset = 110;
		var docHeight = $(document).height();
		var winHeight = $(window).height();
		var scrollBottom = scrollPos + winHeight;

		var pricing = $('#pricing');
		var contact = $('#contact');

		var inPricing =
			scrollPos + offset >= pricing.offset().top &&
			scrollPos + offset < pricing.offset().top + pricing.outerHeight();

		var atBottom = scrollBottom >= docHeight - 2; // Permite un pequeño margen

		if (atBottom) {
			$('.navbar-nav li').removeClass('active');
			$('.navbar-nav li a[href="#contact"]').parent().addClass('active');
		} else if (inPricing) {
			$('.navbar-nav li').removeClass('active');
			$('.navbar-nav li a[href="#pricing"]').parent().addClass('active');
		}
	});

});