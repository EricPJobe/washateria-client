export function createData(
        id: number,
        date: string,
        name: string,
        shipTo: string,
        paymentMethod: string,
        amount: number,
    ) {
    return { id, date, name, shipTo, paymentMethod, amount };
}
  
export function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}