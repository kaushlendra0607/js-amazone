#include<iostream>
using namespace std;
int main(){
    int x;
    cout<<"enter x : ";
    /*note - only enter the ascii values to x
    charatcers from 0 to 31 and 127 are not printable*/
    cin>>x;
    cout<<(char)x;
   //cout<<"hello world!"<<endl<<"bye\n";//endl means end of line which we have used in python
   // cout<<"hello world!"<<"\n"<<"bye";// \n can also be used for new line
   return 0;
}