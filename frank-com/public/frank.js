//AJAX:
function ajax(method, url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, url);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject(request);
                }
            }
        };
        request.send();
    });
}
ajax("get", "http://qq.com:8888/friends.json").then(response => {
    console.log("这是 AJAX");
    console.log(response);
});

// const request = new XMLHttpRequest()
// request.open('GET', 'http://qq.com/friends.json')
// request.onreadystatechange = () => {
//     if (request.readyState === 4 && request.status === 200) {
//         console.log(request.response)
//     }
// }
// request.send()
// 以上请求会被浏览器禁止

//JSONP:
// const random = 'frankJSONPCallbackName' + Math.random()
// console.log(random)
// window[random] = (data) => {
//     console.log(data)
// }
// const script = document.createElement('script')
// script.src = `http://qq.com:8888/friends.js?functionName=${random}`
// script.onload = () => {
//     script.remove()
// }
// document.body.appendChild(script)

// //封装JSONP:
function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = 'frankJSONPCallbackName' + Math.random()
        window[random] = (data) => {
            resolve(data)  //成功时
        }
        const script = document.createElement("script")
        script.src = `${url}?callback=${random}`
        script.onload = () => {
            script.remove()
        }
        script.onerror = () => {
            reject()  //失败时
        }
        document.body.appendChild(script)
    })
}
//使用封装JSONP:
jsonp('http://qq.com:8888/friends.js')
    .then((data) => {
        console.log(data)
    })