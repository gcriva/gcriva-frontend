import { NgModule } from '@angular/core';

import { ScrollIntoViewDirective } from './scroll-into-view';

@NgModule({
    declarations: [
        ScrollIntoViewDirective
    ],
    exports: [
        ScrollIntoViewDirective
    ]
})
export class CustomDirectivesModule {}
