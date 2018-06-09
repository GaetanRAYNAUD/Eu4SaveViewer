import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  file: File;
  fileText: Blob;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = () => {
        console.log(reader.result.toLocaleString().substr(0, 100));
        this.fileText = reader.result;
      }
    }
  }

  onSubmit() {
    let form = new FormData();

    console.log(this.uploadForm.get('file'));
    form.append('file', this.file);
    form.append('name', this.uploadForm.get('name').value);

    console.log(form.get('file'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Encoding':  'gzip'
      })
    };

/*    this.http.post('http://localhost:3000/upload', form).subscribe(*/
    this.http.post('https://pure-falls-84843.herokuapp.com/upload', form).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
