import styled from 'styled-components'

const AboutItemWrap = styled.div`
  .image {
    width: 200px;
    height: 200px;
  }

  .title {
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #50bcff;
    padding-top: 8px;
  }

  .image-wrap {
    text-align: center;
  }

  .desc {
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);
    padding-top: 10px;
    padding-bottom: 50px;
  }
`

interface AboutItemProps {
  image: string
  desc: string
  title: string
}

const AboutItem = (props: AboutItemProps) => {
  const { image, desc, title } = props
  return (
    <AboutItemWrap>
      <div className="image-wrap">
        <img src={image} className="image" alt="about project" />
      </div>
      <div className="title">{title}</div>
      <div className="desc">{desc}</div>
    </AboutItemWrap>
  )
}

export default AboutItem
