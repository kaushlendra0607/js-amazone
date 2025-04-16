#include <stdio.h>
void linear(int arr[], int size, int key)
{
    int t = 0;

    for (int i = 0; i < size; i++)
    {
        if (arr[i] == key)
        {
            printf("element is found at index %d\n", i);
            t = 1;
            
        }
    }
    if (t == 0)
    {
        printf("elment is not found\n");
    }
}
int main()
{
    int n, m;
    printf("enter the size of array \n");
    scanf("%d", &n);
    int arr1[n];
    for (int i = 0; i < n; i++)
    {
        printf("enter the %dth element :\n",i);
        scanf("%d", &arr1[i]);
    }
    printf("enter the element to search :\n");
    scanf("%d", &m);
    linear(arr1, n, m);
    return 0;
}