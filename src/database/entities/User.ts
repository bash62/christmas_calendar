import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    
    /** i want to create a database like --- User
        --- id | number
        --- ammount_chocolat | number | default (0) < 6
        --- ammount_surprise | number | default (0) < 7
        --- loged_in_cookie_hash | string | 
    **/ 
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ammount_chocolat: number = 0

    @Column()
    ammount_surprise: number = 0

    @Column()
    logged_in_cookie_hash: string = ""

    @Column({
        nullable: false,
        default: 1,
    })
    lastdayconnection: number

    @Column({
        nullable: true,
        default: 0,
    })
    ammount_redeemed: number
}