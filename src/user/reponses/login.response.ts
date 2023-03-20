export class LoginResponse{
    statusCode: number
    message: string
    payload: {
        accessToken: string
    }
}