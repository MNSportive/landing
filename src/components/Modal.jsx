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

const faq = {
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
            <li className="q">Quels sont les moyens de paiement acceptés ?</li>
            <li className="ans">Virement bancaire.</li>
          </ul>
        </li>
        <br />
        <li>
          <b>Livraison</b>
          <ul>
            <li className="q">
              Quels sont les délais de livraison à Mayotte ?
            </li>
            <li className="ans">72 heures</li>
            <li className="q">La livraison est-elle vraiment gratuite ?</li>
            <li className="ans">Complètement.</li>
            <li className="q">Puis-je suivre ma commande ?</li>
            <li className="ans">
              Non, mais vous recevrez le colis dans les 72 heures.
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
              Oui, tous nos produits sont des produits authentiques BiotechUSA.
              BiotechUSA est l’un des plus grands fabricants et distributeurs en
              Europe de compléments alimentaires, aliments spécialisés et
              vêtements de sport, engagé en faveur du sport et d’un mode de vie
              sain. Nous croyons que la santé est le plus grand trésor du monde.
            </li>
          </ul>
        </li>
        <br />
        <li>
          <b>Contact et assistance</b>
          <ul>
            <li className="q">Comment puis-je contacter le service client ?</li>
            <li className="ans">Par email : info@mnsportive.com</li>
            <li className="ans">via WhatsApp au numéro suivant : 000 -</li>
            <li className="ans">Facebook: Mayotte Nutrition Sportive</li>
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
}

const about = {
  title: 'Bienvenue chez Mayotte Nutrition Sportive!',
  content: (
    <>
      Mayotte Nutrition Sportive est une entreprise fondée en 2025, spécialisée
      dans la vente de protéines et de compléments alimentaires. Nous vous
      proposons les produits de BiotechUSA, une marque reconnue pour la qualité
      et l’efficacité de ses formules. Nous livrons gratuitement sur toute l’île
      pour vous aider à atteindre vos objectifs sportifs et bien-être en toute
      simplicité. Boostez vos performances avec des produits de qualité, livrés
      directement chez vous!
    </>
  ),
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
            <b>{theme === 'about' ? about.title : faq.title}</b>
          </Typography>
          <Box id="transition-modal-description" sx={{ mt: 2 }}>
            {theme === 'about' ? about.content : faq.content}
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}
