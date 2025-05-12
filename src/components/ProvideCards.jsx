import { HoverEffect } from "./UI/ProvideCard";
import Smartphone from '@mui/icons-material/Smartphone';
import TabletAndroid from "@mui/icons-material/TabletAndroid";
import ConnectedTv from '@mui/icons-material/ConnectedTv';
import LaptopChromebook from '@mui/icons-material/LaptopChromebook';
import SportsEsports from '@mui/icons-material/SportsEsports';
import Vrpano from '@mui/icons-material/Vrpano';
 function ProvideCards() {
  return (
    <div className="max-w-8xl mr-20">
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "SmartPhones",
    description:
      "A technology company that builds economic infrastructure for the internet.",
      logo: <Smartphone sx={{ fontSize: '24px', color: '#B37FD1' }} />,
  },
  {
    title: "Tablet",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      logo: <TabletAndroid sx={{ fontSize: '24px', color: '#B37FD1' }} />,
  },
  {
    title: "Smart TV",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
      logo: <ConnectedTv sx={{ fontSize: '24px', color: '#B37FD1' }} />,
  },
  {
    title: "Laptops",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      logo: <LaptopChromebook sx={{ fontSize: '24px', color: '#B37FD1' }} />,
  },
  {
    title: "Gaming Console",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      logo: <SportsEsports sx={{ fontSize: '24px', color: '#B37FD1' }} />,

  },
  {
    title: "VR Headset",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      logo: <Vrpano sx={{ fontSize: '24px', color: '#B37FD1' }} />,

  },
];
export default ProvideCards;
