"use client";

import MotionReveal from './MotionReveal';
import Image from 'next/image';

export default function MotionExamples() {
  return (
    <div style={{ display: 'grid', gap: 40, padding: 24 }}>
      <MotionReveal direction="up" distance={28} delay={0}>
        <h1 style={{ margin: 0 }}>Welcome to BellyBuys</h1>
      </MotionReveal>

      <MotionReveal direction="left" distance={40} delay={0.08} stagger={0.06}>
        <p style={{ margin: 0 }}>Delicious catering and quick delivery across Osun state.</p>
        <p style={{ margin: 0 }}>Fresh ingredients, beautiful presentation.</p>
      </MotionReveal>

      <MotionReveal direction="right" distance={40} delay={0.12}>
        <div style={{ width: '100%', height: 220, position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
          <Image src="/images/hero/hero-1.jpg" alt="food" fill style={{ objectFit: 'cover' }} />
        </div>
      </MotionReveal>
    </div>
  );
}
