import { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import ApiHelper from '../../helpers/api/bio/me'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Menu from '../Menu/Menu'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import { makeStyles } from '@material-ui/core/styles'
import { APPLICATION_SERVER } from '../../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    maxWidth: 300,
  },
  name: {
    fontWeight: 'bold',
  },
}))
function Payments(props) {
  const classes = useStyles()

  const {
    setEmail,
    setUsername,
    setFirstname,
    setLastname,
    setPhone,
    setAbout,
    setAvatar,

    email,
    username,
    firstName,
    lastName,
    token,
    avatar,
  } = props
  const [isLoading, setLoading] = useState(false)
  const [balance, setBalance] = useState(0)

  const [isRedirect, setRedirect] = useState(false)
  const api = new ApiHelper()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const data = await api.getMe(token)
      if (data.status !== 200) {
        return setRedirect(true)
      }

      const {
        email,
        username,
        firstName,
        lastName,
        phone,
        about,
        avatar,
        balance,
      } = data.data.bio
      setBalance(balance)
      setEmail(email)
      setUsername(username)
      setFirstname(firstName)
      setLastname(lastName)
      setPhone(phone)
      setAbout(about)
      setAvatar(avatar)
      setLoading(false)
      return
    })()
  }, [])



  const displayName = () => {
    if (firstName && lastName) return `${firstName} ${lastName}`
    if (firstName && !lastName) return firstName
    if (!firstName && lastName) return lastName
    if (username) return username
    return email
  }

  return (
    <>
      <Menu />
      <Back callback={() => BrowserHistoryHelper.goBack()} />

      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Card className={classes.root}>
            <img
              alt="Avatar"
              src={`${APPLICATION_SERVER}/files/${avatar}`}
              width="100"
              height="100"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="subtitle1">
                  Мой счет: {balance}$
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <Link to="/payments/top_up">Пополнить</Link>
                </Typography>
              </CardContent>
            </div>
          </Card>

          <MenuList>
            <Link to="/payments/subscriptions">
              <MenuItem>Платежи и подписки</MenuItem>
            </Link>
            <Link to="/withdrawals">
              <MenuItem>Переводы</MenuItem>
            </Link>
          </MenuList>
        </>
      )}
    </>
  )
}

export default Payments
