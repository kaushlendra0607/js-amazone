#include<stdio.h>
void main(){
    int m,n,p,q;
    printf("enter the order i.e. m and n");
    scanf("%d%d",&m,&n);
    p=n;q=m;
    int arr1[m][n],arr2[p][q];
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            printf("enter the element at index %d%d :",i,j);
            scanf("%d",arr1[i][j]);
        }
    }
    for(int i=0;i<m;i++){
        for (int j=0;j<n;j++){
            printf(" %d",arr1[i][j]);
        } 
       printf("\n");
    }
    for(int i=0;i<p;i++){
        for(int j=0;j<q;j++){
            arr2[i][j]=arr1[j][i];

        }
    }
    int t=0;
    for (int i=0;i<p;i++){
        for(int j=0;j<q;j++){
            printf(" %d",arr2[i][j]);
            if(arr1[j][i]==arr2[i][j]){
                t=1;
            }
            else 
               t=0;
        }
        printf("\n");
    }
    if(t=0){
        printf("\nit is a symmetric matrix ");
    }
}