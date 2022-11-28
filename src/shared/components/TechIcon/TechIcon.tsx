type TechIconProps = {
  tech: string;
  size?: string;
};
function TechIcon(props: TechIconProps) {
  return (
    <img
      style={{
        width: props.size ? props.size : "50px",
        height: props.size ? props.size : "50px",
      }}
      src={
        new URL(`../../../assets/techIcons/${props.tech}.png`, import.meta.url)
          .href
      }
      alt=""
    />
  );
}

export default TechIcon;
