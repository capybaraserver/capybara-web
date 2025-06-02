import { ReturnButton } from "@/components/return-button"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button"

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "ADMIN") {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ReturnButton href="/profile" label="Profile" className="mb-4" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">FORBIDDEN.</p>
        </div>
      </div>
    )
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <div className="w-full max-w-sm">
        <ReturnButton href="/profile" label="Profile" className="mb-4" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">ACCESS GRANTED.</p>
        <div className="w-full">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b text-sm text-left">
                  <td className="px-4 py-2">{user.id.slice(0, 8)}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.role}</td>
                  <td className="px-4 py-2 text-center">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
