import * as Ably from 'ably';

const apiKey = process.env.EXPO_PUBLIC_ABLY_API_KEY;

if (!apiKey) {
  console.warn('Ably API Key is missing! Check your .env file.');
}

// Export a single instance to be used by the AblyProvider
export const realtimeClient = new Ably.Realtime({
  key: apiKey,
  //   clientId: `user-${Math.random().toString(36).substring(7)}`,
});

// Inside your App.tsx or services/ably.ts
realtimeClient.connection.on('connected', async () => {
  try {
    // This fetches the token details which contain your key's permissions
    const token = await realtimeClient.auth.requestToken();

    console.log('--- ABLY KEY DEBUG ---');
    console.log('Client ID:', realtimeClient.auth.clientId);
    console.log('Capabilities:', token.capability);

    // Check if we can publish
    const canPublish = token.capability.includes('publish') || token.capability.includes('*');
    console.log('Can Publish:', canPublish ? '✅ YES' : '❌ NO');

    console.log('-----------------------');
  } catch (error) {
    console.error('Could not fetch token details:', error);
  }
});
