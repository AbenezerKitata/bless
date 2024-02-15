import { prisma } from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

if (!webhookSecret) {
  throw new Error("Clerk webhook secret is not set");
}

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: UserCreatedEvent | SessionRevokedEvent | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as UserCreatedEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json(
      {
        err,
      },
      { status: 400 }
    );
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    const { id, first_name, last_name, created_at, updated_at } = evt.data;

    try {
      await prisma.user.upsert({
        where: { id: id as string },
        create: {
          id: id as string,
          name: `${first_name} ${last_name}`,
          email: evt.data.email_addresses[0]?.email_address || null,
          image: evt.data.image_url || null,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
        },
        update: {
          name: `${first_name} ${last_name}`,
          email: evt.data.email_addresses[0]?.email_address || null,
          image: evt.data.image_url || null,
          updatedAt: new Date(updated_at),
        },
      });
      return new Response("", { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // user.deleted
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    try {
      await prisma.user.delete({ where: { id: id as string } });
      return new Response("", { status: 201 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // user.updated
  if (eventType === "user.updated") {
    const { id, first_name, last_name, created_at, updated_at } = evt.data;

    try {
      await prisma.user.upsert({
        where: { id: id as string },
        create: {
          id: id as string,
          name: `${first_name} ${last_name}`,
          createdAt: new Date(created_at),
          updatedAt: new Date(updated_at),
          email: evt.data.email_addresses[0]?.email_address || null,
          image: evt.data.image_url || null,
        },
        update: {
          name: `${first_name} ${last_name}`,
          updatedAt: new Date(updated_at),
          email: evt.data.email_addresses[0]?.email_address || null,
          image: evt.data.image_url || null,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as SessionRevokedEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json(
      {
        err,
      },
      { status: 400 }
    );
  }

  // session.revoked
  if (eventType === "session.revoked") {
    const { id, updated_at, status } = evt.data;

    try {
      await prisma.session.update({
        where: { id: id as string },
        data: {
          id: id as string,
          updatedAt: new Date(updated_at),
          userId: evt.data.user_id,
          status: status,
          last_active_at: new Date(evt.data.last_active_at),
          abandon_at: new Date(evt.data.abandon_at),
          expire_at: new Date(evt.data.expire_at),
          createdAt: new Date(evt.data.created_at),
          accessToken: null,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // session.removed

  if (eventType === "session.removed") {
    const { id } = evt.data;
    try {
      await prisma.session.delete({ where: { id: id as string } });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // session.ended

  if (eventType === "session.ended") {
    const { id } = evt.data;
    try {
      await prisma.session.update({
        where: { id: id as string },
        data: { status: "ended" },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // session.created

  if (eventType === "session.created") {
    const { id, updated_at, status } = evt.data;
    try {
      await prisma.session.upsert({
        where: { id: id as string },
        create: {
          id: id as string,
          updatedAt: new Date(updated_at),
          userId: evt.data.user_id,
          status: status,
          last_active_at: new Date(evt.data.last_active_at),
          abandon_at: new Date(evt.data.abandon_at),
          expire_at: new Date(evt.data.expire_at),
          createdAt: new Date(evt.data.created_at),
          accessToken: null,
          sessionToken: "", // Add the missing sessionToken property
          expires: new Date(evt.data.expire_at), // Add the missing expires property
        },
        update: {
          updatedAt: new Date(updated_at),
          userId: evt.data.user_id,
          status: status,
          last_active_at: new Date(evt.data.last_active_at),
          abandon_at: new Date(evt.data.abandon_at),
          expire_at: new Date(evt.data.expire_at),
          createdAt: new Date(evt.data.created_at),
          accessToken: null,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error occured -- processing webhook data", {
        status: 500,
      });
    }
  }

  // role.updated

  // role.deleted

  // role.created

  // permission.updated

  // permission.deleted

  // permission.created

  // email.created

  // organization.created

  // organization.updated

  // organization.deleted

  // organizationDomain.created

  // organizationDomain.updated

  // organizationDomain.deleted

  // organizationInvitation.created

  // organizationInvitation.updated

  // organizationInvitation.deleted

  // organizationMembership.created

  // organizationMembership.updated

  // organizationMembership.deleted

  // "*"

  // return new Response("", { status: 201 });
}

type EventType =
  | "user.created"
  | "user.updated"
  | "user.deleted"
  | "session.revoked"
  | "session.removed"
  | "session.ended"
  | "session.created"
  | "role.updated"
  | "role.deleted"
  | "role.created"
  | "permission.updated"
  | "permission.deleted"
  | "permission.created"
  | "email.created"
  | "organization.created"
  | "organization.updated"
  | "organization.deleted"
  | "organizationDomain.created"
  | "organizationDomain.updated"
  | "organizationDomain.deleted"
  | "organizationInvitation.created"
  | "organizationInvitation.updated"
  | "organizationInvitation.deleted"
  | "organizationMembership.created"
  | "organizationMembership.updated"
  | "organizationMembership.deleted";
("*");

type SessionRevokedEventData = {
  abandon_at: number;
  client_id: string;
  created_at: number;
  expire_at: number;
  id: string;
  last_active_at: number;
  object: string;
  status: string;
  updated_at: number;
  user_id: string;
};

type SessionRevokedEvent = {
  data: SessionRevokedEventData;
  object: "event";
  type: "session.revoked";
};

type UserEmailAddress = {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: {
    status: string;
    strategy: string;
  };
};

type UserEventData = {
  birthday: string;
  created_at: number;
  email_addresses: UserEmailAddress[];
  external_accounts: any[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: null | string;
  primary_web3_wallet_id: null | string;
  private_metadata: Record<string, unknown>;
  profile_image_url: string;
  public_metadata: Record<string, unknown>;
  two_factor_enabled: boolean;
  unsafe_metadata: Record<string, unknown>;
  updated_at: number;
  username: null | string;
  web3_wallets: any[];
};

type UserCreatedEvent = {
  data: UserEventData;
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
