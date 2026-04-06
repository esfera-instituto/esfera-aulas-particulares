import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  try {
    const { status } = await request.json();

    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", params.id);

    if (error) {
      console.error("PATCH ERROR:", error);
      return Response.json({ ok: false }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("PATCH GERAL:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}