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
    // Check if running in browser environment (not during SSR)
    if (typeof document !== 'undefined') {
      // Add global click listener to detect clicks outside the component
      document.addEventListener('click', this.handleClickOutsideBound);
    }
  }

  /**
   * Handles click events on the select field
   * Opens the dropdown and prevents event bubbling
   * 
   * @param event - The mouse click event
   */
  onFieldClick(event: MouseEvent): void {
    event.stopPropagation();
    this.isFocused = true;
  }


  /**
   * Handles clicks outside the component to close dropdown
   * Automatically closes dropdown when user clicks elsewhere
   * 
   * @param event - The global mouse click event
   */
  handleClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isFocused = false;
    }
  }



  /**
     * Handles selection change events from the dropdown
     * Emits the selected value to parent components
     * 
     * @param event - The change event from the select element
     */
  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.fieldValue.emit(select.value);
  }



  /**
  * Component cleanup on destroy
  * Removes global event listeners to prevent memory leaks
  */
  ngOnDestroy(): void {
    // Check if running in browser environment (not during SSR)
    if (typeof document !== 'undefined') {
      // Remove the global click listener to prevent memory leaks
      document.removeEventListener('click', this.handleClickOutsideBound);
    }
  }
}