import { useState, useEffect, useRef, useCallback } from "react";
import { APPLICATION_SERVER } from "../../../constants";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";
import ConnectToChannel from "./ConnectToChannel";
import StorageHelper from "../../../utils/StorageHelper";
import ChannelInfo from "../../../components/ChannelInfo";
import ChannelMessagesList from "../../../components/ChannelMessagesList";
import ChannelBottomItems from "../../../components/ChannelBottomItems";
import Loading from "../../../utils/LoadingComponent";
import ImagePortal from "../../../components/ImagePortal";

const Channel = ({
  chosedChannelName,
  setLastOpened,
  setChannelInfoName,
  channelRepository,
  levelRepository,
  isMobile,
  setChosedModal,
  goBack,
  setShouldAutoFocus,
}) => {
  // const [channelName, setChannelName] = useState();
  const [channelInfo, setChannelInfo] = useState("");
  const [channelId, setChannelId] = useState();
  const [isShowMenuBar, setIsShowMenuBar] = useState("");
  const [showedVideoLink, setShowedVideoLink] = useState("");
  const [channelFiles, setChannelFiles] = useState();
  const [userId, setUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [levels, setLevels] = useState();
  const [channelAdmins, setChannelAdmins] = useState();
  const [channelUserCount, setChannelUserCount] = useState();
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isUserInChannel, setIsUserInChannel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminIdMessage, setAdminIdMessage] = useState(false);
  const channelRef = useRef(null);
  const [levelsList, setLevelsList] = useState([]);
  const [savedLevels, setSavedLevels] = useState([]);
  const [showedLevelIds, setShowedLevelIds] = useState([]);
  const [showedImageLink, setShowedImageLink] = useState("");
  const [channelUsers, setChannelUsers] = useState(0)
  const pathName = BrowserHistoryRouter.getHistory().location.pathname;
  // debugger;
  // useEffect(() => {
  //   setChannelName(pathName.slice(1, pathName?.length));
  // }, [pathName]);

  const getChannelLevelsByChannelName = useCallback(
    async (channelId) => {
      setIsLoading(true);

      // if (channelName) {
      try {
        const levelsList = await levelRepository?.getChannelLevelsByChannelName(
          pathName.slice(1, pathName?.length)
        );
        setLevels(levelsList);

        // if (levelsList?.length) {
        //   return levelsList?.map(async (level) => {
        //     const result = await channelRepository.getAdminMessages(
        //       channelId,
        //       level.id.toString(),
        //       1
        //     )

        //     if (result) {
        //       setMessages((prev) => [...prev, ...result])
        //     }

        //     setIsLoading(false)

        //     if (channelRef?.current) {
        //       channelRef.current.scrollTop = channelRef?.current?.scrollHeight
        //     }
        //   })
        // }

        if (isUserInChannel && !isUserAdmin) {
          const subscribedLevelsIds = channelInfo?.users?.filter(
            (level) => level.user_id === Number(userId)
          );

          return subscribedLevelsIds?.map(async (level) => {
            setIsLoading(true);

            const result = await this.channelRepository.getAdminMessages(
              channelId,
              level?.level_id?.toString(),
              1
            );

            if (result) {
              await setMessages((prev) => [...prev, ...result]);
            }
            setIsLoading(false);

            if (channelRef?.current) {
              channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
            }
          });
        }

        if (savedLevels?.length) {
          return savedLevels?.forEach(async (levelId) => {
            setIsLoading(true);
            const result = await channelRepository.getAdminMessages(
              channelId,
              levelId.toString(),
              1
            );
            if (result) setMessages((prev) => [...result, ...prev]);
            setIsLoading(false);
            if (channelRef?.current) {
              channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
            }
          });
        }
      } catch (e) {
        alert(e);
        throw new Error("Error while requesting in channel");
      }
      // }

      setIsLoading(false);
    },
    [
      channelInfo,
      // channelName,
      channelRepository,
      isUserAdmin,
      isUserInChannel,
      levelRepository,
      savedLevels,
      userId,
      pathName,
    ]
  );

  useEffect(() => {
    // if (isMobile) {
    //   setChannelName(pathName.slice(1, pathName?.length));
    // }
    (async () => {
      setMessages([]);
      setUserId(StorageHelper.getUserData()?.user_id);
      if (chosedChannelName) {
        const [recievedChannelData, channelUserCount] = await Promise.all([
          channelRepository.getChannelInfoByChannelName(
            pathName.slice(1, pathName?.length)
          ),
          channelRepository.getChannelUsersCount(
            pathName.slice(1, pathName?.length)
          ),
        ]);

        const isAdmin = recievedChannelData?.channelAdmins?.length
          ? Boolean(
              recievedChannelData?.channelAdmins?.find(
                (admin) =>
                  admin?.user_id === StorageHelper.getUserData()?.user_id
              )[0]
            )
          : Object.keys(recievedChannelData)?.length
          ? Number(recievedChannelData?.channelAdmins?.user_id) ===
            Number(StorageHelper.getUserData()?.user_id)
          : false;

        const userSubscribedIdsOnLevels = recievedChannelData?.users
          ?.filter(
            (user) =>
              Number(user?.user_id) ===
              Number(StorageHelper.getUserData()?.user_id)
          )[0]
          ?.user_meta?.map((subsc) => subsc.level_id);

        const isUserSubscribed = Boolean(
          recievedChannelData?.users?.filter(
            (user) =>
              Number(user?.user_id) ===
              Number(StorageHelper.getUserData()?.user_id)
          )?.length
        );

        setChannelInfo(recievedChannelData?.channel[0]);
        console.log('recievedChannelData', recievedChannelData)
        setChannelUsers(recievedChannelData?.users.length)
        setChannelAdmins(recievedChannelData?.channelAdmins);
        setIsUserAdmin(isAdmin);
        setChannelFiles(recievedChannelData?.files);
        setIsUserInChannel(isUserSubscribed);
        getChannelLevelsByChannelName(recievedChannelData?.channel[0]?.id);
        setChannelUserCount(channelUserCount?.amount);
        setChannelId(recievedChannelData?.channel[0]?.id);

        const levelsList = await levelRepository?.getChannelLevelsByChannelName(
          pathName.slice(1, pathName?.length)
        );
        const savedLevels = (
          await levelRepository.getSelectedLevels(
            recievedChannelData?.channel[0]?.id
          )
        )
          .filter((level) => level.selected === true)
          .map((saved) => saved.level_id);
        setLevelsList(levelsList?.data);
        if (savedLevels?.length) {
          setSavedLevels(
            levelsList?.data?.filter((level) =>
              savedLevels?.includes(level?.id)
            )
          );
        } else {
          setSavedLevels(levelsList?.data);
        }

        const showedIdLevelsMessages = isAdmin
          ? levelsList?.data?.map((level) => level.id)
          : userSubscribedIdsOnLevels;
        setShowedLevelIds(showedIdLevelsMessages);
      }
    })();
  }, [channelRepository, isMobile, levelRepository, pathName]);

  return (
    <div
      className="page-container"
      style={{
        padding: 0,
        background: showedVideoLink
          ? "#996C5D"
          : isShowMenuBar
          ? "rgba(0, 0, 0, 0.05)"
          : "#ffffff",
        position: isMobile ? "fixed" : "relative",
        height: "100vh",
      }}
    >
      <div id="channel-root">
        {channelInfo && channelAdmins && !showedVideoLink ? (
          <div>
            <ChannelInfo
              isShowMenuBar={isShowMenuBar}
              isMobile={isMobile}
              setLastOpened={setLastOpened}
              channelInfo={channelInfo}
              setChannelInfoName={setChannelInfoName}
              channelUsers={channelUsers}
              channelName={pathName.slice(1, pathName?.length)}
              channelFiles={channelFiles}
              channelUserCount={channelUserCount}
              goBack={goBack}
            />

            {isLoading ? (
              <div className="d-flex justify-content-center pt-4 pb-4">
                <Loading />
              </div>
            ) : undefined}

            {(isUserAdmin || isUserInChannel) && savedLevels?.length ? (
              <>
                <ChannelMessagesList
                  levelsIds={showedLevelIds}
                  channelInfo={channelInfo}
                  channelRepository={channelRepository}
                  channelId={channelId}
                  isMobile={isMobile}
                  userId={userId}
                  channelFiles={channelFiles}
                  channelName={pathName.slice(1, pathName?.length)}
                  setLastOpened={setLastOpened}
                  isUserAdmin={isUserAdmin}
                  setChosedModal={setChosedModal}
                  isUserInChannel={isUserInChannel}
                  setChannelInfoName={setChannelInfoName}
                  setAdminIdMessage={setAdminIdMessage}
                  savedLevels={savedLevels}
                  setShowedImageLink={setShowedImageLink}
                />
              </>
            ) : (
              <ChannelBottomItems
                channelInfo={channelInfo}
                isMobile={isMobile}
                userId={userId}
                setChosedModal={setChosedModal}
                setLastOpened={setLastOpened}
                channelName={pathName.slice(1, pathName?.length)}
                channelFiles={channelFiles}
              />
            )}

            {!isUserAdmin && isUserInChannel ? (
              <ConnectToChannel
                setShouldAutoFocus={setShouldAutoFocus}
                setChosedModal={setChosedModal}
                userId={userId}
                isMobile={isMobile}
                setLastOpened={setLastOpened}
                levelIcon={messages ? messages[0]?.level?.level_image_link : ""}
                channelName={pathName.slice(1, pathName?.length)}
                channelImage={
                  channelFiles && channelFiles.length >= 1
                    ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                    : undefined
                }
              />
            ) : undefined}

            {showedImageLink ? (
              <ImagePortal
                isMobile={isMobile}
                image={showedImageLink}
                onClose={() => setShowedImageLink("")}
              />
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default Channel;
