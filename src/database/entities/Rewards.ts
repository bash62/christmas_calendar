import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rewards {
    
    /** --- Questions
        --- id | number
        --- type | string | required ( coupon, vidéo, photo, message, chocolat / surprise)
        --- path | string | null
        --- duration | number || null
        --- phrase | string | "" 
        --- caption | string | "" 
        --- description | string | ""
    **/ 

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    type: string

    @Column()
    path: string

    @Column()
    duration: number

    @Column()
    phrase: string

    @Column()
    caption: string

    @Column()
    description: string 
}