
class class_hint{

    _uid="";
    _author="";
    _uidQuestion="";
    _content="";
    _penality="";
    _penalityString="";


    get uid() {
        return this._uid;
    }

    set uid(value) {
        this._uid = value;
    }

    get author() {
        return this._author;
    }

    set author(value) {
        this._author = value;
    }

    get uidQuestion() {
        return this._uidQuestion;
    }

    set uidQuestion(value) {
        this._uidQuestion = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }

    get penality() {
        return this._penality;
    }

    set penality(value) {
        this._penality = value;
    }

    get penalityString() {
        return this._penalityString;
    }

    set penalityString(value) {
        this._penalityString = value;
    }
}

exports.classHint = class_hint;