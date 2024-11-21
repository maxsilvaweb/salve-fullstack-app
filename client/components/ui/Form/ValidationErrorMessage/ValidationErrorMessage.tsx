import PropTypes from 'prop-types';
import { ShieldAlertIcon } from 'lucide-react';
const ValidationErrorMessage = ({ data }) => (
  <>
    {data && (
      <>
        <div className="mt-4 block w-fit rounded-sm bg-slate-900 px-2 pb-1 text-sm text-red-200">
          <ShieldAlertIcon className="relative mr-1 inline-block h-4 w-4" />
          <span className="relative top-[1.5px]">{data.message}</span>
        </div>
      </>
    )}
  </>
);

ValidationErrorMessage.propTypes = {
  data: PropTypes.object,
};

export default ValidationErrorMessage;
