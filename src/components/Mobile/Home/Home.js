import { useCallback, useEffect, useState, lazy } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import ApiHelperMe from "../../../helpers/api/bio/me";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";
import ApiHelper from "../../../helpers/api/contacts";
import LoadingComponent from "../../../utils/LoadingComponent";
import userIcon from "../../../assets/img/channels/add-user-icon.svg";
import DisplaySearch from "../../Chats/DisplaySearch";
import Settings from "../../Settings/Settings";
import EditAccountComponent from "../../../presentation/view/settings/EditAccountComponent";
import NotificationSettingsComponent from "../../../presentation/view/notifications/NotificationsComponent";
import NotificationComponent from "../../SettingsDetailedNotifications/Settings";
import Contacts from "../../Contacts/Contacts.jsx";
import UserInfo from "../../User/User.jsx";
import ChannelsListComponent from "../../../presentation/view/channels-list/ChannelsListComponent";
import ChannelInfoComponent from "../../../presentation/view/channel-info/ChannelInfoComponent";
import NewMessage from "../../../presentation/view/messages/NewMessage";
import CreateChannelComponent from "../../../presentation/view/new-channel/CreateNewChannelComponent.tsx";
import NewContact from "../../NewContact/NewContact";
import EditChannelComponent from "../../../presentation/view/edit-channel/EditChannelComponent.tsx";
import AdminChooseLevelComponent from "../../../presentation/view/level/admin-choose-level/AdminChooseLevelComponent";
import ParticipationLevelsComponent from "../../../presentation/view/level/ParticipationLevelsComponent";
import EditParticipationLevelComponent from "../../../presentation/view/level/EditParticipationLevelComponent";
import UserUpdate from "../../UserUpdate/UserUpdate.jsx";
import WithDrawals from "../../Withdrawals/Withdrawals";
import Faq from "../../../presentation/view/faq/Faq.tsx";
import AdminAnalytics from "../../AdminAnalytics/AdminAnalytics.jsx";
import AdminPassword from "../../AdminPassword/Container.jsx";
import Admin from "../../Admin/Admin";
import AdminPayments from "../../AdminPayments/AdminPayments";
import DesktopMenu from "../../DesktopMenu/DesktopMenu";
import WithdrawalsCreate from "../../WithdrawalsCreate/WithdrawalsCreate.jsx";
import DesktopChatsList from "../../DesktopChatsList";
import CreateNewLevelComponent from "../../../presentation/view/levels/CreateNewLevelComponent";
import ChooseLevelComponent from "../../../presentation/view/level/ChooseLevelComponent";
import StorageHelper from "../../../utils/StorageHelper";
import AuthComponent from "../../../presentation/view/auth/AuthComponent";
import EnterCodeComponent from "../../../presentation/view/auth/EnterCode";
import SignUpComponent from "../../../presentation/view/auth/SignUpComponent";
import Storage from "../../../helpers/storage";
import WelcomeChannelMessage from "../../WelcomeChannelMessage";
import SearchInput from "../../SearchInput";

const PrivateMessages = lazy(() => import("../PrivateMessagesDialog"));
const ChannelComponent = lazy(() =>
  import("../../../presentation/view/channel/Channel.js")
);

const DialogsPageWrapper = styled.div`
  width: 100%;
  .new-message-block {
    position: relative;
    left: -6px;

    img {
      box-shadow: 2px 2px 20px rgb(0 0 0 / 20%);
      border-radius: 50%;
    }
  }

  .chat-block {
    width: 100%;
  }

  .avatar {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
`;

const DialogNotChosed = styled.div`
  text-align: center;
  padding-top: 30%;
  .title {
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
  }

  .sub-title {
    font-size: 15px;
    line-height: 19px;
    color: rgba(0, 0, 0, 0.5);
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .write_button {
    font-weight: bold;
    font-size: 13px;
    line-height: 17px;
    text-align: center;
    color: #ffffff;
    background: #50bcff;
    border-radius: 50px;
    width: 146px;
    height: 40px;
  }
`;

