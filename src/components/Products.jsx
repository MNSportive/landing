import React, { useState, useEffect } from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  ButtonGroup,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
  useTheme,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { CircularProgress } from '@mui/material'
import { useCart } from '../contexts/cartContext'
import { getInventoryData } from '../utils/helpers'
import { useFeatureFlag } from '../contexts/featureContext'
import fallbackImage from '../assets/mns.webp'

const ProductCard = ({ product, onClick }) => {
  const showPrematureContent = useFeatureFlag('prematureContentEnabled')
  const [quantity, setQuantity] = useState(0)
  const [imageError, setImageError] = useState(false)
  const { addToCart, items } = useCart()
  const theme = useTheme()

  const inCartQuantity =
    items.find((item) => item.id === product.id)?.quantity || 0

  const remainingStock = product.stock - inCartQuantity

  const handleIncrement = () => {
    if (quantity < remainingStock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity)
      setQuantity(0)
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const GITHUB_REPO_BASE_URL =
    'https://raw.githubusercontent.com/MNSportive/assets/refs/heads/main'

  const getProductImage = () => {
    try {
      return `${GITHUB_REPO_BASE_URL}/_${product.id}_.webp`
    } catch (error) {
      console.error(`Error loading image for product ${product.id}:`, error)
      return `${GITHUB_REPO_BASE_URL}/mns.webp`
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        opacity: remainingStock > 0 ? 1 : 0.7,
        background: theme.palette.background.paper,
      }}
    >
      <Box
        component="img"
        src={imageError ? fallbackImage : getProductImage()}
        alt={product.productName}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'contain',
          p: 2,
        }}
        onError={handleImageError}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
          {product.brand || ''}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ mb: 1 }}
          onClick={() => onClick(product)}
          style={{ cursor: 'pointer' }}
        >
          Détails
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          poids: {product.weight}
        </Typography>
        {showPrematureContent && (
          <Box sx={{ mb: 2 }}>
            <Chip
              label={
                remainingStock > 0
                  ? `En stock (${remainingStock})`
                  : 'Rupture de stock'
              }
              color={remainingStock > 0 ? 'success' : 'error'}
              size="small"
            />

            {inCartQuantity > 0 && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                {inCartQuantity} déjà dans le panier
              </Typography>
            )}
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.consumerPrice.toFixed(2)}€
        </Typography>
      </CardContent>
      {showPrematureContent && (
        <>
          <Box sx={{ p: 2, pt: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ButtonGroup variant="outlined" size="small">
                <Button
                  onClick={handleDecrement}
                  disabled={quantity === 0 || remainingStock <= 0}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  disabled={remainingStock <= 0}
                  sx={{ minWidth: '50px' }}
                >
                  {quantity}
                </Button>
                <Button
                  onClick={handleIncrement}
                  disabled={remainingStock <= 0 || quantity >= remainingStock}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>

              {quantity === remainingStock && remainingStock > 0 && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                  Max
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={quantity === 0 || remainingStock <= 0}
            >
              Ajouter au panier
            </Button>
          </Box>
        </>
      )}
    </Card>
  )
}

const CartDrawer = ({ open, onClose }) => {
  const {
    items,
    totalAmount,
    totalQuantity,
    removeFromCart,
    clearCart,
    updateQuantity,
    getProductStock,
  } = useCart()

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Panier d'achat ({totalQuantity})
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={clearCart}
            disabled={items.length === 0}
          >
            Vider
          </Button>
        </Box>

        <Divider />

        {items.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}
          >
            <ShoppingBasketIcon
              sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
            />
            <Typography variant="body1" color="text.secondary">
              Votre panier est vide
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%' }}>
            {items.map((item) => {
              const productStock = getProductStock(item.id)
              const isAtMaxStock = item.quantity >= productStock

              return (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ShoppingBasketIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.price.toFixed(2)}€ x {item.quantity}
                          </Typography>
                          {` — ${item.category}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <Box sx={{ pl: 9, pr: 5, pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ButtonGroup variant="outlined" size="small">
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <Button disabled sx={{ minWidth: '40px' }}>
                          {item.quantity}
                        </Button>
                        <Button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={isAtMaxStock}
                        >
                          <AddIcon fontSize="small" />
                        </Button>
                      </ButtonGroup>

                      {isAtMaxStock && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ ml: 1 }}
                        >
                          Max
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      Stock disponible: {productStock}
                    </Typography>
                  </Box>

                  <Divider variant="inset" component="li" />
                </React.Fragment>
              )
            })}
          </List>
        )}

        <Box sx={{ mt: 2, p: 2, backgroundColor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>
            Total: {totalAmount.toFixed(2)}€
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={items.length === 0}
            sx={{ mt: 2 }}
            onClick={() => {
              onClose()
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              })
            }}
          >
            Passer à la caisse
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export const Products = () => {
  const showPrematureContent = useFeatureFlag('prematureContentEnabled')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [brandFilter, setBrandFilter] = useState('all')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const { totalQuantity } = useCart()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    getInventoryData()
      .then((data) => {
        setProducts(data)
        setCategories([...new Set(data.map((product) => product.category))])
        setBrands([...new Set(data.map((product) => product.brand))])
      })
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter

    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter

    return matchesCategory && matchesBrand && !product?.isHidden
  })

  const toggleCart = () => {
    setCartOpen(!cartOpen)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} id="products">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Produits
        </Typography>

        {showPrematureContent && (
          <Box
            sx={{
              position: totalQuantity > 0 ? 'fixed' : 'static',
              bottom: totalQuantity > 0 ? 16 : 'auto',
              right: totalQuantity > 0 ? 16 : 'auto',
              zIndex: totalQuantity > 0 ? 1000 : 'auto',
              bgcolor: totalQuantity > 0 ? 'background.paper' : 'transparent',
              borderRadius: '50%',
              boxShadow: totalQuantity > 0 ? 3 : 'none',
              p: 1,
            }}
          >
            <IconButton color="primary" onClick={toggleCart}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
            <InputLabel id="category-filter-label">Catégorie</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">Toutes les catégories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
            <InputLabel id="brand-filter-label">Marque</InputLabel>
            <Select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <MenuItem value="all">Toutes les marques</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onClick={handleProductClick} />
            </Grid>
          ))}
        </Grid>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => {
          setCartOpen(false)
        }}
      />
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {selectedProduct?.productName}
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            {(selectedProduct?.description || 'Aucune description disponible.')
              .split('\n')
              .map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  )
}
