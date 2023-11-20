import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const username = String(formData.get("username"));
  const supabase = createRouteHandlerClient({ cookies });

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      data: {
        username,
      },
    },
  });

  console.log(error);

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${error.message}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
  const { error: error2 } = await supabase.from("users").insert({
    id: data.user.id,
    email,
    name: username,
  });

  if (error2) {
    console.log(error2);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${error2.message}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }
  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check email to continue sign in process`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}
