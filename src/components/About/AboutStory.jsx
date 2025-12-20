'use client';

import styles from './AboutStory.module.css';

export default function AboutStory() {
  const values = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description: 'To deliver exceptional culinary experiences that bring joy and create lasting memories for every client.'
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description: 'To become the most trusted and sought-after food service provider across Nigeria, known for quality and reliability.'
    },
    {
      icon: '❤️',
      title: 'Our Values',
      description: 'Quality, integrity, innovation, and customer satisfaction are at the heart of everything we do.'
    }
  ];

  return (
    <section className={styles.story}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Our Story & Values</h2>
          <p>Building excellence, one meal at a time</p>
        </div>

        <div className={styles.grid}>
          {values.map((value, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.narrative}>
          <h3>The BellyBuys Journey</h3>
          <p>
            What began as a passion project in 2019 has blossomed into one of Ile-Ife's most trusted food service providers. Founded by culinary enthusiast Chef Blessing, BellyBuys was born from a simple desire: to share authentic Nigerian flavors with the community while maintaining the highest standards of quality and service.
          </p>
          <p>
            Our journey started with weekend meal deliveries to a handful of families. Word spread quickly about our delicious offerings and reliable service. Soon, we were catering small parties, then weddings, corporate events, and everything in between.
          </p>
          <p>
            Today, we're proud to serve hundreds of satisfied clients, employing a team of skilled chefs, service staff, and logistics professionals. But our core values remain unchanged: quality ingredients, authentic flavors, and service excellence in every interaction.
          </p>
          <p>
            We continue to innovate, recently launching our private chef service and expanding our logistics capabilities. Yet we never forget our roots—that personal touch and care that made our clients fall in love with BellyBuys in the first place.
          </p>
        </div>
      </div>
    </section>
  );
}