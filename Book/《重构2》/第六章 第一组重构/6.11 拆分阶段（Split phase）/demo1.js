/* Demo1 */
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;


/* Demo1
// after
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;
*/


const orderRecord = parseOrder(order);
const orserPrice = price(orderRecord,priceList)

function parseOrder(aString){
    const values = aString.split(/\s+/)
    return ({
        productID: values[0].split('-')[1],
        quantity: parseInt(values[1])
    })
}

function price(order, priceList) {
    return order.quantity * priceList[order.productID];
}



