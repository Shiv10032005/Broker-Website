import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollTriggeredFeatures() {
    return (
        <div style={container}>
            {features.map((feature, i) => (
                <Card i={i} feature={feature} key={feature.title} />
            ))}
        </div>
    )
}

function Card({ feature, i }) {
    // Dynamic gradient based on index
    const hueA = (i * 50 + 200) % 360; // Start with blues/purples
    const hueB = (i * 50 + 240) % 360;
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            className={`card-container-${i}`}
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.6 }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants} className="feature-card">
                <div style={imageContainer}>
                    <img src={feature.image} alt={feature.title} style={imageStyle} />
                </div>
                <div style={contentStyle}>
                    <div style={iconStyle}>{feature.icon}</div>
                    <h3 style={titleStyle}>{feature.title}</h3>
                    <p style={descriptionStyle}>{feature.description}</p>
                    <div style={statStyle}>{feature.stat}</div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const cardVariants = {
    offscreen: {
        y: 300,
        opacity: 0,
        rotate: 10
    },
    onscreen: {
        y: 50,
        rotate: -5,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
}

const hue = (h) => `hsl(${h}, 100%, 50%)`

/**
 * ==============   Data   ================
 */

const features = [
    {
        title: "Vast Property Selection",
        description: "Explore our extensive database of verified residential, commercial, and agricultural lands.",
        stat: "500+ Listings",
        icon: "🏠",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
    },
    {
        title: "Trusted by Thousands",
        description: "Join our community of happy homeowners and investors who found their perfect match.",
        stat: "10K+ Customers",
        icon: "😊",
        image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=600"
    },
    {
        title: "Pan-India Coverage",
        description: "From bustling metros to serene outskirts, we cover key locations across the country.",
        stat: "15+ Cities",
        icon: "📍",
        image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=600"
    },
    {
        title: "High Value Assets",
        description: "Secure your future with premium properties that appreciate over time.",
        stat: "₹500Cr+ Value",
        icon: "💰",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600"
    }
];

/**
 * ==============   Styles   ================
 */

const container = {
    margin: "50px auto",
    maxWidth: 500,
    paddingBottom: 200,
    width: "100%",
}

const cardContainer = {
    overflow: "visible",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: 20,
    marginBottom: -120,
}

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
    zIndex: -1,
    opacity: 0.15
}

const card = {
    width: 320,
    height: 480,
    display: "flex",
    flexDirection: "column",
    borderRadius: 24,
    background: "#ffffff",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 20px 40px hsl(0deg 0% 0% / 0.1)",
    transformOrigin: "10% 60%",
    overflow: "hidden"
}

const imageContainer = {
    width: "100%",
    height: "220px",
    background: "#f1f5f9"
}

const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
}

const contentStyle = {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1
}

const iconStyle = {
    fontSize: "32px",
    marginBottom: "4px"
}

const titleStyle = {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
    lineHeight: 1.2
}

const descriptionStyle = {
    fontSize: "15px",
    color: "#64748b",
    margin: 0,
    lineHeight: 1.6
}

const statStyle = {
    marginTop: "auto",
    fontSize: "18px",
    fontWeight: "700",
    color: "#0891b2", // Cyan/Teal
    paddingTop: "12px",
    borderTop: "1px solid #f1f5f9"
}
