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

    constructor({question, options, correct}) {
        this.#question = question;
        this.#options = options;
        this.#correct = correct;
    }

    /**
     * Retourne la lettre correspondant à un index (A, B, C, D…).
     * @param {number} index
     * @returns {string}
     */
    lettreA(index) {
    }

    get question(){
        return this.#question
    }
    get options(){
        return this.#options
    }
    get correct(){
        return this.#correct
    }

}