const fs = require('fs');

function removeQuiz(uid, message){
    let data = JSON.parse(fs.readFileSync('./model/quiz.json', 'utf-8'))
    let tempData
    let index = 0

    let newData ='{\n'+'"Quiz":[\n'

    for(let quiz of data['Quiz']){


        console.log(quiz);
        console.log(quiz.uuid)
        console.log(uid);

        if(quiz.uuid === uid){

            let o = message.guild.channels.cache.find(channel => channel.id === quiz.channelID);
            if(o !== undefined){
                o.delete("!qremove par "+message.author.username+"("+message.author.id+")")
            }

        } else {
            index++
            tempData = JSON.stringify(quiz)
            if(index !== 1){
                newData+=',\n'
            }
            newData+=tempData
        }

        if(data['Quiz'].length === index+1){
            newData+='\n]\n}'
            fs.writeFileSync('./model/quiz.json', newData,'utf-8')
            return
        }


    }
    console.log("Quiz remove avec succès");
}

exports.removeQuiz = removeQuiz;