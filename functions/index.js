const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.countApprove = functions.database.ref('/rooms/{roomID}/players/{playID}/voteApprove').onWrite(
    async (change) => {
        const collectionRef = change.after.ref.parent;
        const valueVote = change.after.ref; //voteApprove
        const countTotalApprove = collectionRef.parent.parent.child('countTotalApprove');
        valueVote.once('value', sh => {
            if (sh.val() === 1 || sh.val() === 0) {
                countTotalApprove.transaction((current) => {
                    return (current || 0) + 1;
                })
            }
            else {
                return null;
            }
        })
    }
)

exports.calculateVoteApprove = functions.database.ref('/rooms/{roomID}/countTotalApprove').onWrite(
    async (change) => {
        const countTotalApprove = change.after.ref;//countTotalApprove
        const countPlayer = countTotalApprove.parent.child('players');//players
        const gamePhase = countTotalApprove.parent.child('gamePhase');//gamephase
        const rejectCount = countTotalApprove.parent.child('rejectCount')
        countTotalApprove.once('value', sh => {
            countPlayer.once('value', bb => {
                if (sh.val() === bb.numChildren()) {
                    let approve = 0;
                    let reject = 0;
                    bb.forEach(gg => {
                        if (gg.val().voteApprove === 1) {
                            approve += 1;
                        }
                        else if (gg.val().voteApprove === 0) {
                            reject += 1;
                        }
                    })
                    if (approve > reject) {
                        gamePhase.set(5);
                        countTotalApprove.set(null);
                        rejectCount.set(0);
                        countPlayer.once('value', players => {
                            players.forEach(player => {
                                countTotalApprove.parent.child('players/' + player.key + '/voteApprove').set(null);
                            })
                        })
                    }
                    else if (approve <= reject) {
                        gamePhase.set(2);
                        countPlayer.once('value', players => {
                            players.forEach(player => {
                                countTotalApprove.parent.child('players/' + player.key + '/voteApprove').set(null);
                            })
                        })
                        countTotalApprove.set(null);
                        rejectCount.transaction((count) => {
                            return (count || 0) + 1;
                        })
                    }
                }
            })
        })
    }
)

exports.countSuccess = functions.database.ref('/rooms/{roomID}/players/{playID}/voteSuccess').onWrite(
    async (change) => {
        const collectionRef = change.after.ref.parent;
        const valueVoteSuccess = change.after.ref; //voteSuccess
        const countTotalSuccess = collectionRef.parent.parent.child('countTotalSuccess');
        valueVoteSuccess.once('value', sh => {
            if (sh.val() === 1 || sh.val() === 0) {
                countTotalSuccess.transaction((current) => {
                    return (current || 0) + 1;
                })
            }
            else {
                return null;
            }
        })
    }
)

exports.calculateVoteSuccess = functions.database.ref('/rooms/{roomID}/countTotalSuccess').onWrite(
    async (change) => {
        const countTotalSuccess = change.after.ref;//countTotalSuccess
        const countPlayer = countTotalSuccess.parent.child('players');//players
        const gamePhase = countTotalSuccess.parent.child('gamePhase');//gamephase
        const currentMission = countTotalSuccess.parent.child('currentMission');//curretMission
        const missions = countTotalSuccess.parent.child('missions');//missions
        countTotalSuccess.once('value', sh => {
            countPlayer.once('value', bb => {
                if (sh.val() === bb.numChildren()) {
                    let success = 0;
                    let fail = 0;
                    bb.forEach(gg => {
                        if (gg.val().voteSuccess === 1) {
                            success += 1;
                        }
                        else if (gg.val().voteSuccess === 0) {
                            fail += 1;
                        }
                    })
                    if (success === 5) {
                        missions.once('value', mission => {
                            mission.forEach(m => {
                                currentMission.once('value', v => {
                                    if(v.val() === m.parent.child('missions/' + m.key + '/result')) {
                                        m.parent.child('missions/' + m.key + '/result').set(1);
                                    }
                                })
                            })
                        })
                        currentMission.transaction((count) => {
                            return (count || 0) + 1;
                        })
                        gamePhase.transaction((count) => {
                            return (count || 0) + 1;
                        })
                        countTotalSuccess.set(null);
                        countPlayer.once('value', players => {
                            players.forEach(player => {
                                countTotalSuccess.parent.child('players/' + player.key + '/voteSuccess').set(null);
                            })
                        })
                    }
                    else if (fail>0) {
                        missions.once('value', mission => {
                            mission.forEach(m => {
                                currentMission.once('value', v => {
                                    if(v.val() === m.parent.child('missions/' + m.key + '/result')) {
                                        m.parent.child('missions/' + m.key + '/result').set(0);
                                    }
                                })
                            })
                        })
                        currentMission.transaction((count) => {
                            return (count || 0) + 1;
                        })
                        gamePhase.transaction((count) => {
                            return (count || 0) + 1;
                        })
                        countPlayer.once('value', players => {
                            players.forEach(player => {
                                countTotalApprove.parent.child('players/' + player.key + '/voteSuccess').set(null);
                            })
                        })
                        countTotalSuccess.set(null);
                    }
                }
            })
        })
    }
)

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
