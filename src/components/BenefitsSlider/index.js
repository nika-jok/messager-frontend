import Slider from 'react-slick'
import styled from 'styled-components'
import leftArrow from '../../assets/img/slider/left-arrow.svg'
import rightArrow from '../../assets/img/slider/right.svg'
import goodMonningIcon from '../../assets/img/welcome-page/good-morning.png'
import secondImg from '../../assets/img/welcome-page/secondImg.png';
import thirdImg from '../../assets/img/welcome-page/thirdImg.png';
import BrowserHistoryHelper from '../../utils/BrowserHistoryRouter'
import appIcon from '../../assets/img/welcome-page/welcome-icon.svg'

const BenefitsSliderWrap = styled.div`
 
  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #50bcff;
    display: flex;
    display: flex;
    justify-content: center;
  }

  .description {
    font-weight: normal;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    padding-top: 10px;
  }

  .slider-image-block {
    display: flex;
    justify-content: center;
  }
`

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="right arrow" />
    </div>
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <img src={leftArrow} alt="left arrow" />
    </div>
  )
}

const sliderItems = [
  { title: '', description: '' },
  {
    title: 'Общайтесь',
    description: 'Оставайтесь на связи с родными, друзьями или коллегами',
    icon: goodMonningIcon,
  },
  {
    title: 'Монетизируйте',
    description: 'Используйте каналы для монентизации контента',
    icon: secondImg,
  },
  {
    title: 'Обменивайтесь',
    description:
      'Обменивайтесь с друзьями фото, видео и файлами в любых количествах',
    icon: thirdImg,
  },
]

const BenefitsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <BenefitsSliderWrap>
      <Slider {...settings}>
        {sliderItems.map((item, i) => {
          if (i === 0) {
            return (
              <div
                style={{
                  paddingTop: '30vh',
                }}
              >
                <div className="d-flex justify-content-center">
                  <img src={appIcon} alt="applicationLogo" />
                </div>
                <div className="d-flex justify-content-center pt-4 app-title">
                  Message
                </div>

                <div className="app-desc pt-2">
                  Бесплатный мессенджер с диалогами и каналами с монетизацией
                </div>

                <div className="app-button-wrapper d-flex justify-content-center pt-4">
                  <div
                    onClick={() => {
                      BrowserHistoryHelper.moveTo('/auth/sign-in')
                    }}
                  >
                    <button>Начать общение</button>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={i} className="slider-item">
                <div className="slider-image-block">
                  <img src={item.icon} alt="good morning" style={{width: '200px'}} />
                </div>
                <div className="title">{item.title}</div>
                <div className="description" style={{maxWidth: '250px'}}>{item.description}</div>
                <div className="app-button-wrapper d-flex justify-content-center pt-4">
                  <div
                    onClick={() => {
                      BrowserHistoryHelper.moveTo('/auth/sign-in')
                    }}
                  >
                    <button>Начать общение</button>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </Slider>
    </BenefitsSliderWrap>
  )
}

export default BenefitsSlider
