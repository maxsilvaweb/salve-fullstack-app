import {
  InfoIcon,
  CheckCircleIcon,
  ShieldAlertIcon,
  MessageCircleWarning,
  CircleXIcon,
} from 'lucide-react';

type AlertType =
  | 'warning'
  | 'error'
  | 'incorrectPermissions'
  | 'noSession'
  | 'success'
  | 'information'
  | 'confirmEmailChange'
  | undefined;

interface AlertProps {
  className?: string;
  type: AlertType;
  open: boolean;
  setOpen: (open: boolean) => void;
  postMsg?: string;
}

const Alert: React.FC<AlertProps> = ({
  className,
  type,
  open,
  setOpen,
  postMsg = '',
}) => {
  // Alert type icon switch
  const typeIcon = (type: AlertType) => {
    switch (type) {
      case 'warning':
        return <ShieldAlertIcon className="mr-2 h-5 w-5 shrink-0" />;
      case 'error':
        return <ShieldAlertIcon className="mr-2 h-5 w-5 shrink-0" />;
      case 'incorrectPermissions':
        return (
          <ShieldAlertIcon className="mr-2 h-5 w-5 shrink-0 fill-current opacity-90" />
        );
      case 'noSession':
        return (
          <ShieldAlertIcon className="mr-2 h-5 w-5 shrink-0 fill-current opacity-90" />
        );
      case 'success':
        return <CheckCircleIcon className="mr-2 h-5 w-5 shrink-0" />;
      default:
        return <InfoIcon className="mr-2 h-5 w-5 shrink-0" />;
    }
  };

  // Alert background color switch
  const typeColor = (type: AlertType) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-500';
      case 'information':
        return 'bg-slate-700';
      case 'error':
      case 'incorrectPermissions':
      case 'noSession':
        return 'bg-rose-500';
      case 'success':
        return 'bg-emerald-500';
      default:
        return 'bg-blue-500';
    }
  };

  // Alert body switch
  const AlertBody = (type: AlertType) => {
    let data = { type: '', message: '' };
    switch (type) {
      case 'success':
        data = { type: 'success', message: 'Success' };
        break;
      case 'error':
        data = { type: 'error', message: 'There was an error' };
        break;
      case 'incorrectPermissions':
        data = {
          type: 'incorrect-permissions',
          message: 'Incorrect Permissions',
        };
        break;
      case 'noSession':
        data = { type: 'no-session', message: 'No Session' };
        break;
      case 'warning':
        data = { type: 'warning', message: 'Warning' };
        break;
      case 'information':
        data = { type: 'info', message: 'Information' };
        break;
      case 'confirmEmailChange':
        data = {
          type: 'confirm-email-change',
          message: 'Confirm Email Change',
        };
        break;
      default:
        data = { type: 'error', message: 'Default message!' };
    }
    return data;
  };

  return (
    <>
      {open && (
        <div className={`${className} animate-fade-in-down`}>
          <div
            className={`p-4 text-sm text-white ${typeColor(type)} rounded-md`}
          >
            <div className="flex w-full items-start justify-between">
              <div className="flex">
                <div className="inline-block align-middle font-medium">
                  <p className="mr-2 inline-block font-medium">
                    <span className="mb-0.5 inline-block align-middle">
                      {typeIcon(type)}
                    </span>
                  </p>
                  <div className="inline-block">
                    {AlertBody(type).message}
                    <span className="ml-1">{postMsg}</span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="inline-block align-middle opacity-70 hover:opacity-20"
                  onClick={() => setOpen(false)}
                >
                  <div className="sr-only">Close</div>
                  <CircleXIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
