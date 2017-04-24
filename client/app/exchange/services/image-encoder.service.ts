import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ImageEncoderService {

  upload(formData: any) {
    const photo: any = formData.getAll('currencyImage')[0];
    const promises = this.getImage(photo)
                         .then(img => ({
                           id: 1,
                           originalName: photo.name,
                           fileName: photo.name,
                           url: img
                         }));

    return Observable.fromPromise(promises);
  }

  private getImage(file: File) {
    return new Promise((resolve, reject) => {
      const fReader = new FileReader();
      const img = document.createElement('img');

      fReader.onload = () => {
        img.src = fReader.result;
        resolve(this.getBase64Image(img));
      };

      fReader.readAsDataURL(file);
    });
  }

  private getBase64Image(img) {
    // const canvas = document.createElement('canvas');
    // canvas.width = img.width;
    // canvas.height = img.height;
    //
    // const ctx = canvas.getContext('2d');
    // ctx.drawImage(img, 0, 0);
    // return canvas.toDataURL('image/png');

    return img.src;

  }
}
