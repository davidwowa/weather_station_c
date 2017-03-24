#!/bin/bash
echo "get sensor data DHT11"
sudo /home/pi/weather_station_c/dht11

echo "get sensor data BMP180"
sudo /home/pi/weather_station_c/bmp180

echo "set rights for CSV files"
chown pi:pi /var/www/temphum/*.csv
echo "ready"
