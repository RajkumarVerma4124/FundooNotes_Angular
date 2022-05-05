import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = environment.baseurl;
  constructor(private httpClient: HttpClient) { }

  postService(url: string, reqData: any, token: boolean = false, httpOptions: any) {
    return this.httpClient.post(this.baseurl + url, reqData, token && httpOptions);
  }
}
