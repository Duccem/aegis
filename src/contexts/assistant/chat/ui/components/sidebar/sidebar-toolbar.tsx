type Props = {
  onNewChat: () => void;
};

export function Toolbar({ onNewChat }: Props) {
  return (
    <button onClick={onNewChat} type="button">
      <div className="left-4 right-4 absolute z-30 bottom-4 flex items-center justify-center">
        <div className="bg-background border rounded-lg h-8 w-full justify-between items-center flex p-2 space-x-4 text-[#878787]">
          <div className="flex items-center space-x-3">
            <span className="text-xs">New chat</span>
          </div>
        </div>
      </div>
    </button>
  );
}
