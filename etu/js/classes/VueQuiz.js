// =============================================================================
// Templates HTML (Constantes)
// =============================================================================

import {
    TEMPLATE_BADGE_JOUEUR,
    TEMPLATE_BIENVENUE, TEMPLATE_OPTION, TEMPLATE_QUIZ, TEMPLATE_RESULTAT,TEMPLATE_JOUEUR_RESULTAT
} from "../VuesDynamiques.js";
import {handleChoixDeReponse, handleDemarrer, handleQuestionSuivante, handleRecommancer} from "../evenements.js";
import {Quiz} from "./Quiz.js";
import {Joueur} from "./Joueur.js";

/**
 * Classe VueQuiz
 * Responsable de l'affichage dans le DOM.
 * Ne contient aucune logique de jeu.
 */
export class VueQuiz {
    #conteneur;
    #quiz;
    #nomsJoueurs = ['', ''];

    /**
     * @param {HTMLElement} conteneur - Élément racine qui accueille la vue
     * @param {Quiz} quiz - Le modèle Quiz
     */
    constructor(quiz) {
        this.#conteneur = document.getElementById('app');
        this.#quiz = quiz;
        quiz.surChangement = () => {
            this.affiche()
        };

    }

    // ---------- Getters & Setters ----------
    get nomsJoueurs() {
        return [...this.#nomsJoueurs];
    }

    set nomsJoueurs(nomJoueurs){
        this.#nomsJoueurs = nomJoueurs
    }

    get quiz() {
        return this.#quiz;
    }

    definirNomsJoueurs(p1, p2) {
        this.#nomsJoueurs = [p1, p2];
    }

    // ---------- Point d'entrée du rendu ----------
    affiche() {
        if (!this.#quiz.estDemarre) {
            this.#afficheBienvenue();
        } else if (this.#quiz.estTermine) {
            this.#afficheResultat();
        } else {
            this.#afficheQuiz();
        }
    }

    // ---------- Écran d'accueil ----------
    #afficheBienvenue() {
        this.#conteneur.innerHTML = TEMPLATE_BIENVENUE;
        document.getElementById('startBtn').addEventListener('click', (ev) => {
            handleDemarrer(ev, this)
        });

        const champJoueur1 = this.#conteneur.querySelector('#player1');
        const champJoueur2 = this.#conteneur.querySelector('#player2');

        if (champJoueur1 && this.#nomsJoueurs[0]) {
            champJoueur1.value = this.#nomsJoueurs[0];
        }
        if (champJoueur2 && this.#nomsJoueurs[1]) {
            champJoueur2.value = this.#nomsJoueurs[1];
        }
    }

    // ---------- Écran de quiz ----------
    #afficheQuiz() {

        let b = this.#nomsJoueurs
        let q = this.#quiz.questionActuelle;
        let estRepondu = this.quiz.estRepondu;
        let reponseChoisie = this.quiz.reponseChoisie;





        let htmlBadges = '';


        for (let i = 0; i < b.length; i++) {
            htmlBadges += '' + TEMPLATE_BADGE_JOUEUR(this.#quiz.joueurActuel === this.#quiz.joueurs[i], this.#quiz.joueurs[i].nom, this.#quiz.joueurs[i].score);
        }


        let htmlOptions = '';
        for (let i = 0; i < q.options.length; i++) {
            const option = q.options[i];
            const classes = this.#determinerClasseAppropriee(i, q, estRepondu, reponseChoisie);
            htmlOptions += '' + TEMPLATE_OPTION(classes, i, q.lettreA(i), option);
        }



        this.#conteneur.innerHTML = TEMPLATE_QUIZ(htmlBadges,this.quiz.questionActuelle.question,htmlOptions);




        let indexchanger
        this.#conteneur.innerHTML = TEMPLATE_QUIZ(htmlBadges, this.quiz.questionActuelle.question, htmlOptions);
        let htmlBadgesRepondu = "";
        let htmlOptionsRepondu = "";
        document.getElementById('id-option-grid').addEventListener('click', (ev) => {



            reponseChoisie = handleChoixDeReponse(ev, this.#quiz)
            if (this.#quiz.estTermine) return;
            estRepondu = !estRepondu
            for (let i = 0; i < q.options.length; i++) {
                const option = q.options[i];
                const classes = this.#determinerClasseAppropriee(i, q, estRepondu, reponseChoisie);
                htmlOptionsRepondu += '' + TEMPLATE_OPTION(classes, i, q.lettreA(i), option);
            }
            for (let i = 0; i < b.length; i++) {
                htmlBadgesRepondu += '' + TEMPLATE_BADGE_JOUEUR(this.#quiz.joueurActuel === this.#quiz.joueurs[i], this.#quiz.joueurs[i].nom, this.#quiz.joueurs[i].score);
            }

            this.#conteneur.innerHTML = TEMPLATE_QUIZ(htmlBadgesRepondu, this.quiz.questionActuelle.question, htmlOptionsRepondu);
            //mettre resultat dans html otions
            document.getElementById('nextBtn').addEventListener('click',
                (ev) => {
                    handleQuestionSuivante(ev, this.#quiz)
                }
            );

        });

        let btnSuivant = document.querySelector("#nextBtn")

        btnSuivant.setAttribute("disabled", "")


    }





    // ---------- Écran de résultat ----------
    #afficheResultat() {
        const gagnant = this.#quiz.gagnant;

        let htmlJoueurs = '';
        for (const j of this.#quiz.joueurs) {
            htmlJoueurs += TEMPLATE_JOUEUR_RESULTAT(j.nom, j.score, j === gagnant);
        }

        this.#conteneur.innerHTML = TEMPLATE_RESULTAT(htmlJoueurs, `🏆 ${gagnant.nom} remporte la partie !`);

        document.getElementById('restartBtn').addEventListener('click', (ev) => {
            handleRecommancer(ev, this.#quiz);
        });
    }

    // ---------- Utilitaires ----------
    /**
     * Détermine les classes CSS d'une option en fonction de l'état de la question.
     */
    #determinerClasseAppropriee(index, question, estRepondu, reponseChoisie) {
        const classes = ['option-btn'];
        let retClasses = "";

        if (!estRepondu) {
            retClasses = classes.join(' '); // pour retirer le tableau
        } else {
            classes.push('disabled');
            if (index === question.indexCorrect) {
                classes.push('correct');
            } else if (index === reponseChoisie) {
                classes.push('incorrect');
            }
            if (index === reponseChoisie) {
                classes.push('selected');
            }
            retClasses = classes.join(' '); // pour retirer le tableau et joindre les classes sélectionnées
        }

        return retClasses;

    }
}
