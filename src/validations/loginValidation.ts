import { Login } from '@/components/LoginComponent'
import { messages } from '@/utils/messages'


export const loginValidation = (login: Login) => {

    let error: Login = {}

    if (!login.user) {
        error.user = messages.error.userNameInexistent
    }

    if (!login.password) {
        error.password = messages.error.passwordInexistent
    }

    return error

}

