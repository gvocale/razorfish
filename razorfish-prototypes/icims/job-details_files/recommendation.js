/*
(C) Copyright 1999-2015 iCIMS. Proprietary and Confidential. All rights reserved.
This software is the intellectual property of iCIMS. The program may be used only in accordance with the terms of the license agreement you entered into with iCIMS.
 */
/**
 * Contains all of the logic necessary for firing collaborative filtering job
 * preference signals to the recommendation service.
 */
var iCIMS_Recommendation = (function(window, undefined) {
	var iCIMS_Recommendation = {};

	/**
	 * Keep track of the current user.
	 */
	var currentUserId = null;

	/**
	 * The time that the object was initialized, used to compute event
	 * durations.
	 */
	var timeInitialized = null;

	/**
	 * The host name to send recommendation events too. i.e.
	 * https://provider.icims.com
	 */
	var recommendationServiceHostName = null;

	/**
	 * The host name to send retrieve recommendation js files from. i.e.
	 * https://cdn01.icims.com/UNRELEASED.1397697583421/provider.icims.comhttps://cdn09.icims.com/a/images.icims.com/content/provider_100.2.160524.89976/scripts/recommendation-events.js
	 */
	var recommendationServiceCDN = null;

	/**
	 * Loads a script asynch executing the callback function when the script has
	 * finished loading.
	 */
	function loadScript(url, callback) {
		var script = document.createElement('script');

		script.type = 'text/javascript';
		script.async = true;
		script.src = url

		var entry = document.getElementsByTagName('script')[0];
		entry.parentNode.insertBefore(script, entry);

		if (script.addEventListener)
			script.addEventListener('load', callback, false);
		else {
			script.attachEvent('onreadystatechange', function() {
				if (/complete|loaded/.test(script.readyState))
					callback();
			});
		}
	}

	/**
	 * determine if the passed in parameter is a java script function.
	 */
	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck
				&& getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Create a random UUID - https://gist.github.com/jed/982883
	 */
	function randomUUID(a // placeholder
	) {
		return a // if the placeholder was passed, return
		? ( // a random number from 0 to 15
		a ^ // unless b is 8,
		Math.random() // in which case
		* 16 // a random number from
		>> a / 4 // 8 to 11
		).toString(16) // in hexadecimal
		: ( // or otherwise a concatenated string:
		[ 1e7 ] + // 10000000 +
		-1e3 + // -1000 +
		-4e3 + // -4000 +
		-8e3 + // -80000000 +
		-1e11 // -100000000000,
		).replace( // replacing
		/[018]/g, // zeroes, ones, and eights with
		randomUUID // random hex digits
		)
	}

	/**
	 * Initialize a Persist.js client side storage object.
	 */
	function intitalizeStorage() {
		Persist.remove('gears'); // We will not support google gears storage.
		Persist.remove('flash'); // We will not support flash storage.
		Persist.remove('ie'); // IE 7 has flakey user data support when logging out and back in again.
		return new Persist.Store("iCIMSRecommendation", {
			domain : "icims.com",
			expires : 365 * 2,
			path : "/"
		});
	}

	/**
	 * Keep track of the current user by associating a unique identifier with
	 * the browser. Must be called after the dom ready event has fired.
	 */
	function trackAnonymousUser() {
		var anonymousUserId;
		try {
			var clientSideStorage = intitalizeStorage();
			clientSideStorage.get('icims.recommendation.anonymoususer.id',
					function(ok, val) {
						if (ok)
							anonymousUserId = val;
					});
			if (anonymousUserId == null) {
				anonymousUserId = randomUUID();
				clientSideStorage.set('icims.recommendation.anonymoususer.id',
						anonymousUserId);
			}
			// Ignore exceptions if for some reason we could not retrieve
			// userData.
		} catch (e) {
		}
		if (anonymousUserId == null) {
			anonymousUserId = randomUUID();
		}
		return anonymousUserId;
	}

	/**
	 * Send the event to the recommendation service using script tag injection
	 * to make a cross domain GET request.
	 */
	function recordEvent(event) {
		var firstScriptTag = document.getElementsByTagName('script')[0];
		var eventSendingScriptTag = document.createElement('script');
		var url = iCIMS_Recommendation.recommendationServiceHostName
				+ '/v1/rest/recommendation/recordJobPreferenceSignal'
				+ flattenEventToParameters(event);
		eventSendingScriptTag.type = 'text/javascript';
		eventSendingScriptTag.async = true;
		eventSendingScriptTag.src = url;
		firstScriptTag.parentNode.insertBefore(eventSendingScriptTag,
				firstScriptTag);
	}

	/**
	 * Convert the event into http parameters to be put at the end of a url.
	 */
	function flattenEventToParameters(event) {
		var parameters = "?";
		parameters += 'type=' + encodeURIComponent(event.type);
		parameters += '&uniqueJobId=' + encodeURIComponent(event.uniqueJobId);
		parameters += '&uniqueUserId=' + encodeURIComponent(event.uniqueUserId);
		parameters += '&clientEpochTimeStamp='
				+ encodeURIComponent(event.clientEpochTimeStamp);
		parameters += '&hostName=' + encodeURIComponent(event.hostName);
		parameters += '&jobTitle=' + encodeURIComponent(event.jobTitle);
		parameters += '&jobLocation=' + encodeURIComponent(event.jobLocation);
		parameters += '&duration=' + encodeURIComponent(event.duration);
		return parameters;
	}

	/**
	 * Compute the duration of an event by subtracting the initialization time
	 * from 'now'.
	 */
	function computeDuration(event) {
		if (event && event.type == 'VIEW_JOB') {
			var millisecondDuration = new Date().getTime() - timeInitialized;
			// convert milliseconds to seconds.
			event.duration = millisecondDuration / 1000
		}
	}

	/**
	 * Process any queued events and then bind the global
	 * _iCIMSRecommendationEvents queue to an event handler to process any
	 * additional pushes into the processing queue.
	 */
	function processEventQueue(currentUserId) {
		// If _iCIMSRecommendationEvents isn't defined then just return.
		if (typeof _iCIMSRecommendationEvents === 'undefined')
			return;

		// Bind the global event queue with the pending event queue.
		var pendingEventQueue = _iCIMSRecommendationEvents || [];

		// Build an event handler that responds to .push() and .process() by
		// processing the events.
		var eventHandler = {
			initialized : true,
			push : function(arguments) {
				try {
					var event = {
						type : arguments[0],
						uniqueJobId : arguments[1],
						jobTitle : arguments[2],
						jobLocation : arguments[3],
						uniqueUserId : currentUserId,
						clientEpochTimeStamp : new Date().getTime(),
						hostName : window.document.domain
					};

					// Only fire job view events when a job is viewed for more
					// than 10 seconds.
					if ('VIEW_JOB' == event.type) {
						window.setTimeout(function() {
							// Fire a view event after 10 seconds.
							eventHandler.process(event);
						}, 10000);
						return;
					} else {
						eventHandler.process(event);
					}
				} catch (exception) {
					// ignore exceptions...
				}
			},
			process : function(event) {
				try {
					// if the value of the event is a function evaluate the
					// function.
					event.type = isFunction(event.type) ? event.type()
							: event.type;
					event.uniqueJobId = isFunction(event.uniqueJobId) ? event
							.uniqueJobId() : event.uniqueJobId;
					event.jobTitle = isFunction(event.jobTitle) ? event
							.jobTitle() : event.jobTitle;
					event.jobLocation = isFunction(event.jobLocation) ? event
							.jobLocation() : event.jobLocation;

					computeDuration(event);
					recordEvent(event);
				} catch (exception) {
					// ignore exceptions...
				}
			}
		};

		// Go through the events added to the queue before initialization.
		for (i = 0; i < pendingEventQueue.length; i++) {
			eventHandler.push(pendingEventQueue[i]);
		}

		// Swap the global object with the event handler.
		_iCIMSRecommendationEvents = eventHandler;
	}

	function discoverRecommendationServerHosts() {
		var serviceHostName;
		var cdnHostName;

		// get the script element that loaded this script (assuming the script
		// element has the is below.
		var recommendatonScript = document.getElementById("icims-recommendation");
		
		// Load the data attributes specified for this script tag.
		iCIMS_Recommendation.recommendationServiceHostName = recommendatonScript.getAttribute('data-icims-recommendation-service-url');
		iCIMS_Recommendation.recommendationServiceCDN = recommendatonScript.getAttribute('data-icims-recommendation-service-cdn-url');
	}

	/**
	 * Initialization after the script has been loaded. Record the time of the
	 * init(). Mark the current user with a tracking token. Send any pending
	 * events out.
	 */
	function init() {
		timeInitialized = new Date().getTime();
		discoverRecommendationServerHosts();
		loadScript(iCIMS_Recommendation.recommendationServiceCDN
				+ '/scripts/persist.js', function() {
			currentUserId = trackAnonymousUser();
			processEventQueue(currentUserId);
		});
	}

	init();
	return iCIMS_Recommendation;
})(window);