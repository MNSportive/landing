import { useState } from 'react'
import {
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
  Alert,
} from '@mui/material'
import { postToGoogleForms } from '../utils/helpers'
import { countries } from '../utils/countries'
import { useCart } from '../contexts/cartContext'

export const Order = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [street, setStreet] = useState('')
  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [isOrderSent, setIsOrderSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [buttonText, setButtonText] = useState('Commander')
  const { items, totalAmount, totalQuantity, clearCart } = useCart()

  const humanReadableProducts = items
    .map((item) => `${item.quantity} x ${item.productName} - ${item.id}`)
    .join('\n')

  const emptyInputs = () => {
    setName('')
    setPhone('')
    setEmail('')
    setStreet('')
    setZip('')
    setCountry('')
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await postToGoogleForms(
        '1FAIpQLSdl-ZHQkbm7h3_cJ8adH3lCUwM-XeofbI8fSedmC_jbH2jHgg',
        {
          'entry.1656801423': name,
          'entry.1985350856': email,
          'entry.628778403': phone,
          'entry.842398486': `${street}, ${city}, ${zip}`,
          'entry.1031965433': country,
          'entry.775643275': humanReadableProducts,
          'entry.947045538': totalAmount,
          'entry.1325735342': totalQuantity,
        }
      )

      if (!res || res.error) {
        setError(res.error || res || 'ay dios mio')
      } else if (res.data) {
        setData(res.data)
        setIsOrderSent(true)
        setButtonText('Order Sent')
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
      clearCart()
      emptyInputs()
    }
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isOrderSent ? (
        <Alert severity="success">
          Your order has been successfully submitted!
        </Alert>
      ) : data ? (
        <Alert severity="warning">
          Uh oh, we currently have no products for you :(
        </Alert>
      ) : (
        <>
          <form className="flex row form-row">
            <div className="flex column form-column">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                id="outlined-basic"
                label="Street address"
                variant="outlined"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                margin="normal"
                required
              />
            </div>
            <div className="flex column form-column">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                type="email"
              />
              <TextField
                id="outlined-basic"
                label="Zip code"
                variant="outlined"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                margin="normal"
                required
              />
              <Autocomplete
                disablePortal
                options={countries}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    margin="normal"
                    required
                  />
                )}
                value={country}
                onChange={(event, newValue) => {
                  setCountry(newValue || '')
                }}
              />
            </div>
          </form>
          <Button
            className="button-primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !name ||
              !email ||
              !phone ||
              !street ||
              !city ||
              !zip ||
              country !== 'Mayotte'
            }
            sx={{ mt: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              buttonText
            )}
          </Button>
        </>
      )}
    </>
  )
}
