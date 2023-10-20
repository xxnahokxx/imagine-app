
import { messages } from '@/utils/messages'
import { Product } from '@/utils/types'

const productValidation = (product: Product) => {
    let error: Product = {}

    if(isNaN(Number(product.amount))) error.amount = messages.error.notNumber;
    if(!product.amount) error.amount = messages.error.notAmount;
    if(isNaN(Number(product.price))) error.price = messages.error.notNumber;
    if(!product.price) error.price = messages.error.notPrice;
    if(!product.description) error.description = messages.error.notDescription;
    if(!product.name) error.name = messages.error.notName;

    return error
}

export default productValidation
