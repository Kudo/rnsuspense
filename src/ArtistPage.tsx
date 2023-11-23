import { Suspense } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Albums from './Albums';

import type { Artist } from './types';

export default function ArtistPage({ artist }: { artist: Artist }) {
  return (
    <ScrollView>
      <Text style={styles.artistName}>{artist.name}</Text>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </ScrollView>
  );
}

function Loading() {
  return <Text style={styles.loadingText}>🌀 Loading...</Text>;
}

const styles = StyleSheet.create({
  artistName: {
    fontSize: 24,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 20,
  },
});