const Home = (props) => {
  const [lastOpened, setLastOpened] = useState("dialogs");
  const isAuthorized = StorageHelper?.getUserData()?.token;
  const [user, setUser] = useState({});
  const [chosedModal, setChosedModal] = useState(
    isAuthorized ? "chats" : "welcome-channel-message"
  );

  const [newContact, setNewContact] = useState({});
  const [chosedChannelName, setChosedChannel] = useState("");
  const [channelNameFromLink, setChannelNameFromLink] = useState("");
  const [openedUserIdModalInfo, setUserIdModal] = useState();
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedContactList, setSearchedContactList] = useState([]);
  const [searchedGlobalList, setSearchedGlobalList] = useState([]);
  const [isAlreadyHas, setAlreadyHas] = useState(false);
  const apiContacts = new ApiHelper();

  const apiMe = new ApiHelperMe();
  const [chosedId, setChosedId] = useState();

  const [channelInfoName, setChannelInfoName] = useState();
  const [chosedChannelNameForEdit, setChosedChannelForEdit] = useState();
  const [chosedEditLevelId, setChosedEditLevelId] = useState();
  const [chosedLevels, setChosedLevels] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = useState();
  const [transitionsHistory, setTransitionHistory] = useState([
    { modal: "dialogs", type: "left" },
    { modal: "dialogs", type: "right" },
  ]);
  const [channelIdForCreatingLevel, setChannelIdForCreatingLevel] = useState();

  const {
    children,
    levelRepository,
    editAccountViewModel,
    isMobile,
    channelsViewModel,
    channelViewModel,
    chooseLevelViewModel,
    levelsViewModel,
    channelRepository,
    editLevelViewModel,
    authViewModel,
    goBack,
  } = props;

  useEffect(() => {
    const savedChannel = Storage.get("channel_name");

    if (savedChannel) {
      setChosedChannel(savedChannel);
      setLastOpened("choose-level-subscribe");
      Storage.clear("channel_name");
    }
  }, []);

  useEffect(() => {
    setShouldAutoFocus(!shouldAutoFocus);
  }, [chosedModal, chosedId, lastOpened, chosedChannelName]);

  useEffect(() => {
    setTransitionHistory((prev) => [
      ...prev,
      { modal: chosedModal, type: "left" },
    ]);
  }, [chosedModal]);

  useEffect(() => {
    setTransitionHistory((prev) => [
      ...prev,
      { modal: lastOpened, type: "right" },
    ]);
  }, [lastOpened]);

  const openedModals = useCallback(() => {
    const left = transitionsHistory.filter(
      (transition) => transition.type === "left"
    );
    const right = transitionsHistory.filter(
      (transition) => transition.type === "right"
    );

    return [left?.pop()?.modal, right?.pop().modal];
  }, [transitionsHistory]);

  const goBackInHistoryOfTransitions = (type) => {
    const history = transitionsHistory.filter(
      (transitions) => transitions.type === type
    );

    const unChangedHistory = transitionsHistory.filter(
      (transitions) => transitions.type !== type
    );

    const changedHistory = history.slice(0, history.length - 1);

    if (type === "left") {
      setChosedModal(changedHistory[changedHistory.length - 1]?.modal);
      setLastOpened(unChangedHistory[unChangedHistory?.length - 1]?.modal);
    } else if (type === "right") {
      setLastOpened(changedHistory[changedHistory.length - 1]?.modal);
      setChosedModal(unChangedHistory[unChangedHistory?.length - 1]?.modal);
    }

    setTransitionHistory([...unChangedHistory, ...changedHistory]);
  };

  const [leftModal, rightModal] = openedModals();

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (isAuthorized) {
        const { id, avatar, balance, firstName, lastName, username, isAdmin } =
          (await apiMe.getMe()).data.bio;

        setUser({
          id,
          avatar,
          balance,
          firstName,
          lastName,
          username,
          isAdmin,
        });

        setLoading(false);
      }
    })();
  }, []);

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    if (value[0] === "@") {
      const slicedUsername = value?.slice(1);
      if (!slicedUsername) return;
      const data = await apiContacts.getGlobalUsersUsername(slicedUsername);
      setSearchedContactList(data?.data?.bio?.contacts);
      setSearchedGlobalList(data?.data?.bio?.global);
      setAlreadyHas(true);
    } else {
      if (!value) return;
      const data = await apiContacts.getGlobalUsersName(value);
      setSearchedContactList(data?.data?.bio?.contacts);
      setSearchedGlobalList(data?.data?.bio?.global);
      setAlreadyHas(true);
    }
  }, 100);

  const changeInput = useCallback(async (e) => {
    setAlreadyHas(false);
    setSearch(e.target.value);
    debouncedCallback(e.target.value);
  }, []);

  console.log(chosedChannelName);

  return (
    <DialogsPageWrapper>
      <div className="d-flex">
        {isAuthorized ? (
          <>
            <div className="d-flex">
              <DesktopMenu
                setChannelNameFromLink={setChannelNameFromLink}
                setLastOpened={setLastOpened}
                setChosedModal={setChosedModal}
                user={user}
                chosedModal={leftModal}
                goBack={goBack}
              />

              <div className="children-container">
                {!children ? (
                  <div className="w-100 h-100">
                    {leftModal === "chats" ? (
                      <div className="page-title pt-3">Сообщения</div>
                    ) : chosedModal === "channels" ||
                      leftModal === "channel-info" ? (
                      <div className="page-title pt-3">Каналы</div>
                    ) : undefined}
                    {leftModal === "chats" &&
                    (lastOpened === "dialogs" ||
                      lastOpened === "user-info" ||
                      lastOpened === "update-contact" ||
                      lastOpened === "add-contact") ? (
                      <div className="search-input-wrap">
                        <SearchInput
                          placeholder="Поиск людей"
                          onChange={changeInput}
                        />
                      </div>
                    ) : undefined}

                    {isLoading ? (
                      <div className="row justify-content-center pt-4">
                        <LoadingComponent customColor="#50BCFF" />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: !isMobile ? "388px" : "488px",
                        }}
                      >
                        {leftModal === "settings" ? (
                          <Settings
                            goBack={goBackInHistoryOfTransitions}
                            setChosedModal={setChosedModal}
                            isMobile={isMobile}
                            chosedModal={chosedModal}
                          />
                        ) : leftModal === "edit-settings" ? (
                          <EditAccountComponent
                            isMobile={isMobile}
                            goBack={goBackInHistoryOfTransitions}
                            chosedModal={chosedModal}
                            setChosedModal={setChosedModal}
                            editAccountViewModel={editAccountViewModel}
                          />
                        ) : leftModal === "admin" ? (
                          <Admin
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "admin-login" ? (
                          <AdminPassword
                            goBack={goBackInHistoryOfTransitions}
                            setChosedModal={setChosedModal}
                            isMobile={isMobile}
                          />
                        ) : leftModal === "admin-analytics" ? (
                          <AdminAnalytics
                            goBack={goBackInHistoryOfTransitions}
                            setChosedModal={setChosedModal}
                            isMobile={isMobile}
                          />
                        ) : leftModal === "admin-payments" ? (
                          <AdminPayments
                            goBack={goBackInHistoryOfTransitions}
                            setChosedModal={setChosedModal}
                            isMobile={isMobile}
                          />
                        ) : leftModal === "faq" ? (
                          <Faq
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "notifications" ? (
                          <NotificationComponent
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "create-withdrawal" ? (
                          <WithdrawalsCreate
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "notification-settings" ? (
                          <NotificationSettingsComponent
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "contacts" ? (
                          <Contacts
                            setChosedModal={setChosedModal}
                            isMobile={isMobile}
                            goBack={goBackInHistoryOfTransitions}
                            setLastOpened={setLastOpened}
                            setChosedId={setChosedId}
                            chosedModal={chosedModal}
                          />
                        ) : leftModal === "new-message" ? (
                          <NewMessage
                            goBack={goBackInHistoryOfTransitions}
                            setChosedId={setChosedId}
                            setLastOpened={setLastOpened}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "payments" ? (
                          <WithDrawals
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                          />
                        ) : leftModal === "create-channel" ? (
                          <CreateChannelComponent
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={isMobile}
                            setChosedModal={setChosedModal}
                            channelViewModel={channelsViewModel}
                          />
                        ) : leftModal === "create-level" ? (
                          <CreateNewLevelComponent
                            isMobile={false}
                            isNewChannel
                            channelIdForCreatingLevel={
                              channelIdForCreatingLevel
                            }
                            setChosedId={setChosedId}
                            chosedChannelName={chosedChannelNameForEdit}
                            goBack={goBackInHistoryOfTransitions}
                            setLastOpened={setLastOpened}
                            setChosedModal={setChosedModal}
                            setChosedChannel={setChosedChannel}
                            levelViewModel={levelsViewModel}
                            channelsViewModel={channelsViewModel}
                          />
                        ) : leftModal === "new-contact" ? (
                          <NewContact
                            newContact={{}}
                            goBack={goBackInHistoryOfTransitions}
                            isMobile={false}
                            setChosedModal={setChosedModal}
                          />
                        ) : (
                          <>
                            {search && isAlreadyHas ? (
                              (searchedContactList &&
                                searchedContactList.length) ||
                              (searchedGlobalList &&
                                searchedGlobalList.length) ? (
                                <DisplaySearch
                                  isMobile={isMobile}
                                  global={searchedGlobalList}
                                  contacts={searchedContactList}
                                  history={props.history}
                                  setChosedId={setChosedId}
                                />
                              ) : (
                                <div className="text-center text-gray pt-3">
                                  Ничего не найдено
                                </div>
                              )
                            ) : leftModal === "channels" ? (
                              <ChannelsListComponent
                                isMobile={isMobile}
                                channelNameFromLink={channelNameFromLink}
                                setChosedModal={setChosedModal}
                                setChosedChannel={setChosedChannel}
                                setInitialChosedChannelName={setChosedChannel}
                                channelsViewModel={channelsViewModel}
                                setLastOpened={setLastOpened}
                              />
                            ) : rightModal === "dialogs" ||
                              rightModal === "user-info" ||
                              rightModal === "update-contact" ? (
                              <DesktopChatsList
                                id={user?.id}
                                setChosedModal={setChosedModal}
                                isMobile={isMobile}
                                chosedId={chosedId}
                                setChosedId={setChosedId}
                                setLastOpened={setLastOpened}
                                history={props?.history}
                              />
                            ) : (
                              <>
                                <div className="text-gray text-center pt-4">
                                  Здесь будут показаны Ваши чаты
                                </div>

                                <div
                                  className="d-flex justify-content-center pt-3"
                                  onClick={() => {
                                    BrowserHistoryRouter.moveTo(
                                      "/contacts/new_contact"
                                    );
                                  }}
                                >
                                  <div>
                                    <img src={userIcon} alt="user" />
                                  </div>
                                  <div className="pl-2 c-p">Новый контакт</div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ) : undefined}
              </div>
            </div>

            <div className="chat-block w-100">
              <div style={{ margin: "auto" }}>
                {rightModal === "channel-info" ? (
                  <ChannelInfoComponent
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    key={`channel_info_component`}
                    channelName={channelInfoName}
                    setLastOpened={setLastOpened}
                    setChosedChannelForEdit={setChosedChannelForEdit}
                    channelViewModel={channelViewModel}
                  />
                ) : rightModal === "choose-level-subscribe" ? (
                  <ChooseLevelComponent
                    isMobile={false}
                    chosedChannel={chosedChannelName}
                    chooseLevelViewModel={chooseLevelViewModel}
                  />
                ) : rightModal === "edit-channel" ? (
                  <EditChannelComponent
                    path="/:channel/edit-channel"
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    setChosedModal={setLastOpened}
                    setChosedChannel={setChosedChannel}
                    channelName={chosedChannelNameForEdit}
                    key={`edit_channel_component`}
                    channelViewModel={channelViewModel}
                  />
                ) : rightModal === "choose-level" ? (
                  <AdminChooseLevelComponent
                    setChosedModal={setChosedModal}
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    channelName={chosedChannelName}
                    chosedLevels={chosedLevels}
                    setChosedLevels={setChosedLevels}
                    chooseLevelViewModel={chooseLevelViewModel}
                    channelViewModel={channelViewModel}
                  />
                ) : rightModal === "add-contact" ? (
                  <NewContact
                    newContact={newContact}
                    side="right"
                    goBack={goBackInHistoryOfTransitions}
                    isMobile={false}
                    setLastOpened={setLastOpened}
                  />
                ) : rightModal === "channel-levels" ? (
                  <ParticipationLevelsComponent
                    levelsViewModel={levelsViewModel}
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    chosedChannelName={chosedChannelNameForEdit}
                    setChosedModal={setLastOpened}
                    setChosedChannel={setChosedChannel}
                    setChannelIdForCreatingLevel={setChannelIdForCreatingLevel}
                    setChosedEditLevelId={setChosedEditLevelId}
                  />
                ) : rightModal === "edit-level" ? (
                  <EditParticipationLevelComponent
                    chosedEditLevelId={chosedEditLevelId}
                    setChosedModal={setChosedModal}
                    goBack={goBackInHistoryOfTransitions}
                    isMobile={isMobile}
                    editLevelViewModel={editLevelViewModel}
                  />
                ) : rightModal === "create-level" ? (
                  <CreateNewLevelComponent
                    isMobile={false}
                    chosedChannelName={chosedChannelNameForEdit}
                    goBack={goBackInHistoryOfTransitions}
                    setLastOpened={setLastOpened}
                    channelIdForCreatingLevel={channelIdForCreatingLevel}
                    levelViewModel={levelsViewModel}
                    channelsViewModel={channelsViewModel}
                  />
                ) : rightModal === "user-info" ? (
                  <UserInfo
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    isUpdate={isUpdate}
                    setLastOpened={setLastOpened}
                    setChosedModal={setChosedModal}
                    id={openedUserIdModalInfo}
                    setNewContact={setNewContact}
                  />
                ) : rightModal === "update-contact" ? (
                  <UserUpdate
                    id={openedUserIdModalInfo}
                    setChosedModal={setChosedModal}
                    isMobile={isMobile}
                    goBack={goBackInHistoryOfTransitions}
                    setLastOpened={setLastOpened}
                    setIsUpdate={setIsUpdate}
                    isUpdate={isUpdate}
                  />
                ) : (
                  <>
                    {rightModal === "dialogs" ? (
                      <>
                        {user?.id && chosedId ? (
                          <PrivateMessages
                            shouldAutoFocus={shouldAutoFocus}
                            readMessageInChats={() => {}}
                            setChosedModal={setChosedModal}
                            setLastOpened={setLastOpened}
                            goBack={goBackInHistoryOfTransitions}
                            setUserIdModal={setUserIdModal}
                            isMobile={isMobile}
                            id={chosedId}
                            userId={user?.id}
                            isUpdate={isUpdate}
                          />
                        ) : (
                          <DialogNotChosed>
                            <div className="title">Вы не выбрали сообщение</div>
                            <div className="sub-title">
                              Выберите одно из своих сообщений или напишите
                              новое.
                            </div>
                            <div>
                              <button
                                className="write_button"
                                onClick={() => {
                                  setChosedModal("new-message");
                                }}
                              >
                                Новое сообщение
                              </button>
                            </div>
                          </DialogNotChosed>
                        )}
                      </>
                    ) : rightModal === "channel" || channelNameFromLink ? (
                      <>
                        {channelNameFromLink || chosedChannelName ? (
                          <div className="channel-messages">
                            <ChannelComponent
                              chosedLevels={chosedLevels}
                              levelRepository={levelRepository}
                              channelRepository={channelRepository}
                              setLastOpened={setLastOpened}
                              goBack={goBackInHistoryOfTransitions}
                              setChannelInfoName={setChannelInfoName}
                              chosedChannelName={
                                chosedChannelName
                                  ? chosedChannelName
                                  : channelNameFromLink
                              }
                              isMobile={isMobile}
                              channelViewModel={channelViewModel}
                            />
                          </div>
                        ) : (
                          <div className="channel-messages">
                            <DialogNotChosed>
                              <div className="title">Вы не выбрали канал</div>
                              <div className="sub-title">
                                Выберите один из ваших каналов или создайте
                                свой.
                              </div>
                              <div>
                                <button
                                  className="write_button"
                                  onClick={() => {
                                    setChosedModal("create-channel");
                                  }}
                                >
                                  Создать канал
                                </button>
                              </div>
                            </DialogNotChosed>
                          </div>
                        )}
                      </>
                    ) : undefined}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex w-100">
            {!isMobile ? (
              <div>
                {(chosedModal || leftModal) === "welcome-channel-message" ? (
                  <WelcomeChannelMessage />
                ) : (leftModal || chosedModal) === "enter-email" ? (
                  <AuthComponent
                    isUnauthorizedScreen
                    setChosedModal={setChosedModal}
                    isMobile={false}
                    authViewModel={authViewModel}
                  />
                ) : leftModal === "enter-code" ? (
                  <EnterCodeComponent
                    isMobile={false}
                    setLastOpened={setLastOpened}
                    setChannelName={setChosedChannel}
                    isUnauthorizedScreen
                    setChosedModal={setChosedModal}
                    authViewModel={authViewModel}
                  />
                ) : leftModal === "register" ? (
                  <SignUpComponent
                    isUnauthorizedScreen
                    isMobile={false}
                    setChosedModal={setChosedModal}
                    authViewModel={authViewModel}
                  />
                ) : undefined}
              </div>
            ) : undefined}

            <div className="w-100">
              <ChannelComponent
                setChosedModal={setChosedModal}
                chosedLevels={chosedLevels}
                levelRepository={levelRepository}
                channelRepository={channelRepository}
                setLastOpened={setLastOpened}
                goBack={goBackInHistoryOfTransitions}
                setShouldAutoFocus={setShouldAutoFocus}
                setChannelInfoName={setChannelInfoName}
                chosedChannelName={BrowserHistoryRouter.getHistory().location.pathname.slice(
                  1
                )}
                isMobile={isMobile}
                channelViewModel={channelViewModel}
              />
            </div>
          </div>
        )}
      </div>
    </DialogsPageWrapper>
  );
};

export default Home;
