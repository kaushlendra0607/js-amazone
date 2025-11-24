#include <stdio.h>
#include <stdlib.h>

int *deque;
int front = -1, rear = -1, size;

int isFull() {
    return ((front == 0 && rear == size - 1) || (front == rear + 1));
}

int isEmpty() {
    return (front == -1);
}

void insertFront(int x) {
    if (isFull()) {
        printf("Deque is full.\n");
        return;
    }
    if (front == -1)
        front = rear = 0;
    else if (front == 0)
        front = size - 1;
    else
        front--;
    deque[front] = x;
}

void insertRear(int x) {
    if (isFull()) {
        printf("Deque is full.\n");
        return;
    }
    if (front == -1)
        front = rear = 0;
    else if (rear == size - 1)
        rear = 0;
    else
        rear++;
    deque[rear] = x;
}

void deleteFront() {
    if (isEmpty()) {
        printf("Deque is empty.\n");
        return;
    }
    if (front == rear)
        front = rear = -1;
    else if (front == size - 1)
        front = 0;
    else
        front++;
}

void deleteRear() {
    if (isEmpty()) {
        printf("Deque is empty.\n");
        return;
    }
    if (front == rear)
        front = rear = -1;
    else if (rear == 0)
        rear = size - 1;
    else
        rear--;
}

void display() {
    if (isEmpty()) {
        printf("Deque is empty.\n");
        return;
    }
    int i = front;
    printf("Deque elements: ");
    while (1) {
        printf("%d ", deque[i]);
        if (i == rear)
            break;
        i = (i + 1) % size;
    }
    printf("\n");
}

int main() {
    int choice, value;

    printf("Enter size of deque: ");
    scanf("%d", &size);
    deque = (int *)malloc(size * sizeof(int));

    while (1) {
        // printf("\n--- Deque Operations ---\n");
        printf("1. Insert Front\n");
        printf("2. Insert Rear\n");
        printf("3. Delete Front\n");
        printf("4. Delete Rear\n");
        printf("5. Display\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter value: ");
                scanf("%d", &value);
                insertFront(value);
                break;
            case 2:
                printf("Enter value: ");
                scanf("%d", &value);
                insertRear(value);
                break;
            case 3:
                deleteFront();
                break;
            case 4:
                deleteRear();
                break;
            case 5:
                display();
                break;
            case 6:
                free(deque);
                exit(0);
            default:
                printf("Invalid choice.\n");
        }
    }

    return 0;
}
