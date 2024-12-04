import { Component, Input, OnInit } from '@angular/core';
import { BudgetCardConfig } from '../../interfaces/ui-conifg/budget-card-config.interface';
import { Router } from '@angular/router';
import { UiService } from '../../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss'
})
export class BudgetCardComponent implements OnInit {
  @Input() config!: BudgetCardConfig;
  @Input() isDelete: boolean = false;
  @Input() selectedType: 'income' | 'expense' = 'income'; // Receive transaction type from home component

  bgColor: string = '';
  textColor: string = '';
  borderColor: string = '';
  transactionAmount: number = 0;

  constructor(private router: Router, private uiService: UiService) {}

  ngOnInit(): void {
    if (!this.config) {
      return;
    }

    this.borderColor = this.uiService.generateTailwindClass(this.config.color, 'border');
    this.textColor = this.uiService.generateTailwindClass(this.config.color, 'text');
    this.bgColor = this.uiService.generateTailwindClass(this.config.color, 'bg');
  }

  applyTransaction(): void {
    if (this.transactionAmount > 0) {
      if (this.selectedType === 'income') {
        this.config.budget += this.transactionAmount; // Add income
      } else if (this.selectedType === 'expense') {
        if (this.config.budget >= this.transactionAmount) {
          this.config.spent += this.transactionAmount; // Subtract expense
          this.config.budget -= this.transactionAmount; // Adjust budget
        } else {
          alert('Insufficient budget for this expense.');
        }
      }
    } else {
      alert('Please enter a valid amount.');
    }
  }

  calculatePercentage(): string {
    return this.config.budget === 0 ? '0%' : (this.config.spent / this.config.budget) * 100 + '%';
  }

  viewDetails(): void {
    if (this.config.onClick) {
      this.config.onClick();
    }
  }
}
