const path = require('path');

module.exports = {
  HTML:function(title, list, body, control, authStatus){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${authStatus}
      ${list}
      ${control}
      <h1>${title}</h1>
      ${body}
    </body>
    </html>
    `;
  },list:function(filelist){
    var list = '<ul style="list-style: none;">';
    var i = 0;
    filelist = filelist ?? ''
    while(i < filelist.length){
      var title = filelist[i].title
      var id = filelist[i].id
      list = list + `<li><a href="/topic/${id}" >${title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
}
