export interface User {
    id_usuario:number;
    nombre:string;
    email:string;
    password:string;
    rol:number;
    id_suscripcion:number;
    created_at:Date;
    updated_At:Date;
    customer_id: string
}