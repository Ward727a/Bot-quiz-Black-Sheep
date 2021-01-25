class class_guild{

    constructor(uidGuild, canQuiz = false, canAdminServer = false) {

        this.uidGuild = uidGuild;
        this.canQuiz = canQuiz;
        this.canAdminServer = canAdminServer;

    }

    _uidGuild = ""
    _canQuiz = Boolean;
    _canAdminServer = Boolean;

    get uidGuild(){
        if(this._uidGuild !== undefined){
            return this._uidGuild;
        } else {
            throw new Error("\"uidGuild\" is undefined!");
        }
    }
    set uidGuild(set){
        if(typeof set === "string") {
            this._uidGuild = set;
        } else {
            throw new Error("\"uidGuild\" variables need to be a String type");
        }
    }

    get canQuiz(){
        if(this._canQuiz !== undefined){
            return this._canQuiz;
        } else {
            throw new Error("\"canQuiz\" is undefined!");
        }
    }
    set canQuiz(set){
        if(typeof set === "boolean") {
            this._canQuiz = set;
        } else {
            throw new Error("\"canQuiz\" need to be a Boolean type");
        }
    }

    get canAdminServer(){
        if(this._canAdminServer !== undefined){
            return this._canAdminServer;
        } else {
            throw new Error("\_canAdminServer\" is undefined!");
        }
    }
    set canAdminServer(set){
        if(typeof set === "boolean") {
            this._canAdminServer = set;
        } else {
            throw new Error("\"canAdminServer\" need to be a Boolean type");
        }
    }

}

exports.classGuild = class_guild;