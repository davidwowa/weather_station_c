$(document)
		.ready(
				function() {
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth() + 1; // January is 0!
					var yyyy = today.getFullYear();

					var r_dd = dd;
					var r_mm = mm;

					if (dd <= 9) {
						r_dd = '0' + dd;
					}

					if (mm <= 9) {
						r_mm = '0' + mm;
					}

					today_logfile = 'dht11_log.csv';
					today_string = r_dd + '.' + r_mm + '.' + yyyy;

					var options = {
						chart : {
							renderTo : 'dht11_common_humidity',
							type : 'spline'
						},
						title : {
							text : 'Humidity Common'
						},
						subtitle : {
							text : 'Source: DHT11'
						},
						xAxis : {
							type : 'datetime',
							dateTimeLabelFormats : { // don't display the
								// dummy year
								month : '%e. %b',
								year : '%b'
							},
							title : {
								text : 'Time'
							}
						},

						// the value axis
						yAxis : {
							title : {
								text : 'Humidity'
							},
							min : 0
						},
						tooltip : {
							pointFormat : '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
							xDateFormat : '%d.%m.%Y %H:%M:%S +1h',
							shared : true,
							crosshairs : true
						},
						plotOptions : {
							spline : {
								marker : {
									radius : 4,
									lineColor : '#666666',
									lineWidth : 1
								}
							}
						},
						series : []
					};

					$.get(today_logfile, function(data) {
						// Split the lines
						var lines = data.split('\n');

						var seriesT = {
							name : 'Humidity',
							color : '#006400',
							data : [],
							tooltip : {
								valueSuffix : ' %'
							}
						};
						$.each(lines, function(lineNo, line) {
							var items = line.split(','),

							timestamp = parseFloat(items[0]) + 7200000,
							// !!!!! danger, on server must be 1 and 2
							temp = parseInt(items[2], 10) / 10;
							// console.log(timestamp + '_' + temp + '_' + hum);
							if (!isNaN(timestamp)) {
								seriesT.data.push([ timestamp, temp ]);
							}
						});

						options.series.push(seriesT);

						// Create the chart
						var dht11_common_humidity = new Highcharts.Chart(
								options);
					});
				});