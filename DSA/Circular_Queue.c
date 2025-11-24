#include <stdio.h>

int front=-1,rear=-1;
int a[100];

int main(){
    int k;
    printf("Enter size of the queue: ");
    scanf("%d",&k);

    int n=0;
    while(1){
        printf("1)Insertion\n2)Deletion\n3)Display\n4)Exit\n");
        scanf("%d",&n);

        switch(n){
        case 1:
            if((front==0 && rear==k-1)||(front==rear+1)){
                printf("Overflow\n");
            }else{
                int p;
                printf("Enter element you want to insert: ");
                scanf("%d",&p);

                if(front==-1){
                    front=rear=0;
                }else{
                    rear=(rear+1)%k;
                }

                a[rear]=p;
                printf("Element %d has been inserted.\n",p);
            }
            break;

        case 2:
            if(front==-1){
                printf("Underflow\n");
            }else{
                printf("Element deleted: %d\n",a[front]);
                if(front==rear){
                    front=rear=-1;
                }else{
                    front=(front+1)%k;
                }
            }
            break;

        case 3:
            if(front==-1){
                printf("Queue is empty\n");
            }else{
                printf("Queue elements: ");
                int i=front;
                while(1){
                    printf("%d ",a[i]);

                    if(i==rear)
                    break;

                    i=(i+1)%k;
                }
                printf("\n");
            }
            break;

        case 4:
            printf("Exit\n");
            return 0;

        default:
            printf("Invalid choice\n");
        }
    }
    return 0;
}