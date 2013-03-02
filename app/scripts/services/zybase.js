'use strict';

var zybaseDeviceId='ZIBASE00542b'
var zybaseToken='b2b2068c7d'
var zybaseIp='192.168.1.55'

var zybaseGetSensorsUrlFn=function(device,token) {
		//return 'http://zibase.net/m/get_xml_sensors.php?device='+device+'&token='+token;
		//return 'http://'+zybaseIp+'/sensors.xml';		
		return 'json/sensors.xml';
	}

var zybaseGetSensorsHttpFn=function(scope, httpService){
	httpService({
		method : 'GET',
		url : zybaseGetSensorsUrlFn(zybaseDeviceId,zybaseToken),
		headers : {
			'Accept': 'text/xml'
		},
		transformResponse: function(data, headersGetter) {
			return x2js.xml_str2json(data);
		},
		cache:false
	}).success( function(response) {		
			scope.zybaseData=JSON.stringify(response, null, 4)
			//scope.zybaseData=JSON.stringify(response.doc.vars.var[15]._val, null, 4)
	});
}

