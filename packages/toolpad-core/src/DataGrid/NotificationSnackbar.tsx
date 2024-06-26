import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { GridApi, GridRowId } from '@mui/x-data-grid';
import useLatest from '@toolpad/utils/hooks/useLatest';
import { useNonNullableContext } from '@toolpad/utils/react';
import CloseIcon from '@mui/icons-material/Close';

export interface DataGridNotification {
  key: string;
  severity: 'error' | 'success';
  message: React.ReactNode;
  showId?: GridRowId;
}

export const SetDataGridNotificationContext = React.createContext<React.Dispatch<
  React.SetStateAction<DataGridNotification | null>
> | null>(null);

export interface NotificationSnackbarProps {
  notification: DataGridNotification | null;
  apiRef: React.MutableRefObject<GridApi>;
  idField: string;
}

/**
 * @ignore - internal component.
 */
export function NotificationSnackbar({ notification, apiRef, idField }: NotificationSnackbarProps) {
  const latestNotification = useLatest(notification);
  const open = !!notification;
  const setNotification = useNonNullableContext(SetDataGridNotificationContext);

  return (
    <Snackbar
      key={latestNotification?.key}
      sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, m: 2 }}
      open={open}
      autoHideDuration={5000}
      onClose={() => setNotification(null)}
    >
      <Alert
        severity={latestNotification?.severity}
        onClose={() => setNotification(null)}
        sx={{ width: '100%' }}
        action={
          <React.Fragment>
            {typeof latestNotification?.showId === 'undefined' ? null : (
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  apiRef.current.setFilterModel({
                    items: [
                      {
                        field: idField,
                        operator: 'equals',
                        value: String(latestNotification.showId),
                      },
                    ],
                  });
                  setNotification(null);
                }}
              >
                Show
              </Button>
            )}
            <IconButton
              size="small"
              aria-label="Close"
              title="Close"
              color="inherit"
              onClick={() => setNotification(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        {latestNotification?.message}
      </Alert>
    </Snackbar>
  );
}
