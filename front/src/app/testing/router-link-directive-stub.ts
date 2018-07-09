import { Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[routerLink]',
    // tslint:disable-next-line:use-host-property-decorator
    host: { '(click)': 'onClick()' },
})

// tslint:disable-next-line:directive-class-suffix
export class RouterLinkDirectiveStub {
    // tslint:disable-next-line:no-input-rename
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}
