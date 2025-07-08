import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {fill} from '@cloudinary/url-gen/actions/resize';
import {CloudinaryModule} from '@cloudinary/ng';

@Component({
  selector: 'app-page',
  imports: [
    CloudinaryModule
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit , OnChanges{
  img!: CloudinaryImage;
  @Input()
  route: string = '1-1-1';
  cld: Cloudinary;
  constructor() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: 'dxqfotao4'
      }
    });
  }

  ngOnInit(): void {
    this.renderPage()
  }
  ngOnChanges(changes: SimpleChanges) {
    this.renderPage()
  }
  renderPage(): void {
    this.img = this.cld.image(this.route);
    this.img.resize(fill().width(250));
  }

}
