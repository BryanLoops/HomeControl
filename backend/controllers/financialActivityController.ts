import fs from "fs";
import DB_FILE_PATH from "../config/config";
import FinancialActivity from "../models/financialActivity";
import { v4 as uuid} from "uuid";

const financialActivityController = {
    create(valueInput: number, descriptionInput: string): FinancialActivity {
        const financialActivity: FinancialActivity = {
            id: uuid(),
            value: valueInput, 
            description: descriptionInput
        };

        const financialActivities: Array<FinancialActivity> = [
            ...this.read(),
            financialActivity,
        ];

        fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
            financialActivities,
        }, null, 2));
                
        return financialActivity;
    },
    read(): Array<FinancialActivity> {
        const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
        const db = JSON.parse(dbString || "{}");
        if(!db.financialActivities) {
            return [];
        }
        return db.financialActivities;
    },
    update(id: string, partialFinancialActivity: Partial<FinancialActivity>) {
        const financialActivities = this.read();
        financialActivities.forEach((currentFinancialActivity) => {
            const isToUpdate = currentFinancialActivity.id === id;
            if(isToUpdate){
                Object.assign(currentFinancialActivity, partialFinancialActivity);
            }
        });

        fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
            financialActivities,
        }));
        console.log("Movimentações atualizadas", financialActivities);
    },
    delete() {

    },
    CLEAR_DB() {
        fs.writeFileSync(DB_FILE_PATH, "");
    }
}

export default financialActivityController;
