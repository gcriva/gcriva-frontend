import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { isMobile } from '../../utils';

@Directive({ selector: '[scrollIntoView]' })
export class ScrollIntoViewDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'focus', this.handleInputFocus);
  }

  public handleInputFocus = () => {
    const { nativeElement } = this.el;
    setTimeout(() => {
      if (isMobile && !elementIsVisible(nativeElement)) {
        nativeElement.scrollIntoView({
          block: 'end',
          behavior: 'smooth'
        });
      }
    }, 600); // 💩
  }
}

function elementIsVisible(el) {
  const rect = el.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
