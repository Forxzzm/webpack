import avatar from '../assets/img/coin-small.png';

var img = new Image();
img.src = avatar;

var root = document.getElementById('root');

new Promise(function(reslove,reject){
    reslove('成功')  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
}).then().then((data)=>{
    console.log('成功'+data)
},(err)=>{
    console.log('失败'+err)
})

root.append(img);