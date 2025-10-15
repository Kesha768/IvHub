import { Comments } from "@/components/comments";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <Comments />
      <Footer />
    </div>
  );
}
