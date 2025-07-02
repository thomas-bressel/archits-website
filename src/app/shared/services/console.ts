import { Injectable, signal, computed } from '@angular/core';
import { ConsoleStep } from '../models/interface.models';


@Injectable({
  providedIn: 'root'
})
export class ConsoleService {


  // Sorted object to display
  private readonly steps: ConsoleStep[] = [
    // First command
    { id: 1, type: 'command', text: 'archi -v', delay: 100, typingSpeed: 100 },
    { id: 2, type: 'response', text: 'archi version 1.7.0', delay: 800, className: 'version' },

    // Second command
    { id: 3, type: 'command', text: 'archi create', delay: 1200, typingSpeed: 100 },

    // Banner ASCII
    {
      id: 4,
      type: 'banner',
      text: `
    ___              __    _ _______ _____     _____ _      _____ 
   /   |  __________/ /_  (_)__   __/ ___/    / ____| |    |_   _|
  / /| | / ___/ ___/ __ \\/ /  | |   \\__\\     | |    | |      | |  
 / ___ |/ /  / /__/ / / / /   | |  ___/ /    | |____| |___  _| |_  
/_/  |_/_/   \\___/_/ /_/_/    |_| /____/      \\_____|_____||_____|`,
      delay: 50,
      className: 'banner'
    },

    // Info lines
    { id: 5, type: 'info', text: 'ArchiTS CLI: 1.7.0', delay: 20, className: 'version' },
    { id: 6, type: 'info', text: 'Node: v20.19.2', delay: 20, className: 'node' },
    { id: 7, type: 'info', text: 'Go: go1.22.2', delay: 20, className: 'go' },
    { id: 8, type: 'info', text: 'OS: linux', delay: 20, className: 'os' },
    { id: 9, type: 'info', text: '', delay: 20 },
    { id: 10, type: 'info', text: 'Author: Thomas Bressel', delay: 20, className: 'author' },
    { id: 11, type: 'info', text: 'Architecture Generator for Backend Projects', delay: 20, className: 'description' },
    { id: 12, type: 'info', text: '', delay: 20 },
    { id: 13, type: 'info', text: '🚀 ArchiTS CLI - Project Scaffolding', delay: 20, className: 'highlight' },
    { id: 14, type: 'info', text: '', delay: 20 },

    // Project name question
    { id: 15, type: 'question', staticText: 'Project Name: ', typedText: 'mon-projet-backend', delay: 800, className: 'input', typingSpeed: 100 },
    { id: 16, type: 'info', text: 'Use the arrow keys to navigate: ↓ ↑ → ←', delay: 20, className: 'navigation' },
    { id: 17, type: 'info', text: 'Select an architecture:', delay: 20, className: 'question' },

    // Architecture menu
    {
      id: 18,
      type: 'menu',
      delay: 20,
      menuOptions: [
        { text: 'Layered Architecture', selected: true },
        { text: 'Clean Architecture', selected: false },
        { text: 'Hexagonal Architecture', selected: false }
      ],
      menuAnimation: {
        duration: 2000, 
        sequence: [
          [true, false, false],
          [false, true, false],
          [false, false, true],
          [false, true, false] 
        ],
        stepDuration: 800
      }
    }
  ];


  // SIGNALS - Reactive state management
  public readonly currentStepIndex = signal(0);   // Tracks which step we're currently displaying (starts at 0)
  public readonly allSteps = signal(this.steps);   // Contains all animation steps (immutable)
  public readonly typingText = signal('');   // Holds the text being typed character by character
  public readonly isTyping = signal(false);   // Boolean flag indicating if typing animation is active
  public readonly currentTypingStepId = signal<number | null>(null);    // ID of the step currently being typed (null when not typing)



  // COMPUTED SIGNALS - Automatically recalculate when dependencies change
  // Returns array of steps that should be visible (from start to current step)
  public readonly visibleSteps = computed(() => {
    const current = this.currentStepIndex();
    return this.allSteps().slice(0, current + 1);
  });

  // Returns true when we've reached the last step in the animation
  public readonly isComplete = computed(() => {
    return this.currentStepIndex() >= this.allSteps().length - 1;
  });

  

/**
 * menu selection animation
 * @param stepId 
 * @param sequence 
 * @param stepDuration
 */
public animateMenuSelection(stepId: number, sequence: boolean[][], stepDuration: number): Promise<void> {
  return new Promise(resolve => {
    let currentIndex = 0;
    
    const animateStep = () => {
      if (currentIndex < sequence.length) {
        // Met à jour les options du menu
        this.updateMenuSelection(stepId, sequence[currentIndex]);
        currentIndex++;
        
        setTimeout(animateStep, stepDuration);
      } else {
        resolve();
      }
    };
    
    animateStep();
  });
}



/**
 * Update the selection
 * @param stepId
 * @param selection
 */
public updateMenuSelection(stepId: number, selection: boolean[]) {
  const steps = this.allSteps();
  const stepIndex = steps.findIndex(step => step.id === stepId);
  
  if (stepIndex !== -1 && steps[stepIndex].menuOptions) {
    const updatedStep = {
      ...steps[stepIndex],
      menuOptions: steps[stepIndex].menuOptions!.map((option, index) => ({
        ...option,
        selected: selection[index] || false
      }))
    };
    
    const updatedSteps = [...steps];
    updatedSteps[stepIndex] = updatedStep;
    this.allSteps.set(updatedSteps);
  }
}



  /**
    * Advances to the next step in the animation sequence
    * Won't go beyond the last step
    */
  public nextStep() {
    const current = this.currentStepIndex();
    if (current < this.allSteps().length - 1) {
      this.currentStepIndex.set(current + 1);
    }
  }



  /**
   * Resets the entire animation to the beginning
   * Clears all typing state and sets step index to -1
   */
  public reset() {
    this.currentStepIndex.set(-1);    // -1 means no steps visible
    this.typingText.set('');          // Clear any typed text
    this.isTyping.set(false);         // Stop typing animation
    this.currentTypingStepId.set(null); // Clear typing step reference
  }



  /**
   * Gets the current step object based on the current index
   * Returns undefined if index is invalid
   */
  public getCurrentStep() {
    const index = this.currentStepIndex();
    return this.allSteps()[index];
  }

  /**
     * Updates the text being displayed during typing animation
     * Used to show progressive character-by-character typing
     */
  public setTypingText(text: string) {
    this.typingText.set(text);
  }

  /**
   * Sets whether typing animation is currently active
   * Controls display of typing cursor and text behavior
   */
  public setIsTyping(typing: boolean) {
    this.isTyping.set(typing);
  }

  /**
   * Sets which step is currently being typed
   * Used to match typing animation with correct console step
   */
  public setCurrentTypingStepId(id: number | null) {
    this.currentTypingStepId.set(id);
  }
}