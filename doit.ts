import { resolve } from "path";
import { copyFileSync, readdirSync, statSync } from "fs";

const allSprites = readdirSync(resolve(__dirname, "src/sprites"));

const WC_GRAPHICS = resolve(
  __dirname,
  "apps/balance-and-ruin/WorldsCollide/graphics"
);
allSprites.forEach((dir, idx) => {
  const sprite = `${dir}.bin`;
  const palette = `${dir}.pal`;
  const srcSprite = resolve(__dirname, `src/sprites`, dir, sprite);
  const destSprite = resolve(WC_GRAPHICS, "sprites/custom", sprite);
  const srcPalette = resolve(__dirname, `src/sprites`, dir, palette);
  const destPalette = resolve(WC_GRAPHICS, `palettes/custom`, palette);

  // ensure folder exists for each
  statSync(srcSprite);
  statSync(srcPalette);

  const destSpr = statSync(destSprite, { throwIfNoEntry: false });
  const destPal = statSync(destPalette, { throwIfNoEntry: false });

  if (destSpr) {
    console.warn(destSpr, "already exists, ignoring");
  } else {
    copyFileSync(srcSprite, destSprite);
  }

  if (destPal) {
    console.warn(destPal, "already exists, ignoring");
    return;
  } else {
    copyFileSync(srcPalette, destPalette);
    console.log(dir);
  }
});

const allPortraits = readdirSync(resolve(__dirname, "src/portraits"));

allPortraits.forEach((dir, idx) => {
  const sprite = `${dir}.bin`;
  const palette = `${dir}.pal`;
  const srcSprite = resolve(__dirname, `src/portraits`, dir, sprite);
  const destSprite = resolve(WC_GRAPHICS, "portraits/custom", sprite);
  const srcPalette = resolve(__dirname, `src/portraits`, dir, palette);
  const destPalette = resolve(WC_GRAPHICS, `portraits/custom`, palette);

  // ensure folder exists for each
  statSync(srcSprite);
  statSync(srcPalette);

  const destSpr = statSync(destSprite, { throwIfNoEntry: false });
  const destPal = statSync(destPalette, { throwIfNoEntry: false });

  if (destSpr) {
    console.warn(destSpr, "already exists, ignoring");
  } else {
    copyFileSync(srcSprite, destSprite);
  }

  if (destPal) {
    console.warn(destPal, "already exists, ignoring");
    return;
  } else {
    copyFileSync(srcPalette, destPalette);
    console.log(dir);
  }
});
