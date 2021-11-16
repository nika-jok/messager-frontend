import { useState, useRef, useEffect, useCallback } from "react";
import removeImageIcon from "../../assets/img/channels/remove-photo.svg";
import ChannelMenu from "../ChannelMenu";
import {
  APPLICATION_SERVER,
  CHANNEL_COUNT_OF_UPLOADING_MESSAGES,
} from "../../constants";
import ChannelFooter from "../ChannelFooter";
import ConnectToChannel from "../../presentation/view/channel/ConnectToChannel";
import ImagePortal from "../ImagePortal";
import List from "./List";
import DateUtils from "../../utils/DateUtils";

const ChannelMessagesList = ({
  channelInfo,
  channelRepository,
  channelId,
  levelsIds,
  isMobile,
  userId,
  channelFiles,
  channelName,
  setLastOpened,
  isUserAdmin,
  setChosedModal,
  isUserInChannel,
  setChannelInfoName,
  setAdminIdMessage,
  savedLevels,
  setShowedImageLink,
}) => {
  const channelRef = useRef();
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [page, setPage] = useState(2);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [threePointsMessageId, setThreePointsMessageId] = useState();
  const [differentDateIds, setDifferentDateIds] = useState([]);
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);

  useEffect(() => {
    setIsLoadingMessages(true);
    (async () => {
      if (userId) {
        const result = await channelRepository?.getChannelMessages(
          channelId,
          levelsIds.join(","),
          1,
          CHANNEL_COUNT_OF_UPLOADING_MESSAGES
        );
        setTotalPages(
          Math.round(result?.total / CHANNEL_COUNT_OF_UPLOADING_MESSAGES)
        );
        setMessages(result?.data);

        if (channelRef?.current) {
          channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
        }
      }
    })();
    setIsLoadingMessages(false);
  }, [levelsIds, channelId, channelRepository, userId]);

  const loadMore = useCallback(async () => {
    setIsLoadingMessages(true);
    if (totalPages >= page) {
      setIsLoading(true);
      const result = await channelRepository?.getChannelMessages(
        channelId,
        levelsIds,
        page,
        CHANNEL_COUNT_OF_UPLOADING_MESSAGES
      );

      setMessages((prev) => [...result?.data, ...prev]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    }
    setIsLoadingMessages(false);
  }, [totalPages, page, levelsIds, channelId, channelRepository]);

  const handleRemoveMessage = useCallback(async () => {
    setIsLoading(true);
    if (threePointsMessageId) {
      try {
        await channelRepository.deleteAdminMessage(threePointsMessageId);

        const filteredMessages = messages?.filter(
          (adminMessage) => adminMessage.id !== Number(threePointsMessageId)
        );
        setDifferentDateIds(filteredMessages);
        setMessages(filteredMessages);
      } catch (e) {
        alert(e);
      }
    }

    setIsShowMenuBar(false);
    setIsLoading(false);
  }, [threePointsMessageId, messages, channelRepository]);

  useEffect(() => {
    setDifferentDateIds(DateUtils.getDifferentDates(messages));
  }, [messages]);

  const createNewMessage = async (message, attachment, type) => {
    if (channelId && (message || attachment)) {
      if (savedLevels?.length) {
        return savedLevels?.forEach(async (level) => {
          try {
            setIsLoading(true);
            const result = await channelRepository.addAdminMessage(
              channelId,
              level?.id?.toString(),
              message ? message : "",
              attachment ? attachment : undefined,
              type ? type : undefined
            );

            if (result) {
              setMessages((prev) => [...prev, result[0]]);
            }
            if (channelRef?.current) {
              channelRef.current.scrollTop = channelRef?.current?.scrollHeight;
            }
          } catch (e) {
            alert(e);
          } finally {
            setIsLoading(false);
          }
        });
      }
    }
  };

  const sendAudioMessage = async (audioMessage) => {
    if (savedLevels?.length) {
      return savedLevels?.forEach(async (level) => {
        try {
          setIsLoading(true);
          console.log('audio', audioMessage)
          const result = await channelRepository.addAdminMessage(
            channelId,
            level?.id?.toString(),
            '',
            audioMessage.blob,
            "audio"
          );
          console.log('RES',result)
        } catch (e) {
          alert(e);
        } finally {
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <div>
      {messages?.length ? (
        <List
          channelRef={channelRef}
          channelInfo={channelInfo}
          isLoadingMessages={isLoadingMessages}
          messages={messages}
          differentDateIds={differentDateIds}
          setChannelInfoName={setChannelInfoName}
          setLastOpened={setLastOpened}
          isShowMenuBar={isShowMenuBar}
          isUserAdmin={isUserAdmin}
          channelFiles={channelFiles}
          isLoading={isLoading}
          loadMore={loadMore}
          page={page}
          setShowedImageLink={setShowedImageLink}
          totalPages={totalPages}
          channelName={channelName}
          setIsShowMenuBar={setIsShowMenuBar}
          setAdminIdMessage={setAdminIdMessage}
          threePointsMessageId={threePointsMessageId}
          setThreePointsMessageId={setThreePointsMessageId}
        />
      ) : undefined}

      {isUserAdmin ? (
        <ChannelFooter
          createNewMessage={createNewMessage}
          isMobile={isMobile}
          channelName={channelName}
          setLastOpened={setLastOpened}
          savedLevels={savedLevels}
          sendAudioMessage={sendAudioMessage}
        />
      ) : undefined}

      {!isUserAdmin && !isUserInChannel ? (
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: isMobile ? "100px" : "50%",
          }}
        >
          <ConnectToChannel
            setChosedModal={setChosedModal}
            userId={userId}
            isMobile={isMobile}
            setLastOpened={setLastOpened}
            levelIcon={messages ? messages[0]?.level?.level_image_link : ""}
            channelName={channelName}
            channelImage={
              channelFiles && channelFiles.length >= 1
                ? `${APPLICATION_SERVER}/files/storage/icons/${channelFiles[0].name}.${channelFiles[0].type}`
                : undefined
            }
          />
        </div>
      ) : undefined}

      {isShowMenuBar ? (
        <ChannelMenu
          handleRemoveMessage={handleRemoveMessage}
          removeImageIcon={removeImageIcon}
          setIsShowMenuBar={setIsShowMenuBar}
        />
      ) : undefined}
    </div>
  );
};

ChannelMessagesList.propTypes = {};

ChannelMessagesList.defaultProps = {};

export default ChannelMessagesList;
