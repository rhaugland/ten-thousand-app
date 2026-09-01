import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Dimensions, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const QR_SIZE = Math.min(CARD_WIDTH - 60, 180);

function QRCode({ greyed }: { greyed: boolean }) {
  const size = 21;
  const blockSize = Math.floor(QR_SIZE / size);
  const totalSize = blockSize * size;

  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,1,0,1,1,0,0,1,0,1,1,0,1,1,0,1,0,1],
    [0,1,0,1,0,1,0,1,1,0,0,1,0,1,0,0,1,1,0,1,0],
    [1,1,0,0,1,0,1,0,0,1,1,0,1,0,1,0,0,1,1,0,1],
    [0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0],
    [1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,1,0,1,1,0,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,0,0,1,0,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,0,1,0,1,0,1],
  ];

  const color = greyed ? 'rgba(184, 216, 240, 0.15)' : Colors.blue;
  const darkColor = greyed ? 'rgba(184, 216, 240, 0.03)' : 'rgba(59, 130, 246, 0.06)';

  return (
    <View style={{ width: totalSize, height: totalSize, flexDirection: 'row', flexWrap: 'wrap' }}>
      {pattern.flat().map((val, i) => (
        <View
          key={i}
          style={{
            width: blockSize,
            height: blockSize,
            backgroundColor: val ? color : darkColor,
          }}
        />
      ))}
    </View>
  );
}

function PurchaseModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handlePurchase = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 1500);
  };

  const handleClose = () => {
    setDone(false);
    setCardNumber('');
    setExpiry('');
    setCvc('');
    setName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.modalOverlay} onPress={handleClose}>
        <View style={{ flex: 1 }} />
      </Pressable>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalInner}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleClose} style={styles.modalHandleArea} activeOpacity={0.7}>
            <View style={styles.modalHandle} />
          </TouchableOpacity>
            {done ? (
              <View style={styles.successContainer}>
                <Text style={styles.successCheck}>✓</Text>
                <Text style={styles.successTitle}>You're In</Text>
                <Text style={styles.successSub}>Your ticket is ready</Text>
                <TouchableOpacity style={styles.purchaseBtn} onPress={handleClose}>
                  <Text style={styles.purchaseBtnText}>View Ticket</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Text style={styles.modalTitle}>General Admission</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceNote}>All-day access · All stages</Text>
                  <Text style={styles.priceAmount}>$75</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.fieldLabel}>Name on Card</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full name"
                  placeholderTextColor="rgba(184,216,240,0.25)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />

                <Text style={styles.fieldLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4242 4242 4242 4242"
                  placeholderTextColor="rgba(184,216,240,0.25)"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />

                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <Text style={styles.fieldLabel}>Expiry</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM / YY"
                      placeholderTextColor="rgba(184,216,240,0.25)"
                      value={expiry}
                      onChangeText={setExpiry}
                      keyboardType="number-pad"
                      maxLength={7}
                    />
                  </View>
                  <View style={styles.halfField}>
                    <Text style={styles.fieldLabel}>CVC</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="rgba(184,216,240,0.25)"
                      value={cvc}
                      onChangeText={setCvc}
                      keyboardType="number-pad"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.purchaseBtn, processing && styles.purchaseBtnDisabled]}
                  onPress={handlePurchase}
                  disabled={processing}
                >
                  <Text style={styles.purchaseBtnText}>
                    {processing ? 'Processing...' : 'Pay $75'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function TicketScreen() {
  const [showPurchase, setShowPurchase] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoSmall}
          resizeMode="contain"
        />

        {/* Ticket card */}
        <View style={styles.ticket}>
          <View style={styles.ticketTop}>
            <Text style={styles.ticketTitle}>Ten Thousand</Text>
            <Text style={styles.ticketSub}>General Admission</Text>
          </View>

          <View style={styles.tearLine}>
            <View style={styles.tearCircleLeft} />
            {Array.from({ length: 20 }).map((_, i) => (
              <View key={i} style={styles.tearDash} />
            ))}
            <View style={styles.tearCircleRight} />
          </View>

          <TouchableOpacity
            style={styles.ticketBottom}
            onPress={() => setShowPurchase(true)}
            activeOpacity={0.8}
          >
            <QRCode greyed />
            <Text style={styles.tapText}>Tap to Purchase</Text>
            <Text style={styles.tapSubText}>Good for all days</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom info */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Food</Text>
            <Text style={styles.infoValue}>Taste</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Fashion</Text>
            <Text style={styles.infoValue}>Expression</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Music</Text>
            <Text style={styles.infoValue}>Feeling</Text>
          </View>
        </View>
      </View>

      <PurchaseModal visible={showPurchase} onClose={() => setShowPurchase(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoSmall: {
    width: 120,
    height: 65,
    marginBottom: 16,
  },

  // Ticket
  ticket: {
    width: CARD_WIDTH,
    backgroundColor: Colors.deepBlue,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.12)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  ticketTop: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ticketTitle: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    letterSpacing: 4,
    color: Colors.white,
  },
  ticketSub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    color: Colors.muted,
    marginTop: 2,
    letterSpacing: 1,
  },

  // Tear line
  tearLine: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tearCircleLeft: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.navy,
    marginLeft: -9,
  },
  tearCircleRight: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.navy,
    marginRight: -9,
  },
  tearDash: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    marginHorizontal: 2,
  },

  // QR
  ticketBottom: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  tapText: {
    fontFamily: Fonts.heading,
    fontSize: 14,
    letterSpacing: 3,
    color: Colors.blue,
    marginTop: 14,
  },
  tapSubText: {
    fontFamily: Fonts.bodyLight,
    fontSize: 11,
    color: Colors.muted,
    marginTop: 2,
  },

  // Info row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    width: CARD_WIDTH,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: Fonts.heading,
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.muted,
  },
  infoValue: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 12,
    color: Colors.lightBlue,
    marginTop: 3,
  },
  infoDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalInner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.deepBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 44,
    maxHeight: '80%',
  },
  modalHandleArea: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(184, 216, 240, 0.3)',
    borderRadius: 2,
  },
  modalTitle: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    letterSpacing: 2,
    color: Colors.white,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceNote: {
    fontFamily: Fonts.bodyLight,
    fontSize: 13,
    color: Colors.muted,
  },
  priceAmount: {
    fontFamily: Fonts.heading,
    fontSize: 26,
    color: Colors.blue,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    marginVertical: 16,
  },
  fieldLabel: {
    fontFamily: Fonts.heading,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.muted,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
    borderRadius: 8,
    color: Colors.white,
    fontFamily: Fonts.body,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },
  purchaseBtn: {
    backgroundColor: Colors.blue,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  purchaseBtnDisabled: {
    opacity: 0.6,
  },
  purchaseBtnText: {
    fontFamily: Fonts.heading,
    fontSize: 17,
    letterSpacing: 2,
    color: Colors.white,
  },

  // Success
  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successCheck: {
    fontSize: 44,
    color: '#059669',
    marginBottom: 12,
  },
  successTitle: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    letterSpacing: 2,
    color: Colors.white,
    marginBottom: 6,
  },
  successSub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 14,
    color: Colors.lightBlue,
    marginBottom: 8,
  },
});
