$(document)
		.ready(
				function() {

					var options = {
						chart : {
							renderTo : 'dht11_current_humidity',
							type : 'gauge',
							plotBackgroundColor : null,
							plotBackgroundImage : null,
							plotBorderWidth : 0,
							plotShadow : false,
							style : {
								fontFamily : '"Century Gothic", CenturyGothic, AppleGothic, sans-serif'
							}
						},

						credits : {
							enabled : false
						},

						title : {
							text : 'Hygrometer DHT11'
						},
						tooltip : {
							enabled : false
						},

						pane : {
							startAngle : -150,
							endAngle : 150,
							background : [ {
								backgroundColor : {
									linearGradient : {
										x1 : 0,
										y1 : 0,
										x2 : 0,
										y2 : 1
									},
									stops : [ [ 0, '#FFF' ], [ 1, '#333' ] ]
								},
								borderWidth : 0,
								outerRadius : '109%'
							}, {
								backgroundColor : {
									linearGradient : {
										x1 : 0,
										y1 : 0,
										x2 : 0,
										y2 : 1
									},
									stops : [ [ 0, '#333' ], [ 1, '#FFF' ] ]
								},
								borderWidth : 1,
								outerRadius : '107%'
							}, {
							// default background
							}, {
								backgroundColor : '#DDD',
								borderWidth : 0,
								outerRadius : '105%',
								innerRadius : '103%'
							} ]
						},

						// the value axis
						yAxis : {
							min : 0,
							max : 100,

							minorTickInterval : 'auto',
							minorTickWidth : 1,
							minorTickLength : 10,
							minorTickPosition : 'inside',
							minorTickColor : '#666',

							tickPixelInterval : 30,
							tickWidth : 2,
							tickPosition : 'inside',
							tickLength : 10,
							tickColor : '#666',
							labels : {
								step : 2,
								rotation : 'auto'
							},
							title : {
								text : '%'
							},
							plotBands : [ {
								from : 0,
								to : 40,
								color : '#DDDF0D' // blue
							},

							{
								from : 40,
								to : 60,
								color : '#55BF3B' // green
							}, {
								from : 60,
								to : 100,
								color : '#1e90ff' // yellow
							} ]
						},
						plotOptions : {
							gauge : {
								dataLabels : {
									y : 30,
									style : {
										fontSize : '24px'
									},
									useHTML : true
								}
							}
						},

						series : []
					};

					$.get('dht11_current_humidity.csv', function(data) {
						// Split the lines
						var lines = data.split('\n');

						// Iterate over the lines and add categories or series
						$.each(lines, function(lineNo, line) {
							var items = line.split(',');

							// header line containes categories
							if (lineNo == 0) {

								var series = {
									name : 'Humidity',
									data : []
								};
								$.each(items, function(itemNo, item) {
									if (itemNo == 0) {
										// series.name = item;
										series.data.push(parseFloat(item));
									} else {
										// series.data.push(parseFloat(item));
									}
								});

								options.series.push(series);

							}

							// the rest of the lines contain data with their
							// name in the first
							// position
							else {

							}

						});

						// Create the chart
						var dht11_current_humidity = new Highcharts.Chart(options);
					});
				});
