import { Questions } from "./entities/Questions";
import { User } from "./entities/User";
import { Rewards } from "./entities/Rewards";

import { DataSource, DataSourceOptions, Repository } from "typeorm";

export class AppDataSource extends DataSource {
private _user: Repository<User>;
private _questions: Repository<Questions>; 
private _rewards: Repository<Rewards>;
 
    constructor(options: DataSourceOptions) {
        super(options);

        super.initialize().then(() => {
            console.log("Database initialized");
        });
        this._user = this.getRepository(User);
        this._questions = this.getRepository(Questions);
        this._rewards = this.getRepository(Rewards);

    }

    get user(): Repository<User> {
        return this._user;
    }

    get questions(): Repository<Questions> {
        return this._questions;
    }

    get rewards(): Repository<Rewards> {
        return this._rewards;
    }


}

