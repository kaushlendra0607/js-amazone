//a program for binary search using bubble sort
#include<stdio.h>
void main(){
    int i,j,n,temp;
    printf("enter the no. of elements in araay :");
    scanf("%d",&n);
    int arr[n];
    for(i=0;i<n;i++){
        printf("enter %dth element ",i);
        scanf("%d",&arr[i]);

    }
    for(i=0;i<n-1;i++){
        for(j=i+1;j<n;j++)
{
    if (arr[i]>arr[j]){
         temp=arr[i];
         arr[i]=arr[j];
         arr[j]=temp;
    }
}    }
for(i=0;i<n;i++){
    printf("  %d",arr[i]);
}
int key,mid,left=0,right=n-1,t=0;
printf("\nenter the element to search :");
scanf("%d",&key);
while(left<=right){
    mid=left+(right-left)/2;
    if(arr[mid]==key){
        printf("\nelement is found at index %d of sorted array",mid);
        t=1;
        break;
    }
    if(arr[mid]<key){
        left=mid+1;
    }
    if(arr[mid]>key){
        right=mid-1;

    }
}
if(t==0){
    printf("\nelement is not found ");
}

}