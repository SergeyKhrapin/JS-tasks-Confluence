$(document).ready(function() {
	var title = $('title').text();
	$('.nav a').each(function(i, el) {
		if ($(el).text() == title) {
			$(el).addClass('active-page');
		}
	})
})