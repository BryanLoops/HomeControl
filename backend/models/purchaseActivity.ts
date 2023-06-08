import FinancialActivity from "./financialActivity";

interface PurchaseActivity extends FinancialActivity{
    product_id: string;
    quantity: number;
    purchase_date: string;
    expiration_date: string;
}

export default PurchaseActivity;