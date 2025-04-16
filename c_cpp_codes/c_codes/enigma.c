#include<stdio.h>
void main()
{
    int n,i;
    printf("enter the number of layers you want :\n");
    scanf("%d",&n);
    if(n<1 || n>100){
        printf("the number should be between 1 and 100 including them");
    }
    if(n>=1 && n<=100){

        for(i=1;i<=n-1;i++){
              if(i%2==0){
                printf("i love that ");
              }
              if(i%2!=0){
                printf("i hate that ");
              }

        }
      i++;
        if(i%2==0){
            printf(" i hate ");
        }
        if(i%2!=0){
            printf(" i love ");
        }
        printf("it");
    }
}