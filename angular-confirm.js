angular.module('ngConfirm', [])
	.directive('ngConfirm', function($document, $parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var buttonId,
					html,
					message,
					nope,
					yep,
					title;

				buttonId = Math.floor(Math.random() * 10000000000);
				attrs.buttonId = buttonId;

				message = attrs.message || "¿Está seguro?";
				yep = attrs.yes || "Sí";
				nope = attrs.no || "No";
				title = attrs.title || "Confirmación";

				html = "<div id=\"button-" + buttonId + "\"><span class=\"confirmbutton-msg\">" + message + 
					   "</span><br><br><button class=\"confirmbutton-yes btn btn-danger\">" + yep + "</button> " + 
					   "<button class=\"confirmbutton-no btn\">" + nope + "</button></div>";

				element.popover({
					content: html,
					html: true,
					trigger: "manual",
					title: title,
					placement: "top"
				});

				return element.bind('click', function(e) {
					var dontBubble, pop, isActive;
					dontBubble = true;
					isActive = true;

					e.stopPropagation();

					if(angular.isDefined(attrs.isActive)) {
						isActive = $parse(attrs.isActive)(scope);
					}

					if(isActive) {
						element.popover('show');

						pop = $("#button-" + buttonId);

						pop.closest(".popover").on('click', function(e) {
							if(dontBubble) {
								e.stopPropagation();
							}
						});

						pop.find('.confirmbutton-yes').on('click', function(e) {
							dontBubble = false;
							$parse(attrs.ngConfirm)(scope);
						});

						pop.find('.confirmbutton-no').on('click', function(e) {
							dontBubble = false;
							$document.off('click.confirmbutton.' + buttonId);
							element.popover('hide');
						});

						$document.on('click.confirmbutton.' + buttonId, ":not(.popover, .popover *)", function() {
							$document.off('click.confirmbutton.' + buttonId);
							element.popover('hide');
						});
					}
				});
			}
		};
	});