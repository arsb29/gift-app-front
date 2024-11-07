import { User } from "@/types.ts";

export function filterUsers(user: User, filterValue: string) {
  const { username, lastName, firstName } = user;
  return (
    [username, firstName, lastName]
      .filter(Boolean)
      .join("")
      .toLowerCase()
      .indexOf(filterValue) !== -1
  );
}
