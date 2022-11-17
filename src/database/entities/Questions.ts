import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Questions {
    
    /** --- Questions
        --- id | number
        --- type | string | required ( coupon, vidéo, photo, message, chocolat / surprise)
        --- path | string | null
        --- duration | number || null
        --- phrase | string | "" 
        --- caption | string | "" 
        --- description | string | ""
        --- day | number | required
    **/ 

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true,
    })
    type: string

    @Column({
        nullable: true,
    })
    path: string

    @Column({
        nullable: true,
    })
    duration: number

    @Column({
        nullable: true,
    })
    phrase: string

    @Column({
        nullable: true,
    })
    caption: string

    @Column({
        nullable: true,
    })
    
    description: string

    @Column({
        nullable: true,
    })
    day: number
    
}