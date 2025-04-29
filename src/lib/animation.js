export const fadeIn = (element) => {
  element.style.opacity = '0';
  element.style.transition = 'opacity 0.5s ease';
  
  requestAnimationFrame(() => {
    element.style.opacity = '1';
  });
};

export const scaleIn = (element) => {
  element.style.transform = 'scale(0.95)';
  element.style.transition = 'transform 0.5s ease';
  
  requestAnimationFrame(() => {
    element.style.transform = 'scale(1)';
  });
};

export const slideIn = (element, direction = 'left') => {
  const translations = {
    left: 'translateX(-20px)',
    right: 'translateX(20px)',
    top: 'translateY(-20px)',
    bottom: 'translateY(20px)'
  };
  
  element.style.transform = translations[direction];
  element.style.opacity = '0';
  element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  
  requestAnimationFrame(() => {
    element.style.transform = 'translate(0)';
    element.style.opacity = '1';
  });
};