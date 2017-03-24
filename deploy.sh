#!bin/bash
echo "compile dht11"
gcc -o dht11 dht11.c -L/usr/local/lib -lwiringPi -lpthread

echo "compile bmp180"
gcc bmp180.c bmp180_c.c -o bmp1802 -lm