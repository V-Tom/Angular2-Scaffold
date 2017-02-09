import {Component, ViewEncapsulation} from "@angular/core"

@Component({
    selector: '#bootstrap',
    templateUrl: './App.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../../stylus/reset.stylus', './App.component.less']
})
export default class AppComponent {

    constructor() {

    }

    ngOnInit() {
        console.info('Initial App State');
    }

}
