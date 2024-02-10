"use server";

// export async function getUsers() {
//   const res = await fetch("http://localhost:3009/users");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getAccounts() {
//   const res = await fetch("http://localhost:3009/account");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getReservations() {
//   const res = await fetch("http://localhost:3009/reservation");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getAssets() {
//   const res = await fetch("http://localhost:3009/asset");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getReviews() {
//   const res = await fetch("http://localhost:3009/review");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getAddons() {
//   const res = await fetch("http://localhost:3009/addon");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getLocations() {
//   const res = await fetch("http://localhost:3009/location");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }
// export async function getPricing() {
//   const res = await fetch("http://localhost:3009/pricing");
//   if (!res.ok) {
//     throw new Error("Error Fetching Data");
//   }
//   return res.json();
// }

//Connect to smartWaiver's API
const apiBaseUrl = "https://api.smartwaiver.com/v4";

export async function getWaivers(folder: string, limit: number) {
  try {
    const res = await fetch(`${apiBaseUrl}/${folder}?limit=${limit}&`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "sw-api-key": process.env.SW_API_KEY,
      } as HeadersInit, // Add the type assertion here
    });
    const data = await res.json();
    //add error handlers

    return { data };
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return { error: "Failed to fetch waivers" };
  }
}

export async function searchSmartWaiver(params: {
  templateId?: string;
  fromDts?: Date;
  toDts?: Date;
  firstName?: string;
  lastName?: string;
  email?: string;
  verified?: boolean;
  sort?: "asc" | "desc";
  tag?: string;
}) {
  try {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${apiBaseUrl}/search?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "sw-api-key": process.env.SW_API_KEY,
      } as HeadersInit,
    });
    const data = await res.json();
    //add error handlers

    return { data };
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return { error: "Failed to search waivers" };
  }
}

export async function getWaiverById(waiverId: string, pdf: boolean = false) {
  try {
    const res = await fetch(`${apiBaseUrl}/waivers/${waiverId}?pdf=${pdf}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "sw-api-key": process.env.SW_API_KEY,
      } as HeadersInit,
    });
    const data = await res.json();
    // add error handlers

    return { data };
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    return { error: "Failed to fetch waiver by ID" };
  }
}
