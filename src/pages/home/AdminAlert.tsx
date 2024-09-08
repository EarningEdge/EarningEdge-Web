
import moment from 'moment';
import useFetchData from '../../hooks/useFetch';

const AdminAlert = () => {
    const { data: alert } = useFetchData<{status: string; data: { _id: string; createdAt: string; value: string }[]}>("/adminAlert/getAlerts");
      const renderAlert = (alert: {
        _id: string;
        createdAt: string;
        value: string;
      }) => (
        <div className="relative border-darkStroke px-3 py-3 rounded-md border-[0.4px] my-3 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[0px] right-[20px] w-96 h-96 bg-green-500 bg-opacity-45 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          </div>
          <p className="text-white z-10 relative">{alert.value}</p>
          <p className="text-white z-10 relative">
            {moment(alert.createdAt).fromNow()}
          </p>
        </div>
      );
  return (
    alert?.data?.map(renderAlert)
  )
}

export default AdminAlert