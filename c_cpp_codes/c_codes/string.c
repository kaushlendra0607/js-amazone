#include <stdio.h>
#include <string.h>
#include<stdlib.h>
int main()
{
    system("cls");
   char str1[100];
   char str2[100];
   char str3[201];
   printf("enter the first string :");
   gets(str1);
   printf("enter the second string :");
   gets(str2);
   int i=0,j=0,k=0;
 /*  while (str1[i]!='\0')
   {
    
    str3[j]=str1[i];
    j++;i++;
   }
   int k=0;
   while (str2[k]!='\0')
   {
    
    str3[j]=str2[k];
    k++;
    j++;
   }
   str3[j]='\0';*/
   strcat(str1,str2);
   
  
   puts(str1);
   printf("\n%d",strlen(str3));
   printf("\n%d",strlen(str2));
   printf("\n%d",strlen(str1));
   printf("\n%d %d %d",i,j,k);

}