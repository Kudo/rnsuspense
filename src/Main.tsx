import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Text } from 'react-native';

import ArtistPage from './ArtistPage';
import type { Artist } from './types';

export default function Main() {
  const [artist, setArtist] = useState<Artist>(null);

  if (artist != null) {
    return (
      <ErrorBoundary fallbackRender={errorFallbackRenderer}>
        <ArtistPage artist={artist} />
      </ErrorBoundary>
    );
  } else {
    return (
      <>
        <Button
          title="Open The Beatles artist page"
          onPress={() => setArtist({ id: 'the-beatles', name: 'The Beatles' })}
        />
        <Button
          title="Open non-existed artist page"
          onPress={() => setArtist({ id: 'unknown', name: 'Unknown' })}
        />
      </>
    );
  }
}

function errorFallbackRenderer({ error }: { error: Error }) {
  return <Text>Error Boundary: {error.message}</Text>;
}
