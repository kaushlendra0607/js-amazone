//program to check the validity of traingle by it's sides
#include<stdio.h>
#include<conio.h>
void main(){
    int arr[4];
    
    int s1,s2,s3;
    //clrscr();
    printf("enter sides of a triangle :");
    scanf("%d%d%d",&s1,&s2,&s3);
    ((s1+s2 >s3) && (s1+s3 >s2) && (s2+s3 >s1))?(printf("Traingle exists...")):(printf("Triangle doesn't exist"));
    /*
    for(int i=0;i<3;i++){
        printf("enter %dth side :",i);
        scanf("%d",&arr[i]);
    }
    for(int i=0;i<4;i++){
          if(arr[])
    }*/
getch();
}