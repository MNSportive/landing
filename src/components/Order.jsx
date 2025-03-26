import { useState } from 'react'
import { TextField, Button, Autocomplete } from '@mui/material'
import { postToGoogleForms } from '../utils/helpers'
import { countries } from '../utils/countries'

export const Order = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [isOrderSent, setIsOrderSent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [buttonText, setButtonText] = useState('Commander')

  const handleSubmit = async () => {
    const res = await postToGoogleForms(
      '1FAIpQLSfd90auy-HwKdd8OePw4WIqCiNsj5DaCULWVnBWgcKTwugiYw',
      {
        'entry.1154481469': `[itt lesz az is hogy, hogy miket rendelt]\nNev: ${name}\nTel: ${phone}\nCim: ${street}\n${city}\n${zip}\n${country}\n\nEmail: ${email}`,
      }
    )

    if (!res || res.error) {
      setIsLoading(false)
      setError(res.error || res || 'ay dios mio')
    }

    if (res.data) {
      setData(res.data)
    }
  }

  return (
    <>
      {data ? (
        <>
          itt lesz mindenfele informacio hogy hova kell majd utalni meg kb
          mennyi ido amig megerkezik
          <br />
          <br />
          kozben ezek az infok elmentodnek valahova
        </>
      ) : (
        <form className="flex row form-row">
          <div className="flex column form-column">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Street address"
              variant="outlined"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex column form-column">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Zip code"
              variant="outlined"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Autocomplete
              disablePortal
              options={countries}
              renderInput={(params) => (
                <TextField {...params} label="Country" value={country} />
              )}
              onChange={(e) => {
                setCountry(e.target.innerText)
              }}
            />
          </div>
        </form>
      )}
      <Button
        className="button-primary"
        variant="contained"
        onClick={() => {
          handleSubmit()
        }}
      >
        {buttonText}
      </Button>
    </>
  )
}
