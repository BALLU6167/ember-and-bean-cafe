export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  suggestedFollowUps?: string[];
  referenceResourceIds?: string[];
  isStreaming?: boolean;
}

export interface AIPromptSuggestion {
  id: string;
  title: string;
  prompt: string;
  category?: string;
  iconName?: string;
}
