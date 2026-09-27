import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; picture: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectUri = AuthSession.makeRedirectUri();
  console.log('REDIRECT URI:', redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '268711898791-98gfom7p091h2dmcta0q098vffu1e9mg.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication?.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token?: string) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserInfo({ name: data.name, email: data.email, picture: data.picture });
    } catch (e) {
      console.log('Error fetching user info', e);
    }
    setLoading(false);
  };

  if (userInfo) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Image source={{ uri: userInfo.picture }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 16 }} />
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 4 }}>{userInfo.name}</Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>{userInfo.email}</Text>
        <Pressable
          onPress={() => router.push('/')}
          style={{ backgroundColor: '#0F4C33', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Sii wad</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Image
        source={require('@/assets/images/mvo-logo.png')}
        style={{ width: 100, height: 100, marginBottom: 24 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0F4C33', marginBottom: 8 }}>
        WELCOME  TO MVO 
      </Text>
      <Text style={{ fontSize: 14, color: '#888', marginBottom: 32, textAlign: 'center' }}>
        Enter here to continue
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0F4C33" />
      ) : (
        <Pressable
          disabled={!request}
          onPress={() => promptAsync()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 14,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
            sign in 
          </Text>
        </Pressable>
      )}
    </View>
  );
}