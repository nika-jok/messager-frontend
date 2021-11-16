import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import ApiHelper from '../../helpers/api/bio/me'
import ApiHelperWithdraw from '../../helpers/api/withdrawals'
import Input from '../../presentation/ui/input/Input'

import { Grid } from '@material-ui/core'
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import arrowBack from '../../assets/img/channels/arrow-back.svg'
import confirmCheck from '../../assets/img/channels/confirm-check.svg'
import newTransmitImage from '../../assets/img/withdrawal/new-transmit-to-card.svg'
import FormValidator from '../../utils/FormValidator'

const WithdrawalsCreate = (props) => {
  const { token, isMobile, setChosedModal, goBack } = props
  const [isLoading, setLoading] = useState(false)
  const [balance, setBalance] = useState('')
  const [amount, setAmount] = useState('$')
  const [isMoreAmount, setIsMoreAmount] = useState(false)
  const [comment, setComment] = useState('')
  const [card, setCard] = useState('')
  const [isCardValid, setIsCardValid] = useState(true)
  const [isAmountValid, setIsAmountValid] = useState(true)

  const [redirect, setRedirect] = useState(false)
  const api = new ApiHelper()
  const apiWithdraw = new ApiHelperWithdraw()

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      const data = await api.getMe(token)

      const { balance } = data.data.bio

      setBalance(balance)
      console.log(balance)
      console.log(balance)
      console.log(balance)
      setLoading(false)
      return
    })()
  }, [])

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    )
  }

  const createWithdrawRequest = async () => {
    await apiWithdraw.create(Number(amount?.slice(1)), card, '')
    if (isMobile) {
      setRedirect('/account/withdrawals')
    } else {
      setChosedModal('payments')
    }
  }

  const isValidFieldsForTransmitToCard = () => {
    let isValid = true

    if (!card) {
      setIsCardValid(false)
      isValid = false
    }

    // if (!FormValidator.isValidCardNumber(card)) {
    //   setIsCardValid(false)
    //   isValid = false
    // }

    if (!amount) {
      setIsAmountValid(false)
      isValid = false
    }

    if (balance < amount.slice(1)) {
      setIsAmountValid(false)
      isValid = false
    }

    if (balance <= 0) {
      setIsAmountValid(false)
      isValid = false
    }

    return isValid
  }

  return (
    <>
      <div
        className="page-container pt-2"
        style={{
          position: isMobile ? 'fixed' : 'relative',
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={1} style={{ marginRight: '10px' }}>
            <div className="arrow-back-block">
              <div
                className="icon-hover"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryHelper.goBack()
                  } else {
                    goBack('left')
                  }
                }}
              >
                <img src={arrowBack} alt="arrow back" />
              </div>
            </div>
          </Grid>
          <Grid xs={9}>
            <div className="page-title">Перевод на карту</div>
          </Grid>
          <Grid xs={1}>
            <div className="next-page pt-0">
              <button
                className="icon-hover"
                style={{ lineHeight: '36px', paddingTop: 0, marginTop: '7px' }}
                onClick={() => {
                  if (isValidFieldsForTransmitToCard()) {
                    createWithdrawRequest()
                  }
                }}
              >
                <img src={confirmCheck} alt="confirm-checkmark" />
              </button>
            </div>
          </Grid>

          <Grid xs={12}>
            <div
              className="d-flex justify-content-center"
              style={{ paddingTop: '33px' }}
            >
              <img
                className="rounded-circle"
                src={newTransmitImage}
                alt="upload"
                style={{
                  width: '80px',
                  height: '80px',
                  border: ' 1px solid rgba(0, 0, 0, 0.05)',
                }}
              />
            </div>
          </Grid>
        </Grid>

        <div className="pt-3">
          <label className="d-block">Номер банковской карты</label>
          <span style={{ position: 'relative' }}>
            <span id="masked-input">
              <i></i>
              **** **** **** ****
            </span>
            <Input
              className={`input-card ${!isCardValid ? 'error-border' : ''}`}
              value={card}
              type="text"
              style={{ backgroundColor: 'transparent' }}
              onChange={(e) => {
                setIsCardValid(true)
                if (e.target.value.length < 20) {
                  let stars = ''
                  for (
                    let i = 1;
                    i <= 16 - e.target.value.split(' ').join('').length;
                    i++
                  ) {
                    if (
                      (e.target.value.split(' ').join('').length + i - 1) %
                        4 ===
                      0
                    ) {
                      stars += ' *'
                    } else {
                      stars += '*'
                    }
                  }
                  let foo = e.target.value.split(' ').join('')
                  if (foo.length > 0) {
                    const newFoo = foo
                      .match(new RegExp('.{1,4}', 'g'))
                      .join(' ')
                    setCard(newFoo)
                    document.querySelector(
                      '#masked-input'
                    ).innerHTML = `<i>${newFoo}</i>${stars}`
                  } else {
                    setCard(e.target.value)
                    document.querySelector(
                      '#masked-input'
                    ).innerHTML = `<i>${e.target.value}</i>${stars}`
                  }
                }
              }}
            />
          </span>
        </div>

        <div className="pt-3">
          <label className="d-block">Сумма</label>
          <Input
            className={`input-amount input-unchanged ${
              !isAmountValid ? 'error-border' : ''
            }`}
            value={amount}
            style={{ color: isMoreAmount ? '#000' : 'rgb(84, 84, 84)' }}
            type="text"
            onChange={(e) => {
              setIsAmountValid(true)
              if (
                e.target.value[0] === '$' &&
                !/\D/.test(Number(e.target.value.slice(1)))
              ) {
                setIsMoreAmount(true)
                setAmount(e.target.value.trim())
              }
              if (e.target.value.trim() === '$') {
                setIsMoreAmount(false)
              }
            }}
          />
        </div>

        <div className="text-gray pt-2">
          Вы можете вывести за один раз от $1 до $1000. Запрос на вывод 
          может обрабатываться до двух дней.
        </div>
      </div>
    </>
  )
}

export default WithdrawalsCreate
