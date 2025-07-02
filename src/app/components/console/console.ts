import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ConsoleService } from '../../shared/services/console';

@Component({
  selector: 'app-console',
  standalone: true,
  templateUrl: './console.html',
  styleUrl: './console.scss'
})
export class Console implements OnInit, OnDestroy {
  
  // DEPENDENCY INJECTION
  // Injects the ConsoleService to access animation state and methods
  public readonly consoleService = inject(ConsoleService);
  
  // PRIVATE PROPERTIES
  // Stores timeout ID for proper cleanup and cancellation
  private timeoutId?: ReturnType<typeof setTimeout>;
  
  // Flag to prevent multiple animations running simultaneously
  private isRunning = false;

  // LIFECYCLE HOOKS
  
  /**
   * Called when component is initialized
   * Automatically starts the terminal animation
   */
  ngOnInit() {
    this.startAnimation();
  }

  /**
   * Called when component is destroyed
   * Ensures proper cleanup to prevent memory leaks
   */
  ngOnDestroy() {
    this.stopAnimation();
  }

  // ANIMATION CONTROL METHODS
  
  /**
   * Stops the current animation and cleans up resources
   * Sets running flag to false and clears any pending timeouts
   */
  private stopAnimation() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  /**
   * Starts the terminal animation sequence
   * Prevents multiple instances and resets service state
   * Begins with first step after a short delay
   */
  private startAnimation() {
    // Guard clause - prevent starting if already running
    if (this.isRunning) return;
    
    // Set running flag and reset service to initial state
    this.isRunning = true;
    this.consoleService.reset();
    
    // Start first step after 100ms delay
    this.timeoutId = setTimeout(() => {
      this.consoleService.nextStep();  // Move to first step (index 0)
      this.runNextStep();              // Begin recursive step execution
    }, 100);
  }

  /**
   * Recursively processes each animation step
   * Handles different step types and manages timing
   * Restarts animation when complete (infinite loop)
   */
  private async runNextStep() {
    // Safety check - exit if animation was stopped
    if (!this.isRunning) return;
    
    // Check if we've reached the end of the animation
    if (!this.consoleService.isComplete()) {
      const currentStep = this.consoleService.getCurrentStep();
      if (currentStep) {
        
        // SPECIAL HANDLING FOR COMMAND STEPS
        // Commands need typing animation simulation
        if (currentStep.type === 'command' && currentStep.text) {
          // Wait for typing animation to complete before proceeding
          await this.typeCommand(
            currentStep.text, 
            currentStep.typingSpeed || 300,  // Default to 300ms per character
            currentStep.id
          );
        }
        
        // Schedule next step based on current step's delay
        this.timeoutId = setTimeout(() => {
          if (this.isRunning) {
            this.consoleService.nextStep();  // Advance to next step
            this.runNextStep();              // Recursively process next step
          }
        }, currentStep.delay);
      }
    } else {
      // ANIMATION COMPLETE - RESTART CYCLE
      // Wait 2 seconds then restart the entire animation
      this.timeoutId = setTimeout(() => {
        if (this.isRunning) {
          this.stopAnimation();              // Clean stop
          setTimeout(() => {
            this.startAnimation();           // Fresh start after 200ms
          }, 200);
        }
      }, 2000);
    }
  }

  // TYPING ANIMATION METHOD
  
  /**
   * Simulates realistic typing by revealing characters one by one
   * Uses Promise to ensure animation completes before continuing
   * 
   * @param text - The command text to type out
   * @param speed - Delay between characters in milliseconds
   * @param stepId - ID of the step being typed (for UI targeting)
   * @returns Promise that resolves when typing is complete
   */
  private async typeCommand(text: string, speed: number, stepId: number): Promise<void> {
    return new Promise(resolve => {
      // Initialize typing state in the service
      this.consoleService.setIsTyping(true);           // Enable typing mode
      this.consoleService.setCurrentTypingStepId(stepId); // Link to specific step
      this.consoleService.setTypingText('');           // Start with empty text
      
      let i = 0; // Character index counter
      
      // Use setInterval to reveal characters progressively
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          // Add next character to the visible text
          this.consoleService.setTypingText(text.substring(0, i + 1));
          i++;
        } else {
          // Typing complete - cleanup and resolve
          clearInterval(typeInterval);                    // Stop the interval
          this.consoleService.setIsTyping(false);         // Disable typing mode
          this.consoleService.setCurrentTypingStepId(null); // Clear step reference
          resolve();                                      // Signal completion
        }
      }, speed); // Execute every 'speed' milliseconds
    });
  }

  // UTILITY METHODS
  
  /**
   * Returns the standard terminal prompt string
   * Used for consistent prompt display across the terminal
   */
  getPromptText(): string {
    return 'zisquier@kali:~$ ';
  }

  /**
   * Formats question prompts (currently just returns the text)
   * Could be extended for special question formatting
   */
  getQuestionPrompt(text: string): string {
    return text;
  }
}