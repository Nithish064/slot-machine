import React, { useState } from "react";
import { Button, Box, Typography, Grid, Paper } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InventoryIcon from "@mui/icons-material/Inventory";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { styled, keyframes } from "@mui/system";

// Keyframes for reel animation
const spinAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
  100% { transform: translateY(0); }
`;

// Styled components
const SlotBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: "12px",
  minHeight: "200px",
  background: "linear-gradient(to bottom, #fff 0%, #e3e3e3 100%)",
  boxShadow: "0 8px 12px rgba(0,0,0,0.2)",
  animation: `${spinAnimation} 0.6s ease-in-out`,
}));

const SpinButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontSize: "1.5rem",
  padding: "10px 30px",
  color: "#fff",
  background: "linear-gradient(to right, #ff416c, #ff4b2b)",
  borderRadius: "50px",
  boxShadow: "0px 5px 15px rgba(255, 65, 108, 0.5)",
  "&:hover": {
    background: "linear-gradient(to right, #ff4b2b, #ff416c)",
  },
}));

const RewardBox = styled(Box)({
  marginTop: "30px",
  color: "#333",
  textAlign: "center",
  fontSize: "1.1rem",
});

const RewardIcon = styled("div")({
  display: "inline-block",
  margin: "0 10px",
  fontSize: "2rem",
});

// Item options with rarity and icons
const items = [
  { type: "Weapon", rarity: "Common", count: 1, icon: <MilitaryTechIcon fontSize="large" color="action" /> },
  { type: "Weapon", rarity: "Rare", count: 2, icon: <MilitaryTechIcon color="primary" fontSize="large" /> },
  { type: "Consumable", rarity: "Epic", count: 1, icon: <EmojiEventsIcon color="success" fontSize="large" /> },
  { type: "Material", rarity: "Legendary", count: 3, icon: <InventoryIcon color="warning" fontSize="large" /> },
  { type: "Material", rarity: "Common", count: 2, icon: <InventoryIcon fontSize="large" /> },
  { type: "Consumable", rarity: "Rare", count: 2, icon: <EmojiEventsIcon color="primary" fontSize="large" /> },
];

export default function SlotMachine() {
  const [reel1, setReel1] = useState({});
  const [reel2, setReel2] = useState({});
  const [reel3, setReel3] = useState({});
  const [rewards, setRewards] = useState([]);

  // Spin reels and set random items
  const spin = () => {
    const randomItem1 = items[Math.floor(Math.random() * items.length)];
    const randomItem2 = items[Math.floor(Math.random() * items.length)];
    const randomItem3 = items[Math.floor(Math.random() * items.length)];

    setReel1(randomItem1);
    setReel2(randomItem2);
    setReel3(randomItem3);
    setRewards([randomItem1, randomItem2, randomItem3]);
  };

  // Function to get color based on rarity
  const getColorByRarity = (rarity) => {
    switch (rarity) {
      case "Common":
        return "#00e676"; // Green
      case "Rare":
        return "#2196F3"; // Blue
      case "Epic":
        return "#9c27b0"; // Purple
      case "Legendary":
        return "#ff9800"; // Orange
      default:
        return "#333"; // Default color
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 5,
        backgroundColor: "#2b2b2b",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Title */}
      <Typography variant="h3" sx={{ mb: 4, fontWeight: "bold", color: "#ffcc00" }}>
        🎰 Slot Machine 🎰
      </Typography>

      {/* Slot Reels */}
      <Grid container spacing={3} justifyContent="center">
        {[reel1, reel2, reel3].map((reel, index) => (
          <Grid item xs={3} key={index}>
            <SlotBox elevation={5}>
              {reel.icon || <CasinoIcon fontSize="large" />}
              <Typography variant="h6" sx={{ mt: 1 }}>
                {reel.type || "?"}
              </Typography>
              <Typography>Rarity: {reel.rarity || "?"}</Typography>
              <Typography>Count: {reel.count || "?"}</Typography>
            </SlotBox>
          </Grid>
        ))}
      </Grid>

      {/* Spin Button */}
      <SpinButton variant="contained" onClick={spin}>
        SPIN
      </SpinButton>

      {/* Rewards Section */}
      {rewards.length > 0 && (
        <RewardBox>
          <Typography variant="h4" sx={{ mt: 3, color: "#ffcc00" }}>
            🎁 Rewards 🎁
          </Typography>
          {rewards.map((reward, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <RewardIcon>{reward.icon}</RewardIcon>
              <Typography
                sx={{
                  color: getColorByRarity(reward.rarity),
                  fontWeight: "bold",
                }}
              >
                {reward.type} - {reward.rarity} - Count: {reward.count}
              </Typography>
            </Box>
          ))}
        </RewardBox>
      )}
    </Box>
  );
}
