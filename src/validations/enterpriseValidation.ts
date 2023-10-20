

import { messages } from '@/utils/messages'
import { Enterprise } from '@/utils/types'

const enterpriseValidation = (info: Enterprise) => {
    let error: Enterprise = {}

    if (!info.name) {
        error.name = messages.error.notName
    }
    if (!info.address) {
        error.address = messages.error.notAddress
    }
    if (!info.NIT) {
        error.NIT = messages.error.notNIT
    }
    if (!info.phone) {
        error.phone = messages.error.notPhone
    }
    if (isNaN(Number(info.phone))) {
        error.phone = messages.error.notNumber
    }
    if (isNaN(Number(info.NIT))) {
        error.NIT = messages.error.notNumber
    }

    return error
}

export default enterpriseValidation
