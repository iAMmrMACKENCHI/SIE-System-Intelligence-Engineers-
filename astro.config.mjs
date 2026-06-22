// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://iAMmrMACKENCHI.github.io/SIE-System-Intelligence-Engineers-/',
  base: process.env.NODE_ENV === 'production' ? '/SIE-System-Intelligence-Engineers-/' : '/',
  output: 'static',
});
