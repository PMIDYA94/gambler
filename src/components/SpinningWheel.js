import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import Svg, {
  Path,
  Text as SvgText,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const WHEEL_SIZE = Math.min(screenWidth, screenHeight) * 0.7;
const SEGMENTS = 10;
const SEGMENT_ANGLE = 360 / SEGMENTS;

// Colors for segments - alternating pattern for better visibility
const SEGMENT_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
];

const SpinningWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winningNumber, setWinningNumber] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const confettiOpacity = useRef(new Animated.Value(0)).current;

  const confettiPieces = useRef([]);

  useEffect(() => {
    // Initialize confetti pieces
    confettiPieces.current = Array.from({length: 50}, (_, i) => ({
      id: i,
      x: new Animated.Value(Math.random() * screenWidth),
      y: new Animated.Value(-50),
      rotation: new Animated.Value(0),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
    }));
  }, []);

  const createSegmentPath = index => {
    const startAngle = (index * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * SEGMENT_ANGLE - 90) * (Math.PI / 180);
    const radius = WHEEL_SIZE / 2 - 20;
    const innerRadius = 30;

    const x1 = Math.cos(startAngle) * radius;
    const y1 = Math.sin(startAngle) * radius;
    const x2 = Math.cos(endAngle) * radius;
    const y2 = Math.sin(endAngle) * radius;

    const x3 = Math.cos(startAngle) * innerRadius;
    const y3 = Math.sin(startAngle) * innerRadius;
    const x4 = Math.cos(endAngle) * innerRadius;
    const y4 = Math.sin(endAngle) * innerRadius;

    const largeArcFlag = SEGMENT_ANGLE > 180 ? 1 : 0;

    return `
      M ${x3} ${y3}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x4} ${y4}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x3} ${y3}
      Z
    `;
  };

  const getTextPosition = index => {
    const angle =
      (index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 - 90) * (Math.PI / 180);
    const radius = (WHEEL_SIZE / 2 - 20 + 30) / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {x, y};
  };

  const determineWinningNumber = finalRotation => {
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const adjustedRotation = (360 - normalizedRotation + 90) % 360;
    const segmentIndex = Math.floor(adjustedRotation / SEGMENT_ANGLE);
    return segmentIndex + 1;
  };

  const triggerConfetti = () => {
    setShowConfetti(true);

    Animated.timing(confettiOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    const confettiAnimations = confettiPieces.current.map((piece, index) => {
      return Animated.parallel([
        Animated.timing(piece.x, {
          toValue: Math.random() * screenWidth,
          duration: 3000 + Math.random() * 1000,
          useNativeDriver: false,
        }),
        Animated.timing(piece.y, {
          toValue: screenHeight + 100,
          duration: 3000 + Math.random() * 1000,
          useNativeDriver: false,
        }),
        Animated.timing(piece.rotation, {
          toValue: Math.random() * 720,
          duration: 3000 + Math.random() * 1000,
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.parallel(confettiAnimations).start();

    setTimeout(() => {
      Animated.timing(confettiOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setShowConfetti(false);
      });
    }, 3000);
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Random spin: 5-8 full rotations plus random final position
    const randomSpins = Math.random() * 3 + 5;
    const randomFinalAngle = Math.random() * 360;
    const totalRotation = randomSpins * 360 + randomFinalAngle;

    // Get current rotation value
    rotation._value = rotation._value || 0;
    const finalRotation = rotation._value + totalRotation;

    // Scale animation for visual feedback
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.timing(rotation, {
      toValue: finalRotation,
      duration: 3000 + Math.random() * 1000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => {
      const winner = determineWinningNumber(finalRotation);
      setWinningNumber(winner);
      setShowResult(true);
      setIsSpinning(false);
      triggerConfetti();
    });
  };

  const ConfettiPiece = ({piece}) => {
    return (
      <Animated.View
        style={[
          styles.confettiPiece,
          {
            position: 'absolute',
            left: piece.x,
            top: piece.y,
            opacity: confettiOpacity,
            transform: [
              {
                rotate: piece.rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {scale: piece.scale},
            ],
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      <View style={styles.wheelContainer}>
        <View style={styles.wheelWrapper}>
          <Animated.View
            style={[
              styles.wheel,
              {
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 360],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                  {scale: scale},
                ],
              },
            ]}>
            <Svg
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              viewBox={`-${WHEEL_SIZE / 2} -${
                WHEEL_SIZE / 2
              } ${WHEEL_SIZE} ${WHEEL_SIZE}`}>
              <Defs>
                <LinearGradient
                  id="wheelGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%">
                  <Stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                  <Stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
                </LinearGradient>
              </Defs>

              <G>
                {Array.from({length: SEGMENTS}, (_, index) => {
                  const textPos = getTextPosition(index);
                  return (
                    <G key={index}>
                      <Path
                        d={createSegmentPath(index)}
                        fill={SEGMENT_COLORS[index]}
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <Path
                        d={createSegmentPath(index)}
                        fill="url(#wheelGradient)"
                      />
                      <SvgText
                        x={textPos.x}
                        y={textPos.y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize="28"
                        fontWeight="bold"
                        fill="#ffffff"
                        stroke="#000000"
                        strokeWidth="1">
                        {index + 1}
                      </SvgText>
                    </G>
                  );
                })}
              </G>

              {/* Center circle */}
              <Circle
                cx="0"
                cy="0"
                r="25"
                fill="#2c3e50"
                stroke="#ffffff"
                strokeWidth="3"
              />
            </Svg>
          </Animated.View>

          {/* Pointer */}
          <View style={styles.pointer}>
            <View style={styles.pointerTriangle} />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]}
          onPress={spin}
          disabled={isSpinning}
          activeOpacity={0.8}>
          <Text style={styles.spinButtonText}>
            {isSpinning ? 'SPINNING...' : 'SPIN'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Result Modal */}
      <Modal
        visible={showResult}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowResult(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎉 Winner! 🎉</Text>
            <Text style={styles.modalNumber}>{winningNumber}</Text>
            <Text style={styles.modalSubtitle}>You got: {winningNumber}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowResult(false)}>
              <Text style={styles.modalButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Confetti */}
      {showConfetti && (
        <View style={styles.confettiContainer}>
          {confettiPieces.current.map((piece, index) => (
            <ConfettiPiece key={index} piece={piece} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wheelWrapper: {
    position: 'relative',
    marginBottom: 50,
  },
  wheel: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 20,
  },
  pointer: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{translateX: -15}],
    zIndex: 10,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e74c3c',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  spinButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#e74c3c',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  spinButtonDisabled: {
    backgroundColor: '#7f8c8d',
    shadowColor: '#7f8c8d',
  },
  spinButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
    minWidth: 250,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  modalNumber: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  confettiPiece: {
    width: 8,
    height: 8,
    backgroundColor: '#f39c12',
    borderRadius: 2,
  },
});

export default SpinningWheel;
