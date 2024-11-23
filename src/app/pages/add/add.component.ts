import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import Upload from '@model/upload.class';
import ApiService from '@services/api.service';
import UserService from '@services/user.service';

declare var EXIF: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    RouterLink,
  ],
})
export default class AddComponent implements OnInit {
  private us: UserService = inject(UserService);
  private as: ApiService = inject(ApiService);
  private router: Router = inject(Router);

  name: string = '';
  list: Upload[] = [];
  currentUploading: number = 0;
  uploading: boolean = false;
  uploaded: number[] = [];
  tags: string = '';

  ngOnInit(): void {
    this.us.loadLogin();
    if (!this.us.logged) {
      this.router.navigate(['/login']);
    } else {
      this.name = this.us.user.name;
    }
  }

  addNew(): void {
    const obj = document.getElementById('add-files');
    obj && obj.click();
  }

  onFileChange(event: Event): void {
    const target = <HTMLInputElement>event.target;
    if (target !== null && target.files !== null && target.files.length > 0) {
      const files: FileList = target.files;
      for (let i: number = 0; i < files.length; i++) {
        this.readFile(files[i]);
      }
    }
  }

  base64ToArrayBuffer(base64: string): ArrayBufferLike {
    base64 = base64.replace(/^data:([^;]+);base64,/gim, '');
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i: number = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  readFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const exif = EXIF.readFromBinaryFile(
        this.base64ToArrayBuffer(reader.result as string)
      );
      //alert(JSON.stringify(exif));
      //console.log(exif);
      const result = reader.result as string;
      this.list.push(
        new Upload(
          result,
          exif.DateTimeOriginal ? exif.DateTimeOriginal : '',
          JSON.stringify(exif)
        )
      );
      //console.log(this.list);
      //alert(JSON.stringify(this.list.map(x => x.toInterface())));
      (<HTMLInputElement>document.getElementById('add-files')).value = '';
    };
  }

  deletePhoto(ind: number): void {
    const conf = confirm('¿Estás seguro de querer borrar esta foto?');
    if (conf) {
      this.list.splice(ind, 1);
    }
  }

  start(): void {
    this.currentUploading = 0;
    this.uploading = true;
    this.uploadSelected();
  }

  calculateUploadWidth(current: number): number {
    return current * 0.9;
  }

  uploadSelected(): void {
    this.list[this.currentUploading].status = 'uploading';
    this.as
      .upload(this.list[this.currentUploading].toInterface(), this.us.user.id)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.list[this.currentUploading].uploaded = this.calculateUploadWidth(
            Math.round((100 * event.loaded) / event.total)
          );
        } else if (event instanceof HttpResponse) {
          if (event.body.status === 'ok') {
            // Añado id de la foto añadida a la lista
            this.uploaded.push(event.body.id);
            // Marco la foto como subida
            this.list[this.currentUploading].status = 'done';

            this.currentUploading++;
            if (this.currentUploading > this.list.length - 1) {
              this.updateTags();
            } else {
              this.uploadSelected();
            }
          } else {
            alert('¡Ocurrió un error al subir la foto!');
            this.list[this.currentUploading].status = 'no';
          }
        }
      });
  }

  updateTags(): void {
    if (this.tags !== '') {
      this.as.updateTags(this.uploaded, this.tags).subscribe((result) => {
        if (result.status == 'ok') {
          this.uploadDone();
        } else {
          alert('¡Ocurrió un error al actualizar las etiquetas!');
        }
      });
    } else {
      this.uploadDone();
    }
  }

  uploadDone(): void {
    alert('Fotos subidas');
    this.list = [];
    this.currentUploading = 0;
    this.uploaded = [];
    this.tags = '';
    this.uploading = false;
  }
}
