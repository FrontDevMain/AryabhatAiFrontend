import Avatar from '@mui/material/Avatar';

type props = {
  src: string;
  name?: string;
  sx?: any;
};

function CustomAvatar({ src, name, sx }: props) {
  if (src) {
    return <Avatar sx={{ ...sx, height: 50, width: 50 }} src={src} />;
  }

  return (
    <Avatar sx={{ ...sx, bgcolor: (theme) => theme.palette.primary.main, height: 50, width: 50 }}>
      {name?.charAt(0).toUpperCase()}
    </Avatar>
  );
}

export default CustomAvatar;
