export class Student {
        $key?: string;
        firstname: string;
        lastname: string;
        dob: string;
        email: string;
        phone:number;
        high_edu: string;
        university : string;
        collage : string;
        gender : string;
        male : boolean;
        female : boolean;
        imageUrl: string;
        category : string;
        constructor(){
            this.male = false;
            this.female = false;
        }
}
