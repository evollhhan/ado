!function(n){function t(c){if(e[c])return e[c].exports;var u=e[c]={i:c,l:!1,exports:{}};return n[c].call(u.exports,u,u.exports,t),u.l=!0,u.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,c){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:c})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="",t(t.s=0)}([function(module,exports,__webpack_require__){"use strict";eval("\n\nfunction msg(text) {\n  var p = document.createElement('p');\n  p.textContent = text;\n  document.body.appendChild(p);\n}\n\ntry {\n  var audio = document.createElement('audio');\n  audio.addEventListener('canplay', function () {\n    msg('load realy');\n    audio.play().then(function () {\n      msg('success');\n    }).catch(function (e) {\n      msg('error!');\n      alert(e);\n    });\n  });\n  msg('start load');\n  audio.src = 'music.mp3';\n} catch (e) {\n  alert(e.message);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbmRleC5qcz9hODU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbXNnKHRleHQpIHtcbiAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gIHAudGV4dENvbnRlbnQgPSB0ZXh0O1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xufVxuXG50cnkge1xuICB2YXIgYXVkaW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgZnVuY3Rpb24gKCkge1xuICAgIG1zZygnbG9hZCByZWFseScpO1xuICAgIGF1ZGlvLnBsYXkoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIG1zZygnc3VjY2VzcycpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBtc2coJ2Vycm9yIScpO1xuICAgICAgYWxlcnQoZSk7XG4gICAgfSk7XG4gIH0pO1xuICBtc2coJ3N0YXJ0IGxvYWQnKTtcbiAgYXVkaW8uc3JjID0gJ211c2ljLm1wMyc7XG59IGNhdGNoIChlKSB7XG4gIGFsZXJ0KGUubWVzc2FnZSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")}]);