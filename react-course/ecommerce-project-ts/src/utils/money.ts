
export function formatMoney(amountCents: number){
    return `${(amountCents * 0.01 ).toFixed(2)}`//or just devide by 100 would also work and is actually better than * 0.01
}