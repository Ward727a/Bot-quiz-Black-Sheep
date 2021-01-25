const fs = require('fs');
const {quizJSON} = require("../../other/settingsFileVar");

function reloadLeaderboard(leaderboardID, message, client){

    let datas = quizJSON();
    let newMessages = 'Classement du quiz :\n';
    let index = 1;

    console.log('reload leaderboard...');

    for(let data of datas){

        if(data.leaderBoardID === leaderboardID){

            console.log('leaderboard found');

            let leaderboardChannel = client.channels.cache.get(data.leaderBoardID);

            leaderboardChannel.messages.fetch(data.leaderBoardMessage).then(function(r){

                console.log('editing message...');
                console.log(data.leaderBoard.length);

                for(let leaderboard of data.leaderBoard){

                    console.log('getting leaderboard data');
                    console.log(leaderboard.player);

                    if(leaderboard.time !== '' || leaderboard.time !== null) {
                        let member = message.guild.members.cache.get(leaderboard.player).user;

                        let totalminutes = leaderboard.time;

                        let month = 0;
                        let day = 0;
                        let hours = 0;
                        let minutes;

                        while (totalminutes >= 60){
                            totalminutes-=60;
                            hours+=1;
                            if(hours>=24){
                                hours = 0;
                                day+=1;
                                if(day/1440 >= 1){
                                    day = 1;
                                    month+=1;
                                }
                            }
                        }
                        if(totalminutes < 0){
                            minutes = 0;
                        } else {
                            minutes = totalminutes;
                        }

                        newMessages += ' ' + index + ' - ' + member.username + ' ['+month+' mois / '+day+' jours] ('+hours+'h '+minutes+'m)\n';
                    } else {
                        newMessages += ' ' + index + ' - \n';
                    }
                    index++;
                }

                r.edit(newMessages).then(r => console.info(r));
                console.log('message edited ...');

            })

        }

    }

}

exports.reloadLeaderboard = reloadLeaderboard;