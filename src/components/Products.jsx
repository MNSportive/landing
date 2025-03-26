import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  ButtonGroup,
  Button,
  Container,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import productLedger from '../utils/products.json'

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      console.log(`Added ${quantity} ${product.productName} to cart`)
      // Here you would typically dispatch an action to add to cart
      setQuantity(0) // Reset after adding to cart
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        opacity: product.stock > 0 ? 1 : 0.7,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          poids: {product.weight}
        </Typography>
        <Chip
          label={product.stock > 0 ? 'En stock' : 'Rupture de stock'}
          color={product.stock > 0 ? 'success' : 'error'}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.consumerPrice}€
        </Typography>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              onClick={handleDecrement}
              disabled={quantity === 0 || !product.stock > 0}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button disabled={!product.stock > 0} sx={{ minWidth: '50px' }}>
              {quantity}
            </Button>
            <Button onClick={handleIncrement} disabled={!product.stock > 0}>
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={quantity === 0 || !product.stock > 0}
        >
          Ajouter au panier
        </Button>
      </Box>
    </Card>
  )
}

export const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Produits
      </Typography>

      <Grid container spacing={3}>
        {productLedger.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
