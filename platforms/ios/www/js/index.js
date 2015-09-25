/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
		var rfidsuccess = function(message) {
			document.getElementById("deviceready").querySelector('.asr_rf_poweron').setAttribute('style', 'display:block;');
		}
		var barcodesuccess = function(message) {
			document.getElementById("deviceready").querySelector('.asr_bc_poweron').setAttribute('style', 'display:block;');
		}

		var rfidfailure = function() {
			document.getElementById("deviceready").querySelector('.asr_rf_poweron').setAttribute('style', 'display:none;');
		}
		var barcodefailure = function() {
			document.getElementById("deviceready").querySelector('.asr_bc_poweron').setAttribute('style', 'display:none;');
		}
		
		var barcodeReceived = function(barcode){
			//document.getElementById("datareceived").innerHTML = barcode;
			document.getElementById("datareceived").value = document.getElementById("datareceived").value+"\n"+barcode;
		}

		var barcodeReaderPlugged = function(status){
			//alert(status);
			if(status == 'YES'){
				document.getElementById("deviceready").querySelector('.asr_bc_plugged').setAttribute('style', 'display:block;');
				asreader.barcodePowerOn(barcodesuccess,barcodefailure);
			}else{
				document.getElementById("deviceready").querySelector('.asr_bc_plugged').setAttribute('style', 'display:none;');
				document.getElementById("deviceready").querySelector('.asr_bc_poweron').setAttribute('style', 'display:none;');
			}
		}
		
		var rfidReaderPlugged = function(status){
			if(status == 'YES'){
				document.getElementById("deviceready").querySelector('.asr_rf_plugged').setAttribute('style', 'display:block;');
				asreader.rfidPowerOn(rfidsuccess,rfidfailure);
			}else{
				document.getElementById("deviceready").querySelector('.asr_rf_plugged').setAttribute('style', 'display:none;');
				document.getElementById("deviceready").querySelector('.asr_rf_poweron').setAttribute('style', 'display:none;');
			}
		}
		
		var rfidPcEpcStringReceived = function(pcEpcString){
			//alert(pcEpcString);
			document.getElementById("datareceived").value = document.getElementById("datareceived").value+"\n"+pcEpcString;
		}
		var rfidPcEpcDataReceived = function(pcEpcData){
			//alert(String.fromCharCode.apply(null, new Uint16Array(pcEpcData)));
			//document.getElementById("datareceived").value = document.getElementById("datareceived").value+"\n"+pcEpcString;
		}
		var barcodePowerListener = function(power){
			
			//alert(String.fromCharCode.apply(null, new Uint16Array(pcEpcData)));
			document.getElementById("datareceived").value = document.getElementById("datareceived").value+"\nBARCODE POWER:"+power;
			if(power =='ON'){
				document.getElementById("deviceready").querySelector('.asr_bc_poweron').setAttribute('style', 'display:block;');
			}else{
				document.getElementById("deviceready").querySelector('.asr_bc_poweron').setAttribute('style', 'display:none;');
			}
		}

		var rfidPowerListener = function(power){
			
			//alert(String.fromCharCode.apply(null, new Uint16Array(pcEpcData)));
			document.getElementById("datareceived").value = document.getElementById("datareceived").value+"\nRFID POWER:"+power;
			if(power =='ON'){
				document.getElementById("deviceready").querySelector('.asr_rf_poweron').setAttribute('style', 'display:block;');
			}else{
				document.getElementById("deviceready").querySelector('.asr_rf_poweron').setAttribute('style', 'display:none;');
			}
		}
		//asreader.powerOn("ON", success, failure);
		asreader.setBarcodePluggedListener(barcodeReaderPlugged);
		asreader.setRfidPluggedListener(rfidReaderPlugged);
		asreader.setBarcodeStringListener(barcodeReceived);
		asreader.setRfidPcEpcStringListener(rfidPcEpcStringReceived);

		asreader.setRfidPcEpcDataListener(rfidPcEpcDataReceived);

		asreader.setBarcodePowerListener(barcodePowerListener);
		asreader.setRfidPowerListener(rfidPowerListener);
		
		document.getElementById("barcodePowerOn").addEventListener('click',function(){asreader.barcodePowerOn(null,null);});
		document.getElementById("barcodePowerOff").addEventListener('click',function(){asreader.barcodePowerOff(null,null);});
		document.getElementById("readBarcode").addEventListener('click',function(){asreader.readBarcode(null,null);});
		//document.getElementById("readBarcodeContinuously").addEventListener('click',function(){asreader.readBarcodeContinuously(null,null);});
		document.getElementById("stopReadBarcode").addEventListener('click',function(){asreader.stopReadBarcode(null,null);});
		
		document.getElementById("rfidPowerOn").addEventListener('click',function(){asreader.rfidPowerOn(null,null);});
		document.getElementById("rfidPowerOff").addEventListener('click',function(){asreader.rfidPowerOff(null,null);});
		document.getElementById("startReadTags").addEventListener('click',function(){asreader.startReadTags(null,null);});
		document.getElementById("stopReadTags").addEventListener('click',function(){asreader.stopReadTags(null,null);});
		

		document.getElementById("clearall").addEventListener('click',function(){document.getElementById("datareceived").value = '';});
		
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

app.initialize();