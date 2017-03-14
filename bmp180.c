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
		float tt = bmp180_temperature(bmp);
		long pp = bmp180_pressure(bmp);
		float alt = bmp180_altitude(bmp);
		printf("t = %f, p = %lu, a = %f\n", tt, pp, alt);
		usleep(2 * 1000 * 1000);

		char text[100];
		time_t now = time(NULL);
		struct tm *t = localtime(&now);
		strftime(text, sizeof(text) - 1, "%d-%m-%Y", t);
		char prefix[50] = "/var/www/temphum/log2-";
		strcat(prefix, text);
		char suffix[50] = ".csv";
		strcat(prefix, suffix);
		FILE *fp;
		fp = fopen(prefix, "a");
		fprintf(fp, "%u000,%f,%lu,%f\n", (unsigned) time(NULL), tt, pp, alt);
		fclose(fp);
		FILE *fh;
		fh = fopen("/var/www/temphum/current_pressure.csv", "w");
		fprintf(fh, "%lu\n", pp);
		fclose(fh);
		FILE *ft;
		ft = fopen("/var/www/temphum/current_temp_2.csv", "w");
		fprintf(ft, "%f\n", tt);
		fclose(ft);
		FILE * fa;
		fa = fopen("/var/www/temphum/current_altitude.csv", "w");
		fprintf(fa, "%f\n", alt);
		fclose(fa);
		bmp180_close(bmp);
	}
	return 0;
}
