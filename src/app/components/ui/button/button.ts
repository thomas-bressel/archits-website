import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  imports: [CommonModule],
  host: {
    'class': "button", 
    '[class]': "['background-' + bgColor(), 'border-' + borderColor(), 'color-' + txtColor(), 'shadow-' + shadowColor()]", 
    '[type]': "type() === 'submit' ? 'submit' : 'button'",
    '(click)': "handleClick()"
  },
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {

  buttonClicked = output()

  icon = input('');
  img = input('');
  text = input('');
  bgColor = input('');
  borderColor = input('');
  txtColor = input('');
  iconColor = input('');
  shadowColor = input('');
  type = input('');

  handleClick() {
    this.buttonClicked.emit();
  }
}
