const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.countApprove = functions.database.ref('/rooms/{roomID}/players/{playID}/voteApprove').onWrite(
    async (change) => {
        const collectionRef = change.after.ref.parent;
        const valueVote = change.after.ref; //voteApprove
        const countTotal = collectionRef.parent.parent.child('countTotal');
        valueVote.once('value', sh => {
            if (sh.val() === 1 || sh.val() === 0) {
                countTotal.transaction((current) => {
                    return (current || 0) + 1;
                })
            }
            else {
                return null;
            }
        })
        console.log('Counter updated.');
    }
)

exports.calculateVote = functions.database.ref('/rooms/{roomID}/players/{playID}/voteApprove').onUpdate(
    async (change) => {
        const voteApprove = change.after.ref;//voteApprove
        const countTotal = voteApprove.parent.parent.parent.child('countTotal');//countTotal
        const countPlayer = voteApprove.parent.parent.parent.child('players');//players
        countTotal.once('value', sh => {
            countPlayer.once('value', bb => {
                if (sh.val() == bb.numChildren()) {
                    let approve = 0;
                    let reject = 0;
                    bb.forEach(gg => {
                        // console.log(gg);
                        if (gg.val().voteApprove == 1) {
                            approve += 1;
                        }
                        else {
                            reject += 1;
                        }
                    })
                    if (approve > reject) {
                        countTotal.parent.child('gamePhase').set(5);
                    }
                    else if (approve <= reject) {
                        rejectCount += 1;
                        countTotal.parent.child('countTotal').set(null);
                        countTotal.parent.child('gamePhase').set(2);
                    }
                }
            })
        })
    }
)