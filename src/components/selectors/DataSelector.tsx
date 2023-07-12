type Props = {
  label: string;
  htmlFor: string;
  id: string;
  name: string;
  color?: string;
  checked: boolean;
  toggle: () => void;
};

const DataSelector = ({
  label,
  htmlFor,
  id,
  name,
  color,
  checked,
  toggle,
}: Props) => {
  return (
    <div className="flex gap-2">
      <input
        className="h-[15px] w-[15px] rounded-full border-2 border-solid focus:ring-transparent"
        style={{ borderColor: color, backgroundColor: checked ? color : "" }}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={() => toggle()}
      />
      <label
        className="font-gilroy-medium text-sm font-medium leading-4 text-hunter-green"
        htmlFor={htmlFor}
      >
        {label}
      </label>
    </div>
  );
};

export default DataSelector;
