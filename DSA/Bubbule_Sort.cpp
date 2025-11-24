#include<bits/stdc++.h>
using namespace std;

void bubble_sort(int arr[],int n){
    for(int i=0;i<n;i++){
        bool swapped = false;
        for(int j=0;j<n-i-1;j++){
            if(arr[j]>arr[j+1]){
                swap(arr[j],arr[j+1]);
                swapped = true;
            }
        }
        if(swapped == false)
        break;
    }
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
    cout<<endl;
}
//complicated version
/*bool binary_search(int arr[],int s,int e,int key){
    int mid = (s+e)/2;
    if(arr[mid] == key){
        return true;
    }
    if( mid == s || mid == e ){
        return false;
    }
    if(key>arr[mid]){
        return binary_search(arr,mid+1,e,key);
    }
    else if(key<arr[mid]){
        return binary_search(arr,s,mid-1,key);
    }
    else{
        return false;
    }
}*/
bool binary_search(int arr[],int s, int e, int key){
    int mid = (e+s)/2;
    if(arr[mid] == key)
        return true;
    
    if(s>e)
        return false;

    if(arr[mid]>key)
        return binary_search(arr,s,mid-1,key);
    else
        return binary_search(arr,mid+1,e,key);
}

int main(){
    int arr[] = {1,2,3,4,5,6};
    int a = size(arr);//use size not sizeof
    cout<<a<<endl;
    bubble_sort(arr,size(arr));
    bool ans = binary_search(arr,0,a-1,5);
    if(ans)
    cout<<"Present\n";
    else
    cout<<"Absent\n";
    return 0;
}
