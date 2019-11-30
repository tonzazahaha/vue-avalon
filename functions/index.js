const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

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
                if (sh.val() === 3) {
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
                    if (fail === 0) {
                        currentMission.once('value', v => {
                            console.log('===================> ' + v.val() + '================>' + v.key);
                            missions.parent.child('missions/' + v.val() + '/result').set(1);
                        })
                        gamePhase.set(6);
                        countTotalSuccess.set(null);
                        countPlayer.once('value', players => {
                            players.forEach(player => {
                                countTotalSuccess.parent.child('players/' + player.key + '/voteSuccess').set(null);
                            })
                        })
                    }
                    else if (fail>0) {
                        currentMission.once('value', v => {
                            console.log('===================> ' + v.val() + '================>' + v.key);
                            missions.parent.child('missions/' + v.val() + '/result').set(0);
                        })
                        gamePhase.set(6);
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

exports.nextLeader = functions.database.ref('/rooms/{roomID}/gamePhase').onUpdate(async (snapshot) => {
  console.log(snapshot)
  if (snapshot.after._data === 2) {
    const playerRef = snapshot.after.ref.parent.child('players')
    const leaderRef = snapshot.after.ref.parent.child('leader')
    const gamePhaseRef = snapshot.after.ref.parent.child('gamePhase')
    const players = await playerRef.once('value')
    const leader = await leaderRef.once('value')
    var temp = [];
    let i = 0;
    let index = 0;
    players.forEach(e => {
        temp.push(e.key);
        if (temp[i] === leader.val()) {
            i = i + 1;
            index = i;
        }
        i = i + 1;
    });
    const next = index % temp.length
    await leaderRef.set(temp[next])
    await gamePhaseRef.set(3)
  }
  return null
})

// check if reject 3 times that mission is fail and next to new mission
exports.checkRejectCount = functions.database.ref('/rooms/{roomID}/rejectCount').onUpdate(async (snap) => {
    const rejectCount = snap.after.ref;
    const currentMission = rejectCount.parent.child('currentMission');
    const gamePhase = rejectCount.parent.child('gamePhase');

    const rejectCountData = await rejectCount.once('value');
    if (rejectCountData.val() === 3) {
        const currentMissionData = await currentMission.once('value');
        const mission = rejectCount.parent.child('missions/' + currentMissionData.val() + '/result')
        await mission.set(0) // set mission fail
        await rejectCount.set(0) // reset reject count

        if (currentMissionData.val() < 5) {
            // if not last mission then set to next mission
            await currentMission.transaction(current => {
                return (current || 0) + 1;
            })
            return await gamePhase.set(2);
        } else {
            // if last mission then set to last game phase for check team win
            return await gamePhase.set(6);
        }
    }
    console.log('less than 3');
    return null;
})

// check if game phase is 6 then check result who team win
exports.checkEndGame = functions.database.ref('/rooms/{roomID}/gamePhase').onUpdate(async (snap) => {
    const gamePhase = snap.after.ref;
    const gamePhaseData = await gamePhase.once('value');

    const currentMission = gamePhase.parent.child('currentMission');
    const currentMissionData = await currentMission.once('value');

    const missions = gamePhase.parent.child('missions');
    const missionsData = await missions.once('value');

    const players = gamePhase.parent.child('players');
    const playersData = await players.once('value');

    const win = gamePhase.parent.child('win');

    if (gamePhaseData.val() === 6) {
        // if phase 6
        if (currentMissionData.val() === 5) {
            // if last mission then calculate the team who win by counting the mission result
            let success = 0;
            let fail = 0;
            // count success fail
            missionsData.forEach(mission => {
                if (mission.val().result === 1) {
                    success += 1;
                } else if (mission.val().result === 0){
                    fail += 1;
                }
            })

            if (success > fail) {
                // if succes more than fail good team win
                return win.set('good');
            } else {
                // else bad team win
                return win.set('bad')
            }

        } else {
            // if not last mission then go to next mission and set phase to 2 (assign new leader)
            await currentMission.transaction(current => {
                return (current || 0) + 1;
            })
            // re selected team
            playersData.forEach(player => {
                players.child(player.key + '/isSelected').set(0);
            })

            return gamePhase.set(2);
        }
    }
    return null;
})
