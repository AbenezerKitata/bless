"use client";

import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const searchTerm = formData.get("search") as string;
          router.push(pathname + `?search=${searchTerm}`);
        }}
      >
        <label htmlFor="search">Search Users</label>
        <input type="text" name="search" id="search" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
