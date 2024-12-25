import Avatar from "@mui/material/Avatar";

type props = {
  src: string | null;
  name?: string;
  sx?: any;
};

function CustomAvatar({ src, name, sx }: props) {
  if (src) {
    return <Avatar sx={{ height: 40, width: 40, ...sx }} src={src} />;
  }

  return (
    <Avatar
      sx={{
        bgcolor: (theme) => theme.palette.primary.main,
        height: 40,
        width: 40,
        ...sx,
      }}
    >
      {name?.charAt(0).toUpperCase()}
    </Avatar>
  );
}

export default CustomAvatar;
