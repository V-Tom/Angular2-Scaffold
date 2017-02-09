import {NgModule} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {HttpModule} from '@angular/http';

import AppComponent from "./App.component"

import {NetEaseMusicComponent} from '../NetEaseMusic'
/**
 * services
 */
import {NetEaseMusicServer} from '../NetEaseMusic/NetEaseMusic.server'
import {NetEaseMusicApi} from '../NetEaseMusic/Api'

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        NetEaseMusicComponent
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        NetEaseMusicServer,
        NetEaseMusicApi
    ]
})
export class AppModule {
    constructor() {

    }
}