import {Component, ViewEncapsulation} from "@angular/core"
import {NetEaseMusicServer} from './NetEaseMusic.server'

@Component({
    selector: '.NetEaseMusic',
    templateUrl: 'NetEaseMusic.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['NetEaseMusic.component.less']
})

export class NetEaseMusicComponent {

    constructor(private NetEaseMusicServer: NetEaseMusicServer) {
        this.subscribeAll()
    }

    private suggestSearchResult = []
    private suggestSearchKey = undefined
    private mvUrl = undefined
    private mvUrlCache = undefined

    /**
     * subscribeAll
     */
    private subscribeAll() {
        this.subscribeSuggestSearch()
        this.subscribeDownloadMv()
    }

    /**
     * subscribeSuggestSearch
     */
    private subscribeSuggestSearch() {
        this.NetEaseMusicServer.suggestSearch$.subscribe(({result:{mvs}}) => {
            this.suggestSearchResult = mvs || []
        }, err => console.error(err))
    }

    /**
     * subscribeDownloadMv
     * @param id
     */
    private subscribeDownloadMv() {
        this.NetEaseMusicServer.downLoadMv$.subscribe(
            () => this.mvUrl = `http://127.0.0.1:9999/api/v1/mv/stream/${this.mvUrlCache}`,
            err => console.error(err))
    }

    /**
     * suggestSearch
     * @param search
     */
    private suggestSearch(search: string) {
        this.suggestSearchKey = search
        this.NetEaseMusicServer.suggestSearch(search)
    }

    /**
     * play mv
     * @param id
     */
    private playMv(id: Number) {
        this.mvUrlCache = id
        this.NetEaseMusicServer.downloadMv(id)
    }

}
