const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.changeHead = functions.database.ref('/rooms/{roomID}/players/{playerID}').onDelete((snapshot, context) => {
  var id_delete = snapshot.key;
  var head = snapshot.ref.parent.parent.child('head');
  var playerRef = snapshot.ref.parent;
  return head.once('value', sh => {
    if (id_delete === sh.val()) {
      return playerRef.once('value', sp => {
        var temp = [];
        sp.forEach(e => {
          temp.push(e.key);
        });
        return head.set(temp[0])
      })
    } else {
      return null
    }
  })
})

exports.autoRemoveRoom = functions.database.ref('/rooms/{roomID}/players/{playerID}').onDelete((snapshot, context) => {
  var playerRef = snapshot.ref.parent;
  return playerRef.once('value', sp => {
    if (!sp.exists()) {
      return snapshot.ref.parent.parent.remove();
    }
    return null
  })
})
