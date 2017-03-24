$(document)
		.ready(
				function() {

					var options = {
						chart : {
							renderTo : 'pres',
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
							text : 'Pressure'
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
							min : 80000,
							max : 150000,

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
								text : unescape("p")
							},
							plotBands : [

							{
								from : 80000,
								to : 100000,
								color : '#8a2be2' // dark violet
							},

							{
								from : 100000,
								to : 130000,
								color : '#1e90ff' // blue
							},

							{
								from : 130000,
								to : 150000,
								color : '#55BF3B' // green
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

					$.get('current_pressure.csv', function(data) {
						// Split the lines
						var lines = data.split('\n');

						// Iterate over the lines and add categories or series
						$.each(lines, function(lineNo, line) {
							var items = line.split(',');

							// header line containes categories
							if (lineNo == 0) {

								var series = {
									name : 'Pressure',
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
						var chart100 = new Highcharts.Chart(options);
					});
				});
