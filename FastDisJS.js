//
// The MIT License
// 
// Copyright (c) 2019 FastDisJS
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

var __AntiSpam = {};

function getTime() {
  return Date.parse(new Date());
}

function commandize(cmd, callback) {
  return {
    cmd: cmd,
    eq: function(to, callback) {
      let temp = this.cmd.toString();

      if (typeof to == "string" && temp == to) {
      	callback();
      	return true;
      }

      for (var pos = 0; pos < to.length; pos ++) {
        if (temp == to[pos]) {
        	callback();
        	return true;
        }
      }

      return false;
    }
  };
}

module.exports.onMessage = function(msg, prefix, cooldown, callback) {
  // Just ignore annoying bots :)
  if (msg.author.bot) return false;

  // Anti-spam, ahhh
  var _as = __AntiSpam[msg.author.id];
  if ((getTime() - _as) < cooldown) return false;
  __AntiSpam[msg.author.id] = getTime();

  if (typeof prefix == "string") {
    // If this is just cat photo or message
    if (!msg.content.startsWith(prefix)) return true;

    // Parse message (magic)
    var args = msg.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift();

    // Else use user-provided callable callback
    callback(msg, commandize(command.toLowerCase()), args);
    return false;
  } else {
    for (var pos = 0; pos < prefix.length; pos++) {
      if (msg.content.startsWith(prefix[pos])) {
        // Parse message (magic)
        var args = msg.content.slice(prefix[pos].length).trim().split(/ +/g);
        var command = args.shift();
        callback(msg, commandize(command.toLowerCase()), args);
        return false;
      }
    }
  }

  return true;
}
