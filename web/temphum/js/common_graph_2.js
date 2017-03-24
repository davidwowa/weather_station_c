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

					today_logfile = 'log2-common.csv';
					today_string = r_dd + '.' + r_mm + '.' + yyyy;

					var options = {
						chart : {
							renderTo : 'common_container_2',
							type : 'spline'
						},
						title : {
							text : 'Temperature/Pressure and Altitude over all data'
						},
						subtitle : {
							text : 'Source: BMP180'
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
								text : 'Temperature/Pressure/Altitude'
							},
							min : -200
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
							name : 'Temperature',
							color : '#6C6B6B',
							data : [],
							tooltip : {
								valueSuffix : ' °C'
							}
						}, seriesH = {
							name : 'Pressure',
							color : '#033AF0',
							data : [],
							tooltip : {
								valueSuffix : 'p'
							}
						}, seriesA = {
								name : 'Altitude',
								color : '#033AF0',
								data : [],
								tooltip : {
									valueSuffix : ''
								}};
						$.each(lines, function(lineNo, line) {
							var items = line.split(','),

							timestamp = parseFloat(items[0]) + 7200000,
							// !!!!! danger, on server must be 1 and 2
							temp = parseInt(items[1], 10), 
							pre = parseInt(items[2], 10)
							alt = parseInt(items[3], 10);
							// console.log(timestamp + '_' + temp + '_' + hum);
							if (!isNaN(timestamp)) {
								seriesT.data.push([ timestamp, temp ]);
								seriesH.data.push([ timestamp, pre ]);
								seriesA.data.push([ timestamp, alt ]);
							}
						});

						options.series.push(seriesT);
						options.series.push(seriesH);
						options.series.push(seriesA);
						
						// Create the chart
						var common_graph_2 = new Highcharts.Chart(options);
					});
				});