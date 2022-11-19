import { RewardType } from "../../types/reward.type"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Rewards {
    
    /** --- Rewards
        --- id | number
        --- type | string | required ( coupon, vidéo, photo, message, chocolat / surprise)
        --- path | string | null
        --- duration | number || null
        --- phrase | string | "" 
        --- caption | string | "" 
        --- description | string | ""
        --- day | number | unique | required
        --- isRedeemed | boolean | false

    **/ 

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: RewardType.message,
        nullable: true,
        type: "enum",
        enum: RewardType,
        name: "type"
    })
    type: RewardType

    @Column({
        default: "",
    })
    path: string

    @Column({
        default: 0,
    })
    duration: number

    @Column({
        default: "",
    })
    phrase: string

    @Column({
        default: "",
    })
    caption: string

    @Column({
        default: "",
    })
    
    description: string

    @Column({
        nullable: false,
        unique: true,
    })
    day: number

    @Column({
        nullable: false,
        default: false,
    })
    isRedeemed: boolean

    @Column({
        nullable: false,
        default: false,
    })
    isCouponClaimed: boolean

}