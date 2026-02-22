import Clock from "./components/Clock";
import HoverChevron from "./components/HoverChevron";

export default function Home() {
  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <HoverChevron />
      <Clock />
    </div>
  );
}
