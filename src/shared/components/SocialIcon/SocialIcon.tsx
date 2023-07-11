type SocialIconProps = {
  cssClasses: string;
  link: string;
  icon: JSX.Element;
};
function SocialIcon(props: SocialIconProps) {
  return (
    <a href={props.link} target="_blank">
      <button
        type="button"
        className={`${props.cssClasses} drop-shadow-xl border border-solid border-white border-opacity-20 hover:filter-none rounded-full p-2 text-center transition ease-in-out hover:rotate-360 duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500`}
      >
        <span>{props.icon}</span>
      </button>
    </a>
  );
}

export default SocialIcon;
