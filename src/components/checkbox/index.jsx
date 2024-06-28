const Checkbox = (props) => {
  const { extra, color, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={`defaultCheckbox relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center 
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition duration-[0.2s]
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${
        color ? `checked:border-none checked:bg-gray-500 dark:checked:bg-gray-400` : ` checked:border-none checked:bg-gray-500 dark:checked:bg-navy-600`
      } ${extra}`}
      name="weekly"
      {...rest}
    />
  );
};

export default Checkbox;
