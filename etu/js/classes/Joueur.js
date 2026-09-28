/**
 * Classe Joueur
 * Représente un joueur avec son nom et son score.
 */
export class Joueur {

    #nom
    #score

    constructor(nom) {
        this.#nom = nom
        this.#score = 0;
    }


    /**
     * Compare le score avec un autre joueur.
     * @param {Joueur} autre
     * @returns {number} 1 si supérieur, -1 si inférieur, 0 si égalité
     */
    comparerA(autre) {
        let comp
        if (this.#score > autre.#score){
            comp = 1;
        }
        else if(this.#score < autre.#score){
            comp = -1;
        }
        else {
            comp = 0;
        }
        return comp;

    }
    get nom(){
        return this.#nom;
    }

    set nom(nom){

        this.#nom = nom;
    }
    get score(){
        return this.#score;
    }

    set score(score){
        this.#score = score;
    }

    ajouterPoint(){
        this.#score += 1;
    }

    reinitialiser(){
        this.#score = 0;
    }



}
