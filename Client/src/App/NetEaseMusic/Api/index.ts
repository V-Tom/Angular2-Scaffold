import {Http, Response} from '@angular/http'
import {Injectable} from '@angular/core'
import {suggestSearchApi, downloadMvApi} from './resource'

@Injectable()
export class NetEaseMusicApi {

    constructor(private Http: Http) {

    }

    /**
     * 模糊搜索
     * @param name
     * @returns {Promise<TResult|T>}
     */
    suggestSearch(name) {
        return this.Http
            .get(`${suggestSearchApi}/${name}`)
            .toPromise()
            .then((response: Response) => response.json())
            .then(({result}) => result)
            .catch(err => console.error(err))
    }

    /**
     * download mv
     * @param id
     */
    downloadMV(id) {
        return this.Http
            .post(`${downloadMvApi}/${id}`,{})
            .toPromise()
            .then((response: Response) => response.json())
            .then(({result}) => result)
            .catch(err => console.error(err))
    }
}