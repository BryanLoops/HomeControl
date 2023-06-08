import fs from "fs";
import DB_FILE_PATH from "../config/config";
import Product from "../models/product";
import { v4 as uuid} from "uuid";

const file_path = `${DB_FILE_PATH}/products`;

const productController = {
    create(name: string, label: string, content: string, up_to: number): Product {
        const product: Product = {
            id: uuid(),
            name: name, 
            label: label,
            content: content,
            date: new Date().toISOString(),
            up_to: up_to
        };

        const products: Array<Product> = [
            ...this.read(),
            product,
        ];

        fs.writeFileSync(file_path, JSON.stringify({
            products,
        }, null, 2));
                
        return product;
    },
    read(): Array<Product> {
        const dbString = fs.readFileSync(file_path, "utf-8");
        const db = JSON.parse(dbString || "{}");
        if(!db.products) {
            return [];
        }
        return db.products;
    },
    update(id: string, partialProduct: Partial<Product>): Product {
        let updatedProduct;
        const products = this.read();
        products.forEach((currentProduct) => {
            const isToUpdate = currentProduct.id === id;
            if(isToUpdate){
                updatedProduct = Object.assign(currentProduct, partialProduct);
            }
        });

        fs.writeFileSync(file_path, JSON.stringify({
            products,
        }, null, 2));
        
        if (!updatedProduct) {
            throw new Error("Please provide another ID!");
        }

        return updatedProduct;
    },
    updateNameById(id: string, name: string): Product{
        return this.update(
            id,
            {
                name,
            }
        )
    },
    updateLabelById(id: string, label: string): Product{
        return this.update(
            id,
            {
                label,
            }
        )
    },
    updateContentById(id: string, content: string): Product{
        return this.update(
            id,
            {
                content,
            }
        )
    },
    updateUpToById(id: string, up_to: number): Product{
        return this.update(
            id,
            {
                up_to,
            }
        )
    },
    deleteById(id: string) {
        const products = this.read();

        const productsWithoutOne = products.filter((product) => {
            if(id === product.id) {
                return false;
            }
            return true;
        });

        fs.writeFileSync(file_path, JSON.stringify({
            products: productsWithoutOne,
        }, null, 2));
    },
    CLEAR_DB() {
        fs.writeFileSync(file_path, "");
    }
}

export default productController;
