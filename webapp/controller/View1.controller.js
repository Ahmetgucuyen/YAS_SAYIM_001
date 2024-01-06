var sFilterValueBukrs;
var sFilterValueWerks;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("app.YAS_SAYIM_001.controller.View1", {
		onInit: function () {

		},
		onCreate: function () {
			var that = this;
			var oModel = this.getView().getModel();

			var oEntry = {};

			oEntry.Bukrs = this.getView().byId("idBukrs").getValue();
			oEntry.Werks = this.getView().byId("idWerks").getValue();
			oEntry.Lgort = this.getView().byId("idLgort").getValue();
			oEntry.Period = this.getView().byId("idPeriod").getSelectedKey();

			if ((oEntry.Bukrs === null || oEntry.Bukrs === "" || oEntry.Bukrs === undefined)) {
				MessageBox.error("Şirket kodu alanı boş olamaz");
			} else if ((oEntry.Werks === null || oEntry.Werks === "" || oEntry.Werks === undefined)) {
				MessageBox.error("Üretim yeri alanı boş olamaz");
			} else if ((oEntry.Lgort === null || oEntry.Lgort === "" || oEntry.Lgort === undefined)) {
				MessageBox.error("Depo yeri alanı boş olamaz");
			} else {
				oModel.create("/SayimEmriKayitSet", oEntry, {
					method: "POST",
					success: function (data) {
						MessageBox.information("Kayıt Başarılı");
						// location.reload();	
						that.getView().byId("idBukrs").setValue("");
						that.getView().byId("idWerks").setValue("");
						that.getView().byId("idLgort").setValue("");
						that.getView().byId("idPeriod").setSelectedKey("");
					},
					error: function (e) {
						alert("error");

					},

				});
			}
		},
		onValueHelpBukrs: function () {
			var oModel = this.getView();
			if (!this._bukrsSH) {
				this._bukrsSH = sap.ui.xmlfragment("app.YAS_SAYIM_001.view.fragments.BukrsSH", this);
				oModel.addDependent(this._bukrsSH);
				this._bukrsSH.open();
			} else {
				oModel.addDependent(this._bukrsSH);
				this._bukrsSH.open();
			}
		},
		onValueHelpWerks: function () {
			var oModel = this.getView();
			if (!this._werksSH) {
				this._werksSH = sap.ui.xmlfragment("app.YAS_SAYIM_001.view.fragments.WerksSH", this);
				oModel.addDependent(this._werksSH);
				this._werksSH.open();
			} else {
				oModel.addDependent(this._werksSH);
				this._werksSH.open();
			}
			var oBinding = this._werksSH.getBinding("items");
			var oFilter2 = new sap.ui.model.Filter("ItBukrs", sap.ui.model.FilterOperator.EQ, sFilterValueBukrs);

			// var oFilter1 = new sap.ui.model.Filter("IvCountry", sap.ui.model.FilterOperator.EQ, sFilterValueSehir);
			// var oFilter = [oFilter1, oFilter2];
			oBinding.filter([oFilter2]);
			this._werksSH.setNoDataText("Şirket Kodu Seçiniz");
		},
		onValueHelpLgort: function () {
			var oModel = this.getView();
			if (!this._lgortSH) {
				this._lgortSH = sap.ui.xmlfragment("app.YAS_SAYIM_001.view.fragments.LgortSH", this);
				oModel.addDependent(this._lgortSH);
				this._lgortSH.open();
			} else {
				oModel.addDependent(this._lgortSH);
				this._lgortSH.open();
			}
			var oBinding = this._lgortSH.getBinding("items");
			var oFilter2 = new sap.ui.model.Filter("Werks", sap.ui.model.FilterOperator.EQ, sFilterValueWerks);

			// var oFilter1 = new sap.ui.model.Filter("IvCountry", sap.ui.model.FilterOperator.EQ, sFilterValueSehir);
			// var oFilter = [oFilter1, oFilter2];
			oBinding.filter([oFilter2]);
			this._lgortSH.setNoDataText("Üretim Yeri Seçiniz");
		},
		_confirmBukrsSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Bukrs");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idBukrs").setValue(s);
				// this.byId("idSehirr").setValue(g);
				sFilterValueBukrs = s;

			}
			this.getView().byId("idWerks").setValue("");

			this.getView().byId("idLgort").setValue("");

		},
		_confirmWerksSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Werks");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idWerks").setValue(s);
				// this.byId("idSehirr").setValue(g);
				sFilterValueWerks = s;

			}
			this.getView().byId("idLgort").setValue("");

		},
		_confirmLgortSH: function (e) {
			var t = e.getParameter("selectedContexts");
			if (t && t.length) {
				var s = t[0].getProperty("Lgort");
				// var g = t[0].getProperty("Bezei");
				e.getSource().getBinding("items").filter([]);
				this.byId("idLgort").setValue(s);
				// this.byId("idSehirr").setValue(g);
				// sFilterValueWerks = s;

			}
			// this.getView().byId("idLgort").setValue("");

		},
		_searchBukrsSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				oFilter = new Filter("Butxt", FilterOperator.Contains, sValue);

			} else {
				oFilter = new Filter("Bukrs", FilterOperator.Contains, sValue);
			}
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		_searchWerksSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				var oFilter1 = new Filter("Name1", FilterOperator.Contains, sValue);

			} else {
				var oFilter1 = new Filter("Werks", FilterOperator.Contains, sValue);
			}
			var oFilter2 = new Filter("ItBukrs", FilterOperator.EQ, sFilterValueBukrs);
			//var oFilter3 = new Filter("IvCountry", FilterOperator.EQ, sFilterValueSehir);

			oFilter = [oFilter1, oFilter2]
			oEvent.getSource().getBinding("items").filter(oFilter);
			// oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		_searchLgortSH: function (oEvent) {

			var oFilter = [];
			var sValue = oEvent.getParameter("value");
			if (isNaN(parseInt(sValue.slice(-1)))) {
				var oFilter1 = new Filter("Lgobe", FilterOperator.Contains, sValue);

			} else {
				var oFilter1 = new Filter("Lgort", FilterOperator.Contains, sValue);
			}
			var oFilter2 = new Filter("Werks", FilterOperator.EQ, sFilterValueWerks);
			//var oFilter3 = new Filter("IvCountry", FilterOperator.EQ, sFilterValueSehir);

			oFilter = [oFilter1, oFilter2]
			oEvent.getSource().getBinding("items").filter(oFilter);
			// oEvent.getSource().getBinding("items").filter([oFilter]);
		}
	});
});