'use strict';

$(document).ready(function() {

	var $menu =	$('#menu');
	var $dropDownMenu = $('#dropDown');
	var $outerColumn = $('.outerColumn');
	var $innerColumn = $('.innerColumn');

	var $url = $('#url');
	var $errorUrl = $('#errorUrl');
	var $caption = $('#caption');
	var $errorCaption = $('#errorCaption');
	var $cancel = $('#cancel');
	var $addImage = $('#addImage');

	$.get(
		'http://tiyfe.herokuapp.com/collections/micko-images',
		function(response) {
			for(var i = 0; i < response.length; i++) {
				$innerColumn.append('<div class="imageBox">' + '<img  class="addedImage" src="' + response[i].image + '">' + '</div><div class="addedCaption">' + response[i].caption + '</div>')
			}
		},
		'json'
		)


	$menu.click(function() {
		$dropDownMenu.toggle('slow');
	})

	$outerColumn.click(function() {
		$dropDownMenu.css({display: 'none'});
	})



	$cancel.click(function() {
		$url.val('');
		$caption.val('');
		$dropDownMenu.toggle('slow');
	})

	$addImage.click(function() {
		
		if ($url.val().indexOf('http') === -1) {
			$errorUrl.show();
			console.log('Invalid URL');
		}
		else {
			$errorUrl.hide();
		}
		if ($caption.val() === '') {
			$errorCaption.show();
			console.log('Invalid Caption');
		}
		else {
			$errorCaption.hide();
		}
		if($url.val().indexOf('http') !== -1 && $caption.val() !== '') {
			
			$.post(
				'http://tiyfe.herokuapp.com/collections/micko-images',
				{image: $url.val(), caption: $caption.val()},
				function(result) {
				},
				'json'
			)


			$errorUrl.hide();
			$errorCaption.hide();
			console.log('Image added');
			$url.val('');
			$caption.val('');
			$dropDownMenu.toggle('slow');

		}

		$innerColumn.html('');

		$.get(
		'http://tiyfe.herokuapp.com/collections/micko-images',
		function(response) {
			for(var i = 0; i < response.length; i++) {
				$innerColumn.append('<div class="imageBox">' + '<img  class="addedImage" src="' + response[i].image + '">' + '</div><div class="addedCaption">' + response[i].caption + '</div>')
			}
		},
		'json'
		)

	})

})