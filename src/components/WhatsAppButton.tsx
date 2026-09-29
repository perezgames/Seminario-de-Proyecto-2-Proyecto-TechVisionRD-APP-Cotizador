import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Linking, StyleSheet, TouchableOpacity } from 'react-native';

export default function WhatsAppButton() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  const haloScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.7],
  });

  const haloOpacity = pulse.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.45, 0.2, 0],
  });

  return (
    <Animated.View style={styles.container}>
      {/* Halo animado */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.halo,
          {
            opacity: haloOpacity,
            transform: [{ scale: haloScale }],
          },
        ]}
      />

      {/* Botón */}
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => Linking.openURL('https://wa.me/18494093006')}
      >
        <Ionicons name="logo-whatsapp" size={28} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  halo: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
  },

  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
