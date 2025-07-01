import { Component, input, ElementRef, output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'div[app-select-field]',
  imports: [CommonModule],

  templateUrl: './select-field.html'
})
export class SelectField implements OnDestroy {

  fieldValue = output<string>();
  minlength = input('');
  maxlength = input('');
  placeholder = input('');
  label = input('');
  icon = input('');
  optionsList = input<{ value: string; label: string }[]>([]);

  private handleClickOutsideBound = this.handleClickOutside.bind(this);
  public isFocused: boolean = false;

  constructor(private elementRef: ElementRef) {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleClickOutsideBound);
    }
  }

  onFieldClick(event: MouseEvent) {
    event.stopPropagation();
    this.isFocused = true;
  }

  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isFocused = false;
    }
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.fieldValue.emit(select.value);
  
  }



  ngOnDestroy() {
    // Vérifier si document existe avant de supprimer l'event listener
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleClickOutsideBound);
    }
  }
}