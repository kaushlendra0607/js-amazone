#include<stdio.h>
#include<stdlib.h>
int main(){
    int n;
    printf("enter the number of elements ;");
    scanf("%d",&n);
    int *p;
    p=(int *)(malloc(n*sizeof(int)));
    printf("enter the elements :");
    for (int i=0;i<n;i++){
        scanf("%d",p+i);
    }
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
           if((*(p+i))>*((p+j))){
              int c;
              c=*(p+i);
              *(p+i)=*(p+j);
               *(p+j)=c;
           }
        }
    }
    printf("the greatest element is %d",*(p+(n-1)));
    free(p);
}