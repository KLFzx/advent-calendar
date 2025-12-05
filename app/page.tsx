'use client';

import { useMemo } from 'react';
import styles from './page.module.css';
import AdventDoor from './components/AdventDoor';
import LanguageToggle from './components/LanguageToggle';
import { adventDays } from './data/adventData';
import { translations } from './data/translations';
import { useLanguage } from './context/LanguageContext';

export default function Home() {
    const { language } = useLanguage();
    const t = translations[language];

    // Get current UTC date for consistent date checking across timezones
    const { currentDay, currentMonth } = useMemo(() => {
        const now = new Date();
        return {
            currentDay: now.getUTCDate(),
            currentMonth: now.getUTCMonth() + 1 // 0-indexed, so +1 for December = 12
        };
    }, []);

    // Determine if a day is unlocked
    const isDayUnlocked = (day: number) => {
        // Only unlock in December
        if (currentMonth !== 12) return false;
        // Unlock on the day or after
        return day <= currentDay;
    };

    return (
        <main className={styles.main}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <LanguageToggle />
                </div>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleMain}>{t.titleMain}</span>
                        <span className={styles.titleSub}>{t.titleSub}</span>
                    </h1>
                    <p className={styles.subtitle}>
                        {t.subtitle}
                    </p>
                    <div className={styles.currentDate}>
                        <span className={styles.dateLabel}>{t.today}</span>
                        <span className={styles.dateValue}>
                            {language === 'en'
                                ? `${t.december} ${currentDay}, 2025`
                                : `${currentDay} ${t.december} 2025`
                            }
                        </span>
                    </div>
                </div>
                <div className={styles.ornamentalLine}>
                    <div className={styles.ornament}>✦</div>
                    <div className={styles.line}></div>
                    <div className={styles.ornament}>⚔</div>
                    <div className={styles.line}></div>
                    <div className={styles.ornament}>✦</div>
                </div>
            </header>

            {/* Calendar Grid */}
            <div className={styles.calendarContainer}>
                <div className={styles.calendar}>
                    {adventDays.map((day) => (
                        <AdventDoor
                            key={day.day}
                            day={day}
                            isUnlocked={isDayUnlocked(day.day)}
                            isPast={day.day < currentDay}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerQuote}>
                    <p className={styles.quoteText}>
                        "{t.footerQuote}"
                    </p>
                    <p className={styles.quoteAuthor}>— {t.footerAuthor}</p>
                </div>
                <div className={styles.footerInfo}>
                    <p>{t.daysUnlocked} {currentDay} / 24</p>
                    <p>{t.returnDaily}</p>
                </div>
            </footer>

            {/* Background Effects */}
            <div className={styles.backgroundEffects}>
                <div className={styles.stars}>
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className={styles.star}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
