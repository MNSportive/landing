import Logo from '../mns.svg'
import { useState } from 'react'
import { FadeInModal } from './Modal'

export const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [FAQOpen, setFAQOpen] = useState(false)
  const handleAboutClose = () => setAboutOpen(false)
  const handleFAQClose = () => setFAQOpen(false)
  return (
    <div className="header flex row">
      <img
        src={Logo}
        className="header-logo"
        alt="Mayotte Nutrition Sportive"
      />
      <nav className="flex">
        <p onClick={setAboutOpen} style={{ textDecoration: 'underline' }}>
          À propos
        </p>
        <p onClick={setFAQOpen} style={{ textDecoration: 'underline' }}>
          FAQ
        </p>
      </nav>
      <>
        <FadeInModal
          handleClose={handleAboutClose}
          open={aboutOpen}
          theme="about"
        />
        <FadeInModal handleClose={handleFAQClose} open={FAQOpen} theme="faq" />
      </>
    </div>
  )
}
