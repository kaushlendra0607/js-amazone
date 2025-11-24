#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int fact(int a){
    int x =a;
    if(x==0 || x==1){
        return 1;
    }
    return x*fact(x-1);
}

int comb(int n, int r){
    return fact(n)/(fact(r)*fact(n-r));
}

int onebits(int n){
    int m = n;
    int count = 0;
    while(m){
       
        if(m&1)
            count++;
         m=m>>1;
    }
    return count;
}

int fibo(int n){
    if(n==0){
        return 0;
    }
    if(n==1){
        return 1;
    }
    return fibo(n-1)+fibo(n-2);
}

int main() {
    int t;
    cin>>t;
    while(t!=0){
        int x,y;
        t--;
        cin>>x>>y;
        cout<<x-y<<endl;
    }
}
