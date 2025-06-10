import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PoPageModule, PoToolbarModule, PoMenuModule } from '@po-ui/ng-components'; // Keep existing PO-UI modules
import { ChatBoxComponent } from './features/chat-box/chat-box.component'; // Import the new component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PoPageModule,
    PoToolbarModule,
    PoMenuModule,
    ChatBoxComponent // Add ChatBoxComponent here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected to .scss
})
export class AppComponent {
  title = 'gemini-chat-app';
}
