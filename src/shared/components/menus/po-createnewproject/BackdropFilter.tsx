type Props = {
  children: React.ReactNode;
  bgColor: string;
  backdropBlur: string;
};

const BackdropFilter: React.FC<Props> = ({ children, backdropBlur, bgColor }) => {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-10 flex h-full w-full items-center justify-center ${bgColor} bg-opacity-50 ${backdropBlur}`}
    >
      {children}
    </div>
  );
};

export default BackdropFilter;
