
import './assets/css/common.scss'
import './assets/css/test.scss'
import avatar from './assets/img/coin.png';
import avatar1 from './assets/img/coin-small.png';

var img = new Image();
img.src = avatar;
var img1 = new Image();
img1.src = avatar1;

var root = document.getElementById('root');
root.append(img);
root.append(img1);

console.log('call me zhang')