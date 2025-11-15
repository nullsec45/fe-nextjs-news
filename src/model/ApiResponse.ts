export interface Meta{
    status:boolean;
    message:string;
}

export interface ApiResposne<T>{
    data:T;
    meta:Meta;
}