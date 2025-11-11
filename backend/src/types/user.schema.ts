 export type User = {
id: number,
name: string,
email: string,
password: string,
createdAt: Date
}


export type LoginUser = {
    email: string,
    password: string
}