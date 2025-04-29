// Animation utility types
type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: string;
  onComplete?: () => void;
};

type AnimationControls = {
  play: () => void;
  reverse: () => void;
  stop: () => void;
};

/**
 * Creates a fade animation controller for an element
 * @param element - DOM element to animate
 * @param options - Animation configuration options
 */
export const createFadeAnimation = (
  element: HTMLElement | null,
  options: AnimationOptions = {}
): AnimationControls | null => {
  if (!element) return null;

  const {
    duration = 300,
    delay = 0,
    easing = 'ease',
    onComplete
  } = options;

  let animation: Animation | null = null;

  const createKeyframes = (start: number, end: number) => [
    { opacity: start, offset: 0 },
    { opacity: end, offset: 1 }
  ];

  return {
    play: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(0, 1),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    reverse: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(1, 0),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    stop: () => {
      if (animation) {
        animation.cancel();
        animation = null;
      }
    }
  };
};

/**
 * Creates a slide animation controller for an element
 * @param element - DOM element to animate
 * @param options - Animation configuration options
 * @param direction - Slide direction ('left' | 'right' | 'up' | 'down')
 */
export const createSlideAnimation = (
  element: HTMLElement | null,
  options: AnimationOptions & { direction?: 'left' | 'right' | 'up' | 'down' } = {}
): AnimationControls | null => {
  if (!element) return null;

  const {
    duration = 300,
    delay = 0,
    easing = 'ease',
    direction = 'left',
    onComplete
  } = options;

  let animation: Animation | null = null;

  const getTransform = (offset: number) => {
    switch (direction) {
      case 'right':
        return `translateX(${offset}%)`;
      case 'up':
        return `translateY(-${offset}%)`;
      case 'down':
        return `translateY(${offset}%)`;
      default: // left
        return `translateX(-${offset}%)`;
    }
  };

  const createKeyframes = (start: number, end: number) => [
    { transform: getTransform(start), offset: 0 },
    { transform: getTransform(end), offset: 1 }
  ];

  return {
    play: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(100, 0),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    reverse: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(0, 100),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    stop: () => {
      if (animation) {
        animation.cancel();
        animation = null;
      }
    }
  };
};

/**
 * Creates a scale animation controller for an element
 * @param element - DOM element to animate
 * @param options - Animation configuration options
 */
export const createScaleAnimation = (
  element: HTMLElement | null,
  options: AnimationOptions = {}
): AnimationControls | null => {
  if (!element) return null;

  const {
    duration = 300,
    delay = 0,
    easing = 'ease',
    onComplete
  } = options;

  let animation: Animation | null = null;

  const createKeyframes = (start: number, end: number) => [
    { transform: `scale(${start})`, offset: 0 },
    { transform: `scale(${end})`, offset: 1 }
  ];

  return {
    play: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(0, 1),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    reverse: () => {
      if (animation) animation.cancel();
      animation = element.animate(
        createKeyframes(1, 0),
        {
          duration,
          delay,
          easing,
          fill: 'forwards'
        }
      );
      if (onComplete) {
        animation.onfinish = onComplete;
      }
    },
    stop: () => {
      if (animation) {
        animation.cancel();
        animation = null;
      }
    }
  };
};