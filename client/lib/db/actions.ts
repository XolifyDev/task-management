"use server";

import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./schema";

export const getUserData = async () => {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const { data } = await supabase.auth.getSession();

  console.log(data);

  if (!data.session) return null;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.session.user.id)
    .single();

  if (!user) return null;

  return user;
};

export async function getCompaniesImIn() {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const user = await getUserData();
  if (!user) return [];
  const companies = await supabase
    .from("usercompanies")
    .select("*, company:companies(*), user:users(*)")
    .eq("user_id", user.id);

  return companies;
}

export async function getMyCompanies() {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const user = await getUserData();
  if (!user) return [];
  const companies = await supabase
    .from("companies")
    .select("*, user:users(*)")
    .eq("ownerId", user.id);

  return companies;
}
