import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import BrowserHistoryRouter from "../../../utils/BrowserHistoryRouter";
import Menu from "../../../components/Menu/Menu";
import LoadingComponent from "../../../utils/LoadingComponent";
import ChannelItem from "./ChannelItem";
import channelIcon from "../../../assets/img/menu/create-channel.svg";
import addContactIcon from "../../../assets/img/channels/add-contact.svg";
import SearchedChannel from "./SearchedChannel";
import { APPLICATION_SERVER } from "../../../constants";
import StorageHelper from "../../../utils/StorageHelper";
import InfiniteWaypoint from "../../../components/InfiniteWayPoint";
import { CHANNEL_LIST_COUNT_OF_UPLOADING_ITEMS } from "../../../constants";
import SearchInput from "../../../components/SearchInput";

const ChannelsListComponent = (props) => {
  const {
    channelsViewModel,
    setChosedChannel,
    setInitialChosedChannelName,
    setChosedModal,
    channelNameFromLink,
    isMobile,
    setLastOpened,
  } = props;

  const [isLoading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [chosedChannelId, setChosedChannelId] = useState();
  const [search, setSearch] = useState("");
  const [searchedContactList, setSearchedContactList] = useState([]);
  const [channelsList, setChannelsList] = useState();
  const [isAlreadyHas, setAlreadyHas] = useState(false);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState();

  const loadMore = async () => {
    if (total >= page) {
      const channels = await fetch(
        `${APPLICATION_SERVER}/api/v1/subscription/${
          StorageHelper.getUserData()?.user_id
        }?currentPage=${page}&perPage=${CHANNEL_LIST_COUNT_OF_UPLOADING_ITEMS}`
      ).then((res) => res.json());
      if (channels) {
        setPage((prev) => prev + 1);
        setChannelsList((prev) => [...prev, ...channels?.data?.result]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const data = await fetch(
        `${APPLICATION_SERVER}/api/v1/subscription/${
          StorageHelper.getUserData()?.user_id
        }?currentPage=1&perPage=${1000}`
      ).then((res) => res.json());
      setTotal(Math.round(data?.total / CHANNEL_LIST_COUNT_OF_UPLOADING_ITEMS));

      if (!channelNameFromLink && !isMobile) {
        setInitialChosedChannelName(data?.data[0]?.channel?.link);
        setLastOpened("channel");
      }

      if (
        !channelNameFromLink &&
        data?.data.length &&
        data?.data[0]?.channel?.id
      ) {
        setChosedChannelId(data[0]?.channel?.id);
      }

      setChannelsList(data?.data?.result);
      setLoading(false);
    })();
  }, []);

  const [debouncedCallback] = useDebouncedCallback(async (value) => {
    if (value[0] === "@") {
      const slicedUsername = value.slice(1);
      if (!slicedUsername) return;

      const data = await channelsViewModel.getChannelsByName(slicedUsername);
      setSearchedContactList(data);
      setAlreadyHas(true);
    } else {
      if (!value) return;
      const data = await channelsViewModel.getChannelsByName(value);
      setSearchedContactList(data);
      setAlreadyHas(true);
    }
  }, 250);

  const changeInput = async (e) => {
    setAlreadyHas(false);
    setSearch(e.target.value);
    debouncedCallback(e.target.value);
  };

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: redirect,
        }}
      />
    );
  }

  return (
    <div>
      <Menu />
      <div className="search-input-wrap">
        <SearchInput placeholder="Поиск каналов" onChange={changeInput} />
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center pt-4 pb-4">
          <LoadingComponent customColor="#50BCFF" />
        </div>
      ) : (
        <div>
          {search && isAlreadyHas ? (
            searchedContactList && searchedContactList?.length ? (
              searchedContactList.map((searchedChannel) => {
                return (
                  <div className="pt-2">
                    <SearchedChannel
                      key={`channel_${searchedChannel.id}`}
                      channel={searchedChannel}
                      id={searchedChannel.id}
                      setChosedChannelId={setChosedChannelId}
                      setChosedChannel={setChosedChannel}
                      setLastOpened={setLastOpened}
                      isMobile={isMobile}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray pt-3">
                Ничего не найдено
              </div>
            )
          ) : channelsList && channelsList.length >= 1 ? (
            <div id="user-messages-block" className="messages-scrollbar">
              {channelsList?.map((channel) => {
                return (
                  <div
                    className="pt-2"
                    onClick={() => {
                      if (isMobile) {
                      BrowserHistoryRouter.moveTo(`/${channel?.link}`)
                    } else {
                      setChosedModal('channels')
                      setChosedChannelId(channel?.id)
                      setChosedChannel(channel?.link)
                      BrowserHistoryRouter.moveTo(`/${channel?.link}`)
                    }
                    }}
                  >
                    <ChannelItem
                      isChosedChannel={chosedChannelId === channel?.id}
                      key={`channel_${channel.id}`}
                      channel={channel}
                      setChosedChannelId={setChosedChannelId}
                      setChosedChannel={setChosedChannel}
                      setChosedModal={setChosedModal}
                      isMobile={isMobile}
                      id={channel.id}
                    />
                  </div>
                );
              })}
              {channelsList?.length ? (
                <InfiniteWaypoint
                  content={channelsList}
                  totalPages={total}
                  currentPage={page}
                  onEnter={loadMore}
                  direction="bottom"
                />
              ) : undefined}
            </div>
          ) : (
            <>
              <div className="text-gray text-center pt-4">
                Здесь будут показаны ваши каналы
              </div>

              <div
                className="d-flex justify-content-center pt-3 c-p"
                onClick={() => {
                  if (isMobile) {
                    BrowserHistoryRouter.moveTo("/channel/create-channel");
                  } else {
                    setChosedModal("create-channel");
                  }
                }}
              >
                <div>
                  <img src={channelIcon} alt="create channel" />
                </div>
                <div className="pl-2" style={{ paddingTop: "2px" }}>
                  Новый канал
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="centre-to-right-bottom" style={{ zIndex: 2 }}>
        <div className="text-right">
          <img
            className="c-p"
            src={addContactIcon}
            onClick={() => {
              BrowserHistoryRouter.moveTo("/channel/create-channel");
            }}
            alt="create channel"
          />
        </div>
      </div>
    </div>
  );
};

export default ChannelsListComponent;
