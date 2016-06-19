import {Component} from '@angular/core';
import {ionicBootstrap} from '../../../../../src';


@Component({
  templateUrl: 'main.html'
})
class E2EPage {
  myValue = 'value';

  clicked() {
    console.log("clicked button");
  }
}

ionicBootstrap(E2EPage);
