(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {

	Parse.initialize("h9qRnl0BufCnopYWT3vBnZMONh2RiicF7V5M0OuL", "bl6JAQlzkISbbkwdzvAqQX65z8cOypGeEvQi4fY2");var $menu = $('#menu');
	var $dropDownMenu = $('#dropDown');
	var $outerColumn = $('.outerColumn');
	var $innerColumn = $('.innerColumn');

	var $url = $('#url');
	var $errorUrl = $('#errorUrl');
	var $caption = $('#caption');
	var $errorCaption = $('#errorCaption');
	var $cancel = $('#cancel');
	var $addImage = $('#addImage');

	// $.get(
	// 	'http://tiyfe.herokuapp.com/collections/micko-images',
	// 	function(response) {
	// 		for(var i = 0; i < response.length; i++) {
	// 			$innerColumn.append('<div class="imageBox">' + '<img  class="addedImage" src="' + response[i].image + '">' + '</div><div class="addedCaption">' + response[i].caption + '</div>')
	// 		}
	// 	},
	// 	'json'
	// 	)

	var ImageModel = Parse.Object.extend('ImageModel');
	var ImageQuery = new Parse.Query(ImageModel);
	var Images = null;

	ImageQuery.descending('createdAt').find().then(function (images) {
		// console.log(images[0].get('ImageURL'))
		Images = images;
		// return Images
		if (!Images) {
			console.log('Loading...');
		} else {
			// console.log(Images)
			var ImageList = Images.map(function (image) {
				// return image.get('ImageURL')
				return $innerColumn.append('<div class="imageBox">' + '<img  class="addedImage" src="' + image.get('ImageURL') + '">' + '</div><div class="addedCaption">' + image.get('Caption') + '</div>');
			});
		}
	});

	// if(!Images) {
	// 	console.log('Loading...')
	// }
	// else {
	// 	console.log(Images)
	// 	var ImageList = Images.map(function(image) {
	// 		return image.get('ImageURL')
	// 	})
	// 	console.log(ImageList);
	// }

	// var ImageList = Images.map(function(image) {
	// 	return image.get('ImageURL')
	// })

	// if(ImageList === []) {
	// 	console.log('Loading...')
	// }
	// else {
	// 	console.log(ImageList)
	// }

	$menu.click(function () {
		$dropDownMenu.toggle('slow');
	});

	$outerColumn.click(function () {
		$dropDownMenu.css({ display: 'none' });
	});

	$cancel.click(function () {
		$url.val('');
		$caption.val('');
		$dropDownMenu.toggle('slow');
	});

	$addImage.click(function () {

		if ($url.val().indexOf('http') === -1) {
			$errorUrl.show();
			console.log('Invalid URL');
		} else {
			$errorUrl.hide();
		}
		if ($caption.val() === '') {
			$errorCaption.show();
			console.log('Invalid Caption');
		} else {
			$errorCaption.hide();
		}
		if ($url.val().indexOf('http') !== -1 && $caption.val() !== '') {

			// $.post(
			// 	'http://tiyfe.herokuapp.com/collections/micko-images',
			// 	{image: $url.val(), caption: $caption.val()},
			// 	function(result) {
			// 	},
			// 	'json'
			// )

			// ImageModel = Parse.Object.extend('ImageModel');
			var NewImage = new ImageModel({
				ImageURL: $url.val(),
				Caption: $caption.val()
			}).save();

			location.reload();

			$errorUrl.hide();
			$errorCaption.hide();
			console.log('Image added');
			$url.val('');
			$caption.val('');
			$dropDownMenu.toggle('slow');
		}

		$innerColumn.html('');

		// $.get(
		// 'http://tiyfe.herokuapp.com/collections/micko-images',
		// function(response) {
		// 	for(var i = 0; i < response.length; i++) {
		// 		$innerColumn.append('<div class="imageBox">' + '<img  class="addedImage" src="' + response[i].image + '">' + '</div><div class="addedCaption">' + response[i].caption + '</div>')
		// 	}
		// },
		// 'json'
		// )
	});
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map