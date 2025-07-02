import { Component, input } from '@angular/core';
import { TerminalContent } from '../../shared/models/interface.models';
@Component({
  selector: 'app-terminal',
  imports: [],
  host: {
    'class':'terminal'
  },
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal {

public readonly terminalContent = input<TerminalContent>();

}
