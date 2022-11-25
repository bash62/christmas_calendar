import { Rewards } from "./entities/rewards";
import { User } from "./entities/user";
import { DataSource, DataSourceOptions, Repository } from "typeorm";

export class AppDataSource extends DataSource {
    private _user: Repository<User>;
    private _rewards: Repository<Rewards>; 
 
    constructor(options: DataSourceOptions) {
        super(options);

        super.initialize().then(() => {
            console.log("Database initialized");
        });

        this._user = this.getRepository(User);
        this._rewards = this.getRepository(Rewards);
    }

    get user(): Repository<User> {
        return this._user;
    }

    get rewards(): Repository<Rewards> {
        return this._rewards;
    }
}
