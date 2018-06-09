import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
}
