export interface Person { name:string; mass:string; height:string; hair_color:string; skin_color:string }
export interface PeopleResponse { count:number; next:string|null; previous:string|null; results:Person[] }
