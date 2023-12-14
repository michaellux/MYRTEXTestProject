import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `<ol class="breadcrumb">
                  <li><a routerLink="about">О компании</a></li>
                  <li><a routerLink="employees">Сотрудники</a></li>
               </ol>
<router-outlet></router-outlet>
`
})
export class AppComponent {
    
}
