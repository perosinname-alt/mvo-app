import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const COMPANIES: Record<string, { id: string; name: string; city: string; latitude: number; longitude: number }[]> = {
  retail: [
    { id: '6ab0ca39fc3ba127b7ac2e16', name: 'Xalwo Kismaayo', city: 'Bosaso', latitude: 11.2842, longitude: 49.1816 },
  ],
  telecom: [],
  university: [],
  mechanic: [],
  solar: [],
  restruent: [],
  Constructions: [],
  others: [],
};

export default function CompanyListScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const companies = COMPANIES[type] || [];
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA', paddingTop: 60 }}>
      <Stack.Screen options={{ title: type }} />

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0F4C33', marginBottom: 16, paddingHorizontal: 16 }}>
        {type}
      </Text>

      {companies.length === 0 ? (
        <Text style={{ fontSize: 16, color: '#666', paddingHorizontal: 16 }}>
          Weli companies lagama darin qaybtan.
        </Text>
      ) : (
        <>
          <MapView
            style={{ width: screenWidth, height: 220, marginBottom: 16 }}
            initialRegion={{
              latitude: companies[0].latitude,
              longitude: companies[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {companies.map((company) => (
              <Marker
                key={company.id}
                coordinate={{ latitude: company.latitude, longitude: company.longitude }}
                title={company.name}
                description={company.city}
              />
            ))}
          </MapView>

          <FlatList
            data={companies}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push({ pathname: '/company/products/[companyId]', params: { companyId: item.id } })}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ fontSize: 14, color: '#666' }}>{item.city}</Text>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
}