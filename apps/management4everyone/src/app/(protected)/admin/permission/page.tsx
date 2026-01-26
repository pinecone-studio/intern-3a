import { createClerkClient } from '@clerk/nextjs/server';
import { approveUserAction } from '../../../actions/user-actions';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function AdminUsersPage() {
  // Clerk-ээс бүх хэрэглэгчдийг татах
  const response = await clerkClient.users.getUserList();

  // Зөвшөөрөл хүлээж буй (approved !== true) хэрэглэгчдийг шүүх
  const pendingUsers = response.data.filter((user) => (user.publicMetadata as any).approved !== true);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Зөвшөөрөл хүлээж буй ажилтнууд</h1>

      {pendingUsers.length === 0 ? (
        <p className="text-gray-500">Одоогоор хүлээгдэж буй хүсэлт байхгүй байна.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Нэр</th>
                <th className="px-4 py-3 font-semibold">И-мэйл</th>
                <th className="px-4 py-3 font-semibold">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pendingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-3">{user.primaryEmailAddress?.emailAddress}</td>
                  <td className="px-4 py-3">
                    <form
                      action={async () => {
                        'use server';
                        await approveUserAction(user.id);
                      }}
                    >
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Зөвшөөрөх</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
