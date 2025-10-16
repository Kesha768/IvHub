import { Comments } from "@/components/comments";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import PostBlock from "@/components/PostBlock";

export default function Home() {
  return (
    <div>
      <Header />
      {/* <Comments />
     */}
      <div className="px-[10px]">
        <PostBlock />
      </div>
      <Footer active1={true} />
    </div>
  );
}
