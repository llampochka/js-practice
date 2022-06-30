export interface StringValidator {
    isAcceptable(s: string):  boolean
}

export default interface IUser {
    name: string;
    age: number;
}