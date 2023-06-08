import fs from "fs";
import DB_FILE_PATH from "../config/config";
import FinancialActivity from "../models/financialActivity";
import { v4 as uuid} from "uuid";
const file_path = `${DB_FILE_PATH}/financialActivities`;

const financialActivityController = {
    create(value: number, description: string): FinancialActivity {
        const financialActivity: FinancialActivity = {
            id: uuid(),
            value: value, 
            description: description,
            date: new Date().toISOString(),
        };

        const financialActivities: Array<FinancialActivity> = [
            ...this.read(),
            financialActivity,
        ];

        fs.writeFileSync(file_path, JSON.stringify({
            financialActivities,
        }, null, 2));
                
        return financialActivity;
    },
    read(): Array<FinancialActivity> {
        const dbString = fs.readFileSync(file_path, "utf-8");
        const db = JSON.parse(dbString || "{}");
        if(!db.financialActivities) {
            return [];
        }
        return db.financialActivities;
    },
    update(id: string, partialFinancialActivity: Partial<FinancialActivity>): FinancialActivity {
        let updatedFinancialActivity;
        const financialActivities = this.read();
        financialActivities.forEach((currentFinancialActivity) => {
            const isToUpdate = currentFinancialActivity.id === id;
            if(isToUpdate){
                updatedFinancialActivity = Object.assign(currentFinancialActivity, partialFinancialActivity);
            }
        });

        fs.writeFileSync(file_path, JSON.stringify({
            financialActivities,
        }, null, 2));
        
        if (!updatedFinancialActivity) {
            throw new Error("Please provide another ID!");
        }

        return updatedFinancialActivity;
    },
    updateDescriptionById(id: string, description: string): FinancialActivity{
        return this.update(
            id,
            {
                description,
            }
        )
    },
    deleteById(id: string) {
        const financialActivities = this.read();

        const financialActivitiesWithoutOne = financialActivities.filter((financialActivity) => {
            if(id === financialActivity.id) {
                return false;
            }
            return true;
        });

        fs.writeFileSync(file_path, JSON.stringify({
            financialActivities: financialActivitiesWithoutOne,
        }, null, 2));
    },
    CLEAR_DB() {
        fs.writeFileSync(file_path, "");
    }
}

export default financialActivityController;
