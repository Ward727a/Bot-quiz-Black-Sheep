const {getLang} = require("../../../Function/other/lang/getLangString");
const {setChannelQuiz} = require("../../../Function/Quiz/setChannelQuiz");
const {classQuiz} = require("../../../class/class_quiz");
const {classChannel} = require("../../../class/class_channel");

function qSetup(message, channel, fs, client, args){

    const everyone = message.guild.roles.everyone.id

    let quizPermSet = [];
    let quizToCreate = [new classChannel()];
    let dataJSON = fs.readFileSync('./model/quiz.json', 'utf-8');
    let allQuiz = JSON.parse(dataJSON);

    const {Quiz} = allQuiz;

    if(args.length !== 0){

        for(const i of Quiz){

            if(i.uuid === args[0]) {
                let u = new classChannel();
                let o = new classQuiz();

                u.name = i.title;
                u.uid = i.uuid;

                o.title = i.title;
                o.creatingStep = i.creatingStep;
                o.steps = i.steps;
                o.author = i.author;
                o.uuid = i.uuid;
                o.channelID = "";

                quizPermSet.push(o);
                quizToCreate.push(u);
            }

        }
    } else {
        for (const i of Quiz) {
            let u = new classChannel();
            let o = new classQuiz();

            u.name = i.title;
            u.uid = i.uuid;

            o.title = i.title;
            o.creatingStep = i.creatingStep;
            o.steps = i.steps;
            o.author = i.author;
            o.uuid = i.uuid;
            o.channelID = "";

            quizPermSet.push(o);
            quizToCreate.push(u);

        }
    }

    let nextIndex = 0;
    let i;

    for (const index in quizToCreate) {
        let a = index-1;

        i = quizToCreate[index];

        if(i.name !== "") {

            let roleData = {
                data: {
                    name: 'Participe ' + i.name,
                    color: 'GREEN'
                },
                reason: 'Necessaire pour le quiz ' + i.name
            }
            let roleDataEnd = {
                data: {
                    name: 'A fini ' + i.name,
                    color: 'RED'
                },
                reason: 'Necessaire pour le quiz ' + i.name
            }

            message.guild.roles.create(roleDataEnd).then(function (result){
                let p = quizPermSet[a];
                if(p === undefined){
                    console.error("ERREUR 9039939 = L'index " + a + " est indisponible...");
                    return;
                }

                p.roleIDEnd = result.id

                quizPermSet[a] = p
            })

            message.guild.roles.create(roleData).then(function(result){

                let name = result.name
                let roleID = result.id
                name = name.replace('Participe ', '')

                message.guild.channels.create(name,  {
                    type: 'category',
                    permissionOverwrites: [
                        {
                            id:result.id,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id:everyone,
                            deny: ['VIEW_CHANNEL'],
                        }
                    ],
                }).then(function (result) {

                    let channelID = result.id;

                    message.guild.channels.create('Leaderboard',{
                        type: 'text',
                        parent: result.id,
                        permissionOverwrites: [
                            {
                                id:roleID,
                                allow:['VIEW_CHANNEL'],
                                deny:"SEND_MESSAGES",
                            },
                            {
                                id:everyone,
                                deny:"VIEW_CHANNEL",
                            }
                        ]
                    }).then(function (result){

                        let o = quizPermSet[a];
                        if (o === undefined) {
                            console.error("ERREUR 9039939939 = L'index " + a + "est indisponible...");
                            return;
                        }

                        let channel = client.channels.cache.get(result.id);

                        channel.send('Classement du quiz :\n' +
                            ' 1 - \n' +
                            ' 2 - \n' +
                            ' 3 - ').then(function (u){

                            o.channelID = channelID;
                            o.roleID = roleID;
                            o.leaderBoardID = result.id;
                            o.leaderBoardMessage = u.id;

                            quizPermSet[a] = o;

                            nextIndex += 1;

                            if (quizToCreate.length - 1 === nextIndex) {

                                setChannelQuiz(quizPermSet);
                            }
                        })

                    })


                })
            });


        }
    }

    let lang = getLang('qsetup');
    channel.send(lang['setupStringSuccess'])
}

exports.qSetup = qSetup;