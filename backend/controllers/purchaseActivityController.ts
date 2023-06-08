import fs from "fs";
import DB_FILE_PATH from "../config/config";
import PurchaseActivity from "../models/purchaseActivity";
import { v4 as uuid} from "uuid";
const file_path = `${DB_FILE_PATH}/purchaseActivities`;

const purchaseActivityController = {
    create(value: number, description: string, product_id: string, quantity: number, purchase_date: string, expiration_date: string): PurchaseActivity {
        const purchaseActivity: PurchaseActivity = {
            id: uuid(),
            value: value, 
            description: description,
            date: new Date().toISOString(),
            product_id: product_id,
            quantity: quantity,
            purchase_date: purchase_date,
            expiration_date: expiration_date
        };

        const purchaseActivities: Array<PurchaseActivity> = [
            ...this.read(),
            purchaseActivity,
        ];

        fs.writeFileSync(file_path, JSON.stringify({
            purchaseActivities,
        }, null, 2));
                
        return purchaseActivity;
    },
    read(): Array<PurchaseActivity> {
        const dbString = fs.readFileSync(file_path, "utf-8");
        const db = JSON.parse(dbString || "{}");
        if(!db.purchaseActivities) {
            return [];
        }
        return db.purchaseActivities;
    },
    update(id: string, partialPurchaseActivity: Partial<PurchaseActivity>): PurchaseActivity {
        let updatedPurchaseActivity;
        const purchaseActivities = this.read();
        purchaseActivities.forEach((currentPurchaseActivity) => {
            const isToUpdate = currentPurchaseActivity.id === id;
            if(isToUpdate){
                updatedPurchaseActivity = Object.assign(currentPurchaseActivity, partialPurchaseActivity);
            }
        });

        fs.writeFileSync(file_path, JSON.stringify({
            purchaseActivities,
        }, null, 2));
        
        if (!updatedPurchaseActivity) {
            throw new Error("Please provide another ID!");
        }

        return updatedPurchaseActivity;
    },
    // description: string, product_id: string, quantity: number, purchase_date: string, expiration_date: string
    updateValueById(id: string, value: number): PurchaseActivity{
        return this.update(
            id,
            {
                value,
            }
        )
    },
    updateDescriptionById(id: string, description: string): PurchaseActivity{
        return this.update(
            id,
            {
                description,
            }
        )
    },
    updateQuantityById(id: string, quantity: number): PurchaseActivity{
        return this.update(
            id,
            {
                quantity,
            }
        )
    },
    updatePurchaseDateById(id: string, purchase_date: string): PurchaseActivity{
        return this.update(
            id,
            {
                purchase_date,
            }
        )
    },
    updateExpirationDateById(id: string, expiration_date: string): PurchaseActivity{
        return this.update(
            id,
            {
                expiration_date,
            }
        )
    },
    deleteById(id: string) {
        const purchaseActivities = this.read();

        const purchaseActivitiesWithoutOne = purchaseActivities.filter((purchaseActivity) => {
            if(id === purchaseActivity.id) {
                return false;
            }
            return true;
        });

        fs.writeFileSync(file_path, JSON.stringify({
            purchaseActivities: purchaseActivitiesWithoutOne,
        }, null, 2));
    },
    CLEAR_DB() {
        fs.writeFileSync(file_path, "");
    }
}

export default purchaseActivityController;
