import toast from "react-hot-toast";
import {authenticate} from "./helper"

//validate username in login page
export async function usernameValidate(values){
    const errors = usernameVerify({},values);

    if(values.username){
        //check if user exists in database
        const {status} = await authenticate(values.username)
        if(status !==200 ){
            errors.exist = toast.error("User Does Not exist!")
        }
    }

    return errors;
}
/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}
/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password do not match!");
    }

    return errors;
}

/** validate register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}



//validate username
const usernameVerify = (error={}, values) => {
    if(!values.username){
        error.username = toast.error("Username Required!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid username!")
    }
    return error;
} 

/** validate password */
const passwordVerify = (errors = {}, values)=> {
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numbers = /[1234567890]/;

    if(!values.password){
        errors.password = toast.error("Password Required!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password!");
    }else if(values.password.length < 8){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }else if(!numbers.test(values.password)){
        errors.password = toast.error("Password must have a number");
    }

    return errors;
}

/** validate email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid Email address!")
    }

    return error;
}