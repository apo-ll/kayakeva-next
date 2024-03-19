import { createClient } from "@supabase/supabase-js";
import { BlurImage } from "@/components/blur-image";
import { redis } from "@/lib/redis";

export default async function Home() {
  const image = await images();
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {image &&
          image.map((imager) => <BlurImage key={imager.id} image={imager} />)}
      </div>
    </div>
  );
}

async function images() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  const cachedData = await redis.get("hello");

  if (cachedData) {
    return cachedData;
  }
  await redis.set("hello", data);
  return data;
}
