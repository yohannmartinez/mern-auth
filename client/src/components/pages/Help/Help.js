import React from "react"
import Navbar from "../../elements/Navbar/Navbar"
import './Help.scss'

class Help extends React.Component {

    scrollTo(path) {
        console.log(path)
        var element = document.getElementById(path);
        var headerOffset = 120;
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <div className="help">
                <Navbar />
                <div className="help__container">
                    <div className="help__tabIndex">
                        <span className="help__tabElement" onClick={() => { this.scrollTo("A_quoi_sert_Spoots_?") }}>A quoi sert Spoots ?</span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Connexion_/_Inscription") }}>Connexion / Inscription </span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Que_se_passe-t-il_quand_j'ajoute_un_spot_?") }}>Que se passe-t-il quand j'ajoute un spot ?</span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Je_ne_suis_pas_au_bon_endroit_sur_la_carte_?") }}>Je ne suis pas au bon endroit sur la carte ?</span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Les_avis") }}>Les avis </span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Où_vont_mes_données_?") }}>Où vont mes données ?</span>
                        <span className="help__tabElement" onClick={() => { this.scrollTo("Avec_quels_dispositifs_utiliser_Spoots_?") }}>Avec quels dispositifs utiliser Spoots ?</span>
                    </div>
                    <div>
                        <h1 className="help__title" id="A_quoi_sert_Spoots_?">A quoi sert Spoots ?</h1>
                        <p className="help__text">Pour tous les amateurs de sports extrêmes (Skate, Bmx, Trottinette, Roller), ne ratez plus un spot
                        autour de vous ! Spoots vous permet d'ajouter un spot quand bon vous semble et de les partager avec vos
                        confrères ! Tous les nouveaux spots sont les bienvenus, que ce soit le skatepark de la ville ou les 5m² de
                        béton lisse perdus au mileu du pacifique ! Vous pouvez même ajouter votre shop si vous en possédez un !
                    </p>

                        <h1 className="help__title" id="Connexion_/_Inscription">Connexion / Inscription</h1>
                        <p className="help__text">
                            La connexion / inscription sur spoots vous permet d'accéder à de nombreuses fonctionnalités comme l'ajout de spot,
                            d'avis, mais également d'avoir des notifications pour ne rien manquer à l'actu spoots !
                    </p>

                        <h1 className="help__title" id="Que_se_passe-t-il_quand_j'ajoute_un_spot_?">Que se passe-t-il quand j'ajoute un spot ?</h1>
                        <p className="help__text">
                            Quand vous crééz un spot, celui-ci s'ajoute à votre profil, mais il apparait également à la vue de tout le monde sur la carte !
                            Veillez à bien renseigner la description du spot pour donner un maximum de détails et donner envie aux riders d'aller
                            essayer votre spot ! la suppression d'un spot n'est pas faisable directement par un utilisateur, elle se fait automatiquement
                            si le spot n'est pas apprécié par la communauté ( trop grand nombres d'avis négatifs par rapport aux positifs ).
                    </p>

                        <h1 className="help__title" id="Je_ne_suis_pas_au_bon_endroit_sur_la_carte_?">Je ne suis pas au bon endroit sur la carte ?</h1>
                        <p className="help__text">
                            Lorsque vous apparaissez à un endroit qui ne correspond pas à votre localisation, veillez à bien avoir autorisé Spoots
                            à utiliser votre localisation. L'autre problème ne peut être que le fait d'utiliser un VPN et dans ce cas, vous devez simplement
                            vous déconnecter de celui-ci !
                    </p>

                        <h1 className="help__title" id="Les_avis">Les avis</h1>
                        <p className="help__text">
                            Les avis permettent à la communauté de savoir ce que vous avez pensé d'un spot, mettez-en un maximum, quand vous en visitez un ou quand vous êtes
                            déjà passé par celui-ci. Mettez des avis les plus objectifs possibles, et constructifs !
                    </p>

                        <h1 className="help__title" id="Où_vont_mes_données_?">Où vont mes données ?</h1>
                        <p className="help__text">
                            Les données ajoutées à Spoots, qu'elles soient relatives aux spots ou aux utilisateurs, sont utilisées pour l'application uniquement,
                            elles ne sortent en aucun cas de nos base de données et ne servent qu'au bon fonctionnement de Spoots.
                    </p>

                        <h1 className="help__title" id="Avec_quels_dispositifs_utiliser_Spoots_?">Avec quels dispositifs utiliser Spoots </h1>
                        <p className="help__text">
                            Spoots est suportés par Firefox, Chrome et Opéra que ce soit sur téléphone ou ordinateur.
                    </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help