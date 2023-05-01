import jwt from 'jsonwebtoken';

const {ACTIVATION_ACCOUNT_TOKEN_SECRET, RESET_PASSWORD_TOKEN_SECRET}=process.env;
export const createActivationToken=(payload: any)=>{
    return jwt.sign(payload,ACTIVATION_ACCOUNT_TOKEN_SECRET!,{
        expiresIn:'2d'
    });
}
export const createResetToken=(payload: any)=>{
    return jwt.sign(payload,RESET_PASSWORD_TOKEN_SECRET!,{
        expiresIn:'6H'
    });
}