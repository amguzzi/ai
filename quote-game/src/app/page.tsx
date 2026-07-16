import { CARDS } from "@/lib/cards";
import { Game } from "@/components/Game";

export default function HomePage() {
  return <Game cards={CARDS} />;
}
