import { Rewards } from "./entities/Rewards";
import { User } from "./entities/User";

import { DataSource, DataSourceOptions, Repository } from "typeorm";
import { SunDate } from "./entities/sun-date";
import { fetchSunDate } from "../utils/fetch-sundate";

export class AppDataSource extends DataSource {
    private _user: Repository<User>;
    private _rewards: Repository<Rewards>; 
    private _sunDate: Repository<SunDate>;
 
    constructor(options: DataSourceOptions) {
        super(options);

        super.initialize().then(() => {
            console.log("Database initialized");
        });

        this._user = this.getRepository(User);
        this._rewards = this.getRepository(Rewards);
        this._sunDate = this.getRepository(SunDate);
    }

    get user(): Repository<User> {
        return this._user;
    }

    get rewards(): Repository<Rewards> {
        return this._rewards;
    }

    get sunDate(): Repository<SunDate> {
        return this._sunDate;
    }


}

