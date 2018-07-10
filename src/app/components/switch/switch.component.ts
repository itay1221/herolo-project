import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent {
    isSwitchActive : boolean;
    @Input() switchText : {leftSide : string , rightSide : string};
    @Output() switchActivated : EventEmitter<boolean> = new EventEmitter<boolean>();

    onClick(){
        this.switchActivated.emit(this.isSwitchActive = !this.isSwitchActive);
    }
}
