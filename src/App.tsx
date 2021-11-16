import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

import { Router, Route, Switch } from 'react-router-dom'
import BrowserHistoryHelper from './utils/BrowserHistoryRouter'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import AuthListener from './data/models/AuthListener'

import LoadingComponent from './presentation/ui/loading/Loading'
import Welcome from './presentation/view/welcome/Welcome'
import AuthRepository from './data/models/auth/AuthApiRepository'
import ChannelApiRepositoryImpl from './data/api/channel/ChannelApiRepositoryImpl'
import ChannelApiRepository from './data/models/membership/ChannelApiRepository'
import PaymentApiRepositoryImpl from './data/api/payment/PaymentApiRepositoryImpl'
import PaymentRepository from './data/models/payment/PaymentApiRepository'
import SubscriptionApiRepository from './data/models/subscription/SubscriptionApiRepository'
//@ts-ignore
import SubscriptionApiRepositoryImpl from './data/api/subscription/SubscriptionApiRepositoryImpl'
import ChannelsViewModelImpl from './presentation/view-model/channels/ChannelsViewModelImpl'
import AuthRepositoryImpl from './data/api/auth/AuthApiRepositoryImpl'
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl'
import AuthViewModel from './presentation/view-model/auth/AuthViewModel'
import LevelsViewModelImpl from './presentation/view-model/levels/LevelsViewModelImpl'
import ChannelsViewModel from './presentation/view-model/channels/ChannelsViewModel'
import ChannelViewModelImpl from './presentation/view-model/channels/ChannelViewModelImpl'
import ChannelViewModel from './presentation/view-model/channels/ChannelViewModel'
import LevelsViewModel from './presentation/view-model/levels/LevelsViewModel'
import LevelApiRepositoryImpl from './data/api/level/LevelApiRepositoryImpl'
import LevelApiRepository from './data/models/level/LevelApiRepository'
import EditLevelViewModel from './presentation/view-model/levels/edit-level/EditLevelViewModel'
import EditLevelViewModelImpl from './presentation/view-model/levels/edit-level/EditLevelViewModelImpl'
import ChooseLevelViewModel from './presentation/view-model/levels/choose-level/ChooseLevelViewModel'
import ChooseLevelViewModelImpl from './presentation/view-model/levels/choose-level/ChooseLevelViewModelImpl'
import EditAccountViewModel from './presentation/view-model/settings/EditAccountViewModel'
import EditAccountViewModelImpl from './presentation/view-model/settings/EditAccountViewModelImpl'
import Menu from './components/Menu/Menu'
import BrowserHistoryRouter from './utils/BrowserHistoryRouter'
import addMessageIcon from './assets/img/channels/add-contact.svg'
import NewMessage from './presentation/view/messages/NewMessage'
import socket from './helpers/socket'
import StorageHelper from './utils/StorageHelper'
import sendNotification from './helpers/notifications'
import { APPLICATION_SERVER } from './constants'
import uploadIcon from './assets/img/channels/upload-image.svg'

// store
const store = createStore(rootReducer)

