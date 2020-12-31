import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private El: ElementRef, 
    private renderer: Renderer2) {}

    @HostListener('mouseenter') onmouseenter(){
      this.renderer.addClass(this.El.nativeElement, 'highlight');
    }
    @HostListener('mouseleave') onmouseleave(){
      this.renderer.removeClass(this.El.nativeElement, 'highlight');
    }
}
