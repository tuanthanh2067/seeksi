import toast from "react-hot-toast";

import GameIcon from "../../assets/game.png";

const GameRequestToast = (
  content,
  name,
  gameRequestId,
  chatRoomId,
  handleAccept,
  handleDecline
) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={GameIcon}
                alt="game icon"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="mt-1 text-sm text-gray-500">{content}</p>
            </div>
          </div>
        </div>
        {/* <div className="flex border-l border-gray-200 divide-x divide-gray-200">
          <button
            onClick={() => {
              handleDecline(gameRequestId, chatRoomId);
              toast.remove(t.id);
            }}
            className="w-full border border-transparent rounded-none p-2 flex items-center justify-center text-sm font-medium text-primary hover:bg-gray-100 focus:outline-none"
          >
            Decline
          </button>
          <button
            onClick={() => {
              handleAccept(gameRequestId, chatRoomId);
              toast.remove(t.id);
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-primary hover:bg-gray-100 focus:outline-none"
          >
            Accept
          </button>
        </div> */}
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.remove(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary hover:bg-gray-100 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 10000,
    }
  );
};

export default GameRequestToast;
