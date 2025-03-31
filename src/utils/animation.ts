/**
 * Easing function for smooth animation with cubic acceleration/deceleration
 */
export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

/**
 * Easing function for smooth animation with quintic acceleration/deceleration
 * More gradual than cubic easing
 */
export const easeOutQuintic = (x: number): number => {
  return 1 - Math.pow(1 - x, 5);
};

/**
 * Calculates the current animation progress based on start time and duration
 * @param startTime - The timestamp when the animation started
 * @param duration - The total duration of the animation in milliseconds
 * @returns A number between 0 and 1 representing the animation progress
 */
export const calculateAnimationProgress = (startTime: number, duration: number): number => {
  const elapsed = Date.now() - startTime;
  return Math.min(1, elapsed / duration);
}; 