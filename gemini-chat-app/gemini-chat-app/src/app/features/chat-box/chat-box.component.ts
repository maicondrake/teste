import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For ngModel
import { CommonModule } from '@angular/common'; // For ngFor, ngIf, ngClass

// PO-UI Modules
import { PoInputModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoWidgetModule } from '@po-ui/ng-components';
import { PoLoadingOverlayModule } from '@po-ui/ng-components'; // Corrected module name

import { ChatService } from '../../core/chat.service'; // Adjust path if necessary
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


interface ChatMessage {
  sender: 'user' | 'bot';
  text: string | SafeHtml;
}

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PoInputModule,
    PoButtonModule,
    PoWidgetModule,
    PoLoadingOverlayModule // Corrected module name
  ],
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
  messages: ChatMessage[] = [];
  currentMessage: string = '';
  isLoading: boolean = false;

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer) {}

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || this.isLoading) {
      return;
    }

    const userMessage = this.currentMessage;
    this.messages.push({ sender: 'user', text: userMessage });
    this.currentMessage = '';
    this.isLoading = true;

    try {
      const botResponseText = await this.chatService.sendMessage(userMessage);
      // Sanitize if Gemini can return HTML. For now, assuming plain text or simple markdown to HTML.
      // Gemini typically returns markdown. A proper markdown to HTML conversion would be better here.
      // For simplicity, replacing newlines with <br> for now.
      const formattedBotResponse = botResponseText.replace(/\n/g, '<br>');
      const sanitizedBotResponse: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(formattedBotResponse);
      this.messages.push({ sender: 'bot', text: sanitizedBotResponse });
    } catch (error) {
      console.error('Error getting response from chat service:', error);
      this.messages.push({ sender: 'bot', text: 'Sorry, I encountered an error.' });
    } finally {
      this.isLoading = false;
    }
  }
}
