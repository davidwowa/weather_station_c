#include "bmp180.h"
#include <unistd.h>
#include <stdio.h>

#include <stdlib.h>
#include <stdint.h>
#include <time.h>

int main(int argc, char **argv) {
	char *i2c_device = "/dev/i2c-1";
	int address = 0x77;

	void *bmp = bmp180_init(address, i2c_device);

	if (bmp != NULL) {
		float temperature = bmp180_temperature(bmp);
		long pressure = bmp180_pressure(bmp);
		float altitude = bmp180_altitude(bmp);
		printf("temperature = %f, pressure = %lu, altitude = %f\n", temperature,
				pressure, altitude);
		usleep(2 * 1000 * 1000);

		char text[100];
		time_t now = time(NULL);
		struct tm *t = localtime(&now);
		strftime(text, sizeof(text) - 1, "%d-%m-%Y", t);
		char prefix[50] = "/var/www/temphum/bmp180_";
		strcat(prefix, text);
		char suffix[50] = ".csv";
		strcat(prefix, suffix);
		FILE *fp;
		fp = fopen(prefix, "a");
		fprintf(fp, "%u000,%f,%lu,%f\n", (unsigned) time(NULL), temperature,
				pressure, altitude);
		fclose(fp);

		FILE *fhc;
		fhc = fopen("/var/www/temphum/bmp180_log.csv", "a");
		fprintf(fhc, "%u000,%d%d,%d\n", (unsigned) time(NULL), temperature,
				pressure, altitude);
		fclose(fhc);

		FILE *fh;
		fh = fopen("/var/www/temphum/bmp180_current_pressure.csv", "w");
		fprintf(fh, "%lu\n", pressure);
		fclose(fh);
		FILE *ft;
		ft = fopen("/var/www/temphum/bmp180_current_temperature.csv", "w");
		fprintf(ft, "%f\n", temperature);
		fclose(ft);
		FILE * fa;
		fa = fopen("/var/www/temphum/bmp180_current_altitude.csv", "w");
		fprintf(fa, "%f\n", altitude);
		fclose(fa);
		bmp180_close(bmp);
	}
	return 0;
}
