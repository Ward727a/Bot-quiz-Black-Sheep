const fs = require('fs');
const {quizJSON} = require("../../other/settingsFileVar");

function getLeaderboard(quizUID){

    let datas = quizJSON();

    for(let data of datas){

        if(data.uuid === quizUID){

            if(data.leaderBoard.length === 0){
                return '{"leaderboard":"null","leaderboardID":'+data.leaderBoardID+'}';
            }

            return '{"leaderboard":'+data.leaderBoard+',"leaderboardID":'+data.leaderBoardID+'}';

        }

    }

}

exports.getLeaderboard = getLeaderboard;