import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: `<ol class="breadcrumb">
                  <li><a routerLink="about" routerLinkActive="active" [routerLinkActiveOptions]={exact:true}>О компании</a></li>
                  <li><a routerLink="employees" routerLinkActive="active">Сотрудники</a></li>
               </ol>
<router-outlet></router-outlet>
`
})
export class AppComponent {
    
}
