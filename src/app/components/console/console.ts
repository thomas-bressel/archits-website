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
  public readonly consoleService = inject(ConsoleService);   // Injects the ConsoleService to access animation state and methods

  // PRIVATE PROPERTIES
  private timeoutId?: ReturnType<typeof setTimeout>;   // Stores timeout ID for proper cleanup and cancellation
  private isRunning = false;   // Flag to prevent multiple animations running simultaneously




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
    if (!this.isRunning) return;
  
    if (!this.consoleService.isComplete()) {
      const currentStep = this.consoleService.getCurrentStep();
      if (currentStep) {
  
        // MANAGE COMMANDES
        if (currentStep.type === 'command' && currentStep.text) {
          await this.typeCommand(currentStep.text, currentStep.typingSpeed || 300, currentStep.id);
        }
  
        // MANAGE QUESTIONS
        if (currentStep.type === 'question' && currentStep.typedText && currentStep.typingSpeed) {
          await this.typeQuestion(currentStep.typedText, currentStep.typingSpeed, currentStep.id);
        }
  
        // Schedule next step
        this.timeoutId = setTimeout(async () => {
          if (this.isRunning) {
            this.consoleService.nextStep(); 
            
            // Auto-scroll
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                document.getElementById('console-bottom')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end'
                });
              });
            });
  
            // MANAGE ANIMATION MENU 
            const newStep = this.consoleService.getCurrentStep();
            if (newStep?.type === 'menu' && newStep.menuAnimation) {
              await this.consoleService.animateMenuSelection(
                newStep.id,
                newStep.menuAnimation.sequence,
                newStep.menuAnimation.stepDuration
              );
            }
  
            this.runNextStep();
          }
        }, currentStep.delay);
      }
    } else {
      // RESTART CYCLE
      this.timeoutId = setTimeout(() => {
        if (this.isRunning) {
          this.stopAnimation();
          setTimeout(() => {
            this.startAnimation();
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


  /**
   * Simulates realistic typing for questions by revealing characters one by one
   * Uses Promise to ensure animation completes before continuing
   * 
   * @param text - The question text to type out
   * @param speed - Delay between characters in milliseconds
   * @param stepId - ID of the step being typed (for UI targeting)
   * @returns Promise that resolves when typing is complete
   */
  private async typeQuestion(text: string, speed: number, stepId: number): Promise<void> {
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