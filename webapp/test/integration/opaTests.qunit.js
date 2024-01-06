/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"app/YAS_SAYIM_001/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});