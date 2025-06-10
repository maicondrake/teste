import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiKey = 'YOUR_API_KEY'; // IMPORTANT: Replace with your actual API key
  private genAI: GoogleGenerativeAI;
  private model: any; // Adjust type as per SDK

  constructor() {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      console.warn('API key is not set. Please configure it in ChatService.');
      // Optionally throw an error or handle this case appropriately
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash-latest', // Or another suitable model
      // safetySettings can be configured here if needed
      // generationConfig can be configured here if needed
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY') {
      return 'API Key not configured. Please set it in the ChatService.';
    }
    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      if (error instanceof Error && error.message.includes('API key not valid')) {
         return 'Error: API key not valid. Please check your API key in the ChatService.';
      }
      return 'Error: Could not get a response from the AI.';
    }
  }
}
