/*
 * dht11.c
 */
#include <wiringPi.h>

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <time.h>

#define MAX_TIME 85
#define DHT11PIN 1

int dht11_val[5] = { 0, 0, 0, 0, 0 };

void dht11_read_val() {

	uint8_t lststate = HIGH;
	uint8_t counter = 0;
	uint8_t j = 0, i;

	for (i = 0; i < 5; i++)
		dht11_val[i] = 0;

	pinMode(DHT11PIN, OUTPUT);
	digitalWrite(DHT11PIN, LOW);
	delay(18);
	digitalWrite(DHT11PIN, HIGH);
	delayMicroseconds(40);
	pinMode(DHT11PIN, INPUT);

	for (i = 0; i < MAX_TIME; i++) {
		counter = 0;
		while (digitalRead(DHT11PIN) == lststate) {
			counter++;
			delayMicroseconds(1);
			if (counter == 255)
				break;
		}
		lststate = digitalRead(DHT11PIN);
		if (counter == 255)
			break;
		// top 3 transistions are ignored
		if ((i >= 4) && (i % 2 == 0)) {
			dht11_val[j / 8] <<= 1;
			if (counter > 16)
				dht11_val[j / 8] |= 1;
			j++;
		}
	}
	// verify cheksum and print the verified data
	if ((j >= 40)
			&& (dht11_val[4]
					== ((dht11_val[0] + dht11_val[1] + dht11_val[2]
							+ dht11_val[3]) & 0xFF))) {
		printf("Humidity = %d.%d %% Temperature = %d.%d°C\n", dht11_val[0],
				dht11_val[1], dht11_val[2], dht11_val[3]);
		char text[100];
		time_t now = time(NULL);
		struct tm *t = localtime(&now);
		strftime(text, sizeof(text) - 1, "%d-%m-%Y", t);
		char prefix[50] = "/var/www/temphum/dht11_";
		strcat(prefix, text);
		char suffix[50] = ".csv";
		strcat(prefix, suffix);
		FILE *fp;
		fp = fopen(prefix, "a");
		fprintf(fp, "%u000,%d%d,%d\n", (unsigned) time(NULL), dht11_val[2],
				dht11_val[3], dht11_val[0]);
		fclose(fp);

		FILE *fhc;
		fhc = fopen("/var/www/temphum/dht11_log.csv", "a");
		fprintf(fhc, "%u000,%d%d,%d\n", (unsigned) time(NULL), dht11_val[2],
				dht11_val[3], dht11_val[0]);
		fclose(fhc);

		FILE *fh;
		fh = fopen("/var/www/temphum/dht11_current_humidity.csv", "w");
		fprintf(fh, "%d\n", dht11_val[0]);
		fclose(fh);
		FILE *ft;
		ft = fopen("/var/www/temphum/dht11_current_temperature.csv", "w");
		fprintf(ft, "%d.%d\n", dht11_val[2], dht11_val[3]);
		fclose(ft);
		exit(1);
	} else
		printf("Invalid Data!!\n");
}

int main(void) {
	printf("Interfacing Temperature and Humidity Sensor (DHT11) With Pi\n");
	if (wiringPiSetup() == -1)
		exit(1);
	while (1) {
		dht11_read_val();
		delay(3000);
	}
	return 0;
}
