"use server";

import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./schema";
import { gen_random_string } from "../utils";

export const getUserData = async () => {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const { data } = await supabase.auth.getSession();

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
  const { data: companies } = await supabase
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
  const { data: companies } = await supabase
    .from("companies")
    .select("*, user:users(*)")
    .eq("ownerId", user.id);

  return companies;
}

type CreateCompanyProps = {
  name: string;
  description: string;
  image: string;
};

export async function createCompany(values: CreateCompanyProps) {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const user = await getUserData();
  if (!user)
    return {
      error: {
        message: "Please Login!",
      },
    };

  const { data: insert } = await supabase
    .from("companies")
    .insert({
      accessCode: gen_random_string(10),
      description: values.description,
      image: values.image,
      name: values.name,
      ownerId: user.id,
    })
    .select()
    .single();
  if (!insert)
    return {
      error: {
        message: "Error occurred!",
      },
    };
  const insert2 = await supabase.from("usercompanies").insert({
    company_id: insert.id,
    user_id: user.id,
  });

  return { success: true };
}

export async function removeCompany(company_id: string) {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const user = await getUserData();
  if (!user)
    return {
      error: {
        message: "Please Login!",
      },
    };
  const { data: company } = await supabase
    .from("companies")
    .select()
    .eq("id", company_id)
    .single();

  if (!company)
    return {
      error: {
        message: "Invalid Company",
      },
    };

  const del = await supabase.from("companies").delete().eq("id", company.id);

  return {
    success: true,
  };
}

export async function leaveCompany(company_id: string) {
  const supabase = createServerActionClient<Database>({
    cookies: () => cookies(),
  });
  const user = await getUserData();
  if (!user)
    return {
      error: {
        message: "Please Login!",
      },
    };
  const { data: company } = await supabase
    .from("companies")
    .select()
    .eq("id", company_id)
    .single();

  if (!company)
    return {
      error: {
        message: "Invalid Company",
      },
    };

  if (company.ownerId === user.id)
    return {
      error: {
        message: "You cannot leave as you own this company...",
      },
    };

  const del = await supabase
    .from("usercompanies")
    .delete()
    .eq("company_id", company.id)
    .eq("user_id", user.id);

  return {
    success: true,
  };
}
