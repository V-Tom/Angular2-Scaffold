import {Injectable} from '@angular/core'

import {Subject}    from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'

import {NetEaseMusicApi} from './Api'

@Injectable()
export class NetEaseMusicServer {
    private searchSubject = new Subject<string>()

    public suggestSearch$ = this.searchSubject
        .asObservable()
        .debounce(() => Observable.timer(500))
        .filter(search => Boolean(search))
        .switchMap(name => Observable.fromPromise(this.NetEaseMusicApi.suggestSearch(name)))

    private downLoadMvSubject = new Subject<number>()

    public downLoadMv$ =
        this.downLoadMvSubject
            .asObservable()
            .switchMap(id => Observable.fromPromise(this.NetEaseMusicApi.downloadMV(id)))

    constructor(private NetEaseMusicApi: NetEaseMusicApi) {

    }


    suggestSearch(search: string) {
        this.searchSubject.next(search)
    }

    downloadMv(id: number) {
        this.downLoadMvSubject.next(id)
    }
}