import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    
    /** i want to create a database like --- User
        --- id | number
        --- amount_chocolat | number | default (0) < 6
        --- amount_surprise | number | default (0) < 7
        --- loged_in_cookie_hash | string | 
    **/ 
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: 0,
        name: "amount_chocolat"
    })
    amountChocolat: number = 0

    @Column({
        default: 0,
        name: "amount_surprise"
    })
    amountSurprise: number = 0

    @Column({
        name: "logged_in_cookie_hash"
    })
    loggedInCookieHash: string = ""

    @Column({
        nullable: false,
        default: 1,
        name: "last_day_connection"
    })
    lastDayConnection: number

    @Column({
        nullable: true,
        default: 0,
        name: "amount_redeemed"
    })
    amountRedeemed: number
}