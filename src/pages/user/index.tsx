
import React, { useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Typography, 
  Grid, 
  Box 
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { TitleHelmet } from '../../components/common/title-helmet'
import Header from '../../components/common/header'
import Footer from '../../components/common/footer'
import { useNavigate } from 'react-router-dom'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Uniqlo red
    },
  },
})

const UserPage = () => {
  // Mock user data
  const user = {
    fullName: sessionStorage.getItem('fullName'),
    email: sessionStorage.getItem('email'),
    phone: sessionStorage.getItem('phone'),
    address: sessionStorage.getItem('address'),
    avatarUrl: "https://i.pravatar.cc/150?img=33"
  }
  const navigate = useNavigate()
  useEffect(()=>{
    if(!sessionStorage.getItem('role')){
        navigate('/')
    }
  },[])

  return (
    <ThemeProvider theme={theme}>
        <TitleHelmet title="User" />
        <Header />
      <Box sx={{ minHeight: '50vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Card sx={{ maxWidth: 600, width: '100%' }}>
          <CardHeader
            avatar={
              <Avatar 
                src={user.avatarUrl} 
                alt={user.fullName}
                sx={{ width: 80, height: 80 }}
              />
            }
            title={
              <Typography variant="h5" component="h1">
                {user.fullName}
              </Typography>
            }
            subheader="Uniqlo Member"
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">
                  {user.phone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1">
                  {user.address}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Footer/>
    </ThemeProvider>
  )
}

export default UserPage