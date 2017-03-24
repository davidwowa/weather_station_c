#!/bin/bash
echo "compile dht11"
gcc -o dht11 dht11.c -L/usr/local/lib -lwiringPi -lpthread

echo "compile bmp180"
gcc -o bmp180 bmp180.c -lm lib/bmp180/src/bmp180.c