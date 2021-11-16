import styled from 'styled-components'
import PropTypes from 'prop-types'

const AboutUserWrap = styled.div`
  font-size: 15px;
  line-height: 19px;
  font-weight: normal;
  display: flex;
  justify-content: center;

  .fullname {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.9);
  }

  .username {
    color: rgba(0, 0, 0, 0.5);
    padding-left: 4px;
  }

  .about-user {
    width: 280px;
    text-align: center;
  }
`

const AboutUser = ({ fullname, username, desc }) => {
  return (
    <AboutUserWrap>
      <div>
        <div className="d-flex justify-content-center">
          {fullname ? <div className="fullname">{fullname}</div> : undefined}
          {username ? (
            <div
              className="username"
              style={{ fontSize: '15px', fontWeight: 'normal' }}
            >
              @{username}
            </div>
          ) : undefined}
        </div>

        <div className="about-user">{desc}</div>
      </div>
    </AboutUserWrap>
  )
}

AboutUser.propTypes = {
  fullname: PropTypes.string,
  username: PropTypes.string,
  desc: PropTypes.string,
}

AboutUser.defaultProps = {
  fullname: '',
  username: '',
  desc: '',
}

export default AboutUser
