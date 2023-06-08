import financialActivityController from "../backend/controllers/financialActivityController";
const fac = financialActivityController;

console.log("[CRUD]");

fac.CLEAR_DB();
fac.create(10.50, "Primeira movimentação");
fac.create(7.99, "Segunda movimentação");
const terceiraMovimentacao = fac.create(12.99, "Terceira movimentação");
const movimentacaoAtualizada = fac.create(7.99, "Segunda movimentação");
fac.update(movimentacaoAtualizada.id, {description: "Segunda movimentação atualizada."});
fac.deleteById(terceiraMovimentacao.id);
console.log(fac.read());