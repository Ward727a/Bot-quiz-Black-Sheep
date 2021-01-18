function qHelp(message){
    message.reply(`Voici les commandes pour les quiz :\n
            __Commandes basiques :__\n
            - \`!qjoin [UUID]\` : Vous fait rejoindre le questionnaire.\n
            - \`!qleave [UUID]\` : Vous fait quittez le questionnaire.\n
            __Commandes nécessitant un grade :__\n
            - \`!qlist\` : Liste tous les questionnaires avec leur UUID.\n
            - \`!newquestion [UUID]\` : Ajoute une question à un questionnaire.\n
            - \`!questionlist [UUID du quiz] (afficher les réponses ? - true/false)\` : Liste les questions d'un questionnaires avec leur UUID.\n
            - \`!qreset\` : Rénitialise toutes les catégories de tous les questionnaires.\n
            - \`!qsetup (uuid)\` : Créé les catégories nécessaires pour tous les questionnaires.\n
            - \`!newquiz\` : Création d'un nouveau questionnaire.\n
            - \`!qremove [UUID]\` : Supprime une questionnaire.\n
            [] = Obligatoire | () = Facultatif`).then(r => console.info(r));
}
exports.qHelp = qHelp;