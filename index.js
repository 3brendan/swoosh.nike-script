// Must install Node.JS and it's modules
// Locate where the folder is located with code & proxies.txt (line 7)
// Some snippets of code were borrowed from users in GitHub
// Not fully tested, may need a restart/fixing at times. The only necessary variables to edit is the location of your script and catchall. (lines 9 & 11)
// [STATUS : OK] = WORKING | Anything else may mean error in code/proxy issue.

const request = require("request");
const fs = require('fs');

var array = fs.readFileSync('/pathing/to/your/file/proxies.txt').toString().replace(/\r/g, '').split('\n'); // ex ('/Users/brendan/Desktop/swooshnikescript/proxies.txt')

var catchall = 'catchallgoeshere.com' // Catchall goes here, without the @
var delay = 5 // In seconds
let count = 0 // Ignore

let formatProxy = function(proxy) {

  if (proxy && ['localhost', ''].indexOf(proxy) < 0) {

    proxy = proxy.replace(' ', '_');
    const proxySplit = proxy.split(':');

    if (proxySplit.length > 3) {
      return "http://" + proxySplit[2] + ":" + proxySplit[3] + "@" + proxySplit[0] + ":" + proxySplit[1];
    } else {
      return "http://" + proxySplit[0] + ":" + proxySplit[1];
    }
  } else {
    return undefined;
  }
}

function getproxy() {

  if (array.length == 0) {
    var proxy = ''
    return proxy;
  } else {
    var prox = array[Math.floor(Math.random() * Math.floor(array.length))]
    return formatProxy(prox)
  }
}

function makeid(length) {

  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}

setInterval(function() {

request({

  url: `https://6ntsotoqbe.execute-api.us-west-2.amazonaws.com/Prod/register`,
  method: 'POST',
  proxy: getproxy(),
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://www.swoosh.nike/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  body: `{\"email\":\"${makeid(10)}@${catchall}\",\"context\":\"teaser\"}`,
  method: "POST"


}, function(error, response, body) {

  var date = new Date();
  count++;
  console.log('[' + count + '] ' + '[' + ((`${(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())}`)) + '] ' + '[STATUS : ' + (body) + '] ' + (`${makeid(10)}`) + `@${catchall}`)

})
}, delay * 1000)