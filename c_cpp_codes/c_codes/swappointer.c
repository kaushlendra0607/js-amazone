#include<stdio.h>
#include<stdlib.h>
   void swap_value(int,int);
   void swap_ref(int *,int *);
   void swap_value(int m,int n){
        int c;
        c=m;
        m=n;
        n=c;
        printf("swapped a and b are %d and %d",m,n);

   }
   void swap_ref(int *p,int *f){
            int c;
            c = * p;
            *p=*f;
            *f=c;
   }
   void main(){
     system("cls");
    int a,b;
    printf("enter the values of a and b :");
    scanf("\n%d%d",&a,&b);
    swap_value(a,b);
    printf("\n %d %d",a,b);
    int *j,*k;
    j=&a;
    k=&b;
    swap_ref(j,k);
    printf("\nthe values are now swapped by refrencing %d %d ",a,b);
    printf("\n %d %d",a,b);

   }