const App = (): JSX.Element => {
  //repositories
  const authRepository: AuthRepository = new AuthRepositoryImpl()
  const channelRepository: ChannelApiRepository = new ChannelApiRepositoryImpl()
  const levelRepository: LevelApiRepository = new LevelApiRepositoryImpl()
  const paymentRepository: PaymentRepository = new PaymentApiRepositoryImpl()
  const subscriptionRepository: SubscriptionApiRepository =
    new SubscriptionApiRepositoryImpl()

  //view-models
  const channelsViewModel: ChannelsViewModel = new ChannelsViewModelImpl(
    channelRepository,
    authRepository
  )
  const channelViewModel: ChannelViewModel = new ChannelViewModelImpl(
    channelRepository,
    levelRepository
  )
  const authViewModel: AuthViewModel = new AuthViewModelImpl(authRepository)
  const levelsViewModel: LevelsViewModel = new LevelsViewModelImpl(
    channelRepository,
    levelRepository
  )
  const editLevelViewModel: EditLevelViewModel = new EditLevelViewModelImpl(
    levelRepository
  )
  const chooseLevelViewModel: ChooseLevelViewModel =
    new ChooseLevelViewModelImpl(
      levelRepository,
      paymentRepository,
      subscriptionRepository,
      channelRepository
    )
  const editAccountViewModel: EditAccountViewModel =
    new EditAccountViewModelImpl(authRepository)

  //lazy loading of components
  const CreateChannelComponent = lazy(
    () => import('./presentation/view/new-channel/CreateNewChannelComponent')
  )
  const ChannelComponentMobile = lazy(
    () => import('./presentation/view/channel/ChannelComponent')
  )
  const NotificationComponent = lazy(
    () => import('./presentation/view/notifications/NotificationsComponent')
  )
  const Terms = lazy(() => import('./presentation/view/terms/Terms'))
  const Faq = lazy(() => import('./presentation/view/faq/Faq'))
  const PrivatePolicy = lazy(
    () => import('./presentation/view/privacy-policy/PrivacyPolicy')
  )
  const AuthComponent = lazy(
    () => import('./presentation/view/auth/AuthComponent')
  )
  const CreateNewLevelComponent = lazy(
    () => import('./presentation/view/levels/CreateNewLevelComponent')
  )
  const ParticipationLevelsComponent = lazy(
    () => import('./presentation/view/level/ParticipationLevelsComponent')
  )
  const InviteUsersComponent = lazy(
    () => import('./presentation/view/invite-users/InviteUsersComponent')
  )
  const ChannelComponent = lazy(
    () => import('./presentation/view/channel/Channel')
  )
  const ChannelInfoComponent = lazy(
    () => import('./presentation/view/channel-info/ChannelInfoComponent')
  )
  const MembersOfChannel = lazy(
    () =>
      import('./presentation/view/members-of-channel/MembersOfChannelComponent')
  )
  const ChannelAdminsComponent = lazy(
    () => import('./presentation/view/channel-admins/ChannelAdminsComponent')
  )

  const EnterCodeComponent = lazy(
    () => import('./presentation/view/auth/EnterCode')
  )

  const NotFoundComponent = lazy(
    () => import('./presentation/view/errors/NotFoundComponent')
  )
  const Chats = lazy(() => import('./components/Chats/Container'))
  const NewContact = lazy(() => import('./components/NewContact/NewContact'))
  const Settings = lazy(() => import('./components/Settings/Settings'))
  const Admin = lazy(() => import('./components/Admin/Admin'))
  const AdminPayments = lazy(
    () => import('./components/AdminPayments/AdminPayments')
  )
  const AdminAnalytics = lazy(
    () => import('./components/AdminAnalytics/AdminAnalytics')
  )
  const Contacts = lazy(() => import('./components/Contacts/Contacts'))
  const User = lazy(() => import('./components/User/Container'))
  const UserUpdate = lazy(() => import('./components/UserUpdate/UserUpdate'))
  const PrivateMessages = lazy(
    () => import('./components/PrivateMessages/Container')
  )
  const WithdrawalsCreate = lazy(
    () => import('./components/WithdrawalsCreate/WithdrawalsCreate')
  )
  const Withdrawals = lazy(() => import('./components/Withdrawals/Withdrawals'))

  const AdminPassword = lazy(
    () => import('./components/AdminPassword/Container')
  )
  const Home = lazy(() => import('./components/Mobile/Home/Home'))
  const ChooseLevelComponent = lazy(
    () => import('./presentation/view/level/ChooseLevelComponent')
  )
  const EditParticipationLevelComponent = lazy(
    () => import('./presentation/view/level/EditParticipationLevelComponent')
  )
  const UnsuccessfulPayment = lazy(
    () => import('./presentation/view/errors/UnsuccessfulPayment')
  )
  const AdminChooseLevelComponent = lazy(
    () =>
      import(
        './presentation/view/level/admin-choose-level/AdminChooseLevelComponent'
      )
  )
  const MenuFooter = lazy(() => import('./components/Menu/MenuFooter'))
  const EditAccountComponent = lazy(
    () => import('./presentation/view/settings/EditAccountComponent')
  )
  const SignUpComponent = lazy(
    () => import('./presentation/view/auth/SignUpComponent')
  )
  const EditChannelComponent = lazy(
    () => import('./presentation/view/edit-channel/EditChannelComponent')
  )
  const ChannelsListComponent = lazy(
    () => import('./presentation/view/channels-list/ChannelsListComponent')
  )
  const About = lazy(() => import('./presentation/view/about/About'))
  const SettingsNotifications = lazy(
    () => import('./components/SettingsDetailedNotifications/Settings')
  )

  const [isAuthorized, setAuthorized] = useState(authRepository.isAuthorized())
  useEffect(() => {
    const authListener: AuthListener = {
      onAuthStatusChanged(): void {
        setAuthorized(authRepository.isAuthorized())
      },
    }
    authRepository.addAuthListener(authListener)
  })
  const [isMobile, setIsMobile] = useState(false)
  const desktopRouters = ['/', '/private/messages']
  const [initialScreenHeight, setInitialScreenHeight] = useState()
  useEffect(() => {
    setInitialScreenHeight(document.body.clientHeight)
  }, [document.body.clientHeight])

  const resizeHandler = useCallback(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }

    if (initialScreenHeight === document.body.clientWidth) {
      if (
        !desktopRouters.includes(
          BrowserHistoryRouter.getHistory().location.pathname
        )
      ) {
        BrowserHistoryRouter.moveTo('/')
        window.location.reload()
      }
    }
  }, [document.body.clientWidth])

  useEffect(() => {
    if (document.body.clientWidth <= 1008) {
      setIsMobile(true)
    }

    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  useEffect(() => {
    socket.getSocket().on('private_message', (data) => {
      const recipientId =
        data?.user1.id !== data?.senderId ? data?.user1.id : data?.user2.id
      if (StorageHelper.getUserData()?.user_id === recipientId) {
        const userData =
          data?.user1.id === data?.senderId ? data?.user1 : data?.user2
        return sendNotification(
          data.displayedName || data.firstName || data.email || 'New message!',
          {
            body: data.type === 'text' ? data.text : 'Message',
            dir: 'auto',
            icon: userData?.avatar
              ? `${APPLICATION_SERVER}/files/${userData?.avatar}`
              : uploadIcon,
          },
          () => {
            return window.open(
              `${APPLICATION_SERVER}/messages/private/${data.senderId}`,
              '_blank'
            )
          }
        )
      }
    })

    return () => {
      socket.getSocket().off('private_message')
    }
  }, [])

  return (
    <Provider store={store}>
      <Router history={BrowserHistoryHelper.getHistory()}>
        <div className={isMobile ? 'container' : ''} id="app-root">
          <div>
            <Switch>
              <Route exact path="/auth/sign-in">
                <Suspense fallback={<LoadingComponent />}>
                  <AuthComponent
                    isMobile={isMobile}
                    isUnauthorizedScreen={false}
                    authViewModel={authViewModel}
                  />
                </Suspense>
              </Route>

              <Route exact path="/auth/sign-up">
                <Suspense fallback={<LoadingComponent />}>
                  <SignUpComponent
                    isMobile={isMobile}
                    authViewModel={authViewModel}
                  />
                </Suspense>
              </Route>

              <Route exact path="/auth/enter-code">
                <Suspense fallback={<LoadingComponent />}>
                  <EnterCodeComponent
                    isMobile={isMobile}
                    authViewModel={authViewModel}
                  />
                </Suspense>
              </Route>
              {!isMobile ? (
                <>
                  <Route
                    exact
                    path={[
                      isAuthorized ? '/' : undefined,
                      '/:channel',
                      '/messages/private/:id',
                    ]}
                  >
                    <Suspense fallback={<LoadingComponent />}>
                      <Home
                        authViewModel={authViewModel}
                        levelRepository={levelRepository}
                        channelRepository={channelRepository}
                        levelsViewModel={levelsViewModel}
                        chooseLevelViewModel={chooseLevelViewModel}
                        editLevelViewModel={editLevelViewModel}
                        isMobile={isMobile}
                        editAccountViewModel={editAccountViewModel}
                        channelViewModel={channelViewModel}
                        channelsViewModel={channelsViewModel}
                      />
                    </Suspense>
                  </Route>

                  {!isAuthorized ? (
                    <Route exact path="/">
                      <Suspense fallback={<LoadingComponent />}>
                        <Welcome isMobile={isMobile} />
                      </Suspense>
                    </Route>
                  ) : undefined}
                </>
              ) : (
                <>
                  {isAuthorized ? (
                    <Route exact path="/">
                      <Suspense fallback={<LoadingComponent />}>
                        <MenuFooter isMobile>
                          <Chats isMobile={isMobile} />
                        </MenuFooter>
                      </Suspense>
                    </Route>
                  ) : undefined}

                  <Route exact path="/:channel">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChannelComponent
                        levelRepository={levelRepository}
                        channelRepository={channelRepository}
                        chosedChannelName={BrowserHistoryRouter.getHistory().location.pathname.slice(
                          1
                        )}
                        isMobile
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/info">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChannelInfoComponent
                        key={`channel_info_component`}
                        isMobile
                        path="/:channel/info"
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/choose-level">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChooseLevelComponent
                        key={`choose-level_component`}
                        path="/:channel/choose-level"
                        isMobile
                        chooseLevelViewModel={chooseLevelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/admin/choose-level">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminChooseLevelComponent
                        isMobile
                        path="/:channel/admin/choose-level"
                        key={`choose-admin-level_component`}
                        chooseLevelViewModel={chooseLevelViewModel}
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/admin">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChannelComponent
                        path="/:channel/admin"
                        key={`channel_admin_component`}
                        isMobile
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/participation-levels">
                    <Suspense fallback={<LoadingComponent />}>
                      <ParticipationLevelsComponent
                        isMobile={isMobile}
                        path="/:channel/participation-levels"
                        key={`channel_levels_component`}
                        levelsViewModel={levelsViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/edit-channel">
                    <Suspense fallback={<LoadingComponent />}>
                      <EditChannelComponent
                        isMobile
                        path="/:channel/edit-channel"
                        key={`edit_channel_component`}
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/edit-level">
                    <Suspense fallback={<LoadingComponent />}>
                      <EditParticipationLevelComponent
                        path="/:channel/edit-level"
                        isMobile
                        key={`edit_channel_level_component`}
                        editLevelViewModel={editLevelViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/:channel/channel-admins">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChannelAdminsComponent isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/new-message">
                    <Suspense fallback={<LoadingComponent />}>
                      <NewMessage isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/channels">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <ChannelsListComponent
                          isMobile={isMobile}
                          channelsViewModel={channelsViewModel}
                        />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/account/notifications">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <>
                          <NotificationComponent isMobile />

                          <div
                            className="w-100 centre-to-right-bottom"
                            onClick={() => {
                              BrowserHistoryRouter.moveTo(
                                '/account/new-message'
                              )
                            }}
                          >
                            <div className="text-right">
                              <img
                                className="c-p"
                                src={addMessageIcon}
                                alt="add message"
                              />
                            </div>
                          </div>
                        </>
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/users/:id">
                    <Suspense fallback={<LoadingComponent />}>
                      <User isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/admin/login">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminPassword isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/edit">
                    <Suspense fallback={<LoadingComponent />}>
                      <EditAccountComponent
                        isMobile={isMobile}
                        editAccountViewModel={editAccountViewModel}
                      />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/settings">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <Settings isMobile={isMobile} />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/settings/detailed/notifications">
                    <Suspense fallback={<LoadingComponent />}>
                      <SettingsNotifications isMobile={isMobile} />
                    </Suspense>
                  </Route>
                  <Route exact path="/contacts/new_contact">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <NewContact isMobile />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/account/contacts">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <Contacts isMobile={isMobile} />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/messages/private/:id">
                    <Suspense fallback={<LoadingComponent />}>
                      <PrivateMessages isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/users/change/:id">
                    <Suspense fallback={<LoadingComponent />}>
                      <UserUpdate isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/admin/administrating">
                    <Suspense fallback={<LoadingComponent />}>
                      <Admin isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/admin/payments">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminPayments isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/withdrawals">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter>
                        <Withdrawals isMobile />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  <Route exact path="/admin/analytics">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminAnalytics isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/create-withdrawals">
                    <Suspense fallback={<LoadingComponent />}>
                      <WithdrawalsCreate isMobile />
                    </Suspense>
                  </Route>
                  <Route exact path="/account/notifications">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter isMobile>
                        <NotificationComponent isMobile />
                      </MenuFooter>
                    </Suspense>
                  </Route>
                  {!isAuthorized ? (
                    <Route exact path="/">
                      <Suspense fallback={<LoadingComponent />}>
                        <Welcome isMobile={isMobile} />
                      </Suspense>
                    </Route>
                  ) : undefined}

                  <Route exact path="/account/terms">
                    <Suspense fallback={<LoadingComponent />}>
                      <Terms isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/privacy">
                    <Suspense fallback={<LoadingComponent />}>
                      <PrivatePolicy isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/faq">
                    <Suspense fallback={<LoadingComponent />}>
                      <Faq isMobile={isMobile} />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/about">
                    <Suspense fallback={<LoadingComponent />}>
                      <About isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/:channel/info">
                    <Suspense fallback={<LoadingComponent />}>
                      <ChannelInfoComponent
                        key={`channel_info_component`}
                        path="/:channel/info"
                        isMobile
                        channelViewModel={channelViewModel}
                      />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/about">
                    <Suspense fallback={<LoadingComponent />}>
                      <About isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/terms">
                    <Suspense fallback={<LoadingComponent />}>
                      <Terms isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/privacy">
                    <Suspense fallback={<LoadingComponent />}>
                      <PrivatePolicy isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/faq">
                    <Suspense fallback={<LoadingComponent />}>
                      <Faq isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/channel/create-channel">
                    <Suspense fallback={<LoadingComponent />}>
                      <CreateChannelComponent
                        isMobile
                        channelViewModel={channelsViewModel}
                      />
                    </Suspense>
                  </Route>

                  <Route exact path="/channel/create-level">
                    <Suspense fallback={<LoadingComponent />}>
                      <CreateNewLevelComponent
                        isMobile
                        levelViewModel={levelsViewModel}
                        channelsViewModel={channelsViewModel}
                      />
                    </Suspense>
                  </Route>

                  <Route exact path="/payment/unsuccessful">
                    <Suspense fallback={<LoadingComponent />}>
                      <UnsuccessfulPayment />
                    </Suspense>
                  </Route>

                  <Route exact path="/contacts/new_contact">
                    <Suspense fallback={<LoadingComponent />}>
                      <NewContact isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/account/withdrawals">
                    <Suspense fallback={<LoadingComponent />}>
                      <MenuFooter>
                        <Withdrawals isMobile />
                      </MenuFooter>
                    </Suspense>
                  </Route>

                  <Route exact path="/admin/administrating">
                    <Suspense fallback={<LoadingComponent />}>
                      <Admin isMobile />
                    </Suspense>
                  </Route>

                  <Route exact path="/admin/login">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminPassword />
                    </Suspense>
                  </Route>

                  <Route exact path="/admin/payments">
                    <Suspense fallback={<LoadingComponent />}>
                      <AdminPayments isMobile />
                    </Suspense>
                  </Route>

                  {/* <Route exact path="*">
                    <Suspense fallback={<LoadingComponent />}>
                      <NotFoundComponent />
                    </Suspense>
                  </Route> */}
                </>
              )}
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
