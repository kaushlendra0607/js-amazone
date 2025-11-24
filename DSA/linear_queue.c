#include<stdio.h>

int arr[100];
int front = -1;
int back = -1;

void enque(int val){
    if(back>=99){
        printf("Overflow\n");
        return;
    }
    if(front == -1){
        front = 0;
    }
    back++;
    arr[back] = val;
    printf("Item inserted\n");

}

void deque(){
    if(front > back || front==-1){
        printf("Queue empty. Underflow\n");
        return;
    }
    if(back == front){
        back = -1;
        printf("Element deleted is %d\n",arr[front]);
        front = -1;
        return;
    }
    printf("Element deleted is %d\n",arr[front]);
    front++;
}

void display(){
    if(front > back || front==-1){
        printf("Queue empty.\n");
        return;
    }
    for(int i=front;i<=back;i++){
        printf(" %d",arr[i]);
    }
    printf("\ndisplay completed\n");
}

int main(){
    int choice,val;
    printf("Enter 1 for enque\n2 for deque\n3 for display\n and 4 to exit: ");
    scanf("%d",&choice);
    while(choice != 4){
        switch (choice)
        {
        case 1:{
            printf("Enter number: ");
            scanf("%d",&val);
            enque(val);
            break;
        }
        case 2:{
            deque();
            break;
        }
        case 3:{
            display();
            break;
        }
        default:
            printf("Enter valid choice\n");
            break;
        }
        printf("Enter choice: ");
        scanf("%d",&choice);
    }
}
