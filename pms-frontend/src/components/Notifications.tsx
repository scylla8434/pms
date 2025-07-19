import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { markAsRead, clearNotifications } from '../features/notificationsSlice';

const Notifications: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);

  const handleClose = (id: string) => {
    setOpen(false);
    dispatch(markAsRead(id));
  };

  React.useEffect(() => {
    setOpen(true);
  }, [notifications]);

  if (!notifications.length) return null;

  const latest = notifications[notifications.length - 1];

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={() => handleClose(latest.id)}>
      <Alert
        onClose={() => handleClose(latest.id)}
        severity={latest.type}
        sx={{ width: '100%' }}
        action={
          <IconButton size="small" color="inherit" onClick={() => handleClose(latest.id)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {latest.message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
