import DisplayUser from './DisplayUser'
import styled from 'styled-components'

const DisplaySearchWrap = styled.div`
  padding-left: 17px;

  .global-search {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 30px;
    padding-bottom: 20px;
  }
`

function Me(props) {
  const { global, contacts, setChosedId, isMobile } = props

  return (
    <DisplaySearchWrap>
      {contacts.length ? (
        <div>
          {contacts.map((displayedUser) => (
            <DisplayUser
              isMobile={isMobile}
              key={`displayed_user_${displayedUser.id}`}
              user={displayedUser}
              type="contact"
              setChosedId={setChosedId}
            />
          ))}
        </div>
      ) : null}
      <div>
        {global.length ? (
          <div>
            <div className="global-search">Глобальный поиск</div>
            {global.map((displayedUser) => (
              <DisplayUser
                isMobile={isMobile}
                key={`displayed_user_${displayedUser.id}`}
                user={displayedUser}
                type="global"
                setChosedId={setChosedId}
              />
            ))}
          </div>
        ) : null}
      </div>
    </DisplaySearchWrap>
  )
}

export default Me
