import {
  ContentCopyOutlined,
  DoneAll,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { END_POINTS } from "src/api/EndPoints";
import fetcher from "src/api/fetcher";
import { Loading } from "src/assets/icons/loading";
import { useAuthContext } from "src/auth/useAuthContext";
import { fetchChatSuccess } from "src/redux/actions/chat/ChatActions";
import { messageType } from "src/redux/actions/chat/ChatActionTypes";
import { RootState } from "src/redux/reducers";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import useTextToSpeech from "../hooks/useTextToSpeech";

function ChatCard({ item, loading }: { item: messageType; loading: boolean }) {
  const theme = useTheme();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const { CHAT } = useSelector((state: RootState) => state.chat);

  const { isSpeaking, handlePlay, handlePause, handleStop, isPaused } =
    useTextToSpeech(item.context + "");

  //toggle like
  const toggleIsLike = async (msgId: string) => {
    try {
      const body = {
        user_id: user.user_id,
        chat_id: CHAT.chat_id,
        message_ids: item.message_id,
      };
      const Response = await fetcher.put(
        END_POINTS.USER.QUERY.REACT_NOTEBOOK,
        body
      );
      if (Response.status == 200) {
        dispatch(
          fetchChatSuccess({
            ...CHAT,
            messages: CHAT.messages.map((item) =>
              item.message_id == msgId
                ? { ...item, is_Liked: item.is_Liked == 1 ? 0 : 1 }
                : item
            ),
          })
        );
      }
    } catch (error) {}
  };

  if (loading) {
    return (
      <Stack
        sx={{
          alignItems: item.type == "aryabhat" ? "start" : "flex-end",
          my: 2,
        }}
      >
        <Card sx={{ p: 1, maxWidth: "60%", boxShadow: "none" }}>
          <Loading />
        </Card>
      </Stack>
    );
  }
  return (
    <Stack
      sx={{
        alignItems: item.type == "aryabhat" ? "start" : "flex-end",

        mb: item.type == "aryabhat" ? 6 : 2,
      }}
      key={item.message_id}
    >
      <Card
        sx={{
          p: 2,
          maxWidth: { xs: "80%", lg: "60%" },
          boxShadow: "none",
          overflow: "visible",
          position: "relative",
          // backgroundColor:
          //   item.type == "aryabhat"
          //     ? "default"
          //     : alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Typography>{item.context}</Typography>
        {item.type == "aryabhat" && (
          <Box sx={{ position: "absolute", bottom: -40, right: 0 }}>
            {isSpeaking ? (
              <Chip label="Stop" size="small" onClick={handleStop} />
            ) : (
              <Chip label="Read Aloud" size="small" onClick={handlePlay} />
            )}
            <Tooltip
              placement="top"
              title={isCopied ? "copied" : "copy"}
              onClick={() => toggleIsLike(item.message_id)}
            >
              <IconButton
                color="primary"
                onClick={() => copyToClipboard(item.context + "")}
              >
                {isCopied ? (
                  <DoneAll fontSize="small" />
                ) : (
                  <ContentCopyOutlined fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              placement="top"
              title={!item.is_Liked ? "like" : null}
              onClick={() => toggleIsLike(item.message_id)}
            >
              <IconButton color="primary" aria-label="like">
                {item.is_Liked ? (
                  <Favorite fontSize="small" />
                ) : (
                  <FavoriteBorderOutlined fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Card>
      {/* {item.type == "aryabhat" && (
        <Box sx={{ alignSelf: "end", maxWidth: { xs: "80%", lg: "60%" } }}>
          {" "}
          <IconButton color="primary" aria-label="like">
            <FavoriteOutlined />
          </IconButton>
          <IconButton color="secondary" aria-label="share">
            <ShareOutlined />
          </IconButton>
          <IconButton aria-label="more options">
            <MoreVertOutlined />
          </IconButton>
        </Box>
      )} */}
    </Stack>
  );
}

export default ChatCard;
