import { BudgetCategory } from "./budget-category-interface";

export interface Expense {
    id: string;
    name: string;
    budgetCategory: BudgetCategory;
    type: 'income' | 'expense';
    amount: number;
    date: Date;
}
  