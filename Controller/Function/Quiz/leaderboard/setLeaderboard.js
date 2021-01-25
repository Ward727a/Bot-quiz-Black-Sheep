const fs = require('fs');
const {quizJSON} = require("../../other/settingsFileVar");
const {logError} = require("../../LOG/logError");
const {reloadLeaderboard} = require("./reloadLeaderboard");


function setLeaderboard(quizUID, player, time, client, message){

    let datas = quizJSON();
    let newData = '{\n"Quiz":[\n';
    let index = 0;
    let subIndex = 0;
    let oldPlayer = '';
    let channelID = '';

    const playerID = player;

    for (let data of datas){


        if(index !== 0){
            newData+=",\n";
        }

        if(data.uuid === quizUID){

            channelID = data.leaderBoardID;

            if(data.leaderBoard.length !== 0) {
                for (let leaderboardData of data.leaderBoard) {

                    if(parseInt(time) < parseInt(leaderboardData.time)){

                        oldPlayer = leaderboardData.player;
                        leaderboardData = JSON.parse('{"player":"'+playerID+'", "time":'+time+'}');
                        data.leaderBoard[subIndex] = leaderboardData;

                        let channel = client.channels.cache.get(channelID);

                        let member = message.guild.members.cache.get(oldPlayer).user;

                        channel.send(message.author.username+" a battu le record de "+member.username+" !");

                        break;

                    } else if(data.leaderBoard.length!== 3) {
                        data.leaderBoard.push(JSON.parse('{"player":"'+playerID+'", "time":'+time+'}'));
                        break;
                    }

                    subIndex++

                }
            } else {

                data.leaderBoard.push(JSON.parse('{"player":"'+playerID+'", "time":'+time+'}'));

            }

            console.log('new data :');
            console.log(data);

            newData+=JSON.stringify(data);

        } else {
            newData+=JSON.stringify(data);
        }

        index++

    }
    newData+='\n]\n}';

    console.log('new leaderboard data =\n'+newData);

    fs.writeFile('./model/JSON/quiz.json', newData, function (err){
        if(err) {
            logError(err)
            throw err;
        }

        reloadLeaderboard(channelID, message, client);
    });


}

exports.setLeaderboard = setLeaderboard;