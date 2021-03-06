import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { MatSnackBar } from '@angular/material';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() headerText: string;

  externalInput: string;
  externalInputValid: boolean;
  previewUploadFile: any;
  uploadFile: File;
  uploadingFile: boolean;
  uploadProgress: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  image_url: string;

  constructor(private firestore: AngularFireStorage, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.externalInput = '';
    this.externalInputValid = false;
    this.uploadingFile = false;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  }

  startUploadImage(): Promise<string> {
    if (this.externalInput.length > 0 || this.uploadFile) {
      if (this.uploadFile) {
        this.ref = this.firestore.ref(this.title);
        this.task = this.ref.child('image').put(this.uploadFile);

        this.uploadProgress = this.task.snapshotChanges().pipe(
          map(s =>
            (s.bytesTransferred / s.totalBytes) * 100
          )
        );

        return new Promise((resolve) => {
          this.task.task.then(
            (snap) => {
              this.openSnackBar();

              snap.ref.getDownloadURL().then(
                (url) => {
                  resolve(<string> url);
                }
              )
            }
          )
        });
      } else {
        return new Promise(resolve => {
          resolve(this.externalInput);
        });
      }
    } else {
      return new Promise(resolve => {
        resolve(null);
      });
    }
  }

  uploadImage(event) {
    if (event.srcElement.files && event.srcElement.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.previewUploadFile = event.target.result;
        this.uploadingFile = true;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.uploadFile = event.target.files[0];
    }
  }

  visualizeExternalInput() {
    this.externalInputValid = false;

    if (this.externalInput.match('(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')) {
      this.externalInputValid = true;
    }
  }

  openSnackBar() {
    this.snackBar.open('Image uploadée !', null, {
      duration: 2000,
    });
  }
}
