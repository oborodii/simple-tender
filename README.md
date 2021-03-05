# Simple Tender 1.0

**Simple Tender 1.0** is a real-time web application written in Angular/TypeScript/HTML/SCSS. 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3. 
Also used 
[Angular Material 11](https://material.angular.io/), 
[AngularFire 6](https://github.com/angular/angularfire),
[ngx-translate 13](http://www.ngx-translate.com/),
[Bootstrap 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/), 
etc.

Google Firebase Real-time Database is used as a backend and as a hosting.

Project on GitHub: [https://github.com/aborodij/simple-tender](https://github.com/aborodij/simple-tender)

## Demo
[Go to **Simple Tender 1.0** app demo](https://simpletender-aa98d.web.app/)

Sign up to create your tender or place a bet on an existing one. Viewing the list of already added tenders, as well as bets for them, is available without authorization. The table of all tenders, a selected tender, all bids, including the best one are updated in real-time without the need to reload the page.

Bets can be placed on active tenders only. The creator cannot place bets on his tender, but he sees a list of all the bets of other participants in real-time.

Upon expiration of the authorization token, the application automatically updates it using the fresh token received earlier.

The application interface is available in Ukrainian and English.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
