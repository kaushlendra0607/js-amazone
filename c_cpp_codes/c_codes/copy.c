/*#include<stdio.h>
int main(){
       FILE *fp,*fp1;
       fp=fopen("a.txt","r");
       char ch;
       int count=0;
       fp1=fopen("b.txt","w");
       while((ch=fgetc(fp))!=EOF){
        fputc(ch,fp1);
        count++;
       }
       printf("\nthe no. of char are %d\n",count);
       fclose(fp1);
       fp1=fopen("b.txt","r");
       while((ch=fgetc(fp1))!=EOF){
        putchar(ch);
       }
       fclose(fp1);
}
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {  // Check if exactly one argument is provided
        printf("Usage: %s <5-digit-number>\n", argv[0]);
        return 1;
    }

    char *numStr = argv[1];  // Get the command-line argument
    int sum = 0;

    // Check if the input is exactly 5 digits
    for (int i = 0; numStr[i] != '\0'; i++) {
        if (numStr[i] < '0' || numStr[i] > '9') {  // Check if each character is a digit
            printf("Error: Please enter a valid 5-digit number.\n");
            return 1;
        }
        sum += numStr[i] - '0';  // Convert character to integer and add to sum
    }

    printf("Sum of digits: %d\n", sum);
    return 0;
}*/
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <5-digit-number>\n", argv[0]);
        return 1;  // Exit if incorrect number of arguments
    }

    char *numStr = argv[1];
    int sum = 0;

    // Check if the argument has exactly 5 characters
    for (int i = 0; numStr[i] != '\0'; i++) {
        if (numStr[i] < '0' || numStr[i] > '9') {
            printf("Error: Please enter a valid 5-digit number.\n");
            return 1;
        }
        sum += numStr[i] - '0';
    }

    printf("Sum of digits: %d\n", sum);
    return 0;
}

