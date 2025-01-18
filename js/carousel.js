export class Carousel {
  constructor(element) {
    this.carousel = element;
    this.items = Array.from(this.carousel.querySelectorAll('.carousel-item'));
    this.totalItems = this.items.length;
    this.current = 0;
    
    this.init();
  }

  init() {
    this.createControls();
    this.updateIndicators();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'flex justify-center space-x-2 mt-4';
    
    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-colors';
      dot.addEventListener('click', () => this.goToSlide(index));
      controls.appendChild(dot);
    });
    
    this.carousel.parentNode.appendChild(controls);
    this.indicators = controls.querySelectorAll('button');
  }

  goToSlide(index) {
    this.current = index;
    const offset = this.items[index].offsetLeft;
    this.carousel.scrollTo({
      left: offset,
      behavior: 'smooth'
    });
    this.updateIndicators();
  }

  updateIndicators() {
    this.indicators.forEach((dot, index) => {
      if (index === this.current) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-accent');
      } else {
        dot.classList.remove('bg-accent');
        dot.classList.add('bg-gray-300');
      }
    });
  }
}