import fs from "fs";
import DB_FILE_PATH from "../config/config";
import Measure from "../models/measure";
import { v4 as uuid} from "uuid";
const file_path = `${DB_FILE_PATH}/measures`;

const measureController = {
    create(name: string): Measure {
        const measure: Measure = {
            id: uuid(),
            name: name,
        };

        const measures: Array<Measure> = [
            ...this.read(),
            measure,
        ];

        fs.writeFileSync(file_path, JSON.stringify({
            measures,
        }, null, 2));
                
        return measure;
    },
    read(): Array<Measure> {
        const dbString = fs.readFileSync(file_path, "utf-8");
        const db = JSON.parse(dbString || "{}");
        if(!db.measures) {
            return [];
        }
        return db.measures;
    },
    deleteById(id: string) {
        const measures = this.read();

        const measuresWithoutOne = measures.filter((measure) => {
            if(id === measure.id) {
                return false;
            }
            return true;
        });

        fs.writeFileSync(file_path, JSON.stringify({
            measures: measuresWithoutOne,
        }, null, 2));
    },
    CLEAR_DB() {
        fs.writeFileSync(file_path, "");
    }
}

export default measureController;
