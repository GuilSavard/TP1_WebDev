/**
 * Classe Question
 * Représente une question de quiz avec ses options et la bonne réponse.
 */
export class Question {

    /**
     * @param {Object} data - Données de la question
     * @param {string} data.question - L'intitulé de la question
     * @param {string[]} data.options - Tableau des 4 propositions
     * @param {number} data.correct - Index de la bonne réponse (0..3)
     */


    #question = "";
    #options = [""]
    #correct;
    #enonce;
    #indexCorrect;

    constructor({question, options, correct}) {
        this.#question = question;
        this.#options = options;
        this.#indexCorrect = correct;
        this.#correct = correct
    }

    /**
     * Retourne la lettre correspondant à un index (A, B, C, D…).
     * @param {number} index
     * @returns {string}
     */
    lettreA(index) {
        let choix = "";
        switch (index){
            case (0):
                choix = "A."
                break
            case (1):
                choix = "B."
                break
            case (2):
                choix = "C."
                break
            case (3):
                choix = "D."
                break



        }


        return choix;
    }

    estCorrect(index) {
        let cor = false;
        if(index === this.#indexCorrect){
            cor = true;
        }
        return cor;
    }

    get question() {
        return this.#question
    }

    get options() {
        return this.#options
    }

    get indexCorrect() {
        return this.#correct
    }

}