import financialActivityController from "../backend/controllers/financialActivityController";
const fac = financialActivityController;

console.log("[CRUD]");

fac.CLEAR_DB();
fac.create(10.50, "Primeira movimentação");
fac.create(7.99, "Segunda movimentação");
const movimentacaoAtualizada = fac.create(7.99, "Segunda movimentação");
fac.update(movimentacaoAtualizada.id, {description: "Segunda movimentação atualizada."});
console.log(fac.read());