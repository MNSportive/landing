import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '480px',
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  overflow: 'scroll',
  maxHeight: '80%',
  p: 4,
}

const modalVariations = {
  infos: {
    title: 'Infos & Contact',
    content: (
      <div class="modal-content">
        <article>
          <section>
            <header>
              <h1>Informations de l'Entreprise</h1>
            </header>
            <dl>
              <div>
                <dt>Nom commercial</dt>
                <dd>MAYOTTE NUTRITION SPORTIVE</dd>
              </div>
              <div>
                <dt>Adresse de l'établissement</dt>
                <dd>
                  <address>
                    Place Mariage
                    <br />
                    Bal N19 - CS 73904
                    <br />
                    97600 Mamoudzou
                  </address>
                </dd>
              </div>
              <div>
                <dt>Immatriculation au RCS, numéro</dt>
                <dd>941 847 907 R.C.S. Mamoudzou</dd>
              </div>
              <div>
                <dt>Identifiant SIREN</dt>
                <dd>941 847 907</dd>
              </div>
              <div>
                <dt>Identifiant SIRET du siege</dt>
                <dd>941 847 907 00016</dd>
              </div>
              <div>
                <dt>Catégorie juridiqe</dt>
                <dd>Entrepreneur individuel</dd>
              </div>
              <div>
                <dt>APE</dt>
                <dd>47.29Z</dd>
              </div>
              <div>
                <dt>TVA</dt>
                <dd>FR 819 418 47907</dd>
              </div>
              <div>
                <dt>Coordonnées de contact</dt>
                <dd>
                  <a href="mailto:info@mnsportive.com">info@mnsportive.com</a>
                  <br />
                  <a href="tel:+262639263951">+262 639 26 39 51</a>
                </dd>
              </div>
              <div>
                <dt>Responsable de la publication du site</dt>
                <dd>MAYOTTE NUTRITION SPORTIVE</dd>
              </div>
            </dl>
          </section>

          <section>
            <header>
              <h2>Politique de Confidentialité</h2>
              <p>Dernière mise à jour: 03/06/2025</p>
            </header>

            <p>
              Nous, MAYOTTE NUTRITION SPORTIVE ("nous", "notre", "notre
              entreprise"), nous engageons à protéger et à respecter la
              confidentialité de vos données personnelles. Cette politique de
              confidentialité explique comment nous recueillons, utilisons et
              protégeons vos informations personnelles lorsque vous utilisez
              notre site web www.mnsportive.com ("Site Web").
            </p>

            <article>
              <h3>1. Identité de l'entreprise</h3>
              <ul>
                <li>Nom de l'entreprise : MAYOTTE NUTRITION SPORTIVE</li>
                <li>Forme juridique : Entrepreneur individuel</li>
                <li>
                  <p>Adresse du siège social :</p>
                  <address>
                    Place Mariage
                    <br />
                    Bal N19 - CS 73904
                    <br />
                    97600 Mamoudzou
                  </address>
                </li>
                <li>Numéro SIRET : 941 847 907 00016</li>
                <li>Numéro SIREN : 941 847 907</li>
                <li>Numéro TVA : FR 819 418 47907</li>
                <li>
                  Email de contact :{' '}
                  <a href="mailto:info@mnsportive.com">info@mnsportive.com</a>
                </li>
                <li>
                  Numéro de téléphone :{' '}
                  <a href="tel:+262639263951">+262 639 26 39 51</a>
                </li>
                <li>Responsable de la publication : DRAME Hamara</li>
              </ul>
            </article>

            <article>
              <h3>2. Collecte des données personnelles</h3>
              <p>
                Nous recueillons les informations suivantes lorsque vous visitez
                notre site web ou utilisez nos services :
              </p>
              <ul>
                <li>
                  Informations d'identification : nom, prénom, adresse e-mail,
                  numéro de téléphone, adresse.
                </li>
                <li>
                  Données techniques : adresse IP, type de navigateur, système
                  d'exploitation, pages visitées sur notre site.
                </li>
              </ul>
            </article>

            <article>
              <h3>3. Utilisation des données personnelles</h3>
              <p>
                Nous utilisons vos données personnelles pour les finalités
                suivantes :
              </p>
              <ul>
                <li>
                  Traitement des commandes : gestion des achats, des paiements
                  et de la livraison des produits ou services.
                </li>
                <li>
                  Communication avec les clients : réponses aux demandes de
                  renseignements, envoi d'informations liées à la commande,
                  service client.
                </li>
                <li>
                  Amélioration du site web : analyse de la fréquentation du
                  site, amélioration de l'expérience utilisateur.
                </li>
              </ul>
            </article>

            <article>
              <h3>4. Conservation des données</h3>
              <p>
                Nous conservons vos données personnelles pendant la durée
                nécessaire à la réalisation des finalités mentionnées ci-dessus
                et conformément aux exigences légales. Les données relatives à
                vos achats seront conservées pendant une période de 6 mois après
                la transaction.
              </p>
            </article>

            <article>
              <h3>5. Partage des données personnelles</h3>
              <p>
                Nous ne partageons pas vos données personnelles avec des tiers,
                sauf dans les situations suivantes :
              </p>
              <ul>
                <li>
                  Services tiers : Nous pouvons partager vos informations avec
                  des prestataires de services tiers, tels que les sociétés de
                  livraison pour vous fournir nos services.
                </li>
                <li>
                  Obligations légales : Nous pouvons être amenés à divulguer vos
                  informations personnelles si la loi l'exige.
                </li>
              </ul>
            </article>

            <article>
              <h3>6. Sécurité des données personnelles</h3>
              <p>
                Nous mettons en place des mesures techniques et
                organisationnelles appropriées pour protéger vos données
                personnelles contre tout accès non autorisé, toute divulgation,
                modification ou destruction. Cela inclut l'utilisation de
                technologies de cryptage pour sécuriser les informations
                sensibles.
              </p>
            </article>

            <article>
              <h3>7. Vos droits</h3>
              <p>
                Conformément à la réglementation applicable, vous disposez des
                droits suivants concernant vos données personnelles :
              </p>
              <ul>
                <li>
                  Droit d'accès : Vous avez le droit de demander l'accès à vos
                  données personnelles que nous détenons.
                </li>
                <li>
                  Droit de rectification : Vous pouvez demander la correction de
                  vos données personnelles si elles sont inexactes ou
                  incomplètes.
                </li>
                <li>
                  Droit à l'effacement (droit à l'oubli) : Vous pouvez demander
                  la suppression de vos données personnelles sous certaines
                  conditions.
                </li>
                <li>
                  Droit à la portabilité : Vous avez le droit de recevoir vos
                  données personnelles dans un format structuré et lisible, et
                  de les transférer à un autre fournisseur de services.
                </li>
                <li>
                  Droit d'opposition : Vous avez le droit de vous opposer à
                  l'utilisation de vos données personnelles à des fins de
                  marketing direct ou dans d'autres cas.
                </li>
              </ul>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse
                suivante :{' '}
                <a href="mailto:info@mnsportive.com">info@mnsportive.com</a>.
              </p>
            </article>

            <article>
              <h3>8. Utilisation des cookies</h3>
              <p>
                Nous utilisons des cookies pour améliorer l'expérience
                utilisateur sur notre site web, analyser la fréquentation et
                personnaliser les publicités. Vous pouvez accepter ou refuser
                l'utilisation des cookies lors de votre première visite sur
                notre site. Vous avez également la possibilité de gérer les
                paramètres des cookies dans les options de votre navigateur.
              </p>
            </article>

            <article>
              <h3>9. Modification de la politique de confidentialité</h3>
              <p>
                Nous nous réservons le droit de modifier cette politique de
                confidentialité à tout moment. Toute modification sera publiée
                sur cette page et sera effective dès sa publication. Nous vous
                encourageons à consulter régulièrement cette politique pour être
                informé de la manière dont nous protégeons vos informations.
              </p>
            </article>

            <article>
              <h3>10. Plaintes</h3>
              <p>
                Si vous estimez que nous n'avons pas respecté vos droits en
                matière de données personnelles, vous pouvez déposer une plainte
                auprès de la Commission Nationale de l'Informatique et des
                Libertés (CNIL).
              </p>
            </article>
          </section>

          <section>
            <header>
              <h2>Conditions Générales de Vente</h2>
              <p>Dernière mise à jour : 03/06/2025</p>
            </header>

            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à
              toutes les commandes passées sur le site internet
              www.mnsportive.com (le "Site") et régissent les relations
              contractuelles entre MAYOTTE NUTRITION SPORTIVE (l'"Entreprise",
              "nous", "notre") et le client ("vous", "votre").
            </p>

            <article>
              <h3>1. Objet du contrat</h3>
              <p>
                Les présentes Conditions Générales de Vente ont pour objet de
                définir les modalités et conditions dans lesquelles l'Entreprise
                fournit les produits ou services que vous commandez sur le Site.
                Elles s'appliquent à toute commande passée sur le Site.
              </p>
            </article>

            <article>
              <h3>2. Produits</h3>
              <p>
                Les produits sont ceux qui figurent sur le Site et sont
                disponibles dans la limite des stocks. L'Entreprise se réserve
                le droit de modifier à tout moment l'offre de produits présentée
                sur le Site. Les descriptions, caractéristiques et prix des
                produits sont indiqués sur le Site au moment de la commande.
              </p>
            </article>

            <article>
              <h3>3. Commande</h3>
              <p>
                Toute commande passée sur le Site implique l'acceptation
                préalable des présentes Conditions Générales de Vente. Pour
                passer une commande, vous devez suivre les étapes suivantes :
              </p>
              <ol>
                <li>
                  Sélectionner les produits souhaités et les ajouter à votre
                  panier.
                </li>
                <li>
                  Valider la commande et entrer vos informations de livraison.
                </li>
                <li>
                  Choisir le mode de paiement (uniquement par virement
                  bancaire).
                </li>
                <li>Confirmer la commande et procéder au paiement.</li>
              </ol>
              <p>
                Une fois votre commande confirmée, vous recevrez un e-mail de
                confirmation contenant les détails de votre commande.
              </p>
            </article>

            <article>
              <h3>4. Prix et paiement</h3>
              <p>
                Les prix des produits sont indiqués en EUR, toutes taxes
                comprises. Les frais de livraison sont inclus ou seront précisés
                au moment de la commande. Le paiement peut s'effectuer en
                espèces ou par virement bancaire.
              </p>
              <p>
                Le paiement de votre commande s'effectue exclusivement par
                virement bancaire. Vous devrez effectuer le paiement à l'adresse
                bancaire suivante :
              </p>
              <ul>
                <li>Nom du bénéficiaire : MAYOTTE NUTRITION SPORTIVE</li>
                <li>RIB / IBAN : BE91905368267476</li>
                <li>BIC / SWIFT : TRWIBEB1XXX</li>
              </ul>
              <p>
                Votre commande sera traitée une fois que le paiement aura été
                reçu sur notre compte bancaire.
              </p>
            </article>

            <article>
              <h3>5. Livraison</h3>
              <p>
                Votre commande sera expédiée dans un délai de 3 à 5 jours ouvrés
                après réception du paiement, mais au plus tard dans un délai de
                5 jours ouvrables. La livraison sera effectuée à l'adresse de
                livraison indiquée lors de la commande.
              </p>

              <p>
                Les frais de livraison sont inclus ou seront précisés au moment
                de la commande.
              </p>
            </article>

            <article>
              <h3>6. Facturation</h3>
              <p>
                La facture correspondant à votre commande sera émise en ligne et
                vous sera envoyée par email à l'adresse que vous avez indiquée
                lors de la commande. La facture inclura toutes les informations
                nécessaires, y compris le détail des produits achetés, le
                montant total payé, et la TVA (si applicable).
              </p>
            </article>

            <article>
              <h3>7. Droit de rétractation et retours</h3>
              <p>
                Conformément à la loi en vigueur, vous avez un droit de
                rétractation de 14 jours à compter de la réception des produits.
                Si vous souhaitez retourner un produit, veuillez nous contacter
                à l'adresse{' '}
                <a href="mailto:info@mnsportive.com">info@mnsportive.com</a>{' '}
                pour obtenir des instructions détaillées sur la procédure de
                retour. Les produits doivent être retournés dans leur état
                d'origine, non utilisés et dans leur emballage d'origine.
              </p>
              <p>
                Les frais de retour sont à votre charge, sauf si le produit est
                défectueux ou non conforme à la commande.
              </p>
            </article>

            <article>
              <h3>8. Responsabilité</h3>
              <p>
                L'Entreprise ne pourra être tenue responsable des dommages
                directs ou indirects résultant de l'utilisation du Site ou de
                l'achat de produits sur celui-ci, sauf en cas de négligence
                grave ou de faute lourde de sa part.
              </p>
            </article>

            <article>
              <h3>9. Protection des données personnelles</h3>
              <p>
                Nous nous engageons à protéger vos données personnelles
                conformément à la législation sur la protection des données.
                Pour plus d'informations sur la manière dont nous collectons,
                utilisons et protégeons vos informations, veuillez consulter
                notre Politique de Confidentialité.
              </p>
            </article>

            <article>
              <h3>10. Modification des Conditions Générales de Vente</h3>
              <p>
                L'Entreprise se réserve le droit de modifier les présentes
                Conditions Générales de Vente à tout moment. Toute modification
                sera publiée sur le Site et sera applicable aux commandes
                passées après la publication de ces modifications.
              </p>
            </article>

            <article>
              <h3>11. Loi applicable et règlement des litiges</h3>
              <p>
                Les présentes Conditions Générales de Vente sont régies par le
                droit français. En cas de litige, nous nous efforcerons de
                trouver une solution amiable. Si un accord amiable n'est pas
                trouvé, le litige sera soumis à la compétence des tribunaux
                français.
              </p>
            </article>
          </section>

          <section>
            <header>
              <h2>Limitation de Responsabilité</h2>
              <p>Dernière mise à jour : 03/06/2025</p>
            </header>

            <p>
              Le présent site web www.mnsportive.com est destiné à fournir des
              informations sur nos produits et services. En accédant et en
              utilisant ce site, vous acceptez de le faire sous votre propre
              responsabilité.
            </p>

            <article>
              <h3>1. Exactitude des informations</h3>
              <p>
                Nous mettons tout en œuvre pour garantir l'exactitude et
                l'actualité des informations présentées sur ce site. Toutefois,
                nous ne garantissons pas que les informations, descriptions,
                prix ou autres contenus présents sur ce site sont exempts
                d'erreurs ou d'omissions. Nous nous réservons le droit de
                modifier ou de mettre à jour les informations à tout moment et
                sans préavis. L'Entreprise ne pourra être tenue responsable des
                erreurs ou omissions sur le site, ni des conséquences résultant
                de l'utilisation des informations contenues sur celui-ci.
              </p>
            </article>

            <article>
              <h3>2. Disponibilité du site</h3>
              <p>
                L'accès au site peut être interrompu ou limité pour des raisons
                techniques, de maintenance, de mise à jour ou en cas de force
                majeure. L'Entreprise ne pourra être tenue responsable des
                interruptions ou dysfonctionnements temporaires du site, ni des
                dommages directs ou indirects résultant de ces interruptions.
              </p>
            </article>

            <article>
              <h3>3. Produits et Services</h3>
              <p>
                Les produits et services proposés sur ce site sont fournis « en
                l'état » et peuvent être sujets à des modifications sans
                préavis. L'Entreprise ne garantit pas que les produits ou
                services répondront à vos attentes spécifiques, et ne pourra
                être tenue responsable d'une mauvaise utilisation des produits
                par le client. Toute utilisation des produits doit se faire
                conformément aux instructions fournies par le fabricant ou
                l'Entreprise.
              </p>
            </article>

            <article>
              <h3>4. Responsabilité concernant les liens externes</h3>
              <p>
                Le site peut contenir des liens vers d'autres sites web de
                tiers. Ces liens sont fournis à titre informatif uniquement, et
                nous ne contrôlons pas le contenu de ces sites externes.
                L'Entreprise décline toute responsabilité quant aux contenus,
                produits, services ou informations présents sur ces sites tiers.
                L'utilisation de ces liens se fait à vos propres risques.
              </p>
            </article>

            <article>
              <h3>5. Limitation de la responsabilité</h3>
              <p>
                Dans la mesure autorisée par la loi, l'Entreprise décline toute
                responsabilité pour les pertes ou dommages directs, indirects,
                spéciaux ou consécutifs résultant de l'utilisation de ce site, y
                compris mais sans se limiter aux pertes de profits, de données
                ou d'opportunités d'affaires.
              </p>
              <p>
                En aucun cas, l'Entreprise ne pourra être tenue responsable des
                dommages résultant de l'utilisation du site, qu'ils soient
                causés par un manquement de la part de l'Entreprise ou de tiers,
                ou en raison d'une négligence, d'une faute professionnelle, d'un
                retard ou d'une défaillance technique.
              </p>
            </article>

            <article>
              <h3>6. Force majeure</h3>
              <p>
                L'Entreprise ne pourra être tenue responsable de l'impossibilité
                d'exécuter ses obligations en vertu des présentes conditions
                générales en raison de cas de force majeure, tels que définis
                par la loi française, incluant mais sans se limiter à des
                événements tels que les grèves, les catastrophes naturelles, ou
                les défaillances techniques imprévues.
              </p>
            </article>

            <article>
              <h3>7. Indemnisation</h3>
              <p>
                En utilisant ce site, vous vous engagez à indemniser et à tenir
                indemne l'Entreprise, ses dirigeants, employés, agents et
                affiliés de toute réclamation, demande, action en justice,
                dommage, perte, coût ou dépense résultant de votre utilisation
                du site ou de votre violation des présentes Conditions Générales
                de Vente.
              </p>
            </article>

            <article>
              <h3>8. Droit applicable</h3>
              <p>
                Le présent disclaimer est régi par la législation française. En
                cas de litige, vous acceptez que toute action en justice liée à
                ce disclaimer soit soumise à la compétence exclusive des
                tribunaux français.
              </p>
            </article>
          </section>
        </article>
      </div>
    ),
  },
  about: {
    title: 'Bienvenue chez Mayotte Nutrition Sportive!',
    content: (
      <>
        Mayotte Nutrition Sportive est une entreprise fondée en 2025,
        spécialisée dans la vente de protéines et de compléments alimentaires.
        Nous vous proposons les produits de BiotechUSA, une marque reconnue pour
        la qualité et l’efficacité de ses formules. Nous livrons gratuitement
        sur toute l’île pour vous aider à atteindre vos objectifs sportifs et
        bien-être en toute simplicité. Boostez vos performances avec des
        produits de qualité, livrés directement chez vous!
      </>
    ),
  },
  faq: {
    title: 'FAQ (Foire Aux Questions)',
    content: (
      <div>
        <ol className="modal-faq">
          <li>
            <b>Commandes et paiements</b>
            <ul>
              <li className="q">Comment passer une commande ?</li>
              <li className="ans">
                Suivez les instructions indiquées sur le site pour passer votre
                commande.
              </li>
              <li className="q">
                Quels sont les moyens de paiement acceptés ?
              </li>
              <li className="ans">
                {' '}
                Le paiement peut s'effectuer en espèces ou par virement
                bancaire.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <b>Livraison</b>
            <ul>
              <li className="q">
                Quels sont les délais de livraison à Mayotte ?
              </li>
              <li className="ans">
                La livraison prend entre 3 et 5 jours ouvrables.
              </li>
              <li className="q">La livraison est-elle vraiment gratuite ?</li>
              <li className="ans">Complètement.</li>
              <li className="q">Puis-je suivre ma commande ?</li>
              <li className="ans">
                Non, mais le colis sera livré à domicile et vous serez
                informé(e) de la date de livraison à l’avance.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <b>Produits et utilisation</b>
            <ul>
              <li className="q">
                Les produits sont-ils authentiques et certifiés ?
              </li>
              <li className="ans">
                Oui, tous nos produits sont des produits authentiques
                BiotechUSA. BiotechUSA est l’un des plus grands fabricants et
                distributeurs en Europe de compléments alimentaires, aliments
                spécialisés et vêtements de sport, engagé en faveur du sport et
                d’un mode de vie sain. Nous croyons que la santé est le plus
                grand trésor du monde.
              </li>
            </ul>
          </li>
          <br />
          <li>
            <b>Contact et assistance</b>
            <ul>
              <li className="q">
                Comment puis-je contacter le service client ?
              </li>
              <li className="ans">Par email : info@mnsportive.com</li>
              <li className="ans">
                via Facebook:{' '}
                <a
                  href="https://www.facebook.com/mnsportive.officiel/"
                  target="_blank"
                >
                  Mayotte Nutrition Sportive
                </a>
              </li>
              <li className="q">Avez-vous un magasin physique à Mayotte ?</li>
              <li className="ans">
                Non, nous disposons uniquement d’une boutique en ligne pour le
                moment.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    ),
  },
}

export const FadeInModal = ({ handleClose, open, theme }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            <b>{modalVariations[theme].title}</b>
          </Typography>
          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            {modalVariations[theme].content}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
