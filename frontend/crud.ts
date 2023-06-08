import financialActivityController from "../backend/controllers/financialActivityController";
import measureController from "../backend/controllers/measureController";
import productController from "../backend/controllers/productController";
import purchaseActivityController from "../backend/controllers/purchaseActivityController";

const fac = financialActivityController;
const mc = measureController;
const pc = productController;
const pac = purchaseActivityController;

console.log("[CRUD]");

fac.CLEAR_DB();
mc.CLEAR_DB();
pc.CLEAR_DB();
pac.CLEAR_DB();
fac.create(10.50, "Primeira movimentação");
fac.create(7.99, "Segunda movimentação");
const terceiraMovimentacao = fac.create(12.99, "Terceira movimentação");
const movimentacaoAtualizada = fac.create(7.99, "Segunda movimentação");
fac.update(movimentacaoAtualizada.id, {description: "Segunda movimentação atualizada."});
fac.deleteById(terceiraMovimentacao.id);
mc.create("l");
mc.create("ml");
const measureDelete = mc.create("tchuuum");
mc.deleteById(measureDelete.id);
pc.create("Farinha", "Tio Jorge", "1 kg bag", 30);
const updateProduct = pc.create("Refrigerante", "Coca Cola", "2 l bottle", 7);
const productDelete = pc.create("Arroz", "Dona Benta", "5 kg bag", 30);
pc.updateContentById(updateProduct.id, "2.5 l bottle");
pc.deleteById(productDelete.id);
const productExample = pac.create(7.99, "Caixa de farinha", updateProduct.id, 8, "2023-06-08T07:29:18.665Z", "2023-06-08T07:29:18.665Z");
pac.updateDescriptionById(productExample.id, "Caixa de refrigerantes");
console.log(fac.read());
console.log(mc.read());
console.log(pc.read());
console.log(pac.read());