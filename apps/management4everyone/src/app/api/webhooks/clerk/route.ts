//apps/management4everyone/src/app/api/webhooks/clerk/route.ts
//Энэ файл нь Clerk вэбхүүкийг хүлээн авч, хэрэглэгч шинээр үүсэх үед түүний метадатаг шинэчлэх зориулалттай.
//REST API маршрутыг ашиглан вэбхүүкийг хүлээн авна.
import { createClerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET-ээ тохируулна уу');
  }

  // Header-үүдийг шалгах (Svix аюулгүй байдлын үүднээс)
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id!,
      'svix-timestamp': svix_timestamp!,
      'svix-signature': svix_signature!,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook баталгаажуулахад алдаа гарлаа:', err);
    return new Response('Error occured', { status: 400 });
  }

  // Хэрэглэгч шинээр үүсэх үед ажиллах логик
  if (evt.type === 'user.created') {
    const { id } = evt.data;

    // Clerk дээрх хэрэглэгчийн метадатаг шинэчлэх
    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        approved: false, // Анх бүртгүүлэхэд false байна
        role: 'WORKER',
      },
    });
  }

  return new Response('', { status: 200 });
}
