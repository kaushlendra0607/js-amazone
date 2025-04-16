#include<stdio.h>
#include<math.h>
int main(){
    int n,i,t=0,root;
    printf("enter the number :");
    scanf("%d",&n);
    root=sqrt(n);
    for(i=2;i<=root;i++){
    if(n%i==0)
         t=i;
    }
    if(t==0){
        printf("the number is prime");
    }
    else{
        printf("the number is not prime and is divisible by %d",t);
    }
}