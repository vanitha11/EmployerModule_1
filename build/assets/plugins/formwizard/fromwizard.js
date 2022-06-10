(function($) {
	"use strict";
	
	//// Toolbar extra buttons
	//var btnFinish = $('<button></button>').text('Finish')
	//	.addClass('btn btn-primary')
		/*.on('click', function(){ alert('Finish Clicked'); });*/
	var btnCancel = $('<button></button>').text('Cancel')
		.addClass('btn btn-danger')
		.on('click', function () { $('#smartwizard-3').smartWizard("reset"); });

	$(btnCancel).on('click', function () {
		$("HTML, BODY").animate({
			scrollTop: 0
		}, 100);
	});

	// Smart Wizard
	$('#smartwizard').smartWizard({
			selected: 0,
			theme: 'default',
			transitionEffect:'fade',
			showStepURLhash: true,
			toolbarSettings: {
				toolbarButtonPosition: 'right',
							  toolbarExtraButtons: [ btnCancel]
							}
	});
		
	// Arrows Smart Wizard 1
	$('#smartwizard-1').smartWizard({
			selected: 0,
			theme: 'arrows',
			transitionEffect:'fade',
			showStepURLhash: false,
			toolbarSettings: {
							  toolbarExtraButtons: [ btnCancel]
							}
	});
			
	// Circles Smart Wizard 1
	$('#smartwizard-2').smartWizard({
			selected: 0,
			theme: 'circles',
			transitionEffect:'fade',
			showStepURLhash: false,
			toolbarSettings: {
							  toolbarExtraButtons: [ btnCancel]
							}
	});
			
	// Dots Smart Wizard 1
	$('#smartwizard-3').smartWizard({
			selected: 0,
			theme: 'dots',
			transitionEffect:'fade',
			showStepURLhash: false,
			toolbarSettings: {
							  toolbarExtraButtons: [ btnCancel]
							}
	});
	
})(jQuery);