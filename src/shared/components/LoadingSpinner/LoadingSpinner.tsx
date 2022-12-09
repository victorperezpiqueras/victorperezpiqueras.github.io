import { Spinner } from "flowbite-react";

type LoadingSpinnerProps = {
  size: string;
  loading?: boolean;
};

function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div
      className={`text-center h-40 align-middle`}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner
        size={props.size}
        className="m-4 align-text-middle"
        color="success"
      />
    </div>
  );
}

export default LoadingSpinner;
