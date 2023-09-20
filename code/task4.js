"use strict";

function parseUrl(url) {
    let regexp = /^((?:(\w+:)\/\/)?(((?:[\w-]+\.)+\w{2,})(?::(\d+))))?([\/\w.-]*)*(?:\?([^#]*))?(#.*)?$/;
    let match = regexp.exec(url);
    let res = {};
    res.href = match[0] || "";
    res.hash = match[8] || "";
    res.port = match[5] || "";
    res.host = match[3] || "";
    res.protocol = match[2] || "";
    res.hostname = match[4] || "";
    res.pathname = match[6] || "";
    res.origin = match[1] || "";
    return res;
}

let a = parseUrl('http://sys.it-co.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');

console.log( a.href == "http://sys.it-co.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
console.log( a.hash == "#foo" )
console.log( a.port == "8080" )
console.log( a.host == "sys.it-co.ru:8080" )
console.log( a.protocol == "http:" )
console.log( a.hostname == "sys.it-co.ru" )
console.log( a.pathname == "/do/any.php" )
console.log( a.origin == "http://sys.it-co.ru:8080" )