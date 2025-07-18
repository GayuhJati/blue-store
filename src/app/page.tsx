import { Article } from "./components/Article";
import { Banner } from "./components/Banner";
import { BestSeller } from "./components/BestSeller";
import ChatWidget from "./components/ChatBox";
import { Collection } from "./components/Collection";
import Hero from "./components/Hero";
import { Testimoni } from "./components/Testimoni";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner />
      <div className="py-5">
        <Hero />
      </div>
      <div className="py-5">
        <Collection />
      </div>
      <div className="py-5">
        <BestSeller />
      </div>
      <div className="py-5">
        <Article />
      </div>
      <div className="py-5">
        <Testimoni />
      </div>
      <ChatWidget/>
    </div>
  );
}
