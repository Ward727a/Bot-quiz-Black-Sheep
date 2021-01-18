const fs = require('fs');

function getLeaderboard(quizUID){

    let datas = JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'));

    for(let data of datas['Quiz']){

        if(data.uuid === quizUID){

            if(data.leaderBoard.length === 0){
                return '{"leaderboard":"null","leaderboardID":'+data.leaderBoardID+'}';
            }

            return '{"leaderboard":'+data.leaderBoard+',"leaderboardID":'+data.leaderBoardID+'}';

        }

    }

}

exports.getLeaderboard = getLeaderboard;