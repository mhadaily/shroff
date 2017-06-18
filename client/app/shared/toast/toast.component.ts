import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div *ngIf="message.body" class="alert alert-{{message.type}} alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>Message:</strong> {{message.body}}
    </div>
  `,
  styles: [`
    .alert {
      z-index: 999;
      position: fixed;
      bottom: 15px;
      left: 25%;
      width: 50%;
      opacity: 0.9;
    }
  `]
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body, type, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}
