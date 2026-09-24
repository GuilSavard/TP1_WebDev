/**
 * Classe Joueur
 * Représente un joueur avec son nom et son score.
 */
export class Joueur {

    #nom

    constructor(nom) {
        this.#nom = nom
    }


    /**
     * Compare le score avec un autre joueur.
     * @param {Joueur} autre
     * @returns {number} 1 si supérieur, -1 si inférieur, 0 si égalité
     */
    comparerA(autre) {
    }
    get nom(){
        return this.#nom
    }

    set nom(nom){

        this.#nom = nom
    }
}
