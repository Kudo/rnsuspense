import { StyleSheet, Text, View } from 'react-native';

import { fetchData } from './data';
import { use } from './useHook';

// Note: this component is written using an experimental API
// that's not yet available in stable versions of React.

// For a realistic example you can follow today, try a framework
// that's integrated with Suspense, like Relay or Next.js.

export default function Albums({ artistId }: { artistId: string }) {
  const albums = use(fetchData(`/${artistId}/albums`)) ?? [];
  return (
    <View style={styles.listContainer}>
      {albums.map((album) => (
        <View style={styles.listItem} key={album.id}>
          <Text style={styles.listItemText}>
            {album.title} ({album.year})
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  listItemText: { fontSize: 16 },
});
