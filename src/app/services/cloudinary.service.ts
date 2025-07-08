import { Injectable } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {


  constructor() {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dxqfotao4'
      }
    });
  }
}
