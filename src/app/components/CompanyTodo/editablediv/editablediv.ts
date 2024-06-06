import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'editable-div',
  templateUrl: './editablediv.html', 
  styleUrls: ['./editablediv.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EditableDivComponent {
  @Input() content: string = '';
  @Input() placeholder: string = '';
  @Output() contentChange = new EventEmitter<string>();
  @Output() enterPress = new EventEmitter<void>();
  @Output() focusChange = new EventEmitter<boolean>();
  @ViewChild('editableDiv') editableDiv!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.updatePlaceholder();
    this.setCaretToEnd();
  }

  updateContent(event: Event): void {
    const element = event.target as HTMLElement;
    this.content = element.innerText;
    this.contentChange.emit(this.content);
  }

  updatePlaceholder(): void {
    if (!this.content) {
      this.renderer.setAttribute(this.editableDiv.nativeElement, 'data-placeholder', this.placeholder);
    } else {
      this.renderer.removeAttribute(this.editableDiv.nativeElement, 'data-placeholder');
    }
  }

  setCaretToEnd(): void {
    const el = this.editableDiv.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  onFocus(): void {
    // setTimeout(() => this.setCaretToEnd(), 0);
    // this.setCaretToEnd();
    this.focusChange.emit(true);
  }

  onBlur(): void {
    this.focusChange.emit(false);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior (e.g., adding a new line)
      this.enterPress.emit();
    }
  }
}
