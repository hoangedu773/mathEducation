import { getAllLessons } from "@/lib/data";
import BaiCuClient from "@/components/BaiCuClient";

export default function BaiCuPage() {
  const lessons = getAllLessons();
  return <BaiCuClient lessons={lessons} />;
}
